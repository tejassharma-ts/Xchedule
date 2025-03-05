class AppError {
  message: string;
  status: number;
  constructor(error: any) {
    let genericMessage = "Something went really wrong. Please try again later!";
    let status = 500;

    this.message = error.message || genericMessage;

    this.status = status;
  }
}

export default AppError;
