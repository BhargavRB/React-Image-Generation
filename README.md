# React Image Generation App

This project is a full-stack image generation app built with React (frontend) and Express (backend). It uses Vite for the frontend build and Replicate API for image generation.

## Project Structure

```
.
├── backend/           # Express backend API
├── public/            # Static assets
├── src/               # React frontend source code
├── .env               # Frontend environment variables
├── package.json       # Frontend dependencies and scripts
├── vite.config.js     # Vite configuration
└── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/))

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/react-image-gen.git
cd react-image-gen
```

## 2. Install Dependencies

### Frontend

```bash
npm install
# or
yarn install
```

### Backend

```bash
cd backend
npm install
# or
yarn install
cd ..
```

## 3. Configure Environment Variables

### Frontend

Create a `.env` file in the root folder:

```
VITE_BACKEND_HOST='http://localhost:3000'
```

### Backend

Create a `.env` file in the `backend/` folder:

```
JWT_SECRET="your_jwt_secret"
REPLICATE_API_TOKEN="your_replicate_api_token"
PORT=3000
FE_HOST="http://localhost:5173"
```

- Replace `your_jwt_secret` with a secure random string.
- Replace `your_replicate_api_token` with your Replicate API token.
- Replace `FE_HOST` with your frontend host URL if different.

## 4. Start the Backend Server

```bash
cd backend
npm run dev
```

The backend will run on [http://localhost:3000](http://localhost:3000).

## 5. Start the Frontend App

Open a new terminal in the project root:

```bash
npm run dev
```

The frontend will run on [http://localhost:5173](http://localhost:5173).

## 6. Usage

- Sign up or log in with your email and password.
- Enter a prompt and select image options to generate an image.

## License

MIT
