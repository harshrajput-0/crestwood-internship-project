const API_BASE = "/api";

// SEND REQUEST 
async function apiRequest(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  let data = null;
  try {
    data = await res.json();
  } catch (error) {
    console.log(error.message)
  }

  if (!res.ok) {
    const message = (data && data.message) || "Something went wrong. Please try again.";
    const error = new Error(message);
    error.status = res.status; // e.g. 401 for a wrong password, 404 for no account
    throw error;
  }

  return data;
}

const CampusConnectAPI = {
  getEvents(category) {
    const query = category && category !== "All" ? `?category=${encodeURIComponent(category)}` : "";
    return apiRequest(`/events${query}`);
  },

  getEventById(id) {
    return apiRequest(`/events/${encodeURIComponent(id)}`);
  },

  register(payload) {
    return apiRequest(`/registrations`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  getRegistrationsByEmail(email, password) {
    return apiRequest(`/registrations/lookup`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  sendContactMessage(payload) {
    return apiRequest(`/contact`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};