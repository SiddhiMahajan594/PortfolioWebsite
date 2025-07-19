// DOM Elements
const keys = document.querySelectorAll('.key');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeKeyboard();
    addKeyboardSoundEffects();
    addTypingEffect();
});

// Initialize keyboard functionality
function initializeKeyboard() {
    // Add click event listeners to all keys for visual feedback
    keys.forEach(key => {
        key.addEventListener('click', function() {
            addKeyPressEffect(this);
        });
    });

    // Add keyboard event listeners for physical keyboard interaction
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('keyup', handleKeyRelease);
}



// Add key press visual effect
function addKeyPressEffect(keyElement) {
    keyElement.style.transform = 'translateY(2px)';
    keyElement.style.boxShadow = '0 2px 6px rgba(35, 140, 255, 0.3)';
    
    setTimeout(() => {
        keyElement.style.transform = '';
        keyElement.style.boxShadow = '';
    }, 150);
}

// Handle physical keyboard key press
function handleKeyPress(event) {
    const key = event.key.toLowerCase();
    const keyElement = findKeyElement(key);
    
    if (keyElement) {
        addKeyPressEffect(keyElement);
        highlightKey(keyElement);
    }
}

// Handle physical keyboard key release
function handleKeyRelease(event) {
    const key = event.key.toLowerCase();
    const keyElement = findKeyElement(key);
    
    if (keyElement) {
        keyElement.style.transform = '';
        keyElement.style.boxShadow = '';
    }
}

// Find key element by character
function findKeyElement(key) {
    const keyElements = document.querySelectorAll('.key');
    
    // Special handling for space character - check this FIRST
    if (key === ' ') {
        for (let element of keyElements) {
            if (element.classList.contains('space-key')) {
                return element;
            }
        }
        return null; // Return null if space key not found
    }
    
    // Key mapping for special characters and common keys
    const keyMap = {
        'enter': 'enter',
        'backspace': 'backspace',
        'tab': 'tab',
        'caps lock': 'caps',
        'shift': 'shift',
        'ctrl': 'ctrl',
        'alt': 'alt',
        'escape': 'esc',
        'esc': 'esc',
        'f1': 'f1',
        'f2': 'f2',
        'f3': 'f3',
        'f4': 'f4',
        'f5': 'f5',
        'f6': 'f6',
        'f7': 'f7',
        'f8': 'f8',
        'f9': 'f9',
        'f10': 'f10',
        'f11': 'f11',
        'f12': 'f12',
        'f13': 'f13'
    };
    
    // Check if it's a mapped key
    if (keyMap[key]) {
        for (let element of keyElements) {
            const text = element.textContent.toLowerCase();
            if (text.includes(keyMap[key])) {
                return element;
            }
        }
    }
    
    // Check for letter keys
    if (key.length === 1 && /[a-z]/.test(key)) {
        for (let element of keyElements) {
            const text = element.textContent.toLowerCase();
            if (text === key) {
                return element;
            }
        }
    }
    
    // Check for number keys
    if (key.length === 1 && /[0-9]/.test(key)) {
        for (let element of keyElements) {
            const text = element.textContent.toLowerCase();
            if (text.includes(key)) {
                return element;
            }
        }
    }
    
    // Check for symbol keys
    const symbolMap = {
        '`': '`',
        '~': '~',
        '!': '!',
        '@': '@',
        '#': '#',
        '$': '$',
        '%': '%',
        '^': '^',
        '&': '&',
        '*': '*',
        '(': '(',
        ')': ')',
        '-': '-',
        '_': '_',
        '=': '=',
        '+': '+',
        '[': '[',
        '{': '{',
        ']': ']',
        '}': '}',
        '\\': '\\',
        '|': '|',
        ';': ';',
        ':': ':',
        "'": "'",
        '"': '"',
        ',': ',',
        '<': '<',
        '.': '.',
        '>': '>',
        '/': '/',
        '?': '?'
    };
    
    if (symbolMap[key]) {
        for (let element of keyElements) {
            const text = element.textContent.toLowerCase();
            if (text.includes(symbolMap[key])) {
                return element;
            }
        }
    }
    
    return null;
}

