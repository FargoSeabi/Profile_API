const apiUrl = "http://localhost:3000/profiles";

const profileForm = document.getElementById("profile-form");
const profilesTableBody = document.querySelector("#profiles-table tbody");

// Fetch and render profiles
async function fetchProfiles() {
  const res = await fetch(apiUrl);
  const profiles = await res.json();
  profilesTableBody.innerHTML = "";

  profiles.forEach(profile => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${profile.id}</td>
      <td>${profile.name}</td>
      <td>${profile.email}</td>
      <td>${profile.bio || ""}</td>
      <td>
        <button class="delete-btn" onclick="deleteProfile(${profile.id})">Delete</button>
      </td>
    `;
    profilesTableBody.appendChild(tr);
  });
}

// Add or update profile
profileForm.addEventListener("submit", async e => {
  e.preventDefault();
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const bio = document.getElementById("bio").value;

  // Check if profile exists
  const existingProfile = await fetch(`${apiUrl}/${id}`);
  if (existingProfile.ok) {
    // Update
    await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, bio })
    });
  } else {
    // Create
    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: parseInt(id), name, email, bio })
    });
  }

  profileForm.reset();
  fetchProfiles();
});

// Delete profile
async function deleteProfile(id) {
  await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
  fetchProfiles();
}

// Initial fetch
fetchProfiles();
