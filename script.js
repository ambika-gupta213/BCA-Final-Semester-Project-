const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "Opportunities don't happen. You create them.",
    author: "Chris Grosser",
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
  },
  {
    text: "Comfort is the enemy of progress.",
    author: "P.T. Barnum",
  },
  {
    text: "Nobody is coming to save you. This life of yours is 100% your responsibility.",
    author: "Naval Ravikant",
  },
  {
    text: "It is easy to sit up and take notice, what is difficult is to get up and take action.",
    author: "Honoré de Balzac",
  },
  {
    text: "Great things are done by a series of small things brought together.",
    author: "Vincent van Gogh",
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
];

const imageUrls = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1419242902214-272b3f1e5d74?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1486406146928-c5a044be5dfd?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef165b1ae?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1476480862126-209bfaa8efc2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
];

const quoteCardEl = document.querySelector(".quote-card");
const quoteTextEl = document.getElementById("quote-text");
const quoteAuthorEl = document.getElementById("quote-author");
const prevBtn = document.getElementById("prev-quote");
const nextBtn = document.getElementById("next-quote");
const yearEl = document.getElementById("year");

const FADE_MS = 600;
let currentIndex = 0;
let isTransitioning = false;

function preloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = reject;
    img.src = url;
  });
}

function applyQuote(index) {
  const { text, author } = quotes[index];
  quoteTextEl.textContent = text;
  quoteAuthorEl.textContent = `— ${author}`;
  quoteCardEl.style.backgroundImage = `url("${imageUrls[index]}")`;
}

async function showQuoteAt(index, skipFade = false) {
  if (isTransitioning || !quoteCardEl) return;

  const targetIndex = ((index % quotes.length) + quotes.length) % quotes.length;
  currentIndex = targetIndex;
  isTransitioning = true;

  if (!skipFade) {
    quoteCardEl.classList.add("is-fading");
    await new Promise((resolve) => setTimeout(resolve, FADE_MS));
  }

  try {
    await preloadImage(imageUrls[targetIndex]);
  } catch {
    /* show quote even if image fails to load */
  }

  applyQuote(targetIndex);

  if (!skipFade) {
    quoteCardEl.classList.remove("is-fading");
  }

  isTransitioning = false;
}

function showNext() {
  showQuoteAt(currentIndex + 1);
}

function showPrevious() {
  showQuoteAt(currentIndex - 1);
}

if (prevBtn) {
  prevBtn.addEventListener("click", showPrevious);
}

if (nextBtn) {
  nextBtn.addEventListener("click", showNext);
}

showQuoteAt(0, true);

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
