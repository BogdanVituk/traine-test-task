# **Superhero Database Web Application**

This project is a **web application** that allows performing **CRUD operations on superheroes**.  
Each superhero has a **nickname, real name, description, superpowers, catchphrase, and images**.

---

## **Application Stack**

- **Backend:** Node.js (NestJS), Prisma, Multer  
- **Frontend:** React, Vite, Redux Toolkit, ShadCn, TailwindCSS, Axios, React-Hook-Form

---

## **Features**

- **Create, edit, and delete superheroes**  
- **Assign and remove images** when creating or editing  
- **List superheroes with pagination** (5 per page)  
- **View details** of a superhero with all information and images

---

## **Images / File Storage**

- In this project, **superhero images are stored locally on the server**  
- When you add or edit a superhero, files are stored in a folder on the backend (e.g., `server/uploads/`)  
- For production, you can replace local storage with cloud storage (AWS S3, Cloudinary, etc.), but **local files were used for this task**

---

## **Project Structure**

trainee-test-task/

backend/ # Backend (NestJS)

    src/

    package.json

frontend/ # Frontend (React)

    src/

    package.json

README.md


---

## **Installation**

1. Clone the repository:

```bash
git clone https://github.com/BogdanVituk/trainee-test-task.git
cd trainee-test-task


Install dependencies for backend:

    cd backend
    npm install


Install dependencies for frontend:

    cd ../frontend
    npm install


Running the Project

Open two terminal windows/tabs:

Backend

    cd backend
    npm run start:dev


Frontend

    cd frontend
    npm run dev

Environment Variables
Backend (backend/.env)
PORT=7000
DATABASE_URL="mysql://username:password@localhost:3306/trainetest?schema=public"

Frontend (frontend/.env)
VITE_API_URL=`http://localhost:7000`

Screenshots app

### Superheroes List
![Superheroes List](./docs/list.jpg)

### Superhero Detail
![Superhero Detail](./docs/item.jpg)

### Create/Edit Form
![Create/Edit Form](./docs/createForm.jpg)
