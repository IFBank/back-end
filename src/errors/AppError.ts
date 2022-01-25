class AppError {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly errorCode: number;

  constructor(message: string, errorCode = 0, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

export { AppError };
