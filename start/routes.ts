import Route from '@ioc:Adonis/Core/Route'

Route.post('/register', 'AuthController.register')
Route.post('/login', 'AuthController.login')

Route.get('/products', 'ProductsController.index').middleware([
  'jwtAuth',
  'permission:products:read',
])

Route.get('/products/sort', 'ProductsController.sort_desc').middleware([
  'jwtAuth',
  'permission:products:read',
])

Route.get('/products/:id', 'ProductsController.show')
  .where('id', /^\d+$/)
  .middleware(['jwtAuth', 'permission:products:read'])

Route.post('/products', 'ProductsController.store').middleware([
  'jwtAuth',
  'permission:products:create',
])

Route.post('/products/bulk', 'ProductsController.create_many').middleware([
  'jwtAuth',
  'permission:products:create',
])

Route.put('/products/:id', 'ProductsController.update').middleware([
  'jwtAuth',
  'permission:products:update',
])

Route.delete('/products/:id', 'ProductsController.delete_rec').middleware([
  'jwtAuth',
  'permission:products:delete',
])

Route.get('/customers', 'CustomersController.index').middleware([
  'jwtAuth',
  'permission:customers:read',
])

Route.get('/customers/:id', 'CustomersController.show')
  .where('id', /^\d+$/)
  .middleware(['jwtAuth', 'permission:customers:read'])

Route.post('/customers', 'CustomersController.store').middleware([
  'jwtAuth',
  'permission:customers:create',
])

Route.put('/customers/:id', 'CustomersController.update').middleware([
  'jwtAuth',
  'permission:customers:update',
])

Route.delete('/customers/:id', 'CustomersController.destroy').middleware([
  'jwtAuth',
  'permission:customers:delete',
])

Route.get('/orders', 'OrdersController.index').middleware(['jwtAuth', 'permission:orders:read'])

Route.get('/orders/:id', 'OrdersController.show').middleware(['jwtAuth', 'permission:orders:read'])

Route.post('/orders', 'OrdersController.store').middleware(['jwtAuth', 'permission:orders:create'])

Route.put('/orders/:id', 'OrdersController.update')
  .where('id', /^\d+$/)
  .middleware(['jwtAuth', 'permission:orders:update'])

Route.delete('/orders/:id', 'OrdersController.destroy').middleware([
  'jwtAuth',
  'permission:orders:delete',
])
