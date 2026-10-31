const lookupForm = document.getElementById("lookupForm");
const lookupEmail = document.getElementById("lookupEmail");
const lookupPassword = document.getElementById("lookupPassword");
const lookupMessage = document.getElementById("lookupMessage");
const registeredEventsList = document.getElementById("registeredEventsList");

const statRegistered = document.getElementById("statRegistered");
const statUpcoming = document.getElementById("statUpcoming");
const statCompleted = document.getElementById("statCompleted");

function showLookupMessage(text) {
  lookupMessage.textContent = text;
  lookupMessage.hidden = false;
}

function flagInvalid(input) {
  input.style.borderColor = "#d14343";
  input.style.background = "#fdecec";
}

function clearInvalid(input) {
  input.style.borderColor = "#cbd5e1";
  input.style.background = "";
}

[lookupEmail, lookupPassword].forEach((input) => {
  input.addEventListener("input", () => clearInvalid(input));
});

function registrationRowHTML(registration, index) {
  const event = registration.event || {};
  const isUpcoming = event.date ? new Date(event.date) >= new Date() : true;

  return `
    <article class="dashboard-event-row">
      <div class="dashboard-event-date">
        <span>EVENT</span>
        <strong>${String(index + 1).padStart(2, "0")}</strong>
      </div>

      <div class="dashboard-event-info">
        <h3>${event.name || "Event"}</h3>
        <p>${event.category || ""} · ${event.location || ""}</p>
      </div>

      <span class="dashboard-status ${isUpcoming ? "status-upcoming" : "status-completed"}">
        ${isUpcoming ? "Upcoming" : "Completed"}
      </span>
    </article>
  `;
}

function updateStats(registrations) {
  const total = registrations.length;
  const upcoming = registrations.filter(
    (r) => r.event && r.event.date && new Date(r.event.date) >= new Date()
  ).length;

  statRegistered.textContent = total;
  statUpcoming.textContent = upcoming;
  statCompleted.textContent = total - upcoming;
}

lookupForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  lookupMessage.hidden = true;
  clearInvalid(lookupEmail);
  clearInvalid(lookupPassword);

  const email = lookupEmail.value.trim();
  const password = lookupPassword.value;const lookupForm = document.getElementById("lookupForm");
const lookupEmail = document.getElementById("lookupEmail");
const lookupMessage = document.getElementById("lookupMessage");
const registeredEventsList = document.getElementById("registeredEventsList");

const statRegistered = document.getElementById("statRegistered");
const statUpcoming = document.getElementById("statUpcoming");
const statCompleted = document.getElementById("statCompleted");

function showLookupMessage(text) {
  lookupMessage.textContent = text;
  lookupMessage.hidden = false;
}

function registrationRowHTML(registration, index) {
  const event = registration.event || {};
  const isUpcoming = event.date ? new Date(event.date) >= new Date() : true;

  return `
    <article class="dashboard-event-row">
      <div class="dashboard-event-date">
        <span>EVENT</span>
        <strong>${String(index + 1).padStart(2, "0")}</strong>
      </div>

      <div class="dashboard-event-info">
        <h3>${event.name || "Event"}</h3>
        <p>${event.category || ""} · ${event.location || ""}</p>
      </div>

      <span class="dashboard-status ${isUpcoming ? "status-upcoming" : "status-completed"}">
        ${isUpcoming ? "Upcoming" : "Completed"}
      </span>
    </article>
  `;
}

function updateStats(registrations) {
  const total = registrations.length;
  const upcoming = registrations.filter(
    (r) => r.event && r.event.date && new Date(r.event.date) >= new Date()
  ).length;

  statRegistered.textContent = total;
  statUpcoming.textContent = upcoming;
  statCompleted.textContent = total - upcoming;
}

lookupForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  lookupMessage.hidden = true;

  const email = lookupEmail.value.trim();
  if (!email) return;

  registeredEventsList.innerHTML = `<p class="dashboard-demo-note">Loading your registrations...</p>`;

  try {
    // FETCHING DATA FROM BACKEND
    const registrations = await CampusConnectAPI.getRegistrationsByEmail(email);

    if (registrations.length === 0) {
      registeredEventsList.innerHTML = `<p class="dashboard-demo-note">No registrations found for this email yet.</p>`;
      updateStats([]);
      return;
    }

    registeredEventsList.innerHTML = registrations.map(registrationRowHTML).join("");
    updateStats(registrations);
  } catch (err) {
    console.error(err);
    registeredEventsList.innerHTML = "";
    showLookupMessage(err.message || "Could not load your registrations right now.");
    updateStats([]);
  }
});

  if (!email || !password) return;

  registeredEventsList.innerHTML = `<p class="dashboard-demo-note">Loading your registrations...</p>`;

  try {
    // FETCHING DATA FROM BACKEND
    const registrations = await CampusConnectAPI.getRegistrationsByEmail(email, password);

    if (registrations.length === 0) {
      registeredEventsList.innerHTML = `<p class="dashboard-demo-note">No registrations found for this email yet.</p>`;
      updateStats([]);
      return;
    }

    registeredEventsList.innerHTML = registrations.map(registrationRowHTML).join("");
    updateStats(registrations);
  } catch (err) {
    console.error(err);
    registeredEventsList.innerHTML = "";
    showLookupMessage(err.message || "Could not load your registrations right now.");
    updateStats([]);

    if (err.status === 401) {
      // Wrong password for a known email — clear and refocus it
      flagInvalid(lookupPassword);
      lookupPassword.value = "";
      lookupPassword.focus();
    } else if (err.status === 404) {
      // No account exists for that email at all
      flagInvalid(lookupEmail);
      lookupEmail.focus();
    }
  }
});