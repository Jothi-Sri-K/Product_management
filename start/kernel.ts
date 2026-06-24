import Server from '@ioc:Adonis/Core/Server'
import JwtAuth from 'App/Middleware/Auth'
Server.middleware.register([
  () => import('@ioc:Adonis/Core/BodyParser'),
  () => import('App/Middleware/Logger'),
])
Server.middleware.registerNamed({
  jwtAuth: () => import('App/Middleware/Auth'),
  permission: () => import('App/Middleware/Permission'),
})
