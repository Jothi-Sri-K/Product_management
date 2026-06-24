import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
let totalRequests = 0
export default class RequestCounter {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    totalRequests++
    console.log(`Total Requests Received: ${totalRequests}`)
    await next()
  }
}
