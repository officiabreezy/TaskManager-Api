# TaskManager API

A simple and secure RESTful Task Management API built with **Node.js**, **Express**, **MongoDB**,**ES6+ syntax** and **JWT authentication**. This API allows users to register, log in, and manage their personal tasks (create, read, update, delete).

---

## 📦 Features

- ✅ User registration and login
- 🔐 JWT-based authentication middleware
- 📝 Create, fetch, update, and delete tasks
- 🧠 Task validation (title, description, status required)
- 👤 User-specific task access
- 🚫 Proper error handling
- 🧪 API testing with Jest + Supertest

---
## 📁 Folder Structure
```
.
├── controllers/
│ └── taskController.js
├── models/
│ ├── taskModel.js
│ └── userModel.js
├── middleware/
│ └── authMiddleware.js
├── routes/
│ ├── taskRoutes.js
│ └── userRoutes.js
├── tests/
│ ├── task.test.js
│ └── setup.js
├── .env
├── .gitignore
├── app.js
├── index.js
├── package.json
└── README.md
````

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/officiabreezy/TaskManager-Api.git
cd TaskManager-Api
```
## Install dependencies
````
# Development
npm install
# Production
npm run start:prod
````
## Run Tests
````
npm run test
````
## 🛠 API Endpoints
**🔐 Auth Routes**
| Method | Endpoint        | Description          |
| ------ | --------------- | -------------------- |
| POST   | `/api/v1/register` | Register a new user  |
| POST   | `/api/v1/login`    | Log in and get token |

**📋 Task Routes ( 3 Protected)**
| Method | Endpoint            | Description             |Protected routes
| ------ | --------------------| ----------------------- |-----------------
| GET    | `/api/v1/tasks`     | Get all tasks           |
| GET    | `/api/v1/tasks/:id` | Get a task by ID        |
| POST   | `/api/v1/tasks`     | Create a new task       |✅
| PATCH  | `/api/v1/tasks/:id` | Update an existing task |✅
| DELETE | `/api/v1/tasks/:id` | Delete a task           |✅

## 🧑‍💻 Author
# Idumwonyi Isaac 



