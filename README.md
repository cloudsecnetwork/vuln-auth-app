# Vulnerable Auth App

This is a vulnerable web application designed for testing and training purposes. It features authentication and authorization mechanisms with intentional flaws, allowing users to practice identifying and exploiting security vulnerabilities commonly found in web applications.

## Description
Key features of the project include:
-  **User Authentication:** Users can register, login, and manage their accounts.
-  **Dashboard Functionality:** Authenticated users can view their account details, recent transactions, and perform actions such as updating their password and logging out.
-  **Transaction Details:** Users can view detailed information about specific transactions, including transaction ID, amount, type, description, and more.

This project serves as a learning tool for developers, security professionals, and enthusiasts interested in understanding and mitigating common web application security risks. By exploring the application's vulnerabilities, users can enhance their skills in secure coding practices, penetration testing, and security auditing.

## Running App Locally
 
### Prerequisites
- Node.js (version 18)
- MongoDB
- Docker (optional for running MongoDB with Docker)

### Installation
Clone the repository:
```
git clone https://github.com/cloudsecnetwork/vuln-auth-app.git
```
Navigate to the client directory and install dependencies:
```
cd vuln-auth-app/client
npm install
npm run build
```

### Database Setup
Start a MongoDB database with Docker:
```
docker run -d -p 27017:27017 mongo
```
Move back to the root directory and install server dependencies:
```
cd ..
npm install
```
Seed the database with sample data:
```
node seed.js
```
### Start App
```
node app.js
```
Once the application is running, you can access it by navigating to http://localhost:8080 in your web browser. Use the provided authentication mechanisms to log in and explore the application's features. You can get the credentials directy from the database.

## Running App with Docker
The application also utilizes Docker to containerize both the frontend and backend components. Make sure you have Docker installed on your system before proceeding.
 
### Image Build
Ensure you are in the project root directory. Rename the `sample.env` file to `.env` and update the MongoDB connection string in the `.env` file with the appropriate values. 

You can create a free acount with MongoDB Atlas and setup a database easily. You will get a database connection string that you can use in your environment file.

Build the Docker image for the application using the following command:
```
docker build -t csn/vuln-auth-app .
```

### Seeding Initial Data
Run the Docker container with seeding to populate the database with initial data. This command executes the `seed.js` script to populate the database with initial data.
```
docker run -it --rm -p 8080:8080 --env-file .env csn/vuln-auth-app node seed.js
```

### Start Container
Start the Docker container for the application using the following command. This command starts the application with the provided MongoDB connection string.
```
docker run -it --rm -p 8080:8080 --env-file .env csn/vuln-auth-app
```
Once the application is up and running, you can access it in your web browser by navigating to http://localhost:8080

## Disclaimer
This application is intended for educational purposes only. Use it responsibly and avoid deploying it in production environments. The developers are not liable for any misuse or damage caused by the application.
