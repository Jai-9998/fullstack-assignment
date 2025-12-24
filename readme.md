# Full Stack Authentication Assignment

## Project Overview

This project implements a full stack authentication system with secure user registration, login, and profile management. The backend uses JWT-based authentication and encrypts sensitive user data (Aadhaar/ID number) using AES encryption before storing it in the database. The frontend provides a simple user interface with three pages: Register, Login, and Profile Dashboard, integrating securely with the backend APIs.

---

## Setup / Run Instructions

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
 - PORT=3000
 - MONGO_URI
 - JWT_SECRET
 - AES_SECRET_KEY

4. Start the backend server:
   ```bash
   node server.js
   ```

The backend will run on `http://localhost:3000`.

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React application:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000` (or another available port).

---

## API Documentation

### Authentication APIs

#### Register User

**POST** `/api/auth/register`

**Body:**
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password",
  "aadhaar": "123456789012"
}
```

#### Login User

**POST** `/api/auth/login`

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password"
}
```

#### Get User Profile

**GET** `/api/auth/profile`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

---

## Database Schema

### User Model

- **name**: `String` (required)
- **email**: `String` (required, unique)
- **password**: `String` (hashed using bcrypt)
- **aadhaar**: `String` (AES encrypted)
- **createdAt**: `Date` (auto-generated)

---

## AI Flavor Token Validation & Encryption Tests

An AI tool was used to assist in generating:
* A backend utility function for validating JWT tokens.
* Comprehensive unit test cases to verify the correctness of AES encryption and decryption logic.

These tests ensure:
* Tokens are validated correctly before accessing protected routes.
* Aadhaar encryption is reversible only with the correct secret key.
* Decryption fails safely for invalid or tampered data.

---

## Effectiveness Score (AI Tool Usage)

**Score: 4 / 5**

**Justification:** AI tools significantly improved development efficiency by quickly generating secure JWT authentication logic, AES-based encryption/decryption utilities, and corresponding unit test structures. They also helped in resolving integration issues between frontend and backend faster than manual debugging.
