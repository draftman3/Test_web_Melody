// Dropdown handling
document.getElementById('dropdownLink').addEventListener('click', function(event) {
    event.preventDefault();
    var dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.classList.toggle('show');
});

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropdown-link')) {
        var dropdowns = document.getElementsByClassName('dropdown-menu');
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Calendar handling
function toggleCalendar(calendarId) {
    const calendarContainer = document.getElementById(calendarId);
    calendarContainer.classList.toggle('show');
    if (calendarContainer.classList.contains('show')) {
        renderCalendar(calendarId);
    }
}

function renderCalendar(calendarId) {
    const calendarContainer = document.getElementById(calendarId);
    calendarContainer.innerHTML = ''; // Clear previous content
    
    const calendar = document.createElement('table');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    
    // Create header row
    const header = calendar.createTHead();
    const headerRow = header.insertRow();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => {
        const cell = headerRow.insertCell();
        cell.textContent = day;
    });
    
    // Create calendar days
    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = calendar.insertRow();
        for (let j = 0; j < 7; j++) {
            const cell = row.insertCell();
            if (i === 0 && j < firstDayOfMonth) {
                cell.textContent = '';
            } else if (date > daysInMonth) {
                break;
            } else {
                cell.textContent = date;
                cell.classList.add('day');
                cell.addEventListener('click', function() {
                    selectDate(currentYear, currentMonth + 1, date);
                });
                date++;
            }
        }
    }
    
    calendarContainer.appendChild(calendar);
}

function selectDate(year, month, day) {
    console.log(`Selected Date: ${year}-${month}-${day}`);
    // Do something with the selected date, e.g., update input field
}

// Room dropdown handling
document.addEventListener("DOMContentLoaded", function() {
    const roomLink = document.getElementById("roomLink");
    const dropdownContent = document.getElementById("dropdownContent");

    roomLink.addEventListener("click", function(event) {
        event.preventDefault();
        dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
    });

    // Close the dropdown if the user clicks outside of it
    window.onclick = function(event) {
        if (!event.target.closest('#roomLink')) {
            if (dropdownContent.style.display === "block") {
                dropdownContent.style.display = "none";
            }
        }
    };
});

// section header

document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll(".menu a");

    for (const link of links) {
        link.addEventListener("click", smoothScroll);
    }

    function smoothScroll(event) {
        event.preventDefault();

        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);
        const targetPosition = targetSection.offsetTop - 50; // Adjust for fixed header height
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;

        window.requestAnimationFrame(step);

        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const percentage = Math.min(progress / duration, 1);
            window.scrollTo(0, startPosition + distance * easeInOutCubic(percentage));
            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        }
    }

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
});

