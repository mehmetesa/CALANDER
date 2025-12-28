const daysGrid = document.getElementById('days-grid');
const monthYearText = document.getElementById('month-year');
const clockElement = document.getElementById('clock');
const dayNumberElement = document.getElementById('day-number');
const dayNameElement = document.getElementById('day-name');

let date = new Date();

// Dünyaca kabul edilen/Özel günler veritabanı
const specialDays = {
    "1-1": "Yılbaşı",
    "23-4": "Ulusal Egemenlik ve Çocuk Bayramı",
    "1-5": "Emek ve Dayanışma Günü",
    "19-5": "Atatürk'ü Anma, Gençlik ve Spor Bayramı",
    "15-7": "Demokrasi ve Milli Birlik Günü",
    "30-8": "Zafer Bayramı",
    "29-10": "Cumhuriyet Bayramı",
    "10-11": "Atatürk'ü Anma Günü",
    "25-12": "Noel (Christmas)"
};

function updateClock() {
    const now = new Date();
    clockElement.innerText = now.toLocaleTimeString('tr-TR');
    dayNumberElement.innerText = now.getDate();
    dayNameElement.innerText = now.toLocaleDateString('tr-TR', { month: 'long', weekday: 'long' });
}

function renderCalendar() {
    daysGrid.innerHTML = "";
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();
    const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    
    monthYearText.innerText = `${months[viewMonth]} ${viewYear}`;

    const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();
    const lastDay = new Date(viewYear, viewMonth + 1, 0).getDate();
    let startDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    for (let x = 0; x < startDay; x++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = "day empty";
        daysGrid.appendChild(emptyDiv);
    }

    for (let i = 1; i <= lastDay; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = "day";
        dayDiv.innerText = i;

        // Özel Gün Kontrolü
        const key = `${i}-${viewMonth + 1}`;
        if (specialDays[key]) {
            dayDiv.classList.add('special-day');
            dayDiv.setAttribute('title', specialDays[key]);
        }

        // Bugün kontrolü
        const today = new Date();
        if (i === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
            dayDiv.classList.add('today');
        }

        daysGrid.appendChild(dayDiv);
    }
}

function addEvent() {
    const input = document.getElementById('eventInput');
    const list = document.getElementById('eventList');
    if (input.value === "") return;
    
    const li = document.createElement('li');
    li.innerText = input.value;
    list.appendChild(li);
    input.value = "";
}

document.getElementById('prevMonth').addEventListener('click', () => { date.setMonth(date.getMonth() - 1); renderCalendar(); });
document.getElementById('nextMonth').addEventListener('click', () => { date.setMonth(date.getMonth() + 1); renderCalendar(); });

setInterval(updateClock, 1000);
updateClock();
renderCalendar();
