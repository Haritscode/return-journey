# My Node.js Application

This is a Node.js application that has been Dockerized for easy deployment and development. It uses Docker Compose to manage container orchestration.

## Prerequisites

Before you begin, make sure you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

1. Clone the repository:

   ```shell
   git clone https://github.com/yourusername/your-node-app.git
   ```

cd your-node-app

create a .env file named .env.dev for development and .env.prod for production server

**Note:**  please refer to .env.sample file and copy the variable name and add your personal account value


## Run the application lacally

docker-compose -f docker-compose.development.yml up

## Stopping the Local Development Environment

docker-compose -f docker-compose.development.yml down







# API Route: `/api/users`

This route is responsible for creating a new user.

- **HTTP Method:** POST

## Request

### Request Body

The request body should be in JSON format and include the following parameters:

- `firstName` (string): The first name of the user (optional).
- `lastName` (string): The last name of the user (optional).
- `contact` (string): The contact number of the user (10 digits, required).
- `email` (string): The email address of the user (optional).
- `password` (string): The user's password (required).
- `countryCode` (string): The country code for the contact number (optional, default is "+91").

Example request body:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "contact": "1234567890",
  "email": "john@example.com",
  "password": "password123"
}
```

Response

Success Response (HTTP Status Code: 200 OK)

Error Responses

HTTP Status Code: 400 Bad Request

# API Route: `/api/users/verify/:contact`

This route is responsible for verifying a user's contact number and handling OTP (One-Time Password) requests.

- **HTTP Method:** GET


### Request Parameters

- `contact` (string): The user's contact number to verify.

### Success Response

- **HTTP Status Code:** 200 OK

  If the user's contact number is valid and exists in the system, this middleware sets the `req.userId` property with the user's ID and passes control to the next middleware.

### Error Responses

- **HTTP Status Code: 404 Not Found**

  If the provided contact number does not exist in the system, this middleware generates an error response.

  Example error response:

  ```json
  {
    "error": "User not registered"
  }
  ```

- **HTTP Status Code: 429 Too Many Requests**

  If the user has made too many OTP requests within a minute, this middleware generates an error response.

# API Route: `/api/users/verify/:contact`

    This route is responsible for verifying a user's contact number and handling OTP (One-Time Password) requests.

- **HTTP Method:** POST

## Middleware Function: `verifyOpt`

    This middleware function is responsible for verifying an OTP (One-Time Password) provided by the user and ensuring its validity.

### Request Body

    The request body should be in JSON format and include the following parameters:

- `otp` (string): The OTP entered by the user for verification.
- `contact` (string): The user's contact number for verification.

    Example request body:

```json
{
        "otp": "123456",
  "contact": "1234567890"
}
```

Success Response
HTTP Status Code: 200 OK

Error Responses
HTTP Status Code: 400 Bad Request

HTTP Status Code: 401 Unauthorized

HTTP Status Code: 404 Not Found

HTTP Status Code: 406 Not Acceptable
