# Todo API

A backend REST API for managing todos with authentication built with Node.js, Express, and TypeScript.

## Features

- User authentication (register, login, logout)
- JWT-based authorization
- Todo management (CRUD operations)
- API documentation with Swagger
- Database migrations with Knex
- Error handling and logging

## Prerequisites

- Node.js
- MySQL database

## Setup

1. Clone the repository

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example` and configure your environment variables:

```bash
cp .env.example .env
```

4. Run database migrations:

```bash
npm run migrate
```

5. Start the development server:

```bash
npm run dev
```

Or build and start for production:

```bash
npm run build
npm start
```

## Swagger API Documentation

Once the server is running, you can explore the Swagger API documentation at:

```
http://localhost:3000/docs
```

### Main Endpoints

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login and receive JWT token
- `POST /api/v1/auth/logout` - Logout user
- `GET /api/v1/todos` - Get all todos (requires authentication)
- `POST /api/v1/todos` - Create a new todo
- `GET /api/v1/todos/:id` - Get a specific todo
- `PATCH /api/v1/todos/:id` - Update a todo
- `DELETE /api/v1/todos/:id` - Delete a todo
- `PATCH /api/v1/todos/:id/toggle` - Toggle todo completion status

## Authentication

Protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

You'll receive the token upon successful login.
