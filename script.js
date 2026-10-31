const events = [
    {
        name: "TechFest 2026",
        description: "Explore innovative student projects, coding challenges and exciting technology demonstrations.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
        category: "Technical",
        date: "05 November 2026",
        time: "10:00 AM - 4:00 PM",
        venue: "Main Auditorium"
    },
    {
        name: "Cultural Fiesta",
        description: "Celebrate creativity through music, dance, drama and student cultural performances.",
        image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80",
        category: "Cultural",
        date: "12 November 2026",
        time: "9:30 AM - 5:00 PM",
        venue: "College Open Ground"
    },
    {
        name: "Web Development Workshop",
        description: "Learn the fundamentals of HTML, CSS and JavaScript by building a simple website.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
        category: "Workshop",
        date: "18 November 2026",
        time: "10:00 AM - 1:00 PM",
        venue: "Computer Laboratory 1"
    },
    {
        name: "Intercollege Sports Meet",
        description: "Participate in exciting sports competitions and demonstrate your teamwork and skills.",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
        category: "Sports",
        date: "25 November 2026",
        time: "8:30 AM - 4:30 PM",
        venue: "College Sports Ground"
    },
    {
        name: "AI Innovation Seminar",
        description: "Discover artificial intelligence, machine learning and their applications in everyday life.",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
        category: "Technical",
        date: "02 December 2026",
        time: "10:00 AM - 2:00 PM",
        venue: "Seminar Hall"
    },
    {
        name: "Creative Design Workshop",
        description: "Develop your creativity through graphic design activities and practical design exercises.",
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
        category: "Workshop",
        date: "10 December 2026",
        time: "9:30 AM - 12:30 PM",
        venue: "Design Studio"
    }
];

// Get HTML elements
const eventContainer = document.getElementById("eventContainer");
const filterButtons = document.querySelectorAll(".filter-btn");
const noEvents = document.getElementById("noEvents");

// Display event cards
function displayEvents(category = "All") {

    eventContainer.innerHTML = "";

    const filteredEvents = events.filter(function(event) {
        return category === "All" || event.category === category;
    });

    noEvents.hidden = filteredEvents.length !== 0;

    filteredEvents.forEach(function(event) {

        const card = document.createElement("article");
        card.className = "event-card";

        card.innerHTML = `
            <img
                class="event-image"
                src="${event.image}"
                alt="${event.name}"
                loading="lazy"
            >

            <div class="event-content">
                <span class="category">${event.category}</span>

                <h3>${event.name}</h3>

                <p class="event-description">
                    ${event.description}
                </p>

                <div class="event-details">
                    <p>📅 <strong>Date:</strong> ${event.date}</p>
                    <p>🕒 <strong>Time:</strong> ${event.time}</p>
                    <p>📍 <strong>Venue:</strong> ${event.venue}</p>
                </div>
            </div>
        `;

        eventContainer.appendChild(card);
    });
}

// Filter events when buttons are clicked
filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const selectedCategory = button.dataset.category;

        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        displayEvents(selectedCategory);
    });
});

// Display all events when the page loads
displayEvents();