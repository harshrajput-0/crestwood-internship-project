const registrationForm = document.getElementById("registrationForm");
const eventSelect = document.getElementById("eventId");
const formMessage = document.getElementById("formMessage");
const submitButton = document.getElementById("submitButton");
const passwordInput = document.getElementById("password");

const EMAILREGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONEREGEX = /^[6-9]\d{9}$/;

// To show message on form 
function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    formMessage.hidden = false;
}

// Fucntion to create Options inside Select element
async function loadEventOptions() {
    const params = new URLSearchParams(window.location.search);
    const preselectedEventId = params.get("eventId") || "";

    try {
        const events = await CampusConnectAPI.getEvents();

        if (events.length === 0) {
            eventSelect.innerHTML = `<option value="">-- No events available right now --</option>`;
            return;
        }

        eventSelect.innerHTML =
            `<option value="">-- Choose an Event --</option>` +
            events
                .map((event) => `<option value="${event._id}">${event.name} (${event.category})</option>`)
                .join("");

        if (preselectedEventId) {
            eventSelect.value = preselectedEventId;
        }
    } catch (err) {
        console.error(err);
        eventSelect.innerHTML = `<option value="">-- Could not load events --</option>`;
    }
}

// CLEAR PASSWORD ON RETENTERING PASSWORD FIELDS
passwordInput.addEventListener("input", function () {
    passwordInput.classList.remove("input-invalid");
});

// EVENT HANDLER FOR SUBMITTING FORM
registrationForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    formMessage.hidden = true;
    passwordInput.classList.remove("input-invalid");

    // Getting value 
    const studentName = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const eventId = eventSelect.value;

    // Validating Fields
    if (studentName.length < 5) {
        showMessage("Student name must be at least 5 characters.", "error");
        return;
    }

    if (!EMAILREGEX.test(email)) {
        showMessage("Please enter a valid email address.", "error");
        return;
    }

    if (!PHONEREGEX.test(phone)) {
        showMessage("Please enter a valid 10 digit phone number.", "error");
        return;
    }

    if (password.length < 6) {
        showMessage("Password must be at least 6 characters.", "error");
        return;
    }

    if (!eventId) {
        showMessage("Please select an event.", "error");
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    // Calling Backend API
    try {
        await CampusConnectAPI.register({ studentName, email, phone, password, eventId });
        showMessage("You're registered! Check your dashboard to see your events.", "success");
        registrationForm.reset();
        loadEventOptions();
    } catch (err) {
        showMessage(err.message, "error");

        
        if (err.status === 401) {
            passwordInput.classList.add("input-invalid");
            passwordInput.value = "";
            passwordInput.focus();
        }
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Submit Registration";
    }
});

loadEventOptions();