// Highlight key with enhanced visual effect
function highlightKey(keyElement) {
    // Remove any existing highlight
    keyElement.classList.remove('key-highlighted');
    
    // Add highlight class
    keyElement.classList.add('key-highlighted');
    
    // Remove highlight after animation
    setTimeout(() => {
        keyElement.classList.remove('key-highlighted');
    }, 300);
}

// Add keyboard sound effects (optional)
function addKeyboardSoundEffects() {
    // Create audio context for sound effects
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    keys.forEach(key => {
        key.addEventListener('click', function() {
            playKeySound(audioContext);
        });
    });
}

// Play key sound effect
function playKeySound(audioContext) {
    try {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
        // Silently fail if audio context is not available
        console.log('Audio not supported');
    }
}

// Add typing effect to title
function addTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    const cursor = document.querySelector('.cursor');
    
    // Reset the animation
    typingText.style.animation = 'none';
    cursor.style.opacity = '0';
    
    // Trigger reflow
    typingText.offsetHeight;
    
    // Start the animation
    setTimeout(() => {
        typeSiddhisPortfolio();
    }, 500);
}

// Type "Siddhi's Portfolio" with key highlighting
function typeSiddhisPortfolio() {
    const text = "Siddhi's Portfolio";
    const typingText = document.querySelector('.typing-text');
    const cursor = document.querySelector('.cursor');
    
    // Clear the text
    typingText.innerHTML = '';
    
    // Show cursor
    cursor.style.opacity = '1';
    cursor.style.animation = 'blink 1s infinite';
    
    let currentText = '';
    let index = 0;
    
    const typeNextChar = () => {
        if (index < text.length) {
            const char = text[index];
            currentText += char;
            
            // Update the text with proper styling
            if (index < 8) { // "Siddhi's "
                typingText.innerHTML = `<span class="siddhi-text">${currentText}</span>`;
            } else { // "Portfolio"
                const siddhiPart = text.substring(0, 8);
                const portfolioPart = text.substring(8, index + 1);
                typingText.innerHTML = `<span class="siddhi-text">${siddhiPart}</span><span class="portfolio-text">${portfolioPart}</span>`;
            }
            
            // Highlight the corresponding key
            highlightKeyForChar(char);
            
            index++;
            
            // Continue typing after a delay
            setTimeout(typeNextChar, 400);
        } else {
            // Typing complete, keep cursor blinking
            cursor.style.animation = 'blink 1s infinite';
        }
    };
    
    typeNextChar();
}

// Highlight key for specific character
function highlightKeyForChar(char) {
    let keyToFind = char.toLowerCase();
    
    // Special handling for apostrophe
    if (char === "'") {
        keyToFind = "'";
    }
    
    const keyElement = findKeyElement(keyToFind);
    
    if (keyElement) {
        // Remove any existing highlight
        keyElement.classList.remove('key-highlighted');
        
        // Add highlight class
        keyElement.classList.add('key-highlighted');
        
        // Remove highlight after animation
        setTimeout(() => {
            keyElement.classList.remove('key-highlighted');
        }, 300);
    }
}

// Add hover effects for better interactivity
function addHoverEffects() {
    keys.forEach(key => {
        key.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        key.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Add parallax effect to keyboard
function addParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const keyboard = document.querySelector('.keyboard');
        const rate = scrolled * -0.5;
        
        if (keyboard) {
            keyboard.style.transform = `translateY(${rate}px)`;
        }
    });
}



// Add loading animation
function addLoadingAnimation() {
    const keyboard = document.querySelector('.keyboard');
    
    if (keyboard) {
        keyboard.style.opacity = '0';
        keyboard.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            keyboard.style.transition = 'all 0.8s ease-out';
            keyboard.style.opacity = '1';
            keyboard.style.transform = 'translateY(0)';
        }, 300);
    }
}

// Initialize additional effects
document.addEventListener('DOMContentLoaded', function() {
    addHoverEffects();
    addParallaxEffect();
    addLoadingAnimation();
});



 