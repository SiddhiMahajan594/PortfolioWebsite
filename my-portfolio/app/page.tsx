// app/page.tsx
'use client';

import { useEffect } from 'react';
import './globals.css';

export default function Home() {
  useEffect(() => {
    // Initialize keyboard functionality after component mounts
    const initializeKeyboard = () => {
      const keys = document.querySelectorAll('.key');
      
      // Add click event listeners to all keys for visual feedback
      keys.forEach(key => {
        key.addEventListener('click', function(this: HTMLElement) {
          addKeyPressEffect(this);
        });
      });

      // Add keyboard event listeners for physical keyboard interaction
      document.addEventListener('keydown', handleKeyPress);
      document.addEventListener('keyup', handleKeyRelease);
    };

    // Add key press visual effect
    const addKeyPressEffect = (keyElement: HTMLElement) => {
      keyElement.style.transform = 'translateY(2px)';
      keyElement.style.boxShadow = '0 2px 6px rgba(35, 140, 255, 0.3)';
      
      setTimeout(() => {
        keyElement.style.transform = '';
        keyElement.style.boxShadow = '';
      }, 150);
    };

    // Handle physical keyboard key press
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const keyElement = findKeyElement(key);
      
      if (keyElement) {
        addKeyPressEffect(keyElement);
        highlightKey(keyElement);
      }
    };

    // Handle physical keyboard key release
    const handleKeyRelease = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const keyElement = findKeyElement(key);
      
      if (keyElement) {
        keyElement.style.transform = '';
        keyElement.style.boxShadow = '';
      }
    };

    // Find key element by character
    const findKeyElement = (key: string): HTMLElement | null => {
      const keyElements = document.querySelectorAll('.key');
      
      // Special handling for space character
      if (key === ' ') {
        for (let i = 0; i < keyElements.length; i++) {
          const element = keyElements[i];
          if (element.classList.contains('space-key')) {
            return element as HTMLElement;
          }
        }
        return null;
      }
      
      // Key mapping for special characters and common keys
      const keyMap: { [key: string]: string } = {
        'enter': 'enter',
        'backspace': 'backspace',
        'tab': 'tab',
        'caps lock': 'caps',
        'shift': 'shift',
        'ctrl': 'ctrl',
        'alt': 'alt',
        'escape': 'esc',
        'esc': 'esc',
        'f1': 'f1', 'f2': 'f2', 'f3': 'f3', 'f4': 'f4',
        'f5': 'f5', 'f6': 'f6', 'f7': 'f7', 'f8': 'f8',
        'f9': 'f9', 'f10': 'f10', 'f11': 'f11', 'f12': 'f12', 'f13': 'f13'
      };
      
      // Check if it's a mapped key
      if (keyMap[key]) {
        for (let i = 0; i < keyElements.length; i++) {
          const element = keyElements[i];
          const text = element.textContent?.toLowerCase();
          if (text?.includes(keyMap[key])) {
            return element as HTMLElement;
          }
        }
      }
      
      // Check for letter keys
      if (key.length === 1 && /[a-z]/.test(key)) {
        for (let i = 0; i < keyElements.length; i++) {
          const element = keyElements[i];
          const text = element.textContent?.toLowerCase();
          if (text === key) {
            return element as HTMLElement;
          }
        }
      }
      
      // Check for number keys
      if (key.length === 1 && /[0-9]/.test(key)) {
        for (let i = 0; i < keyElements.length; i++) {
          const element = keyElements[i];
          const text = element.textContent?.toLowerCase();
          if (text?.includes(key)) {
            return element as HTMLElement;
          }
        }
      }
      
      return null;
    };

    // Highlight key with enhanced visual effect
    const highlightKey = (keyElement: HTMLElement) => {
      keyElement.classList.remove('key-highlighted');
      keyElement.classList.add('key-highlighted');
      
      setTimeout(() => {
        keyElement.classList.remove('key-highlighted');
      }, 300);
    };

    // Add keyboard sound effects
    const addKeyboardSoundEffects = () => {
      const keys = document.querySelectorAll('.key');
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      keys.forEach(key => {
        key.addEventListener('click', function() {
          playKeySound(audioContext);
        });
      });
    };

    // Play key sound effect
    const playKeySound = (audioContext: AudioContext) => {
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
        console.log('Audio not supported');
      }
    };

    // Initialize everything
    initializeKeyboard();
    addKeyboardSoundEffects();

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('keyup', handleKeyRelease);
    };
  }, []);

  return (
    <>
      <nav className="navbar"></nav>

      <div className="container">
        <header id="header">
          <h1 className="title">
            <span className="typing-text">
              <span className="siddhi-text">Siddhi&apos;s </span>
              <span className="portfolio-text">Portfolio</span>
            </span>
            <span className="cursor">|</span>
          </h1>
        </header>

        <main className="keyboard-container">
          <div className="keyboard">
            {/* Function Keys Row */}
            <div className="keyboard-row">
              {['Esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'F13'].map(key => (
                <div className="key function-key" key={key}>{key}</div>
              ))}
            </div>

            {/* Number Row */}
            <div className="keyboard-row">
              {[
                ['~', '`'], ['!', '1'], ['@', '2'], ['#', '3'], ['$', '4'], 
                ['%', '5'], ['^', '6'], ['&', '7'], ['*', '8'], ['(', '9'], 
                [')', '0'], ['_', '-'], ['+', '=']
              ].map(([top, bottom], i) => (
                <div className="key number-key" key={i}>
                  <span className="top-char">{top}</span>
                  <span className="bottom-char">{bottom}</span>
                </div>
              ))}
              <div className="key backspace-key">Backspace</div>
            </div>

            {/* QWERTY Row */}
            <div className="keyboard-row">
              <div className="key tab-key">Tab</div>
              {'QWERTYUIOP'.split('').map(letter => (
                <div className="key letter-key" key={letter}>{letter}</div>
              ))}
              {[['{', '['], ['}', ']'], ['|', '\\']].map(([top, bottom], i) => (
                <div className="key symbol-key" key={i}>
                  <span className="top-char">{top}</span>
                  <span className="bottom-char">{bottom}</span>
                </div>
              ))}
            </div>

            {/* ASDF Row */}
            <div className="keyboard-row">
              <div className="key caps-key">Caps</div>
              {'ASDFGHJKL'.split('').map(letter => (
                <div className="key letter-key" key={letter}>{letter}</div>
              ))}
              {[[':', ';'], ['"', "'"]].map(([top, bottom], i) => (
                <div className="key symbol-key" key={i}>
                  <span className="top-char">{top}</span>
                  <span className="bottom-char">{bottom}</span>
                </div>
              ))}
              <div className="key enter-key">Enter</div>
            </div>

            {/* ZXCV Row */}
            <div className="keyboard-row">
              <div className="key shift-key">Shift</div>
              {'ZXCVBNM'.split('').map(letter => (
                <div className="key letter-key" key={letter}>{letter}</div>
              ))}
              {[['<', ','], ['>', '.'], ['?', '/']].map(([top, bottom], i) => (
                <div className="key symbol-key" key={i}>
                  <span className="top-char">{top}</span>
                  <span className="bottom-char">{bottom}</span>
                </div>
              ))}
              <div className="key shift-key">Shift</div>
            </div>

            {/* Control Row */}
            <div className="keyboard-row">
              {['Ctrl', 'Alt', 'Win'].map(key => (
                <div className="key control-key" key={key}>{key}</div>
              ))}
              <div className="key space-key">Space</div>
              <div className="key control-key">Alt</div>
              <div className="key control-key">Fn</div>
              <div className="key arrow-key">←</div>
            </div>
          </div>
        </main>

        <section className="about-section"></section>
      </div>
    </>
  );
}

