# 🧠 Quiz-Wizz – Online Quiz Management App

A full-stack quiz management system built using Node.js, Express, MongoDB, and EJS for seamless quiz creation, participation, and evaluation.

---

## 🚩 Problem Statement

Manual quiz systems lack flexibility, automation, and user engagement. Traditional methods often require physical presence, manual checking, and provide no analytics or user feedback.

This inspired the development of **Quiz-Wizz** – a web-based platform that allows admins to create quizzes and users to participate in them securely and efficiently.

---

## 💡 Our Solution

**Quiz-Wizz** is a robust and scalable platform that lets:

- 🧑‍🏫 Admins create and manage quizzes
- 🧑‍🎓 Users sign up, take quizzes, and view results
- 📊 Track performance and manage access via sessions and authentication

---

### 🌍 Live Site
```bash
Link: https://quiz-wizz.onrender.com
```

---

#### Demo Video
```bash
link: https://drive.google.com/file/d/1_FqbI6LnOTfLMIL7HIKhG-CME4vka3up/view
```

## ⚙️ Tech Stack

| Layer       | Technologies Used                         |
|-------------|--------------------------------------------|
| Frontend    | HTML, CSS, JavaScript, EJS                 |
| Backend     | Node.js, Express.js                        |
| Database    | MongoDB (Mongoose)                         |
| Auth        | Express-Session, JWT, Bcrypt               |
| Validation  | express-validator                          |
| Utilities   | dotenv, body-parser, connect-mongo         |

---

## 📁 Project Structure
```bash
quiz-wizz/
├── node_modules/
├── public/ # Static assets (CSS, JS, Images)
│ ├── css/
│ ├── js/
│ └── images/
├── src/
│ ├── config/ # MongoDB connection config
│ ├── controllers/ # Logic for routing and business logic
│ ├── middlewares/ # Auth & validation middleware
│ ├── models/ # Mongoose schemas
│ ├── routes/ # Express routes
│ └── index.js # App entry point
├── views/ # EJS templates
│ ├── dashboard.ejs
│ ├── home.ejs
│ ├── login.ejs
│ ├── signup.ejs
│ └── take_quiz.ejs
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```
---

## 🚀 Getting Started


### 1. Clone the Repository
```bash
git clone https://github.com/Rahulreddy4444/quiz-wizz.git
cd quiz-wizz
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory:
```bash
DB_URI=mongodb://localhost:27017/quiz_app
SECRET_KEY=your_secret_key
PORT=5000
```

### 4. Run the Server
```bash
npm start
```
App will run on: http://localhost:5000

---


### 🔐 Authentication Flow
```bash
- User signs up → password is hashed with bcrypt
- Session is stored using express-session and connect-mongo
- Protected routes are guarded using custom middleware

✨ Features
📝 User Registration & Login

🔐 Session-based Authentication

🧑‍🏫 Admin Quiz Creation

🧠 Quiz Participation for Users

📊 Score Evaluation

🖥️ Responsive UI with EJS templating

```

---

### 📦 Dependencies
```bash
{
  "bcrypt": "^5.1.1",
  "body-parser": "^1.20.2",
  "connect-mongo": "^5.1.0",
  "dotenv": "^16.4.5",
  "ejs": "^3.1.10",
  "express": "^4.19.2",
  "express-session": "^1.18.0",
  "express-validator": "^7.1.0",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.4.1",
  "node": "^20.14.0"
}

```
---
