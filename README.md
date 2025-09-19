Superhero Database Web Application

This project is a web application that allows performing CRUD operations on superheroes.
Each superhero has a nickname, real name, description, superpowers, catchphrase, and images.

The application consists of:

Backend: built with Node.js (NestJS), Prisma, multer.

Frontend: built with React,Vite, Redux Toolkit, shadCn, tailwindCSS, Axios, React-Hook-Form.

Features

Create, edit, and delete superheroes.

Assign and remove images when creating or editing.

List superheroes with pagination (5 per page).

View details of a superhero with all its information and images.


Images 

In this project, superhero images are stored locally on the server.

When you add or edit a superhero, the files are stored in a special folder on the backend (for example, server/uploads/).

When deploying to production, you can replace local storage with cloud storage (AWS S3, Cloudinary, etc.), but local files were used for this task.

traine test task/
│
├─ server/        # Backend (NestJS)
│   ├─ src/
│   ├─ package.json
│   └─ ...
│
├─ client/       # Frontend (React)
│   ├─ src/
│   ├─ package.json
│   └─ ...
│
└─ README.md

Installation

1. git clone https://github.com/username/traine test task.git
cd traine test task

2. Install dependencies for backend

cd server
npm install

3. Install dependencies for frontend

cd ../client

npm install

Running the Project
    Open two terminal windows/tabs:

1. Backend
cd server
npm run start:dev   

Frontend
cd client
npm run dev

Create .env files for both backend and frontend.
Example for backend (backend/.env):

PORT=7000
DATABASE_URL="mysql://username:password@localhost:3306/trainetest?schema=public"

Front end env 

VITE_API_URL=http://localhost:6000

Screenshots app

### Superheroes List
![Superheroes List](docs/list.jpg)

### Superhero Detail
![Superhero Detail](docs/item.jpg)

### Create/Edit Form
![Create/Edit Form](docs/createForm.jpg)
