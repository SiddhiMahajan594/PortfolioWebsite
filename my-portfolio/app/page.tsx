// app/page.tsx
'use client';

import { useEffect, useRef, useState, MutableRefObject } from 'react';
import gsap from 'gsap';
import './globals.css';

const headerKeysArray = ['A', 'S', 'P', 'C'] as const;
type HeaderKey = typeof headerKeysArray[number];

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const typingRef = useRef<HTMLSpanElement>(null);
  const keyboardRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const rowRefs = [
    useRef<HTMLDivElement>(null), // Function keys
    useRef<HTMLDivElement>(null), // Number keys
    useRef<HTMLDivElement>(null), // QWERTY
    useRef<HTMLDivElement>(null), // ASDF
    useRef<HTMLDivElement>(null), // ZXCV
    useRef<HTMLDivElement>(null), // Control row
  ];
  const [showKeys, setShowKeys] = useState(false);
  const [typingDone, setTypingDone] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = "Siddhi's Portfolio";
  const [showHeaderKeys, setShowHeaderKeys] = useState(false);
  const [headerKeysVisible, setHeaderKeysVisible] = useState(false);
  const [isAnimatingKeys, setIsAnimatingKeys] = useState(false);
  const lastShowRef = useRef(false);
  const keyRefs: Record<HeaderKey, MutableRefObject<HTMLDivElement | null>> = {
    A: useRef<HTMLDivElement>(null),
    S: useRef<HTMLDivElement>(null),
    P: useRef<HTMLDivElement>(null),
    C: useRef<HTMLDivElement>(null),
  };
  const headerKeyRefs: Record<HeaderKey, MutableRefObject<HTMLDivElement | null>> = {
    A: useRef<HTMLDivElement>(null),
    S: useRef<HTMLDivElement>(null),
    P: useRef<HTMLDivElement>(null),
    C: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    // Typing effect for the title
    if (typingRef.current) {
      gsap.to(typingRef.current, {
        opacity: 1,
        width: '100%',
        duration: 1.5,
        ease: 'power2.out',
        onStart: () => {
          typingRef.current!.style.borderRight = '3px solid var(--sapphire)';
        },
        onComplete: () => {
          typingRef.current!.style.borderRight = 'none';
        }
      });
    }
    // Animate the keyboard container
    if (keyboardRef.current) {
      gsap.fromTo(
        keyboardRef.current,
        { y: 120, opacity: 0, scale: 1 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.5,
          ease: 'power3.out',
          onComplete: () => {
            setShowKeys(true);
            // Animate all keys in random order with type-specific easing
            const keys = Array.from(keyboardRef.current!.querySelectorAll('.key'));
            // Shuffle the keys array
            for (let i = keys.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [keys[i], keys[j]] = [keys[j], keys[i]];
            }
            keys.forEach((key, idx) => {
              // Generate random start positions and rotation
              const randX = Math.floor(Math.random() * 600) - 300;
              const randY = Math.floor(Math.random() * 600) - 300;
              const randRot = Math.floor(Math.random() * 360) - 180;
              // Default values
              let fromVars: any = { x: randX, y: randY, rotation: randRot, opacity: 0 };
              let toVars: any = { x: 0, y: 0, rotation: 0, opacity: 1, duration: 0.8, delay: 0.8 + idx * 0.04 + Math.random() * 0.05, ease: 'back.out(1.7)' };
              if (key.classList.contains('function-key')) {
                toVars = { ...toVars, duration: 1.2, ease: 'power3.out' };
              } else if (key.classList.contains('number-key')) {
                toVars = { ...toVars, duration: 0.9, ease: 'power3.out' };
              } else if (key.classList.contains('letter-key')) {
                toVars = { ...toVars, duration: 1, ease: 'power3.out' };
              } else if (key.classList.contains('symbol-key')) {
                toVars = { ...toVars, duration: 0.8, ease: 'power3.out' };
              } else if (key.classList.contains('space-key')) {
                toVars = { ...toVars, duration: 1.3, ease: 'power3.out' };
              } else if (key.classList.contains('enter-key')) {
                toVars = { ...toVars, duration: 1, ease: 'power3.out' };
              } else if (key.classList.contains('backspace-key')) {
                toVars = { ...toVars, duration: 1.1, ease: 'power3.out' };
              } else if (key.classList.contains('shift-key')) {
                toVars = { ...toVars, duration: 0.8, ease: 'power3.out' };
              } else if (key.classList.contains('control-key')) {
                toVars = { ...toVars, duration: 0.7, ease: 'power3.out' };
              } else if (key.classList.contains('arrow-key')) {
                toVars = { ...toVars, duration: 0.9, ease: 'power3.out' };
              } else if (key.classList.contains('tab-key')) {
                toVars = { ...toVars, duration: 1.1, ease: 'power3.out' };
              } else if (key.classList.contains('caps-key')) {
                toVars = { ...toVars, duration: 1.1, ease: 'power3.out' };
              }
              gsap.fromTo(key, fromVars, toVars);
            });
            // After all keys are in, start typing animation
            setTimeout(() => {
              let current = 0;
              let prevKey: HTMLElement | null = null;
              const typeNext = () => {
                setTypedText(fullText.slice(0, current + 1));
                // Highlight the corresponding key
                if (keyboardRef.current) {
                  // Remove highlight from previous key
                  if (prevKey) prevKey.classList.remove('key-highlighted');
                  const char = fullText[current];
                  let selector = '';
                  if (char === ' ') selector = '.space-key';
                  else if (char === '\'') selector = ".key.symbol-key span.bottom-char:contains(''')";
                  else if (char === '"') selector = ".key.symbol-key span.top-char:contains('\\\"')";
                  else if (char === '\n') selector = '.enter-key';
                  else if (char === '\t') selector = '.tab-key';
                  else if (char === '-') selector = ".key.number-key span.bottom-char:contains('-')";
                  else if (char === '=') selector = ".key.number-key span.bottom-char:contains('=')";
                  else if (char === 'S' || char === 'P') selector = `.key.letter-key:contains(${char})`;
                  else if (/^[a-zA-Z]$/.test(char)) selector = `.key.letter-key:contains(${char.toUpperCase()})`;
                  else selector = `.key:contains(${char})`;
                  // Custom logic to find the key element
                  let keyEl: HTMLElement | null = null;
                  // Try to find by letter
                  if (/^[a-zA-Z]$/.test(char)) {
                    keyEl = Array.from(keyboardRef.current.querySelectorAll('.key.letter-key')).find(
                      el => el.textContent === char.toUpperCase()
                    ) as HTMLElement | undefined || null;
                  } else if (char === ' ') {
                    keyEl = keyboardRef.current.querySelector('.space-key') as HTMLElement;
                  } else if (char === "'") {
                    keyEl = Array.from(keyboardRef.current.querySelectorAll('.key.symbol-key')).find(
                      el => el.textContent && el.textContent.includes("'")
                    ) as HTMLElement | undefined || null;
                  } else {
                    // Fallback: find any key containing the char
                    keyEl = Array.from(keyboardRef.current.querySelectorAll('.key')).find(
                      el => el.textContent && el.textContent.replace(/\s/g, '').includes(char)
                    ) as HTMLElement | undefined || null;
                  }
                  if (keyEl) {
                    keyEl.classList.add('key-highlighted');
                    prevKey = keyEl;
                  } else {
                    prevKey = null;
                  }
                }
                current++;
                if (current < fullText.length) {
                  setTimeout(typeNext, 180);
                } else {
                  if (prevKey) prevKey.classList.remove('key-highlighted');
                  setTypingDone(true);
                }
              };
              typeNext();
            }, 1200 + keys.length * 40); // Wait for all keys to finish
          }
        }
      );
    }
    // Animate about section fade in
    if (aboutRef.current) {
      gsap.fromTo(
        aboutRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, delay: 2.1, ease: 'power2.out' }
      );
    }
    // Sticky header keys scroll logic
    let scrollTimeout: NodeJS.Timeout | null = null;
    const handleScroll = () => {
      if (isAnimatingKeys) return;
      if (!keyboardRef.current) return;
      const keyboardBottom = keyboardRef.current.getBoundingClientRect().bottom;
      const shouldShow = keyboardBottom < 60; // 60px = navbar height
      if (shouldShow !== lastShowRef.current) {
        setIsAnimatingKeys(true);
        const animations = headerKeysArray.map((k) => {
          const fromEl = shouldShow ? keyRefs[k].current : headerKeyRefs[k].current;
          const toEl = shouldShow ? headerKeyRefs[k].current : keyRefs[k].current;
          if (!fromEl || !toEl) return Promise.resolve();
          const fromRect = fromEl.getBoundingClientRect();
          const toRect = toEl.getBoundingClientRect();
          const dx = toRect.left - fromRect.left;
          const dy = toRect.top - fromRect.top;
          // Clone the key for animation
          const clone = fromEl.cloneNode(true) as HTMLElement;
          document.body.appendChild(clone);
          Object.assign(clone.style, {
            position: 'fixed',
            left: fromRect.left + 'px',
            top: fromRect.top + 'px',
            width: fromRect.width + 'px',
            height: fromRect.height + 'px',
            zIndex: 3000,
            margin: 0,
            pointerEvents: 'none',
          });
          fromEl.style.visibility = 'hidden';
          toEl.style.visibility = 'hidden';
          return gsap.to(clone, {
            x: dx,
            y: dy,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => {
              clone.remove();
              fromEl.style.visibility = '';
              toEl.style.visibility = '';
            },
          }).then(() => {});
        });
        Promise.all(animations).then(() => {
          setShowHeaderKeys(shouldShow);
          setTimeout(() => {
            setHeaderKeysVisible(shouldShow);
            setIsAnimatingKeys(false);
          }, 10); // allow DOM to update
        });
      }
      lastShowRef.current = shouldShow;
    };
    const debouncedScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 10);
    };
    window.addEventListener('scroll', debouncedScroll);
    return () => {
      window.removeEventListener('scroll', debouncedScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [isAnimatingKeys]);

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
        key.addEventListener('click', function(this: HTMLElement) {
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
      <nav className="navbar">
        {headerKeysVisible && (
          <div className={`header-keys show`}
               style={{ right: 0, left: 'auto', position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}>
            {headerKeysArray.map((key) => (
              <div className="key header-key" key={key} ref={headerKeyRefs[key]} style={{ visibility: 'visible' }}>{key}</div>
            ))}
          </div>
        )}
      </nav>
      <div className="container">
        <header id="header">
          <h1 className="title" ref={titleRef}>
            <span className="typing-text" ref={typingRef}>
              {typedText.split('').map((char, i) => {
                // Handle space character to allow proper wrapping
                if (char === ' ') {
                  return <span key={i} style={{ whiteSpace: 'pre' }}> </span>;
                }
                // Siddhi = 0-7 (including apostrophe), Portfolio = 9-18
                if (i >= 0 && i <= 7) {
                  return <span key={i} className="siddhi-text">{char}</span>;
                } else if (i >= 9 && i <= 18) {
                  return <span key={i} className="portfolio-text">{char}</span>;
                } else {
                  return <span key={i}>{char}</span>;
                }
              })}
              {/* Move cursor inside the typing-text span */}
              {typedText.length > 0 && <span className="cursor">|</span>}
            </span>
            {/* Show cursor outside only if no text is typed yet */}
            {typedText.length === 0 && <span className="cursor">|</span>}
          </h1>
        </header>
        <main className="keyboard-container">
          <div className={`keyboard${!showKeys ? ' keys-hidden' : ''}`} ref={keyboardRef}>
            {/* Function Keys Row */}
            <div className="keyboard-row" ref={rowRefs[0]}>
              {['Esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'F13'].map(key => (
                <div className="key function-key" key={key}>{key}</div>
              ))}
            </div>
            {/* Number Row */}
            <div className="keyboard-row" ref={rowRefs[1]}>
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
            <div className="keyboard-row" ref={rowRefs[2]}>
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
            <div className="keyboard-row" ref={rowRefs[3]}>
              <div className="key caps-key">Caps</div>
              {'ASDFGHJKL'.split('').map(letter => (
                headerKeysArray.includes(letter as HeaderKey)
                  ? <div className="key letter-key" key={letter} ref={keyRefs[letter as HeaderKey]} style={{ visibility: headerKeysVisible ? 'hidden' : 'visible' }}>{letter}</div>
                  : <div className="key letter-key" key={letter}>{letter}</div>
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
            <div className="keyboard-row" ref={rowRefs[4]}>
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
            <div className="keyboard-row" ref={rowRefs[5]}>
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
        <section className="about-section" ref={aboutRef}></section>
      </div>
    </>
  );
}

