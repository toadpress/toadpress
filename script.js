// Secret Music Easter Egg
function toggleSecretMusic() {
    const audio = document.getElementById('secret-song');
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

// 1. Set Background & Banner Colors
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

// 2. Format & Automatically Update Header Version Date
const daysArr = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const mm = String(now.getMonth() + 1).padStart(2, '0');
const dd = String(now.getDate()).padStart(2, '0');
const yyyy = now.getFullYear();
const dayName = daysArr[dayIndex];

const formattedDate = `${mm}-${dd}-${yyyy}-${dayName} version`;
document.getElementById('version-date').textContent = formattedDate;

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