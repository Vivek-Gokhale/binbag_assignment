Prerequisites
Ensure you have the following installed on your system:

Node.js: Download and install Node.js
MongoDB: Download and install MongoDB

Installation Steps
Clone the Repository:
git clone https://github.com/Vivek-Gokhale/binbag_assignment.git


Navigate to the Project Directory:
cd binbag_assignment/backend

Install Dependencies:
npm install

Set Up Environment Variables:
Create a .env file in the backend directory with the following content:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Replace your_mongodb_connection_string with your MongoDB connection string and your_jwt_secret with a secret key for JWT authentication.

Start the Server:
node server.js

The server should now be running on http://localhost:3000.

API Endpoints
User Registration: POST /user/create
Get User Profile: GET /user/:email
Edit User Profile: PUT /user/edit

