// DOM Elements
const keys = document.querySelectorAll('.key');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeKeyboard();
    addKeyboardSoundEffects();
    // addTypingEffect();
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
    
    // Clear the text and make it visible
    typingText.innerHTML = '';
    typingText.style.opacity = '1';
    
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
            gsap.to(this, {
                y: -2,
                duration: 0.1,
                ease: "power2.out"
            });
        });
        
        key.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                duration: 0.1,
                ease: "power2.out"
            });
        });
    });
}

// Add scroll effects for navigation keys
function addScrollEffects() {
    const navKeys = document.querySelectorAll('.nav-key');
    
    // Function to find specific letter keys by their text content
    function findLetterKey(letter) {
        const letterKeys = document.querySelectorAll('.key.letter-key');
        for (let key of letterKeys) {
            if (key.textContent.trim() === letter) {
                return key;
            }
        }
        return null;
    }
    
    const originalKeys = {
        'A': findLetterKey('A'),
        'S': findLetterKey('S'),
        'P': findLetterKey('P'),
        'C': findLetterKey('C')
    };
    
    // Debug: Log which keys were found
    Object.keys(originalKeys).forEach(key => {
        if (originalKeys[key]) {
            console.log(`Found key ${key}:`, originalKeys[key].textContent);
        } else {
            console.log(`Key ${key} not found`);
        }
    });
    
    let keysFlying = false;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const triggerPoint = 300; // Start effect after 300px scroll
        
        if (scrolled > triggerPoint && !keysFlying) {
            keysFlying = true;
            flyKeysToHeader(originalKeys, navKeys);
        } else if (scrolled <= triggerPoint && keysFlying) {
            keysFlying = false;
            returnKeysToKeyboard(originalKeys, navKeys);
        }
    });
}

// Fly keys to header
function flyKeysToHeader(originalKeys, navKeys) {
    const navKeyMap = {
        'A': navKeys[0], // About
        'S': navKeys[1], // Skills
        'P': navKeys[2], // Projects
        'C': navKeys[3]  // Contact
    };
    
    Object.keys(originalKeys).forEach((key, index) => {
        const originalKey = originalKeys[key];
        const navKey = navKeyMap[key];
        
        if (originalKey && navKey) {
            console.log(`Flying key ${key} from keyboard to header`);
            
            // Get original key position relative to viewport
            const rect = originalKey.getBoundingClientRect();
            const startX = rect.left;
            const startY = rect.top;
            
            // Get nav key position
            const navRect = navKey.getBoundingClientRect();
            const endX = navRect.left;
            const endY = navRect.top;
            
            // Create flying key clone with exact styling
            const flyingKey = originalKey.cloneNode(true);
            flyingKey.style.position = 'fixed';
            flyingKey.style.left = startX + 'px';
            flyingKey.style.top = startY + 'px';
            flyingKey.style.zIndex = '9999';
            flyingKey.style.pointerEvents = 'none';
            flyingKey.style.transform = 'none';
            flyingKey.style.transition = 'none';
            flyingKey.style.boxShadow = originalKey.style.boxShadow || 
                '3px 3px 0 var(--space-cadet), 0 0 0 1px var(--space-cadet)';
            document.body.appendChild(flyingKey);
            
            // Calculate the exact movement needed
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            // Animate flying key with precise movement
            gsap.fromTo(flyingKey, 
                {
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotation: 0
                },
                {
                    x: deltaX,
                    y: deltaY,
                    scale: 0.8,
                    rotation: 360,
                    duration: 2,
                    ease: "back.out(1.7)",
                    onComplete: () => {
                        // Remove flying key
                        document.body.removeChild(flyingKey);
                        // Show nav key
                        navKey.classList.add('visible');
                    }
                }
            );
            
            // Hide original key
            gsap.to(originalKey, {
                opacity: 0.3,
                scale: 0.9,
                duration: 0.5
            });
        } else {
            console.log(`Could not find key ${key} or nav key`);
        }
    });
}

