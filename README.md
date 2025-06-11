# AgriLinked
AgriLinked is a MERN-based platform connecting farmers, brokers, traders, and agri-entrepreneurs with real-time chat, land listings, and crop updates — built for the Indian agriculture ecosystem. Users can post agricultural land for sale with full details like location, area, price, and connect directly with interested buyers through in-app chat.
It brings together farmers, brokers, traders, mandi agents, land dealers, wholesalers, and agri-retailers on a single platform. The goal is to enable seamless communication, trade, land sales, and knowledge-sharing across every level of the farming value chain.

---

## 🌟 Key Highlights

- Real-time chat between farmers, brokers, and buyers
- Post and discover agriculture land for sale
- Crop-related updates, community posts, and photos/videos
- Designed for Indian agriculture — regional and scalable

---

## 🧱 Tech Stack

| Layer        | Technologies                   |
|--------------|--------------------------------|
| Frontend     | React.js, Tailwind CSS         |
| Backend      | Node.js, Express.js            |
| Database     | MongoDB + MySQL (Hybrid)       |
| Real-time    | Socket.io                      |
| Auth         | JWT, bcrypt                    |
| Deployment   | AWS EC2, Vercel, Render        |
| Storage      | AWS S3 (for images/videos)     |

---

## 📲 Features Overview

### 👨‍🌾 Roles Supported
- Farmers
- Brokers / Middlemen
- Crop Buyers / Wholesalers
- Land Dealers & Agents
- Agri Retailers (seeds, fertilizers, tools)
- Mandi Traders
- Agri Enthusiasts / Startups

### 💬 Communication
- Real-time chat between users
- Socket.io based scalable chat system
- Send messages instantly without refresh

### 🧾 Land Posting Module
- Post agricultural land for sale
- Include location, area, price per bigha/acre, description
- Contact via direct chat button
- Filter/search land listings

### 🌱 Crop & Market Feed
- Post crop images, pricing, tips, or problems
- Like, comment, and discuss on posts
- Use tags like `#onion`, `#drought`, `#mandiprice`

### 📦 Media Uploads
- Upload multiple images and videos (e.g., of land, crops, tools)
- AWS S3 integration for secure storage

### 👁️‍🗨️ User Access
- Role-based login: separate flows for farmer, broker, buyer, etc.
- JWT-based auth, bcrypt-hashed passwords
- Secure APIs and protected frontend routes

---

## 🖼️ Screenshots

Here’s a quick look at AgriLinked in action 👇

### 🔐 Login Page
Simple and clean login for all user roles — Farmers, Brokers, Traders, etc.

![Login](./client/public/screenshots/login.png)

---

### 🆕 Signup Page
Role-based signup with dropdown selection and secure auth.

![Signup](./client/public/screenshots/signup.png)

---

### 🏠 Home Feed
Live updates from users — crop posts, mandi prices, community discussions.

![Home Feed](./client/public/screenshots/home.png)

---

### 🧾 Land Listings
Post and explore agricultural land deals with filters for location, area, price, etc.

![Land Listings](./client/public/screenshots/land.png)

---

### 💬 Real-time Chat
Chat instantly with brokers, buyers, or land agents using Socket.io-backed messaging.

![Chat](./client/public/screenshots/chat.png)

---

### 📱 Mobile Responsive View
Looks great on mobile for easy use by farmers and field agents.

![Mobile View](./client/public/screenshots/mobile.png)

---


## 📁 Project Structure
<details>
  <summary>📦 Full Folder Layout (click to expand)</summary>

  
```bash
AgriLinked/
│
├── client/                     # Frontend (React + Tailwind)
│   ├── public/                 # Static files (index.html, favicon, etc.)
│   ├── src/
│   │   ├── assets/             # Images, logos, icons
│   │   ├── components/         # Reusable UI components (Buttons, Cards, etc.)
│   │   ├── pages/              # Route-based pages (Home, Login, Profile)
│   │   ├── context/            # AuthContext, ThemeContext, etc.
│   │   ├── services/           # API calls (Axios configs)
│   │   ├── utils/              # Helper functions (validators, formatters)
│   │   └── App.jsx             # App entry point
│   └── tailwind.config.js      # Tailwind config
│
├── server/                     # Backend (Node + Express)
│   ├── config/                 # DB connection, cloud configs
│   ├── controllers/            # All business logic
│   ├── models/                 # MongoDB + MySQL Models
│   ├── routes/                 # API route handlers
│   ├── middleware/             # Auth, error handlers
│   ├── utils/                  # Helpers, constants
│   └── index.js                # Main Express server entry
│
├── socket/                     # Real-time chat server logic (Socket.io)
│   └── socketHandler.js
│
├── uploads/                    # Local media upload fallback (if any)
│
├── .env.example                # Sample environment variables
├── README.md                   # This file
├── package.json                # Root config (optional monorepo)
└── LICENSE                     # Optional licensing info
