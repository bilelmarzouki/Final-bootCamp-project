# Wearly

## See the App!
https://wearly-rust.vercel.app/

![App Logo](your-image-logo-path-or-name)

## Description

Wearly is a fashion marketplace backend API that manages users, products, carts, and payments. It provides authentication, product management for creators, and shopping cart functionality for customers.

#### Client Repo here
https://github.com/elahe/final-project-client

#### Server Repo here
https://github.com/bilelmarzouki/Final-bootCamp-project


## Backlog Functionalities

- Order history for users
- Product reviews and ratings
- Wishlist functionality
- Admin dashboard
- Email notifications after purchase


## Technologies used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Stripe API
- dotenv


# Server Structure

## Models

### User model

```javascript
{
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["stylist", "customer"],
    default: "customer"
  },
  wallet: Number
}
```

### Product model

```javascript
{
  imageUrl: String,
  name: String,
  description: String,
  price: Number,
  stockQuantity: Number,
  category: {
    type: String,
    enum: ["formal", "Bohemian", "casual", "sport"]
  },
  gender: {
    type: String,
    enum: ["women", "men", "kids", "unisex"]
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
}
```

### Cart model

```javascript
{
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: Number
    }
  ]
}
```

### Comment model

```javascript
{
  description: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product"
  }
}
```

### Payment model

```javascript
{
  price: Number,
  paymentIntentId: String,
  clientSecret: String,
  status: {
    type: String,
    enum: ["incomplete", "succeeded"]
  },
  cart: {
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product"
        },
        quantity: Number
      }
    ]
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
}
```

---

# API Endpoints (backend routes)

| HTTP Method | URL | Request Body | Success Status | Description |
|--------------|-----|--------------|---------------|-------------|
| POST | `/api/auth/signup` | {name, email, password, role} | 201 | Register a new user |
| POST | `/api/auth/login` | {email, password} | 200 | Login user and return JWT |
| GET | `/api/auth/verify` | — | 200 | Verify user token |

### Products

| HTTP Method | URL | Description |
|--------------|-----|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:productId` | Get product by ID |
| GET | `/api/products/creators/:creatorId` | Get products by creator |
| POST | `/api/products` | Create product (creator only) |
| PATCH | `/api/products/:productId` | Update product |
| DELETE | `/api/products/:productId` | Delete product |

### Cart

| HTTP Method | URL | Request Body | Description |
|--------------|-----|--------------|-------------|
| GET | `/api/cart` | — | Get user's cart |
| PATCH | `/api/cart/update` | {productId, quantity} | Add/update product in cart |
| DELETE | `/api/cart/remove/:productId` | — | Remove product from cart |

### Users

| HTTP Method | URL | Description |
|--------------|-----|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:userId` | Get user by ID |

---

# Links

### Collaborators

Elahe  
https://github.com/elahe

Bilel Marzouki  
https://github.com/bilelmarzouki

### Project

Client Repository  
https://github.com/elahe/final-project-client

Server Repository  
https://github.com/bilelmarzouki/Final-bootCamp-project

Deploy Link  
https://wearly-rust.vercel.app/