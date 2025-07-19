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
    
    for (let element of keyElements) {
        const text = element.textContent.toLowerCase();
        if (text.includes(key) || element.textContent.toLowerCase() === key) {
            return element;
        }
    }
    
    return null;
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
    const title = document.querySelector('.title');
    const originalText = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
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



 