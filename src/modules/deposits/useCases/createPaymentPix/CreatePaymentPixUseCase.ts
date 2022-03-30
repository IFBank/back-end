interface IPaymentPix {
  user_id: string;
}

class CreatePaymentPixUseCase {
  async execute({ user_id }: IPaymentPix) {}
}

export { CreatePaymentPixUseCase };
