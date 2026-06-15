# Full-Stack Todo App

A full-stack Todo application that allows users to securely create accounts, manage personal task lists, and persist data in a PostgreSQL database. The application features JWT authentication, password hashing with bcrypt, protected API routes, and complete CRUD functionality.

## Live Demo

### Frontend
https://fullstack-todo-app-rouge-delta.vercel.app

### Backend
https://fullstack-todo-app-production-4f02.up.railway.app

---

## Features

- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Create todos
- View todos
- Update todos
- Mark todos as completed
- Delete todos
- Persistent data storage with PostgreSQL
- User-specific task management
- Responsive interface
- Cloud deployment using Vercel and Railway

---

## Screenshots

### Home Page

![Home](docs/screenshots/home.png)

### Login Page

![Login](docs/screenshots/login.png)

### Signup Page

![Signup](docs/screenshots/signup.png)

### Todo Dashboard

![Todo Dashboard](docs/screenshots/todos.png)

---

## How It Works

1. Users create an account or log in.
2. Passwords are securely hashed using bcrypt before being stored.
3. JWT tokens are generated upon successful login.
4. Protected routes verify user authentication.
5. Users can create, update, complete, and delete todos.
6. Todos are stored in PostgreSQL and associated with the authenticated user.
7. Data persists across sessions and page refreshes.

---

## Architecture

```text
User
  |
  v
React Frontend
  |
  v
Express REST API
  |
  v
JWT Authentication
  |
  v
PostgreSQL Database
```

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite

### Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt

### Database

- PostgreSQL
- pg

### Deployment

- Vercel
- Railway

---

## Database Design

### Users

| Column | Type |
|----------|----------|
| id | SERIAL |
| username | VARCHAR |
| password | VARCHAR |

### Todos

| Column | Type |
|----------|----------|
| id | SERIAL |
| text | VARCHAR |
| completed | BOOLEAN |
| user_id | INTEGER |

Relationship:

```text
User (1)
   |
   └───< Todo (Many)
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|----------|----------|----------|
| POST | /signup | Register a new user |
| POST | /login | Authenticate user and return JWT |
| GET | /me | Get authenticated user information |

### Todos

| Method | Endpoint | Description |
|----------|----------|----------|
| GET | /todos | Retrieve all user todos |
| POST | /todos | Create a new todo |
| PUT | /todos/:id | Update a todo |
| DELETE | /todos/:id | Delete a todo |

---

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes
- User-specific data access
- Environment variables for secrets
- PostgreSQL parameterized queries to prevent SQL injection

---

## Project Structure

```text
todo_app/
│
├── src/
│   ├── pages/
│   ├── components/
│   └── ...
│
├── server/
│   ├── db.js
│   ├── index.js
│   └── ...
│
└── README.md
```

---

## Challenges Solved

During development, several technical challenges were addressed:

- Implementing JWT authentication
- Securing user passwords with bcrypt
- Managing protected routes
- Designing a PostgreSQL database schema
- Connecting React to a REST API
- Handling asynchronous data fetching
- Deploying a full-stack application to cloud platforms
- Configuring environment variables for production
- Connecting Railway PostgreSQL to a deployed Express backend

---

## What I Learned

This project helped me gain practical experience with:

- Full-stack application development
- React and TypeScript
- Express.js backend development
- PostgreSQL database design
- Authentication and authorization
- Password security using bcrypt
- REST API development
- CRUD operations
- Cloud deployment
- Environment variable management
- Client-server architecture

---

## Future Improvements

- Password reset functionality
- Email verification
- Due dates and reminders
- Task categories and tags
- Search and filtering
- Drag-and-drop task organization
- Mobile-first responsive design
- User profile management

---

## Local Setup

### Clone Repository

```bash
git clone https://github.com/emmanuelboop/fullstack-todo-app.git
cd fullstack-todo-app
```

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm start
```

---

## Why I Built This Project

I built this project to strengthen my understanding of full-stack web development by implementing authentication, database persistence, secure password handling, and CRUD operations. The goal was to create a production-style application that demonstrates both frontend and backend development skills while following common industry practices.

---

## Author

**Emmanuel Olabisi**

GitHub: https://github.com/emmanuelboop
LinkedIn: Add your LinkedIn profile here