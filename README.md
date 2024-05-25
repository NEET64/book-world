![/favourites](https://github.com/NEET64/book-world/assets/67575976/8f3fc809-86d2-4212-87f4-6481b8626d09)
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

## Screenshots
![/favourites](https://github.com/NEET64/book-world/assets/67575976/8f3fc809-86d2-4212-87f4-6481b8626d09)
![/books](https://github.com/NEET64/book-world/assets/67575976/64fbd12a-fd5a-407f-92ad-45903a69dd5a)
![/books/:bookId](https://github.com/NEET64/book-world/assets/67575976/a3bf2908-55ca-4f1f-964e-6beaad9fd51b)
![/users](https://github.com/NEET64/book-world/assets/67575976/cefde2a6-8f2b-48ec-8765-02b1e87d6806)
![/books/add](https://github.com/NEET64/book-world/assets/67575976/122cfb57-8f6f-4a8d-8d90-cf27d19d1535)
![/login](https://github.com/NEET64/book-world/assets/67575976/adebcb9e-c427-41c4-95a7-9ec1fe46b996)
![/signup](https://github.com/NEET64/book-world/assets/67575976/c8a625bd-e941-4a4b-a8d4-8f5ecd04c70c)
![smaller screens](https://github.com/NEET64/book-world/assets/67575976/f7b62436-0a41-4878-87fd-900c4537be32)


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
