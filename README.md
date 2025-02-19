# Node.js + GraphQL API Project

This project is a Node.js application that uses GraphQL for data querying and MongoDB for storage. It provides API endpoints for user authentication (sign up and login), employee management (add, retrieve, update, and list employees).

## 1. Set Up Environment Variables and MongoDB Connection

### 1.1. Create `.env` File

To set up the environment variables, create a `.env` file in the root of your project with the following variables:


- **PORT**: Port your server will run on (e.g., `5000`).
- **MONGO_URL**: MongoDB connection string (e.g., `mongodb://localhost:27017/mydb`).
- **JWT_SECRET**: Secret key used to sign JSON Web Tokens (JWT) for authentication.

Make sure to replace the placeholders with your actual values.

### 1.2. Install Dependencies

Run the following command to install all necessary dependencies:

```bash

npm install