// Return keys to keyboard
function returnKeysToKeyboard(originalKeys, navKeys) {
    const navKeyMap = {
        'A': navKeys[0], // About
        'S': navKeys[1], // Skills
        'P': navKeys[2], // Projects
        'C': navKeys[3]  // Contact
    };
    
    Object.keys(originalKeys).forEach((key, index) => {
        const originalKey = originalKeys[key];
        const navKey = navKeyMap[key];
        
        if (originalKey && navKey) {
            // Get original key position
            const rect = originalKey.getBoundingClientRect();
            const endX = rect.left;
            const endY = rect.top;
            
            // Get nav key position
            const navRect = navKey.getBoundingClientRect();
            const startX = navRect.left;
            const startY = navRect.top;
            
            // Create flying key clone
            const flyingKey = navKey.cloneNode(true);
            flyingKey.style.position = 'fixed';
            flyingKey.style.left = startX + 'px';
            flyingKey.style.top = startY + 'px';
            flyingKey.style.zIndex = '9999';
            flyingKey.style.pointerEvents = 'none';
            flyingKey.style.transform = 'none';
            flyingKey.style.transition = 'none';
            document.body.appendChild(flyingKey);
            
            // Calculate the exact movement needed
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            // Animate flying key back to keyboard
            gsap.fromTo(flyingKey, 
                {
                    x: 0,
                    y: 0,
                    scale: 0.8,
                    rotation: 0
                },
                {
                    x: deltaX,
                    y: deltaY,
                    scale: 1,
                    rotation: -360,
                    duration: 1.5,
                    ease: "back.out(1.7)",
                    onComplete: () => {
                        // Remove flying key
                        document.body.removeChild(flyingKey);
                    }
                }
            );
            
            // Hide nav key
            navKey.classList.remove('visible');
            
            // Restore original key
            gsap.to(originalKey, {
                opacity: 1,
                scale: 1,
                duration: 0.5
            });
        }
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

// Flying keys animation using GSAP with different animations for each key type
function animateFlyingKeys() {
    const keys = document.querySelectorAll('.key');
    const keyboard = document.querySelector('.keyboard');
    
    // Set initial position for keyboard (below screen)
    gsap.set(keyboard, {
        opacity: 0,
        scale: 0.8,
        y: window.innerHeight + 200,
        rotation: -5
    });
    
    // Animate keyboard flying up from below
    gsap.to(keyboard, {
        opacity: 1,
        scale: 1,
        y: 0,
        rotation: 0,
        duration: 2,
        ease: "back.out(1.7)"
    });
    
    // Different animations for different key types
    keys.forEach((key, index) => {
        const keyType = getKeyType(key);
        const animation = getKeyAnimation(keyType, index);
        
        // Set initial position based on animation type
        gsap.set(key, animation.initial);
        
        // Animate to final position
        gsap.to(key, {
            ...animation.final,
            delay: index * 0.05, // Slower staggered timing
            onComplete: () => {
                if (index === keys.length - 1) {
                    // Start typing animation after all keys have settled
                    setTimeout(() => {
                        typeSiddhisPortfolio();
                    }, 800);
                }
            }
        });
    });
}

// Get the type of key for animation
function getKeyType(key) {
    if (key.classList.contains('function-key')) return 'function';
    if (key.classList.contains('number-key')) return 'number';
    if (key.classList.contains('letter-key')) return 'letter';
    if (key.classList.contains('symbol-key')) return 'symbol';
    if (key.classList.contains('space-key')) return 'space';
    if (key.classList.contains('enter-key')) return 'enter';
    if (key.classList.contains('backspace-key')) return 'backspace';
    if (key.classList.contains('shift-key')) return 'shift';
    if (key.classList.contains('control-key')) return 'control';
    if (key.classList.contains('arrow-key')) return 'arrow';
    if (key.classList.contains('tab-key')) return 'tab';
    if (key.classList.contains('caps-key')) return 'caps';
    return 'default';
}

// Get animation configuration for each key type
function getKeyAnimation(keyType, index) {
    const animations = {
        function: {
            initial: {
                opacity: 0,
                scale: 0,
                rotation: 720,
                x: () => (Math.random() - 0.5) * window.innerWidth * 3,
                y: () => -window.innerHeight - 100,
                z: () => Math.random() * 2000
            },
            final: {
                opacity: 1,
                scale: 1,
                rotation: 0,
                x: 0,
                y: 0,
                z: 0,
                duration: 3,
                ease: "elastic.out(1, 0.3)"
            }
        },
        number: {
            initial: {
                opacity: 0,
                scale: 0,
                rotation: -360,
                x: () => window.innerWidth + 100,
                y: () => (Math.random() - 0.5) * window.innerHeight * 2,
                z: () => Math.random() * 1500
            },
            final: {
                opacity: 1,
                scale: 1,
                rotation: 0,
                x: 0,
                y: 0,
                z: 0,
                duration: 2.5,
                ease: "back.out(1.7)"
            }
        },
        letter: {
            initial: {
                opacity: 0,
                scale: 0,
                rotation: 180,
                x: () => (Math.random() - 0.5) * window.innerWidth * 2.5,
                y: () => (Math.random() - 0.5) * window.innerHeight * 2.5,
                z: () => Math.random() * 1000
            },
            final: {
                opacity: 1,
                scale: 1,
                rotation: 0,
                x: 0,
                y: 0,
                z: 0,
                duration: 2.2,
                ease: "bounce.out"
            }
        },
        symbol: {
            initial: {
                opacity: 0,
                scale: 0,
                rotation: 540,
                x: () => -window.innerWidth - 100,
                y: () => (Math.random() - 0.5) * window.innerHeight * 2,
                z: () => Math.random() * 1200
            },
            final: {
                opacity: 1,
                scale: 1,
                rotation: 0,
                x: 0,
                y: 0,
                z: 0,
                duration: 2.3,
                ease: "power3.out"
            }
        },
        space: {
            initial: {
                opacity: 0,
                scale: 0,
                rotation: 0,
                x: () => (Math.random() - 0.5) * window.innerWidth * 1.5,
                y: () => window.innerHeight + 100,
                z: () => Math.random() * 800
            },
            final: {
                opacity: 1,
                scale: 1,
                rotation: 0,
                x: 0,
                y: 0,
                z: 0,
                duration: 3.2,
                ease: "elastic.out(1, 0.5)"
            }
        },
        enter: {
            initial: {
                opacity: 0,
                scale: 0,
                rotation: 360,
                x: () => window.innerWidth + 200,
                y: () => -window.innerHeight - 200,
                z: () => Math.random() * 1800
            },
            final: {
                opacity: 1,
                scale: 1,
                rotation: 0,
                x: 0,
                y: 0,
                z: 0,
                duration: 3.5,
                ease: "back.out(2)"
            }
        },
        backspace: {
            initial: {
                opacity: 0,
                scale: 0,
                rotation: -720,
                x: () => -window.innerWidth - 200,
                y: () => -window.innerHeight - 200,
                z: () => Math.random() * 2000
            },
            final: {
                opacity: 1,
                scale: 1,
                rotation: 0,
                x: 0,
                y: 0,
                z: 0,
                duration: 3.3,
                ease: "elastic.out(1, 0.4)"
            }
        },
        shift: {
            initial: {
                opacity: 0,
                scale: 0,
                rotation: 270,
                x: () => (Math.random() - 0.5) * window.innerWidth * 3,
                y: () => window.innerHeight + 200,
                z: () => Math.random() * 1600
            },
            final: {
                opacity: 1,
                scale: 1,
                rotation: 0,
                x: 0,
                y: 0,
                z: 0,
                duration: 2.8,
                ease: "power4.out"
            }
        },
        control: {
            initial: {
                opacity: 0,
                scale: 0,
                rotation: 90,
                x: () => (Math.random() - 0.5) * window.innerWidth * 2.8,
                y: () => (Math.random() - 0.5) * window.innerHeight * 2.8,
                z: () => Math.random() * 1400
            },
            final: {
                opacity: 1,
                scale: 1,
                rotation: 0,
                x: 0,
                y: 0,
                z: 0,
                duration: 2.6,
                ease: "power2.out"
            }
        },
        arrow: {
            initial: {
                opacity: 0,
                scale: 0,
                rotation: 180,
                x: () => window.innerWidth + 300,
                y: () => window.innerHeight + 300,
                z: () => Math.random() * 2200
            },
            final: {
                opacity: 1,
                scale: 1,
                rotation: 0,
                x: 0,
                y: 0,
                z: 0,
                duration: 3.1,
                ease: "back.out(1.5)"
            }
        },
        tab: {
            initial: {
                opacity: 0,
                scale: 0,
                rotation: 450,
                x: () => -window.innerWidth - 300,
                y: () => window.innerHeight + 300,
                z: () => Math.random() * 1900
            },
            final: {
                opacity: 1,
                scale: 1,
                rotation: 0,
                x: 0,
                y: 0,
                z: 0,
                duration: 3.4,
                ease: "elastic.out(1, 0.6)"
            }
        },
        caps: {
            initial: {
                opacity: 0,
                scale: 0,
                rotation: -540,
                x: () => (Math.random() - 0.5) * window.innerWidth * 3.2,
                y: () => -window.innerHeight - 300,
                z: () => Math.random() * 2400
            },
            final: {
                opacity: 1,
                scale: 1,
                rotation: 0,
                x: 0,
                y: 0,
                z: 0,
                duration: 3.6,
                ease: "back.out(2.5)"
            }
        },
        default: {
            initial: {
                opacity: 0,
                scale: 0,
                rotation: 360,
                x: () => (Math.random() - 0.5) * window.innerWidth * 2,
                y: () => (Math.random() - 0.5) * window.innerHeight * 2,
                z: () => Math.random() * 1000
            },
            final: {
                opacity: 1,
                scale: 1,
                rotation: 0,
                x: 0,
                y: 0,
                z: 0,
                duration: 2.7,
                ease: "back.out(1.7)"
            }
        }
    };
    
    return animations[keyType] || animations.default;
}

// Initialize additional effects
document.addEventListener('DOMContentLoaded', function() {
    addHoverEffects();
    addParallaxEffect();
    addScrollEffects();
    
    // Start with flying keys animation instead of loading animation
    animateFlyingKeys();
});



 