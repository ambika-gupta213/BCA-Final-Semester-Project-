// Central Data Matrix Module Configuration
const dataMatrix = [
    {
        quote: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        bgImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"
    },
    {
        quote: "It always seems impossible until it's done.",
        author: "Nelson Mandela",
        bgImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
    },
    {
        quote: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
        bgImage: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=800&q=80"
    },
    {
        quote: "Opportunities don't happen. You create them.",
        author: "Chris Grosser",
        bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
    },
    {
        quote: "It does not matter how slowly you go as long as you do not stop.",
        author: "Confucius",
        bgImage: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80"
    },
    {
        quote: "Comfort is the enemy of progress.",
        author: "P.T. Barnum",
        bgImage: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80"
    },
    {
        quote: "Nobody is coming to save you. This life of yours is 100% your responsibility.",
        author: "Naval Ravikant",
        bgImage: "https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&w=800&q=80"
    },
    {
        quote: "It is easy to sit up and take notice, what is difficult is to get up and take action.",
        author: "Honoré de Balzac",
        bgImage: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80"
    },
    {
        quote: "Great things are done by a series of small things brought together.",
        author: "Vincent van Gogh",
        bgImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80"
    },
    {
        quote: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt",
        bgImage: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80"
    }
];

let currentIndex = 0;

// Selecting Elements from DOM Layout
const cardElement = document.getElementById('card-element');
const quoteDisplay = document.getElementById('quote-display');
const authorDisplay = document.getElementById('author-display');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const btnSpeak = document.getElementById('btn-speak');
const btnCopy = document.getElementById('btn-copy');
const btnShare = document.getElementById('btn-share');
const chronometerDisplay = document.getElementById('live-chronometer');

// Function to switch card data state matrix
function updateEngineState() {
    const data = dataMatrix[currentIndex];
    quoteDisplay.innerText = `"${data.quote}"`;
    authorDisplay.innerText = `— ${data.author}`;
    cardElement.style.backgroundImage = `url('${data.bgImage}')`;
}

// Text-to-Speech Implementation
function synthesizeAudioSpeech() {
    window.speechSynthesis.cancel();

    const textToSpeak = `${dataMatrix[currentIndex].quote} by ${dataMatrix[currentIndex].author}`;
    const speechUtterance = new SpeechSynthesisUtterance(textToSpeak);

    speechUtterance.rate = 0.95;
    speechUtterance.pitch = 1.0;

    window.speechSynthesis.speak(speechUtterance);
}

// Clipboard API: Copy Quote Function
function pipeDataToClipboard() {
    const content = `"${dataMatrix[currentIndex].quote}" — ${dataMatrix[currentIndex].author}`;
    navigator.clipboard.writeText(content).then(() => {
        alert("Success: Quote copied to clipboard!");
    }).catch(err => {
        console.error("Failure: ", err);
    });
}

// Clipboard API: Share Live Link Function
function dispatchShareLink() {
    const currentLiveURL = window.location.href;
    navigator.clipboard.writeText(currentLiveURL).then(() => {
        alert("Live website URL copied! Share it with anyone.");
    });
}

// Real-time Clock Logic
function updateSystemChronometer() {
    const temporalData = new Date();
    const runtimeParameters = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: true
    };
    chronometerDisplay.innerText = temporalData.toLocaleString('en-US', runtimeParameters);
}

// Event Listeners assignment
btnNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % dataMatrix.length;
    updateEngineState();
});

btnPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + dataMatrix.length) % dataMatrix.length;
    updateEngineState();
});

btnSpeak.addEventListener('click', synthesizeAudioSpeech);
btnCopy.addEventListener('click', pipeDataToClipboard);
btnShare.addEventListener('click', dispatchShareLink);

// Initialization Triggers on Page Load
updateEngineState();
updateSystemChronometer();
setInterval(updateSystemChronometer, 1000);
