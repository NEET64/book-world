![Homepage](https://github.com/NEET64/book-world/assets/67575976/f1c41565-9ad9-47d5-86b3-60e95f4f9215)

# Book World

A full-featured book review and management application built with the MERN stack (`MongoDB`, `Express`, `React`, `Node.js`). Users can browse books, leave reviews with star ratings, and manage their favorites. Admins have extended capabilities for adding, editing, and deleting books, as well as managing user data and access.

Live Link: https://book-world-beta.vercel.app/

## Features

- **User Authentication:**

  - Secure user registration and login system.
  - JWT for authorization.
  - Bcrypt for password hashing.

- **Book Listing with Reviews & Ratings:**

  - Browse and search for books.
  - Leave comprehensive reviews with star ratings.
  - Read and gain insights from community reviews.

- **User Profile Pages:**

  - Personalized profiles to track activity.
  - Manage and curate a list of favorite books.

- **Advanced Feature:**

  - Unique nested commenting system using Depth-First Search (DFS) for efficient comment deletion within the review tree structure.

- **User Roles & Permissions:**
  - Differentiation between user and admin roles.
  - Admin capabilities to add, update, and delete book listings.
  - Manage user data and user roles (excluding a master admin).

## Technologies Used

- **Frontend:**

  - React.js
  - Recoil for State Management
  - Tailwind CSS
  - Shadcn UI library
  - React Hook Form
  - Tanstack Tables
  - Lucide-React for icons

- **Backend:**

  - Node.js
  - Express.js
  - MongoDB
  - Mongoose for MongoDB object modeling
  - Multer for handling `multipart/form-data`
  - CORS for Cross-Origin Resource Sharing
  - JWT for token-based authentication
  - Bcrypt for secure password storage

- **Other Dependencies:**
  - Axios
  - Zod for schema validation
  - React Router DOM for routing
  - Cloudinary for image uploads (optional)

## Installation Guide

### Requirements

- Node.js
- MongoDB

You can use use Mongo Atlas URL instead of local MongoDB

### Configure Environment Variables

Rename .env.example to .env in both backend and frontend directories.

Add your `MONGO_URL`, `JWT_SECRET`, `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET`, and `PORT` to the backend .env files.

If you don't have Cloudinary, you can replace `cloudStorage` with `diskStorage` in `/backend/middleware/upload.js`.

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

#### Start Frontend

Make sure you are in `frontend` directory

```shell
npm run dev
```

#### Start Backend

Make sure you are in `backend` directory

```shell
node index.js
```

Now open `localhost:5173` on your browser

## License

[MIT LICENSE](LICENSE)

## Screenshots

![Tableview](https://github.com/NEET64/book-world/assets/67575976/de404c8a-54a6-405f-b221-e6b62adc7fd9)
![All Users](https://github.com/NEET64/book-world/assets/67575976/ee99ce2a-f59c-40cb-b003-4711a7754b04)
![Favourites](https://github.com/NEET64/book-world/assets/67575976/ace1988d-f50d-429d-b33f-ce9a33db4649)
![Details1](https://github.com/NEET64/book-world/assets/67575976/05a3a1dc-ac37-4602-82ef-46d3c23372fd)
![Details2](https://github.com/NEET64/book-world/assets/67575976/496d598b-7895-426a-8403-deec71ff0901)
![Details3](https://github.com/NEET64/book-world/assets/67575976/3bfc1aba-9b7c-49c4-81a5-a345ea19076a)
![User](https://github.com/NEET64/book-world/assets/67575976/b254902a-4aae-4c1f-b05b-7946487a8935)
![Add New](https://github.com/NEET64/book-world/assets/67575976/e158ccd6-fbed-45ee-849d-1851b922e93c)
![Login](https://github.com/NEET64/book-world/assets/67575976/54af8184-ada3-434f-8b6e-8f7c864217ed)
![Signup](https://github.com/NEET64/book-world/assets/67575976/c12a69fe-2e26-4b5f-9407-6b9bf6e1f636)
