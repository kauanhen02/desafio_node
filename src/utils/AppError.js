class AppError{
  message;
  statusCode;

  constructor(message, statusCode = 400){
    this.message = message;
    this.statusCode = statusCode
  }
}

//indicara qualquer erro que seja ocasionado pelo cliente

module.exports = AppError