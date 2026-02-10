// Tool Data
const tools = [
    { 
        id: 1, 
        name: "Advanced Calculator", 
        desc: "Scientific calculator with advanced mathematical functions", 
        icon: "fas fa-calculator", 
        tags: ["Math", "Calculator"], 
        color: "#3a86ff",
        url: "tool-pages/advanced-calculator.html",
        affiliate: true
    },
    { 
        id: 2, 
        name: "Age Calculator", 
        desc: "Calculate exact age in years, months, and days", 
        icon: "fas fa-birthday-cake", 
        tags: ["Date", "Calculator"], 
        color: "#10b981",
        url: "tool-pages/age-calculator.html"
    },
    { 
        id: 3, 
        name: "Case Changer", 
        desc: "Convert text between uppercase, lowercase, and title case", 
        icon: "fas fa-text-height", 
        tags: ["Text", "Formatter"], 
        color: "#8b5cf6",
        url: "tool-pages/case-changer.html"
    },
    { 
        id: 4, 
        name: "Color Picker", 
        desc: "Select colors and get hex, RGB, and HSL values", 
        icon: "fas fa-palette", 
        tags: ["Design", "Utility"], 
        color: "#ef4444",
        url: "tool-pages/color-picker.html"
    },
    { 
        id: 5, 
        name: "Currency Converter", 
        desc: "Convert between world currencies with live rates", 
        icon: "fas fa-exchange-alt", 
        tags: ["Finance", "Converter"], 
        color: "#f59e0b",
        url: "tool-pages/currency-converter.html"
    },
    { 
        id: 6, 
        name: "Date Difference", 
        desc: "Calculate difference between two dates", 
        icon: "fas fa-calendar-alt", 
        tags: ["Date", "Calculator"], 
        color: "#3a86ff",
        url: "tool-pages/date-difference.html"
    },
    { 
        id: 7, 
        name: "EMI Calculator", 
        desc: "Calculate Equated Monthly Installments for loans", 
        icon: "fas fa-hand-holding-usd", 
        tags: ["Finance", "Calculator"], 
        color: "#10b981",
        url: "tool-pages/emi-calculator.html",
        affiliate: true
    },
    { 
        id: 8, 
        name: "File Size Converter", 
        desc: "Convert between different file size units", 
        icon: "fas fa-file", 
        tags: ["Utility", "Converter"], 
        color: "#8b5cf6",
        url: "tool-pages/file-size-converter.html"
    },
    { 
        id: 9, 
        name: "Image Converter", 
        desc: "Convert images between different formats", 
        icon: "fas fa-image", 
        tags: ["Image", "Converter"], 
        color: "#ef4444",
        url: "tool-pages/image-converter.html"
    },
    { 
        id: 10, 
        name: "Note Text Saver", 
        desc: "Save and manage your notes securely", 
        icon: "fas fa-sticky-note", 
        tags: ["Productivity", "Utility"], 
        color: "#f59e0b",
        url: "tool-pages/note-text-saver.html"
    },
    { 
        id: 11, 
        name: "Password Generator", 
        desc: "Create strong, random passwords with customizable options", 
        icon: "fas fa-key", 
        tags: ["Security", "Generator"], 
        color: "#3a86ff",
        url: "tool-pages/password-generator.html"
    },
    { 
        id: 12, 
        name: "Percentage Calculator", 
        desc: "Calculate percentages, increases, and discounts", 
        icon: "fas fa-percentage", 
        tags: ["Math", "Calculator"], 
        color: "#10b981",
        url: "tool-pages/percentage-calculator.html",
        affiliate: true
    },
    { 
        id: 13, 
        name: "QR Code Generator", 
        desc: "Generate QR codes for URLs, text, or contact information", 
        icon: "fas fa-qrcode", 
        tags: ["Utility", "Generator"], 
        color: "#8b5cf6",
        url: "tool-pages/qr-code-generator.html"
    },
    { 
        id: 14, 
        name: "SIP Calculator", 
        desc: "Calculate Systematic Investment Plan returns", 
        icon: "fas fa-chart-line", 
        tags: ["Finance", "Calculator"], 
        color: "#ef4444",
        url: "tool-pages/sip-calculator.html",
        affiliate: true
    },
    { 
        id: 15, 
        name: "Speech to Text", 
        desc: "Convert spoken words into written text", 
        icon: "fas fa-microphone", 
        tags: ["Audio", "Converter"], 
        color: "#f59e0b",
        url: "tool-pages/speech-to-text.html"
    },
    { 
        id: 16, 
        name: "Text to Speech", 
        desc: "Convert written text into spoken words", 
        icon: "fas fa-volume-up", 
        tags: ["Audio", "Converter"], 
        color: "#3a86ff",
        url: "tool-pages/text-to-speech.html"
    },
    { 
        id: 17, 
        name: "Timer / Stopwatch", 
        desc: "Countdown timer and stopwatch functionality", 
        icon: "fas fa-stopwatch", 
        tags: ["Time", "Utility"], 
        color: "#10b981",
        url: "tool-pages/timer-stopwatch.html"
    },
    { 
        id: 18, 
        name: "Unit Converter", 
        desc: "Convert between different units of measurement", 
        icon: "fas fa-ruler-combined", 
        tags: ["Utility", "Converter"], 
        color: "#8b5cf6",
        url: "tool-pages/unit-converter.html"
    },
    { 
        id: 19, 
        name: "URL Encoder/Decoder", 
        desc: "Encode and decode URLs and URI components", 
        icon: "fas fa-link", 
        tags: ["Encoder", "Developer"], 
        color: "#ef4444",
        url: "tool-pages/url-encoder-decoder.html"
    },
    { 
        id: 20, 
        name: "Word Counter", 
        desc: "Count words, characters, sentences, and paragraphs", 
        icon: "fas fa-file-word", 
        tags: ["Text", "Utility"], 
        color: "#f59e0b",
        url: "tool-pages/word-counter.html"
    }
];

// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const toolsGrid = document.querySelector('.tools-grid-full');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Render all tool cards if on home page
    if (toolsGrid) {
        renderAllTools();
    }
    
    // Setup mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Set active navigation link based on current page
    setActiveNavLink();
    
    // Initialize tool functionality if on tool page
    initializeToolPage();
});

// Render all tools on the home page
function renderAllTools() {
    toolsGrid.innerHTML = '';
    
    tools.forEach(tool => {
        const toolCard = document.createElement('div');
        toolCard.className = `tool-card ${tool.affiliate ? 'affiliate-card' : ''}`;
        
        toolCard.innerHTML = `
            <div class="tool-icon" style="background-color: ${tool.color}15; color: ${tool.color}">
                <i class="${tool.icon}"></i>
            </div>
            <div class="tool-name">${tool.name}</div>
            <div class="tool-desc">${tool.desc}</div>
            <div class="tool-tags">
                ${tool.tags.map(tag => `<span class="tool-tag">${tag}</span>`).join('')}
                ${tool.affiliate ? '<span class="
