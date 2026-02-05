# Profile API

A simple **Profile API** built with **Node.js and Express** that allows you to **create, read, update, and delete profiles**.
Includes a **web dashboard** to manage profiles visually.

---

## Features

* ✅ Create, Read, Update, Delete (CRUD) profiles
* ✅ In-memory storage (no database required)
* ✅ Dashboard to view and manage profiles
* ✅ JSON API endpoints for easy integration

---

## Tech Stack

* **Backend:** Node.js, Express
* **Frontend Dashboard:** HTML, CSS, JavaScript
* **Dev Tools:** Nodemon for auto-reloading

---

## Project Structure

```
RestApi/
│
├── index.js         # Node.js API
├── package.json
├── package-lock.json
└── dashboard/
    ├── index.html   # Dashboard frontend
    ├── style.css
    └── script.js
```

---

## Installation

1. Clone the repository or download the project:

```bash
git clone <repository-url>
cd RestApi
```

2. Install dependencies:

```bash
npm install
```

3. Start the API server:

```bash
npm run dev
```

Server will run at:

```
http://localhost:3000
```

---

## API Endpoints

| Method | Endpoint        | Description                |
| ------ | --------------- | -------------------------- |
| GET    | `/`             | Home route                 |
| GET    | `/profiles`     | Get all profiles           |
| GET    | `/profiles/:id` | Get a profile by ID        |
| POST   | `/profiles`     | Create a new profile       |
| PUT    | `/profiles/:id` | Update an existing profile |
| DELETE | `/profiles/:id` | Delete a profile           |

---

## Dashboard Usage

1. Open the dashboard in your browser:

```
dashboard/index.html
```

2. Add a profile by filling the form (ID, Name, Email, Bio) and click **Submit**.
3. Profiles will appear in the table below.
4. Use **Delete** buttons to remove profiles.

> All actions communicate with the API running on `http://localhost:3000`.

---

## Example JSON for POST `/profiles`

```json
{
  "id": 1,
  "name": "Moses Seabi",
  "email": "moses@example.com",
  "bio": "Full-stack developer"
}
```

---

## Notes

* Profiles are stored in-memory; restarting the server will reset data.
* For persistence, you can integrate a database like **MongoDB** or **SQLite**.

---

## Next Steps (Optional Enhancements)

* Add **update functionality** on the dashboard (edit a profile).
* Add **authentication** (JWT).
* Add **profile picture upload**.
* Deploy API to **Render, Railway, or Heroku**.

---

## License

MIT License © 2026
