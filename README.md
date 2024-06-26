# Academic Portal

## Description

This is a basic academic portal that allows students and teachers to manage courses. It includes user authentication and a simple interface.

## Installation

1. Clone the repository:
   git clone https://github.com/reem-asaad/academic-portal.git

2. Install root dependencies:
   npm install

3. Navigate to the client folder and install dependencies:
   npm install

Navigate back to the root directory.

## Usage

1. Start both backend and frontend servers concurrently:
   npm run dev

2. Open your browser and navigate to `http://localhost:3000` to access the application.

- Teachers can create and update courses.
- Students can view a list of available courses.

## Technologies Used

- Frontend: React.js
- Backend: Node.js with Express
- Database: MongoDB
- Authentication: JWT

## Endpoints

- **POST /register**: Register a new user (teacher or student).
- Request body: `{ "name": "John Doe", "email": "john@example.com", "password": "password", "role": "teacher" }`
- **POST /login**: Login with existing user credentials.
- Request body: `{ "email": "john@example.com", "password": "password" }`
- Response: `{ "token": "<jwt_access_token>" }`
- **GET /users/:id**: Get user details by ID (requires authentication).
- Authorization header: `Bearer <jwt_access_token>`
- **POST /courses**: Create a new course (requires authentication).
- Request body: `{ "name": "Mathematics", "description": "Introduction to calculus", "startDate": "2024-06-01", "endDate": "2024-06-30", "teacher": "teacher_id" }`
- **PUT /courses/:id**: Update an existing course (requires authentication).
- Request parameters: `id` (course ID)
- Request body: `{ "name": "Mathematics", "description": "Advanced calculus", "startDate": "2024-07-01", "endDate": "2024-07-31" }`
- **GET /courses**: Retrieve a list of available courses (requires authentication).
- **GET /courses/:id**: Get course details by ID (requires authentication).
- Request parameters: `id` (course ID)
