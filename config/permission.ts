export const ROLE_PERMISSIONS = {
  admin: [
    'products:create',
    'products:read',
    'products:update',
    'products:delete',

    'customers:create',
    'customers:read',
    'customers:update',
    'customers:delete',

    'orders:create',
    'orders:read',
    'orders:update',
    'orders:delete',
  ],

  manager: [
    'products:create',
    'products:read',
    'products:update',

    'customers:read',

    'orders:read',
    'orders:update',
  ],

  sales: [
    'customers:create',
    'customers:read',
    'customers:update',

    'orders:create',
    'orders:read',

    'products:read',
  ],

  customer: ['products:read', 'orders:create', 'orders:read'],
}
