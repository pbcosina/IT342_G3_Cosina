# IT342_G3_Cosina

## Project Description
This project is a web application featuring a secure backend with user authentication and a responsive frontend dashboard. It includes a Spring Boot backend and a ReactJS frontend.

## Technologies Used
- **Backend**: Java, Spring Boot, Spring Security (Basic Auth/JWT), Spring Data JPA, Hibernate.
- **Database**: MySQL.
- **Frontend**: ReactJS (Vite), Axios, CSS.
- **Mobile**: (Planned).
- **Other**: BCrypt for password encryption.

## Steps to Run Backend
1. Ensure you have Java 17+ and Maven installed.
2. Navigate to the `backend` directory.
3. Configure your database in `src/main/resources/application.properties` (Create a database named `it342_g3_cosina` in MySQL).
4. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```
   Or on Windows:
   ```powershell
   .\mvnw.cmd spring-boot:run
   ```

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

## Steps to Run Mobile App
(Ideally, this section will be populated once mobile development starts. Currently, the folder is empty.)

## List of API Endpoints
- **POST** `/api/auth/register` - Register a new user.
- **POST** `/api/auth/login` - Authenticate a user and receive a token/session.
- **GET** `/api/user/me` - Retrieve current user details (Protected).
