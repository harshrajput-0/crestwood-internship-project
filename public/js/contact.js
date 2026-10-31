const contactForm = document.getElementById("contactForm");
const contactFormMessage = document.getElementById("contactFormMessage");
const contactSubmitButton = contactForm.querySelector("button[type='submit']");

const EMAILREGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONEREGEX = /^[6-9]\d{9}$/;

// To show message on form
function showContactMessage(text, type) {
  contactFormMessage.textContent = text;
  contactFormMessage.className = `contact-form-note ${type}`;
  contactFormMessage.hidden = false;
}

contactForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  contactFormMessage.hidden = true;

  const name = document.getElementById("contactName").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const phone = document.getElementById("contactPhone").value.trim();
  const message = document.getElementById("contactMessage").value.trim();

  // Validating fields
  if (name.length < 2) {
    showContactMessage("Please enter your name.", "error");
    return;
  }

  if (!EMAILREGEX.test(email)) {
    showContactMessage("Please enter a valid email address.", "error");
    return;
  }

  if (phone && !PHONEREGEX.test(phone)) {
    showContactMessage("Please enter a valid 10 digit phone number, or leave it blank.", "error");
    return;
  }

  if (message.length < 5) {
    showContactMessage("Please enter a message.", "error");
    return;
  }

  contactSubmitButton.disabled = true;
  contactSubmitButton.textContent = "Sending...";

  // Calling backend API
  try {
    await CampusConnectAPI.sendContactMessage({ name, email, phone, message });
    showContactMessage("Message sent! — we'll get back to you soon.", "success");
    contactForm.reset();
  } catch (err) {
    showContactMessage(err.message, "error");
  } finally {
    contactSubmitButton.disabled = false;
    contactSubmitButton.textContent = "Send Message";
  }
});
