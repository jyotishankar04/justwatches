# Watch Store Project

Welcome to the **Watch Store** project! This repository contains the frontend, admin panel, and backend services for an e-commerce platform dedicated to selling watches. Below, you will find an overview of the project, key features, and instructions for setting it up locally.

---

## Project Structure

The project is divided into three main components:

1. **Client (Frontend)**: The user-facing application for browsing and purchasing watches.
2. **Admin Client**: The administration dashboard for managing products, orders, and reviews.
3. **Server (Backend)**: The backend service that powers both the client and admin applications.

---

## Features

### Client:

- Product browsing, filtering, and searching.
- Secure user authentication and authorization.
- Integrated payment gateway using PhonePe.
- Product reviews and ratings.
- Order management for users.

### Admin Client:

- Manage products (add, edit, delete).
- View and manage customer orders.
- Monitor and approve reviews.
- Intuitive admin interface built with modern UI libraries.

### Server:

- REST API for managing client and admin requests.
- Authentication using JWT.
- File uploads handled via Multer and Cloudinary.
- Database management with Prisma ORM and PostgreSQL.
- Scalable setup with Docker support.

---

## Prerequisites

Ensure you have the following tools installed on your machine:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [PostgreSQL](https://www.postgresql.org/) (if not using Docker)

---

## Setup Instructions

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/justwatches.git
cd justwatches
```

### Step 2: Install Dependencies

#### For Client (Frontend):

```bash
cd user-client
npm install
```

#### For Admin Client:

```bash
cd admin-client
npm install
```

#### For Server (Backend):

```bash
cd server
npm install
```

### Step 3: Environment Variables

#### Server:

Create a `.env` file in the `server` directory by copying the sample file:

```bash
cp .env.sample .env
```

#### Client:

Create a `.env` file in the `user-client` directory by copying the sample file:

```bash
cp .env.sample .env
```

### Step 5: Start the Applications

#### Server:

```bash
cd server
npm run dev
```

#### Client:

```bash
cd client
npm run dev
```

#### Admin Client:

```bash
cd admin-client
npm run dev
```

---

## Technologies Used

### Frontend:

- React.js with Next.js
- Tailwind CSS and DaisyUI
- React Query for state management
- React Hook Form for form handling

### Backend:

- Node.js with Express
- PostgreSQL with Prisma ORM
- Authentication via JWT
- Cloudinary for image uploads

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

---

## License

This project is licensed under the ISC License. See the LICENSE file for details.

---

## Contact

Feel free to reach out:

- LinkedIn: [Jyotishankar Patra](https://linkedin.com/in/jyotishankar-patra)
- GitHub: [devsuvam](https://github.com/jyotishankar04)
- Twitter: [@devsuvam](https://twitter.com/JYOTISHANKARP20)

