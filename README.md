# MERN Cat Adoption App

A full-stack cat adoption application built with MongoDB, Express.js, React, and Node.js.

## Features

- Browse available cats with images from Cat API
- Adopt cats and save to database
- View adopted cats
- Edit cat information
- Toast notifications
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation & Setup

### 1. Clone the repository
\`\`\`bash
git clone <your-repo-url>
cd mern-cat-adoption
\`\`\`

### 2. Backend Setup

\`\`\`bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (already provided)
# Make sure MongoDB is running locally on port 27017
# Or update MONGODB_URI in .env file for MongoDB Atlas

# Start the backend server
npm run dev
\`\`\`

The backend server will run on http://localhost:5000

### 3. Frontend Setup

Open a new terminal window:

\`\`\`bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
\`\`\`

The frontend will run on http://localhost:3000

### 4. Seed the Database

Once both servers are running:

1. Open your browser and go to http://localhost:3000
2. Click the "Refresh Cats Database" button on the home page
3. This will populate the database with sample cats

## API Endpoints

- `GET /api/cats` - Get all cats
- `GET /api/cats/adopted` - Get adopted cats
- `GET /api/cats/:id` - Get single cat
- `POST /api/cats/:id/adopt` - Adopt a cat
- `PUT /api/cats/:id` - Update cat information
- `POST /api/seed` - Seed database with sample cats

## Project Structure

\`\`\`
mern-cat-adoption/
├── backend/
│   ├── server.js          # Express server and API routes
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   └── Layout.js
    │   ├── pages/
    │   │   ├── HomePage.js
    │   │   ├── AdoptedCatsPage.js
    │   │   └── EditCatPage.js
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    └── package.json          # Frontend dependencies
\`\`\`

## Usage

1. **Home Page**: Browse available cats and click "Adopt" to adopt them
2. **My Cats Page**: View your adopted cats and click "Edit Cat" to modify their information
3. **Edit Cat Page**: Update cat details and save changes

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS for cross-origin requests

### Frontend
- React
- React Router for navigation
- Axios for API calls
- React Hot Toast for notifications
- Lucide React for icons

## Development

- Backend runs on port 5000
- Frontend runs on port 3000
- MongoDB runs on port 27017 (default)

## Troubleshooting

1. **MongoDB Connection Issues**: Make sure MongoDB is running locally or check your connection string
2. **CORS Issues**: The backend includes CORS middleware to allow frontend requests
3. **Port Conflicts**: Change ports in the respective package.json files if needed

## Future Enhancements

- User authentication
- Image upload functionality
- Advanced filtering and search
- Cat removal feature
- Email notifications
