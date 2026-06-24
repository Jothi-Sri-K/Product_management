import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {
    if (error.code === 'E_ROW_NOT_FOUND') {
      return ctx.response.status(404).send({
        status: 'error',
        message: 'Record not found',
      })
    }

    if (error.code === 'E_VALIDATION_FAILURE') {
      return ctx.response.status(422).send({
        status: 'error',
        message: 'Validation failed',
        errors: error.messages?.errors || error.messages,
      })
    }

    if (error.status === 401) {
      return ctx.response.status(401).send({
        status: 'error',
        message: error.message || 'Unauthorized access',
      })
    }

    if (error.status === 403) {
      return ctx.response.status(403).send({
        status: 'error',
        message: 'Permission denied',
      })
    }

    Logger.error(error)

    return ctx.response.status(error.status || 500).send({
      status: 'error',
      message: 'Something went wrong on our end',
      ...(process.env.NODE_ENV === 'development' && { debug_message: error.message }),
    })
  }
}
