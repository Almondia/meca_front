class ApiError extends Error {
  status: number;

  message: string;

  constructor({ status, message }: { status: number; message: string }) {
    super();
    this.status = status;
    this.message = message;
  }
}

export default ApiError;
