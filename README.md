# Keyboard Portfolio Website

A unique, interactive portfolio website designed to look like a computer keyboard. Built with HTML, CSS, and JavaScript, featuring a Floral White background (#FFF9EF) and Dodger Blue borders (#238CFF).

## 🎨 Design Features

- **Keyboard Interface**: Realistic keyboard layout with clickable keys
- **Color Scheme**: Floral White background with Dodger Blue accents
- **Interactive Elements**: Hover effects, key press animations, and sound effects
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Accessibility**: Full keyboard navigation and ARIA labels

## 🚀 Features

### Visual Design
- Authentic keyboard layout with proper key sizing
- Smooth animations and transitions
- Typing effect on the title
- Parallax scrolling effects
- Hover animations on all keys

### Interactive Functionality
- **About Key**: Navigate to the About section
- **Projects Key**: Navigate to the Projects section  
- **Contact Key**: Navigate to the Contact section
- Physical keyboard support (Ctrl+A, Ctrl+P, Ctrl+C)
- Visual feedback on key presses
- Optional sound effects

### Content Sections
- **About**: Personal information and skills
- **Projects**: Portfolio projects with descriptions
- **Contact**: Contact information and social links

## 🎯 How to Use

### Mouse Navigation
1. Click on the **About** key to view your personal information
2. Click on the **Projects** key to see your portfolio projects
3. Click on the **Contact** key to view contact information

### Keyboard Shortcuts
- `Ctrl + A`: Navigate to About section
- `Ctrl + P`: Navigate to Projects section
- `Ctrl + C`: Navigate to Contact section

### Physical Keyboard Interaction
- Type on your physical keyboard to see visual feedback on the virtual keys
- All keys respond to their corresponding physical key presses

## 📁 File Structure

```
PortfolioWebsite/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🛠️ Customization

### Colors
The website uses a custom color scheme that can be easily modified in `styles.css`:

```css
/* Main colors */
--background-color: #FFF9EF;  /* Floral White */
--border-color: #238CFF;      /* Dodger Blue */
```

### Content
Edit the content in `index.html` to personalize:
- Update the title
- Modify the About section with your information
- Add your own projects to the Projects section
- Update contact information in the Contact section

### Skills
Add or remove skills in the About section by editing the skill tags:

```html
<div class="skill-tags">
    <span class="skill-tag">Your Skill</span>
    <span class="skill-tag">Another Skill</span>
</div>
```

### Projects
Add your projects by duplicating the project card structure:

```html
<div class="project-card">
    <h3>Project Name</h3>
    <p>Project description</p>
    <div class="project-tech">Technologies used</div>
</div>
```

## 🌐 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 📱 Responsive Design

The website is fully responsive and adapts to different screen sizes:
- **Desktop**: Full keyboard layout with all features
- **Tablet**: Scaled-down keyboard with maintained functionality
- **Mobile**: Compact layout optimized for touch interaction

## 🎵 Sound Effects

The website includes optional keyboard sound effects that can be enabled/disabled by modifying the JavaScript. The sounds are generated using the Web Audio API and provide tactile feedback.

## ♿ Accessibility

- Full keyboard navigation support
- ARIA labels for screen readers
- High contrast color scheme
- Semantic HTML structure
- Focus indicators for interactive elements

## 🚀 Getting Started

1. Clone or download the files
2. Open `index.html` in your web browser
3. Start exploring by clicking on the keyboard keys
4. Customize the content to match your portfolio

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve the keyboard portfolio website.

---

**Enjoy your interactive keyboard portfolio!** ⌨️✨ 