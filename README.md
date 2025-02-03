# 🚀 Chat App

A real-time chat application built with:

- **🛠 Backend**: Express, TypeScript, Prisma with PostgreSQL
- **🎨 Frontend**: Next.js, TypeScript, Zustand

## ✨ Features

- ⚡ Real-time messaging
- 🔐 User authentication
- 🗄 PostgreSQL database with Prisma ORM
- 🏗 State management with Zustand
- 🌐 Modern UI with Next.js

---

## 🚀 Quick Start Guide

This repository contains two apps:

1. **📦 Backend** (`/backend`)
2. **🎨 Frontend** (`/frontend`)

### 📂 Project Structure

```
└── 📁chat-app
    └── 📁backend
        └── .env
        └── .env.example
        └── .gitignore
        └── package.json
        └── pnpm-lock.yaml
        └── 📁prisma
            └── 📁migrations
            └── schema.prisma
        └── 📁src
            └── config.ts
            └── 📁controller
                └── authController.ts
                └── messageController.ts
            └── index.ts
            └── 📁lib
                └── cloudinary.ts
                └── db.ts
                └── socket.ts
            └── 📁middleware
                └── middleware.ts
            └── 📁routes
                └── authRouter.ts
                └── index.ts
                └── messageRouter.ts
            └── 📁seeds
                └── userSeeds.ts
            └── 📁types
                └── express.d.ts
                └── index.ts
            └── 📁zod
                └── userSchema.ts
        └── tsconfig.json
    └── 📁frontend
        └── .env
        └── .gitignore
        └── next-env.d.ts
        └── next.config.ts
        └── package.json
        └── pnpm-lock.yaml
        └── postcss.config.mjs
        └── 📁public
            └── avatar.png
        └── 📁src
            └── 📁app
                └── favicon.ico
                └── layout.tsx
                └── loading.tsx
                └── 📁login
                    └── page.tsx
                └── page.tsx
                └── 📁profile
                    └── page.tsx
                └── 📁register
                    └── page.tsx
                └── 📁settings
                    └── page.tsx
            └── 📁components
                └── AuthImagePattern.tsx
                └── ChatContainer.tsx
                └── ChatHeader.tsx
                └── MessageInput.tsx
                └── Navbar.tsx
                └── NoSelectedChat.tsx
                └── Sidebar.tsx
                └── 📁skeletons
                    └── MessageSkeleton.tsx
                    └── SideBarSkeleton.tsx
            └── 📁constants
                └── index.ts
            └── 📁lib
                └── axios.ts
                └── util.ts
            └── middleware.ts
            └── Provider.tsx
            └── 📁store
                └── useAuthStore.ts
                └── useChatStore.ts
                └── useThemeStore.ts
            └── 📁styles
                └── main.css
            └── 📁types
                └── index.ts
        └── tailwind.config.ts
        └── tsconfig.json
    └── .gitignore
    └── LICENSE
    └── README.md
```

---

### 🛠 Backend Setup

#### ✅ Prerequisites

- 📌 Node.js (>=18)
- 🗄 PostgreSQL database
- 📦 pnpm package manager

#### 📥 Installation

```sh
cd backend
pnpm install
```

#### 📝 Environment Variables

Create a `.env` file in the `backend` folder with the following content:

```
# Port number on which the backend server will run
PORT=8000

# Environment (development, production, etc.)
NODE_ENV=development

# Production URL of your application
PROD_URL=https://your-production-url.com

# Secret key for JWT authentication
JWT_SECRET=your_jwt_secret

# Domain for setting cookies (useful for authentication)
COOKIE_DOMAIN=yourdomain.com

# Database connection string
DATABASE_URL=postgresql://user:password@localhost:5432/chatapp

# Cloudinary configuration for file uploads
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Replace the values with your actual configurations.

#### 🗄 Database Setup

```sh
pnpm prisma migrate dev --name init
```

#### ▶ Run the Server

```sh
pnpm dev
```

🚀 The backend will start on `http://localhost:8000`

---

### 🎨 Frontend Setup

#### ✅ Prerequisites

- 📌 Node.js (>=18)
- 📦 pnpm package manager

#### 📥 Installation

```sh
cd frontend
pnpm install
```

#### 📝 Environment Variables

Create a `.env.local` file in the `frontend` folder with the following content:

```
NODE_ENV=
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_WS_URL=
```

#### ▶ Run the Frontend

```sh
pnpm dev
```

🌍 The frontend will start on `http://localhost:3000`

---

## 🤝 Contributing

Feel free to open issues and pull requests for improvements!

## 📜 License

This project is licensed under the MIT License.
