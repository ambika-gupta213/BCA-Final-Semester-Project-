// Global variables to store quotes data
let currentIndex = 0;

// Updated Quotes Array with 100% Working Image Links 🚀
const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", bg: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela", bg: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1000" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", bg: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1000" },
    { text: "Opportunities don't happen. You create them.", author: "Chris Grosser", bg: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", bg: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1000" }, // Fixed Image Link
    { text: "Comfort is the enemy of progress.", author: "P.T. Barnum", bg: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1000" }, // Fixed Image Link
    { text: "Nobody is coming to save you. This life of yours is 100% your responsibility.", author: "Naval Ravikant", bg: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1000" },
    { text: "It is easy to sit up and take notice, what is difficult is to get up and take action.", author: "Honoré de Balzac", bg: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1000" },
    { text: "Great things are done by a series of small things brought together.", author: "Vincent van Gogh", bg: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1000" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000" }
];

const quoteDisplay = document.getElementById('quote-display');
const authorDisplay = document.getElementById('author-display');
const cardElement = document.getElementById('card-element'); 
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');
const btnSpeak = document.getElementById('btn-speak');
const btnCopy = document.getElementById('btn-copy');
const btnShare = document.getElementById('btn-share');
const clockDisplay = document.getElementById('live-chronometer');
const timeIconDisplay = document.getElementById('time-icon');

// 1. Display Quote Function (With smooth background image switching)
function showQuote(index) {
    if (quotes.length === 0) return;
    
    // Naya quote aate hi agar purani voice chal rahi hai toh use turant stop karne ke liye
    window.speechSynthesis.cancel();
    
    // Background image set karna aur cover look dena
    if (cardElement && quotes[index].bg) {
        cardElement.style.backgroundImage = `url('${quotes[index].bg}')`;
        cardElement.style.backgroundSize = 'cover';
        cardElement.style.backgroundPosition = 'center';
    }
    
    quoteDisplay.textContent = `"${quotes[index].text}"`;
    authorDisplay.textContent = `— ${quotes[index].author}`;
    currentIndex = index;
}

// 2. Navigation Controls
btnNext.addEventListener('click', () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= quotes.length) nextIndex = 0;
    showQuote(nextIndex);
});

btnPrev.addEventListener('click', () => {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = quotes.length - 1;
    showQuote(prevIndex);
});

// 3. Premium AI Voice Model (Matilda Tone with Play/Stop Toggle) 🔊
btnSpeak.addEventListener('click', () => {
    if (!quoteDisplay.textContent) return;

    // Toggle Play/Stop Logic
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        return; 
    }

    const utterance = new SpeechSynthesisUtterance(`${quoteDisplay.textContent} ${authorDisplay.textContent}`);
    const voices = window.speechSynthesis.getVoices();
    
    const matildaSimulatedVoice = voices.find(voice => 
        voice.name.includes('Google UK English Female') || 
        voice.name.includes('Microsoft Zira') || 
        voice.name.includes('Samantha') || 
        voice.name.includes('Female')
    );

    if (matildaSimulatedVoice) utterance.voice = matildaSimulatedVoice;

    // Matilda Prosody Tuning
    utterance.rate = 0.90;   
    utterance.pitch = 1.15;  

    window.speechSynthesis.speak(utterance);
});

// 4. Utility Buttons (Copy & Share)
btnCopy.addEventListener('click', () => {
    const textToCopy = `${quoteDisplay.textContent} ${authorDisplay.textContent}`;
    navigator.clipboard.writeText(textToCopy);
    alert("Success: Quote copied to clipboard!");
});

btnShare.addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Success: Project link copied!");
});

// 5. Chronometer Hub (Dynamic Sun/Moon + Date & Time) ☀️🌙⏰
function updateClock() {
    if (!clockDisplay || !timeIconDisplay) return;

    const now = new Date();
    const hours = now.getHours();

    // Weather-style dynamic emoji system
    if (hours >= 6 && hours < 18) {
        timeIconDisplay.textContent = "☀️"; 
    } else {
        timeIconDisplay.textContent = "🌙"; 
    }

    // Full Date and Time format setup
    const dateOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true };
    
    const currentDate = now.toLocaleDateString('en-US', dateOptions);
    const currentTime = now.toLocaleTimeString('en-US', timeOptions);

    clockDisplay.textContent = `${currentDate} | ${currentTime}`;
}

// Initialize System
setInterval(updateClock, 1000);
updateClock();

window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();

// Page load hote hi pehla quote aur image dikhana
showQuote(0);