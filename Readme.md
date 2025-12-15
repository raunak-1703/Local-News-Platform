# 📰 Localynx – Hyperlocal Citizen Journalism Platform

![](https://img.shields.io/badge/Status-InProgress-success)
![Built with-React](https://img.shields.io/badge/Frontend-React%20%7C%20Vite-blue)
![Built with-Node.js](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-green)
![Database-MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen)

Localynx is a **hyperlocal news & citizen journalism platform** that allows users to share real-time, verified updates from their neighborhoods. The platform empowers citizens to report news, engage in discussions, upvote important stories, and help surface trending local issues, moving journalism to the grassroots level.

This project was built as part of a **HACKSPHERE HACKATHON**, prioritizing real-world usability, clean architecture, and scalability.

---

## 🌟 Why This Project?

This platform was built to:

* **Promote local voices:** Giving residents a direct channel to report on events affecting their community.
* **Encourage community-driven journalism:** Shifting the focus from large-scale national news to critical local issues.
* **Solve the problem of unreported local issues:** Ensuring no local story is missed due to lack of visibility.
* **Demonstrate a full-stack production-ready application** using the MERN stack.

---

## 🚀 Features

### 🔐 Authentication & Authorization
* User registration & login (JWT based)
* Role-based access (**User** / **Admin**)
* Protected API routes using middleware

### 📝 News Posting
* Create posts with: **Title**, **Content**, **Category** (Breaking News, Community, Events, etc.), **Location tagging**, and **Image upload** (via Cloudinary).
* View all posts in reverse chronological order.

### 👍 Community Engagement
* Upvote / remove upvote on posts.
* Robust comment system on each post.
* Reporting feature for inappropriate content.

### 🔥 Trending System
* Trending posts are dynamically calculated based on: **Upvotes**, **Comments**, and **Recency**.
* Dedicated **Trending section** on the Home page to surface high-priority local stories.

### 👤 User Features
* Detailed user profile with all their activities.
* Personalized Dashboard showing: **Total posts**, **Total upvotes received**, and **Total comments**.

### 🛠 Admin Panel
* Comprehensive view of all posts.
* Ability to **Delete inappropriate posts**.
* Dedicated section to manage **Reported content**.
* Admin-only protected routes and features.

---

## 🧱 Tech Stack

The platform is built using the industry-standard MERN stack with modern frontend tools.

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | **React (Vite)** | Modern, fast development environment. |
| | **Tailwind CSS** | Utility-first CSS framework for rapid styling. |
| | **Zustand** | Lightweight, fast, and scalable state management. |
| | **shadcn/ui** | Beautiful, accessible, and customizable UI components. |
| | **Sonner** | For elegant and accessible toast notifications. |
| **Backend** | **Node.js + Express.js** | Fast, unopinionated, minimal web framework. |
| | **MongoDB + Mongoose** | Flexible NoSQL database and elegant object modeling. |
| | **JWT** | Secure, stateless authentication mechanism. |
| | **Cloudinary** | Cloud service for image storage and delivery. |
| | **Multer** | Middleware for handling `multipart/form-data` (image uploads). |
| **Deployment** | **Vercel** | Hosting for the frontend application. |
| | **Render** | Hosting for the backend API. |
| | **MongoDB Atlas** | Managed, highly-available cloud database service. |

---

## 📁 Project Structure

```text
Local-News-Platform/
├── backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── controllers/    # Express route logic functions
│   │   ├── lib/            # Utility and configuration files
│   │   ├── middleware/     # Auth checks, logging, error handling
│   │   ├── models/         # MongoDB schemas (Mongoose models)
│   │   ├── routes/         # API endpoints definitions
│   │   ├── utils/          # General helper functions
│   │   └── server.js       # Main backend entry point (Express app)
│   └── package.json
│
├── frontend/
│   ├── .vite/
│   ├── node_modules/
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── constants/      # App-wide constants/config values
│   │   ├── lib/            # Frontend utility functions
│   │   ├── pages/          # Top-level route components
│   │   ├── services/       # API interaction logic (Axios calls)
│   │   ├── store/          # State management (Zustand store)
│   │   ├── App.jsx         # Main React component
│   │   ├── index.css
│   │   └── main.jsx        # Entry point for React app (index.html link)
│   ├── .env
│   ├── .gitignore
│   ├── components.json     # shadcn/ui configuration
│   ├── eslint.config.js
│   ├── package.json
│   ├── README.md           # Project documentation
│   ├── tsconfig.json      
│   └── vite.config.js
├── .gitignore
└── README.md               # Root documentation
```

## 🔧 Environment Variables

### Backend (`backend/.env`)
Create a file named `.env` in the `backend/` directory and add your connection strings and keys:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=a_very_secure_random_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (`frontend/.env`)
Create a file named `.env` in the `frontend/` directory to define the backend API URL:

```env
VITE_API_URL=http://localhost:3000/api
# Replace with the deployed URL (e.g., https://your-backend-url/api) for production
```

## 🧑‍💻 Running Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/Local-News-Platform.git
cd Local-News-Platform
```

### 2️⃣ Backend Setup

Navigate to the backend folder, install dependencies, and start the server:

```bash
cd backend
npm install
npm run dev
```

The backend API server will run at: `http://localhost:3000`.

### 3️⃣ Frontend Setup

Open a new terminal window. Navigate back to the project root and then into the frontend folder. Install dependencies and start the application:

```bash
cd ../frontend
npm install
npm run dev
```

The frontend application will run at: `http://localhost:5173`.

## 🔗 API Endpoints (Sample)

| Method | Endpoint | Description | Requires Auth |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Register a new user | No |
| **POST** | `/api/auth/login` | Log in a user and get JWT | No |
| **GET** | `/api/posts` | Get all news posts (reverse chronological) | No |
| **GET** | `/api/posts/trending` | Get posts calculated as trending | No |
| **POST** | `/api/posts` | Create a new news post | Yes (User) |
| **POST** | `/api/posts/:id/upvote` | Upvote or remove upvote from a post | Yes (User) |
| **GET** | `/api/comments/:postId` | Get comments for a specific post | No |
| **POST** | `/api/comments/:postId` | Add a new comment to a post | Yes (User) |


## 🔒 Admin Panel Access (Temporary)

**NOTE:** This user is created for testing and demonstration purposes only. Please use this account to check the admin dashboard features in the live deployed project.

| Credential Type | Value |
| :--- | :--- |
| **Admin User ID (Email)** | `raunak@test.com` |
| **Password** | `123456` |

### ➡️ Next Steps
1.  Navigate to the `/login` page.
2.  Log in using the credentials above.
3.  Visit the `/admin` route to access the Admin Panel.


## 🏁 Future Enhancements

The following features are planned for future iterations:

- Real-time updates using Socket.io for live comments and upvotes.
- AI-based content moderation to proactively flag inappropriate posts.
- AI-generated headlines suggestions for users creating posts.
- Improved social media sharing integration.
- Enhanced mobile responsiveness and PWA capabilities.
