# IT342_G3_Cosina

## Project Description
Altru is a purpose-driven donation platform built to make charitable giving more accessible and trustworthy. The application allows users to explore causes and support fundraising initiatives in a clear and organized way. The system features a ReactJS-based web application and a native Android mobile app built with Kotlin, both powered by a centralized backend service to ensure secure transactions and a consistent user experience across platforms.

## Technologies Used
- **Backend**: Java, Spring Boot, Spring Security (JWT), Spring Data JPA, Hibernate, MySQL.
- **Database**: MySQL.
- **Frontend**: ReactJS (Vite), Axios, CSS.
- **Mobile**: (Planned).

## Steps to Run Backend
1. Ensure you have Java 17+ and Maven installed.
2. Navigate to the `backend` directory.
3. Configure your database in `src/main/resources/application.properties` (Create a database named `it342_g3_cosina` in MySQL).
4. Run the application:
   ```bash
   mvn spring-boot:run
   ```
   *Note: If you have the Maven Wrapper (`mvnw`) generated, you can use `./mvnw spring-boot:run`, otherwise use your system `mvn`.*

## Steps to Run Web App
1. Ensure you have Node.js and npm installed.
2. Navigate to the `web` directory.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open your browser at `http://localhost:5173`.

## List of API Endpoints
- **POST** `/api/auth/register` - Register a new user.
   - Body: `{ "username": "user", "password": "password" }`
- **POST** `/api/auth/login` - Authenticate a user and receive a token.
   - Body: `{ "username": "user", "password": "password" }`
- **GET** `/api/user/me` - Retrieve current user details (Protected).
   - Headers: `Authorization: Bearer <token>`
