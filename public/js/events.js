const eventSearch = document.getElementById("eventSearch");
const eventFilters = document.querySelectorAll(".events-filter");
const eventsEmpty = document.getElementById("eventsEmpty");
const eventsLoading = document.getElementById("eventsLoading");
const eventsError = document.getElementById("eventsError");
const eventsGrid = document.getElementById("eventsGrid");
const eventCount = document.getElementById("eventCount");

let allEvents = [];
let selectedEventCategory = "All";


function formatDate(isoDate) {
  if (!isoDate) return "Date to be announced";
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "Date to be announced";
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function eventCardHTML(event) {
  const image = event.image || "./images/tech.jpg";

  return `
    <article class="event-card" data-category="${event.category}">
      <div class="event-image">
        <img src="${image}" alt="${event.name}" loading="lazy">
        <span class="event-category">${event.category}</span>
      </div>

      <div class="event-card-body">
        <div class="event-meta">
          <span>◷ ${formatDate(event.date)}${event.time ? " · " + event.time : ""}</span>
        </div>

        <h3>${event.name}</h3>
        <p class="event-description">${event.description}</p>

        <div class="event-details">
          <span>⌖ ${event.location}</span>
          <span><svg class="event-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42Z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg> ${event.category}</span>
        </div>

        <a href="register.html?eventId=${event._id}" class="event-register-button">
          Register Now <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  `;
}

// RENDER EVENT CARDS 
function renderEvents() {
  const searchText = eventSearch.value.trim().toLowerCase();

  const visibleEvents = allEvents.filter((event) => {
    const matchesCategory =
      selectedEventCategory === "All" || event.category === selectedEventCategory;

    const searchableText = [event.name, event.description, event.category, event.location]
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchableText.includes(searchText);

    return matchesCategory && matchesSearch;
  });

  eventsGrid.innerHTML = visibleEvents.map(eventCardHTML).join("");
  eventsGrid.hidden = visibleEvents.length === 0;
  eventsEmpty.hidden = visibleEvents.length > 0;

  eventCount.textContent = visibleEvents.length + (visibleEvents.length === 1 ? " event" : " events");
}

// LOAD EVENTS 
async function loadEvents() {
  eventsLoading.hidden = false;
  eventsError.hidden = true;
  eventsGrid.hidden = true;
  eventsEmpty.hidden = true;

  try {
    allEvents = await CampusConnectAPI.getEvents();
    eventsLoading.hidden = true;
    renderEvents();
  } catch (err) {
    console.error(err);
    eventsLoading.hidden = true;
    eventsError.hidden = false;
  }
}

eventFilters.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedEventCategory = button.dataset.category;

    eventFilters.forEach(function (filterButton) {
      filterButton.classList.remove("active");
    });

    button.classList.add("active");
    renderEvents();
  });
});

eventSearch.addEventListener("input", renderEvents);

loadEvents();
