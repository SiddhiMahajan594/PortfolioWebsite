'use client';

import Head from 'next/head';
import Script from 'next/script';
import '@/app/globals.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>My Portfolio - Keyboard Interface</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

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
              {['~`', '!1', '@2', '#3', '$4', '%5', '^6', '&7', '*8', '(9', ')0', '_-', '+='].map((combo, i) => {
                const [top, bottom] = combo.split('');
                return (
                  <div className="key number-key" key={i}>
                    <span className="top-char">{top}</span>
                    <span className="bottom-char">{bottom}</span>
                  </div>
                );
              })}
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
              {['Alt', 'Fn', '←'].map(key => (
                <div className="key control-key" key={key}>{key}</div>
              ))}
            </div>
          </div>
        </main>

        <section className="about-section"></section>
      </div>

      {/* External Scripts */}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" strategy="beforeInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js" strategy="beforeInteractive" />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
