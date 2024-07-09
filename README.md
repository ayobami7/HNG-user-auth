# User Authentication & Organisation Backend

This project is a backend implementation for user authentication and organisation management using Node.js, Express, Sequelize, and PostgreSQL.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)

## Introduction

This project implements a user authentication system and organisation management with the following features:
- User registration and login
- Password hashing
- JWT token generation for authentication
- Organisation creation upon user registration
- Protected endpoints for accessing user and organisation data
- Validation for user input

## Features

- **User Registration**: Users can register with a unique email and a password. Upon registration, a default organisation is created.
- **User Login**: Users can log in with their email and password to receive a JWT token.
- **Protected Endpoints**: Users can access and manage their organisations and user data with authentication.
- **Organisation Management**: Users can create new organisations and add users to organisations.

## Technologies

- **Node.js**: JavaScript runtime
- **Express**: Web framework for Node.js
- **Sequelize**: Promise-based ORM for Node.js and PostgreSQL
- **PostgreSQL**: SQL database
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT token generation
- **express-validator**: Request validation

## Setup

### Prerequisites

- Node.js installed
- PostgreSQL installed

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ayobami7/HNG-user-auth.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up PostgreSQL:
   - Ensure PostgreSQL is running.
   - Create a new database for the project.

4. Configure Sequelize:
   - Update `config/database.js` with your PostgreSQL database credentials.

5. Run the application:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication

- **POST /auth/register**
  - Registers a new user and creates a default organisation.
  - Request body:
    ```json
    {
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "password": "string",
      "phone": "string"
    }
    ```
  - Successful response:
    ```json
    {
      "status": "success",
      "message": "Registration successful",
      "data": {
        "accessToken": "eyJh...",
        "user": {
          "userId": "string",
          "firstName": "string",
          "lastName": "string",
          "email": "string",
          "phone": "string"
        }
      }
    }
    ```

- **POST /auth/login**
  - Logs in a user.
  - Request body:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - Successful response:
    ```json
    {
      "status": "success",
      "message": "Login successful",
      "data": {
        "accessToken": "eyJh...",
        "user": {
          "userId": "string",
          "firstName": "string",
          "lastName": "string",
          "email": "string",
          "phone": "string"
        }
      }
    }
    ```

### Organisations

- **GET /api/organisations**
  - Gets all organisations the user belongs to.
  - Successful response:
    ```json
    {
      "status": "success",
      "message": "Organisations fetched successfully",
      "data": {
        "organisations": [
          {
            "orgId": "string",
            "name": "string",
            "description": "string"
          }
        ]
      }
    }
    ```

- **POST /api/organisations**
  - Creates a new organisation.
  - Request body:
    ```json
    {
      "name": "string",
      "description": "string"
    }
    ```
  - Successful response:
    ```json
    {
      "status": "success",
      "message": "Organisation created successfully",
      "data": {
        "orgId": "string",
        "name": "string",
        "description": "string"
      }
    }
    ```

- **POST /api/organisations/:orgId/users**
  - Adds a user to a particular organisation.
  - Request body:
    ```json
    {
      "userId": "string"
    }
    ```
  - Successful response:
    ```json
    {
      "status": "success",
      "message": "User added to organisation successfully"
    }
    ```

## Testing

Unit and end-to-end tests are written using Jest and Supertest. To run the tests, use the following command:

```bash
npm test
```

