import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Logger {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const startTime = Date.now()
    console.log('\nStart of request')
    console.log('Method:', ctx.request.method())
    console.log('URL:', ctx.request.url())
    console.log('IP:', ctx.request.ip())

    await next()

    const executionTime = Date.now() - startTime
    console.log('Execution Time:', executionTime, 'ms')
    console.log('End of request\n')
  }
}
