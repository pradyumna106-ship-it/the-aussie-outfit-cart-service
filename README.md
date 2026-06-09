# The Aussie Outfit Cart Service

A lightweight cart service for The Aussie Outfit e-commerce platform. This repository contains the backend service responsible for managing shopping carts, cart items, and checkout preparation.

## Features

- Create and manage user carts
- Add, update, and remove cart items
- Retrieve cart summaries and totals
- Support for cart persistence with MongoDB
- CORS-enabled for cross-origin requests
- Session handling with environment-based configuration

## Technology Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Package Manager**: npm

## Project Structure

```
src/
├── config/
│   ├── database.js      # MongoDB connection and management
│   └── constant.js      # Configuration constants
├── controller/
│   └── cart.js          # Cart business logic handlers
├── models/
│   ├── cart.js          # Cart schema definition
│   └── cartItem.js      # Cart item schema definition
├── route/
│   └── cart.js          # API route definitions
├── app.js               # Express app configuration
└── index.js             # Server entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ or compatible runtime
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/pradyumna106-ship-it/the-aussie-outfit-cart-service.git
   cd the-aussie-outfit-cart-service
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure environment variables
   Create a `.env` file in the root directory:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/aussie_cart_db
   ```

### Running the Service

**Development mode** (with hot reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

**Testing**:
```bash
npm test
npm run test:watch
```

The server will start on the configured PORT (default: 3000).

## API Endpoints

### Cart Operations

#### Get User Cart
- **Endpoint**: `GET /user/:userId`
- **Description**: Retrieve the active cart and all items for a user
- **Response**:
  ```json
  {
    "success": true,
    "cart": { /* cart object */ },
    "cartItems": [ /* array of items */ ]
  }
  ```

#### Add Item to Cart
- **Endpoint**: `POST /`
- **Description**: Add a product to the user's cart or update quantity if product already exists
- **Request Body**:
  ```json
  {
    "userId": "string",
    "productId": "string",
    "productName": "string",
    "productImage": "string (optional)",
    "price": "number",
    "quantity": "number"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Item added to cart successfully",
    "cart": { /* updated cart */ },
    "cartItem": { /* created/updated item */ }
  }
  ```

#### Update Cart Item
- **Endpoint**: `PUT /item/:itemId`
- **Description**: Update the quantity of an item in the cart
- **Request Body**:
  ```json
  {
    "quantity": "number"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Cart updated successfully",
    "cartItem": { /* updated item */ }
  }
  ```

#### Remove Item from Cart
- **Endpoint**: `DELETE /item/:itemId`
- **Description**: Remove an item from the cart
- **Response**:
  ```json
  {
    "success": true,
    "message": "Cart item removed successfully"
  }
  ```

#### Clear User Cart
- **Endpoint**: `DELETE /user/:userId`
- **Description**: Remove all items from a user's cart
- **Response**:
  ```json
  {
    "success": true,
    "message": "Cart cleared successfully"
  }
  ```

## Data Models

### Cart Schema
```javascript
{
  userId: ObjectId (required, indexed),
  totalItems: Number (default: 0),
  totalPrice: Number (default: 0),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### CartItem Schema
```javascript
{
  cartId: ObjectId (required, indexed),
  productId: ObjectId (required),
  productName: String (required),
  productImage: String,
  price: Number (required, min: 0),
  quantity: Number (required, min: 1, default: 1),
  subtotal: Number (required, min: 0),
  isSelected: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

## Development

- Use `npm run dev` for local development with automatic reload
- Run tests with `npm test` to validate functionality
- Environment variables can be configured in `.env` file
- CORS is enabled for all origins by default (update origin setting in `src/app.js` for production)

## Deployment

The service includes configuration for:
- **Vercel** (`vercel.json`)
- **Docker** (`Dockerfile`)
- **GitLab CI/CD** (`.gitlab-ci.yml`)

## License

ISC

## Support

For issues or questions, please open an issue in the repository.
