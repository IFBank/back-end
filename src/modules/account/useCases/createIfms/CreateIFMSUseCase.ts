import { prisma } from "../../../../database/prisma/prismaClient";
import { AppError } from "../../../../errors/AppError";
import { apiIF } from "../../../../services/api";
import md5 from "md5";
import * as Yup from "yup";

interface ICreateIFMS {
  ra: string;
  name: string;
  cpf: string;
  born_date: string;
}

const IFMSValidate = Yup.object().shape({
  ra: Yup.string()
    .typeError("RA must be string")
    .matches(/^\d{6}/, "RA invalid")
    .required("RA is required")
    .trim()
    .strict(),
  name: Yup.string()
    .max(90, "Name is too long")
    .min(5, "Name is too short")
    .required("Name is required")
    .typeError("Name must be string")
    .strict()
    .trim(),
  cpf: Yup.string()
    .matches(/^\d{3}\d{3}\d{3}\d{2}$/, "CPF invalid format")
    .required("CPF is required")
    .strict()
    .trim()
    .typeError("CPF must be string"),
  born_date: Yup.string()
    .matches(
      /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
      "Born date invalid format"
    )
    .strict()
    .trim()
    .typeError("Born date must be string")
    .required("Born date is required"),
});

class CreateIFMSUseCase {
  async execute({ ra, name, cpf, born_date }: ICreateIFMS) {
    try {
      await IFMSValidate.validate(
        { ra, name, cpf, born_date },
        { abortEarly: false }
      );
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        throw new AppError(err.errors[0], 202220);
      }
    }

    // VERIFICAR NO BANCO DE DADOS SE JA FOI CADASTRADO
    let raID;
    const raAlreadyExists = await prisma.ifms.findFirst({
      where: {
        ra,
        cpf,
        born_date: new Date(born_date),
      },
    });

    raID = raAlreadyExists ? raAlreadyExists.ra : undefined;

    if (!raAlreadyExists) {
      // VALIDAR VERACIDADE DAS INFO
      const tokenRA = md5(
        `${process.env.RA_TOKEN_MD5_SECRET}${parseInt(ra).toString()}`
      );
      const {
        data: { resposta: response },
      } = await apiIF.get(
        `?ra=${ra}&nome=${name}&cpf=${cpf}&data_nascimento=${born_date}&token=${tokenRA}`
      );

      if (response !== "true") {
        throw new AppError("Student doesn't exist", 20221, 401);
      }

      // SALVAR NO DB
      const userInfo = await prisma.ifms.create({
        data: {
          born_date: new Date(born_date),
          cpf,
          name,
          ra,
        },
      });

      raID = userInfo.ra;
    }
    // GERAR TOKEN
    const token = md5(`${process.env.RA_TOKEN_SECRET}${raID}`);

    // RETORNAR TOKEN DE AUTH COM ESSE RA
    return token;
  }
}

export { CreateIFMSUseCase };
