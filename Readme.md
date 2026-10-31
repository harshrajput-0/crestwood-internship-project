# Crestwood Internship Project

**Live:** https://crestwood-internship-project.vercel.app/

## Setup

### 1. Prerequisites

- Node.js 18+ and npm installed
- A MongoDB connection string (local MongoDB or a free cluster on MongoDB Atlas)

### 2. Clone the repo

```bash
git clone <your-repo-url>
cd crestwood-internship-project
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Copy the example file:

```bash
cp example.env .env
```

Open `.env` and fill in:

| Variable    | Description                        | Example                                                        |
|-------------|-------------------------------------|------------------------------------------------------------------|
| `PORT`      | Port the local server listens on    | `3000`                                                           |
| `MONGO_URI` | Your MongoDB connection string      | `mongodb+srv://user:pass@cluster.mongodb.net/campus-connect`     |
| `APP_URL`   | Base URL of the app (local)         | `http://localhost:3000/`                                        |

### 5. Run the server

For development (auto-restarts on file changes):

```bash
npm run dev
```

For a plain start:

```bash
npm start
```

### 6. Verify it's running

Open `http://localhost:3000` (or your configured `PORT`) in the browser.
You should see the home page, and the terminal should log a successful
MongoDB connection.