

# 📦 Workflow

The Product Management API is designed as a mini Order Management System.

The application supports the complete order lifecycle:

```text
User Authentication
        ↓
Manage Products
        ↓
Manage Customers
        ↓
Create Order
        ↓
Add Products to Order
        ↓
Store Order Information
        ↓
Generate Order Response
```

---

# 🗄 Database Design

The application uses a relational database structure consisting of the following tables:

| Table       | Purpose                                    |
| ----------- | ------------------------------------------ |
| users       | Stores registered users                    |
| products    | Stores product information                 |
| customers   | Stores customer details                    |
| orders      | Stores order headers                       |
| order_items | Stores products associated with each order |

---

## Database Relationships

```text

Customers
  │
  └─────────────► Orders
                        │
                        │
                        ▼
                  Order Items
                        │
                        │
                        ▼
                    Products
```

---

# ✨ Features

## Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Permission-Based Access Control

---

## Product Management

* Create Product
* View Products
* Update Product
* Delete Product
* Product Validation

---

## Customer Management

* Create Customer
* View Customers
* Update Customer
* Delete Customer

---

## Order Management

* Create Orders
* Associate Customer with Order
* Add Multiple Products to Order
* Calculate Order Total
* Store Order Items
* View Order Details

---

## Database Operations

* Database Migrations
* Foreign Key Relationships
* Lucid ORM Models
* Query Builder Support

---

# 📁 Project Structure

```bash
app/
│
├── Controllers/
│   ├── AuthController.ts
│   ├── ProductsController.ts
│   ├── CustomersController.ts
│   └── OrdersController.ts
│
├── Models/
│   ├── User.ts
│   ├── Product.ts
│   ├── Customer.ts
│   ├── Order.ts
│   └── OrderItem.ts
│
├── Middleware/
│   ├── JwtAuth.ts
│   └── Permission.ts
│
├── Validators/
│   ├── ProductValidator.ts
│   ├── CustomerValidator.ts
│   └── OrderValidator.ts
│
├── start/
│   └── routes.ts
│
└── database/
    └── migrations/
```

---

# 🔗 API Endpoints

## Authentication Routes

| Method | Endpoint    | Controller              | Middleware |
| ------ | ----------- | ----------------------- | ---------- |
| POST   | `/register` | AuthController.register | None       |
| POST   | `/login`    | AuthController.login    | None       |

---

## Product Routes

| Method | Endpoint         | Controller                     | Middleware                          |
| ------ | ---------------- | ------------------------------ | ----------------------------------- |
| GET    | `/products`      | ProductsController.index       | jwtAuth, permission:products:read   |
| GET    | `/products/sort` | ProductsController.sort_desc   | jwtAuth, permission:products:read   |
| GET    | `/products/:id`  | ProductsController.show        | jwtAuth, permission:products:read   |
| POST   | `/products`      | ProductsController.store       | jwtAuth, permission:products:create |
| POST   | `/products/bulk` | ProductsController.create_many | jwtAuth, permission:products:create |
| PUT    | `/products/:id`  | ProductsController.update      | jwtAuth, permission:products:update |
| DELETE | `/products/:id`  | ProductsController.delete_rec  | jwtAuth, permission:products:delete |

---

## Customer Routes

| Method | Endpoint         | Controller                  | Middleware                           |
| ------ | ---------------- | --------------------------- | ------------------------------------ |
| GET    | `/customers`     | CustomersController.index   | jwtAuth, permission:customers:read   |
| GET    | `/customers/:id` | CustomersController.show    | jwtAuth, permission:customers:read   |
| POST   | `/customers`     | CustomersController.store   | jwtAuth, permission:customers:create |
| PUT    | `/customers/:id` | CustomersController.update  | jwtAuth, permission:customers:update |
| DELETE | `/customers/:id` | CustomersController.destroy | jwtAuth, permission:customers:delete |

---

## Order Routes

| Method | Endpoint      | Controller               | Middleware                        |
| ------ | ------------- | ------------------------ | --------------------------------- |
| GET    | `/orders`     | OrdersController.index   | jwtAuth, permission:orders:read   |
| GET    | `/orders/:id` | OrdersController.show    | jwtAuth, permission:orders:read   |
| POST   | `/orders`     | OrdersController.store   | jwtAuth, permission:orders:create |
| PUT    | `/orders/:id` | OrdersController.update  | jwtAuth, permission:orders:update |
| DELETE | `/orders/:id` | OrdersController.destroy | jwtAuth, permission:orders:delete |

---

# 🛒 Order Creation Flow

## Request

```json
{
  "customer_id": 1,
  "items": [
    {
      "product_name": "Laptop",
      "quantity": 2
    },
    {
      "product_name": "Keyboard",
      "quantity": 1
    }
  ]
}
```

---

## Processing

```text
Validate Request
        ↓
Check Customer Exists
        ↓
Check Products Exist
        ↓
Create Order
        ↓
Create Order Items
        ↓
Calculate Total Amount
        ↓
Return Order Response
```

---

## Database Records Created

### orders

```json
{
  "id": 101,
  "customer_id": 1,
  "total_amount": 4500
}
```

### order_items

```json
[
  {
    "order_id": 101,
    "product_id": 1,
    "quantity": 2
  },
  {
    "order_id": 101,
    "product_id": 3,
    "quantity": 1
  }
]
```

---

# 🎯 Concepts Implemented 

* JWT Authentication
* Authorization Middleware
* Request Validation
* CRUD Operations
* Database Relationships
* One-to-Many Relationships
* Foreign Keys
* Lucid ORM
* TypeScript Development
* Order Processing Workflow
