# E-Commerce Platform API

## Table of Contents
1. [Introduction](#introduction)
2. [Setup Instructions](#development-environment-setup-instructions)
3. [Running the Application](#running-the-application)
4. [API Documentation](#api-documentation)
5. [Additional Notes](#additional-notes)

---

## Introduction
This is a RESTful API for an e-commerce platform, supporting user authentication, order processing and product management. The API allows role-based access control for different user roles such as customers, staff, and administrators.

Frontend:

- Framework: React.js
- UI Library: Use React Hooks and MUI for UI components.
- Real-Time Updates: Implement real-time UI updates (e.g. via WebSockets) to reflect CRUD operations instantly.

Backend:

- Language/Framework: Node.js with Express

- API: Develop RESTful APIs for all database tables.

Security:

- Implement OAuth 2.0 to **secure all API endpoints**.
- Integrate TOTP-based login for multi-factor authentication.
- Role-Based Access Control (RBAC) implementation.

Database:

- MySQL
---

## Development Environment Setup Instructions 
(if running locally)

### Prerequisites
Ensure you have the following installed:
- Node.js (v16+)
- MySQL Database
- Git

### Clone the Repository
```bash
https://github.com/XiangyuSha/ecommerce-platform.git
```

### Install Dependencies
```bash
npm install
```
### Configure Environment Variables

Create a .env file in the Server directory with the following values:
```bash
PORT=your-prefer-port
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASS=your-database-password
DB_NAME=your-database-name
JWT_SECRET=your-secret-key
```
### Database Migration (Optional)

If using a fresh database, run:
```bash
npm run migrate
```

---

## Running the Application

### Start the Backend Server
```bash
cd Server
```

```bash
node server.js
```

If using `nodemon` for development:
```bash
npm run devStart
```

### Start the Frontend (if applicable)
```bash
cd Client/views
npm start
```

---

## API Documentation

The API is available at  `https://ecommerce-platform-cyif.onrender.com`

### List of Products ###

GET `/products`

Returns a list of products.


### Add a New Product ###

POST `/products`

Allows staff or admin to add a new product. Requires authentication.

The request body needs to be in JSON format.

Example
```
POST /products
Authorization: Bearer <YOUR TOKEN>

{
  "name": "New Product",
  "description": "New Description",
  "price": 50.00,
  "stock_quantity": 20
}
```


### Update an product (change inventory) ###

PUT `/products/{id}`

Update an existing stock quantity. Requires authentication.

The request body needs to be in JSON format.

Example
```
PUT /products/3
Authorization: Bearer <YOUR TOKEN>

{
  "stock_quantity": 25
}
```


### Delete an product ###

PUT `/products/{id}`

Update an existing product. Requires authentication (only admin).

The request body needs to be in JSON format.

Example
```
Delete /products/3
Authorization: Bearer <YOUR TOKEN>
```


### Authentication
#### Register
POST `/auth/register`

Example
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "role_id": 4
}
```

#### Login
POST `/auth/login`

Example
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```
---

## Additional Notes
Render's free tier can cause slow initial loading due to the cold start effect. If the backend service hasn't been accessed for a while, it may take 30-60 seconds to wake up.

- Ensure the database is running before starting the backend.
- The API uses JWT authentication; include the token in the `Authorization` header for protected routes.
- User roles:
  - `1` = Super Admin
  - `2` = Admin
  - `3` = Staff
  - `4` = Customer
