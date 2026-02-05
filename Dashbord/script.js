const apiUrl = "http://localhost:3000/profiles";

const profileForm = document.getElementById("profile-form");
const profilesTableBody = document.querySelector("#profiles-table tbody");

// Fetch and render profiles
async function fetchProfiles() {
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error("Failed to fetch profiles");
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
  } catch (error) {
    alert("Error fetching profiles: " + error.message);
    console.error(error);
  }
}

// Add profile (POST)
profileForm.addEventListener("submit", async e => {
  e.preventDefault();

  const id = parseInt(document.getElementById("id").value);
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const bio = document.getElementById("bio").value;

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name, email, bio })
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to add profile");
    }

    profileForm.reset(); // clear the form
    fetchProfiles();     // refresh table
  } catch (error) {
    alert("Error adding profile: " + error.message);
    console.error(error);
  }
});

// Delete profile
async function deleteProfile(id) {
  if (!confirm("Are you sure you want to delete this profile?")) return;

  try {
    const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to delete profile");
    }
    fetchProfiles();
  } catch (error) {
    alert("Error deleting profile: " + error.message);
    console.error(error);
  }
}

// Initial fetch
fetchProfiles();
