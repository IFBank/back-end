import { prisma } from "../../../../database/prisma/prismaClient";
import { apiPIXHomo } from "../../../../services/gerencianet";

interface IPaymentPix {
  user_id: string;
  value: string;
}

class CreatePaymentPixUseCase {
  async execute({ user_id, value }: IPaymentPix) {
    const user = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
      include: {
        ifms: {
          select: {
            cpf: true,
            name: true,
            ra: true,
          },
        },
      },
    });

    try {
      const cob = await apiPIXHomo.post(`/v2/cob`, {
        calendario: {
          expiracao: parseInt(process.env.COB_EXPIRES_IN),
        },
        devedor: {
          cpf: user.ifms.cpf,
          nome: user.ifms.name,
        },
        valor: {
          original: value,
        },
        chave: process.env.PIX_KEY_GN,
      });

      const qrCode = await apiPIXHomo.get(`/v2/loc/${cob.data.loc.id}/qrcode`);

      return qrCode.data;
    } catch (error) {}
  }
}

export { CreatePaymentPixUseCase };
