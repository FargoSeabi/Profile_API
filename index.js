const express = require("express");
const cors = require("cors"); // import cors
const app = express();

app.use(express.json());

// Enable CORS for all routes
app.use(cors({
  origin: '*' // allow requests from any origin
}));

// --------------------
// In-memory storage
// --------------------
let profiles = [
  { id: 1, name: "Moses Seabi", email: "moses@example.com", bio: "Full-stack developer" },
  { id: 2, name: "Jane Doe", email: "jane@example.com", bio: "UI/UX designer" }
];

// --------------------
// Routes
// --------------------

// Home
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Profile API 🚀" });
});

// Get all profiles
app.get("/profiles", (req, res) => {
  res.json(profiles);
});

// Get profile by ID
app.get("/profiles/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const profile = profiles.find(p => p.id === id);
  if (!profile) return res.status(404).json({ error: "Profile not found" });
  res.json(profile);
});

// Create a new profile
app.post("/profiles", (req, res) => {
  const { id, name, email, bio } = req.body;
  if (profiles.find(p => p.id === id)) {
    return res.status(400).json({ error: "Profile already exists" });
  }
  const profile = { id, name, email, bio };
  profiles.push(profile);
  console.log("Current profiles array:", profiles);
  res.status(201).json(profile);
});

// Update profile
app.put("/profiles/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = profiles.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Profile not found" });
  profiles[index] = { ...profiles[index], ...req.body };
  console.log("Profiles after update:", profiles);
  res.json(profiles[index]);
});

// Delete profile
app.delete("/profiles/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = profiles.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Profile not found" });
  profiles.splice(index, 1);
  console.log("Profiles after deletion:", profiles);
  res.json({ message: "Profile deleted successfully" });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
