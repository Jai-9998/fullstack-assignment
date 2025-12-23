# Full Stack Authentication Assignment

## Project Overview

This project implements a full stack authentication system with secure user registration, login, and profile management. The backend uses JWT-based authentication and encrypts sensitive user data (Aadhaar/ID number) using AES encryption before storing it in the database. The frontend provides a simple user interface with three pages: Register, Login, and Profile Dashboard, integrating securely with the backend APIs.

---

## Setup / Run Instructions

### Backend Setup

1. Navigate to the backend folder:
   
   cd backend
   

2. Install dependencies:
   
   npm install
  

3. Create a `.env` file with the following variables
 - PORT=3000
 - MONGO_URI
 - JWT_SECRET
 - AES_SECRET_KEY

4. Start the backend server:

   node server.js


The backend will run on `http://localhost:3000`.

### Frontend Setup

1. Navigate to the frontend folder:
   
   cd frontend


2. Install dependencies:
   
   npm install


3. Start the React application:
   
   npm start


The frontend will run on `http://localhost:3000` (or another available port).


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