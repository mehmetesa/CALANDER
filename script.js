let date = new Date();
let selectedDate = new Date();
let events = JSON.parse(localStorage.getItem('cal-events')) || {};

const specialDays = { "1-1": "Yılbaşı", "29-10": "Cumhuriyet Bayramı", "10-11": "Atatürk'ü Anma" };

function renderCalendar() {
    const daysGrid = document.getElementById('days-grid');
    daysGrid.innerHTML = "";
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();

    document.getElementById('month-year-title').innerText = 
        new Intl.DateTimeFormat('tr-TR', { month: 'long', year: 'numeric' }).format(date);

    const firstDay = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7;
    const lastDate = new Date(viewYear, viewMonth + 1, 0).getDate();

    for (let x = 0; x < firstDay; x++) daysGrid.innerHTML += `<div class="day empty"></div>`;

    for (let i = 1; i <= lastDate; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        dayDiv.innerText = i;
        
        const dateKey = `${i}-${viewMonth}-${viewYear}`;
        if (events[dateKey]) dayDiv.classList.add('has-event');
        if (specialDays[`${i}-${viewMonth+1}`]) dayDiv.classList.add('special-day');
        
        const today = new Date();
        if (i === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
            dayDiv.classList.add('today');
        }

        if (i === selectedDate.getDate() && viewMonth === selectedDate.getMonth() && viewYear === selectedDate.getFullYear()) {
            dayDiv.classList.add('selected');
        }

        dayDiv.onclick = () => selectDay(i, viewMonth, viewYear);
        daysGrid.appendChild(dayDiv);
    }
}

function selectDay(day, month, year) {
    selectedDate = new Date(year, month, day);
    document.getElementById('selected-day-num').innerText = day;
    document.getElementById('selected-day-name').innerText = 
        selectedDate.toLocaleDateString('tr-TR', { month: 'long', weekday: 'long' });
    
    showEvents();
    renderCalendar();
}

function showEvents() {
    const dateKey = `${selectedDate.getDate()}-${selectedDate.getMonth()}-${selectedDate.getFullYear()}`;
    const listDisplay = document.getElementById('event-list-display');
    listDisplay.innerHTML = "";

    if (events[dateKey]) {
        events[dateKey].forEach(msg => {
            listDisplay.innerHTML += `<div class="event-item">${msg}</div>`;
        });
    }
}

function saveEvent() {
    const input = document.getElementById('eventInput');
    if (!input.value) return;

    const dateKey = `${selectedDate.getDate()}-${selectedDate.getMonth()}-${selectedDate.getFullYear()}`;
    if (!events[dateKey]) events[dateKey] = [];
    
    events[dateKey].push(input.value);
    localStorage.setItem('cal-events', JSON.stringify(events));
    input.value = "";
    showEvents();
    renderCalendar();
}

function changeMonth(dir) {
    date.setMonth(date.getMonth() + dir);
    renderCalendar();
}

// İlk açılış
selectDay(new Date().getDate(), new Date().getMonth(), new Date().getFullYear());
