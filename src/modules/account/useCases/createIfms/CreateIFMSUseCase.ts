import { prisma } from "../../../../database/prisma/prismaClient";
import { AppError } from "../../../../errors/AppError";
import { apiIF } from "../../../../services/api";
import md5 from "md5";

interface ICreateIFMS {
  ra: string;
  name: string;
  cpf: string;
  born_date: string;
}

class CreateIFMSUseCase {
  async execute({ ra, name, cpf, born_date }: ICreateIFMS) {
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
      const tokenRA = md5(`IFMSAPPWS-RA${parseInt(ra).toString()}`);
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
