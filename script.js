// Secret Music Easter Egg
function toggleSecretMusic() {
    const audio = document.getElementById('secret-song');
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

// Helper function to dynamically darken hex colors for the header banner
function darkenHexColor(hex, percent) {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
    }
    let num = parseInt(hex, 16);
    let r = (num >> 16) + Math.round(255 * (percent / 100));
    let g = ((num >> 8) & 0x00FF) + Math.round(255 * (percent / 100));
    let b = (num & 0x0000FF) + Math.round(255 * (percent / 100));
    
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));
    
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

// 1. Set Background & Banner Colors + Dynamic Header Banner Darkening
const dailyColors = {
    0: '#EDD1B3', // Sunday
    1: '#AFF0B8', // Monday
    2: '#F8A29D', // Tuesday
    3: '#FBCF98', // Wednesday
    4: '#F9F4A2', // Thursday
    5: '#B1DDDD', // Friday
    6: '#DCBEF1'  // Saturday
};

const now = new Date();
const dayIndex = now.getDay();
const currentColor = dailyColors[dayIndex];

document.body.style.backgroundColor = currentColor;

const banners = document.querySelectorAll('.day-banner');
banners.forEach(banner => {
    banner.style.backgroundColor = currentColor;
});

// Automatically calculate and set a darker version for the 1101-style header banner
const headerBanner = document.querySelector('.site-header-banner');
if (headerBanner) {
    // Darkens the daily color by ~18% to create a rich contrast header
    headerBanner.style.backgroundColor = darkenHexColor(currentColor, -18);
}

// 2. Format & Automatically Update Header Version Date & 1101 Header Date
const daysArr = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const mm = String(now.getMonth() + 1).padStart(2, '0');
const dd = String(now.getDate()).padStart(2, '0');
const yyyy = now.getFullYear();
const dayName = daysArr[dayIndex];

// Update bottom footer version date
const formattedDate = `${mm}-${dd}-${yyyy}-${dayName} version`;
const versionEl = document.getElementById('version-date');
if (versionEl) {
    versionEl.textContent = formattedDate;
}

// Update 1101-Style Header Banner Date (Month/Day and Day of Week pill)
const headerMonthDayEl = document.getElementById('header-month-day');
const headerDowEl = document.getElementById('header-dow');
if (headerMonthDayEl) {
    headerMonthDayEl.textContent = `${mm}/${dd}`;
}
if (headerDowEl) {
    headerDowEl.textContent = dayName;
}

// 3. Seeded Daily Shuffle
const doodles = [
    'toad_coffee.PNG',
    'toad_book.PNG',
    'toad_soccer.PNG',
    'toad_snorkle.PNG',
    'toad_backpack.PNG'
];

let seed = Number(`${yyyy}${mm}${dd}`);

function seededRandom() {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

let shuffled = [...doodles];
for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
}

function setImage(id, src) {
    const img = document.getElementById(id);
    if (img) {
        img.onerror = function() {
            this.onerror = null;
            this.src = 'toad_main.PNG'; 
        };
        img.src = './' + src;
    }
}

setImage('doodle-today', shuffled[0]);
setImage('doodle-yesterday', shuffled[1]);
setImage('doodle-daybefore', shuffled[2]);