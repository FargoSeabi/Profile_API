const express = require("express");
const app = express();

app.use(express.json());

// --------------------
// In-memory database with test data
// --------------------
let profiles = [
  { id: 1, name: "Moses Seabi", email: "moses@example.com", bio: "Full-stack developer" },
  { id: 2, name: "Jane Doe", email: "jane@example.com", bio: "UI/UX designer" },
  {id:3,name:"Thato" , email:"seabimoses7@gmail.com",bio:"software dev"}
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

// Get a single profile
app.get("/profiles/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const profile = profiles.find(p => p.id === id);

  if (!profile) {
    return res.status(404).json({ error: "Profile not found" });
  }

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
  res.status(201).json(profile);
});

// Update a profile
app.put("/profiles/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = profiles.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Profile not found" });
  }

  profiles[index] = { ...profiles[index], ...req.body };
  res.json(profiles[index]);
});

// Delete a profile
app.delete("/profiles/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = profiles.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Profile not found" });
  }

  profiles.splice(index, 1);
  res.json({ message: "Profile deleted successfully" });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
