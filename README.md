# Book World

A simple MERN (MongoDB, Express, React, Node.js) application for managing a collection of books. Admins can add, edit, and delete books, while users can browse books and add them to their collection by liking them.


## Features

- **Admin Capabilities:**

  - Add new books
  - Edit existing books
  - Delete books

- **User Capabilities:**
  - Browse books
  - Add books to their collection by liking them

## Technologies Used

- Node.js
- Express.js
- React.js
- MongoDB
- Tailwind

## Other Dependencies

- zod
- react-router-dom
- multer
- lucide-react
- mongoose
- cors
- jwt
- bycrypt
- shadcn

## Installation Guide

### Requirements

- Node.js
- MongoDB
  
You can use use Mongo Atlas URL instead of local MongoDB

### Installation

#### Clone the Repository

```shell
git clone https://github.com/NEET64/book-world.git
cd book-world
```

#### Install packages

```shell
cd backend
npm install
cd ..
cd frontend
npm install
```

Now rename env files from .env.sample to .env
and add your `MONGO_URL` and `JWT_SECRET`

now start the frontend and backend on different terminals

#### Start Frontend

Make sure you are in `frontend` directory

```shell
npm run dev -- --host
```

#### Start Backend

Make sure you are in `backend` directory

```shell
node index.js
```

Now open localhost:5173 on your browser
