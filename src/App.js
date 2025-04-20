import React, { useState } from 'react';
import './App.css';
import { FaTwitter, FaGithub, FaInstagram } from 'react-icons/fa';
import { BiInfoCircle, BiLink, BiBriefcase, BiQuestionMark, BiEnvelope } from 'react-icons/bi';
import PopupWindow from './components/PopUpWindow';

function App() {
  const [openWindows, setOpenWindows] = useState({
    about: false,
    links: false,
    work: false,
    faq: false,
    contact: false,
  });

  const toggleWindow = (windowName) => (e) => {
    e.preventDefault();
    setOpenWindows(prev => ({
      ...prev,
      [windowName]: !prev[windowName]
    }));
  };

  return (
    <div className="app-container">
      <div className="card">
        <div className="logo">
          <span className="star">★</span>
        </div>
        
        <nav className="nav-bar">
          <span>home</span>
        </nav>

        <main className="content">
          <h1>
            hi! <span className="highlight">i'm Al</span>
          </h1>
          <p className="subtitle">illustrator, animator, and developer</p>

          <div className="nav-icons">
            <button onClick={toggleWindow('about')} className="nav-item">
              <BiInfoCircle />
              <span>about</span>
            </button>
            <button onClick={toggleWindow('links')} className="nav-item">
              <BiLink />
              <span>links</span>
            </button>
            <button onClick={toggleWindow('work')} className="nav-item">
              <BiBriefcase />
              <span>work</span>
            </button>
            <button onClick={toggleWindow('faq')} className="nav-item">
              <BiQuestionMark />
              <span>faq</span>
            </button>
            <button onClick={toggleWindow('contact')} className="nav-item">
              <BiEnvelope />
              <span>contact</span>
            </button>
          </div>
        </main>

        <footer className="social-links">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <div className="copyright">
            © 2025 Your Name
          </div>
        </footer>
      </div>

      <PopupWindow
        title="about"
        isOpen={openWindows.about}
        onClose={toggleWindow('about')}
      >
        <div className="about-content">
          <img src="/profile-image.jpg" alt="Profile" className="profile-pic" />
          <h2>About Me</h2>
          <p>Hi! I'm Al, a creative developer passionate about building beautiful and functional web experiences.</p>
          <div className="about-text">
            <ul>
              <li><span>🎨</span> Frontend Developer</li>
              <li><span>✨</span> UI/UX Enthusiast</li>
              <li><span>🚀</span> Always learning new technologies</li>
            </ul>
          </div>
        </div>
      </PopupWindow>

      <PopupWindow
        title="links"
        isOpen={openWindows.links}
        onClose={toggleWindow('links')}
      >
        <div className="links-content">
          <ul>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#github">GitHub</a></li>
            <li><a href="#linkedin">LinkedIn</a></li>
          </ul>
        </div>
      </PopupWindow>

      <PopupWindow
        title="work"
        isOpen={openWindows.work}
        onClose={toggleWindow('work')}
      >
        <div className="work-content">
          <div className="work-grid">
            <div className="work-item">Project 1</div>
            <div className="work-item">Project 2</div>
            <div className="work-item">Project 3</div>
          </div>
        </div>
      </PopupWindow>

      <PopupWindow
        title="faq"
        isOpen={openWindows.faq}
        onClose={toggleWindow('faq')}
      >
        <div className="faq-content">
          <div className="faq-item">
            <h3>What technologies do you use?</h3>
            <p>I work with React, JavaScript, CSS, and more!</p>
          </div>
        </div>
      </PopupWindow>

      <PopupWindow
        title="contact"
        isOpen={openWindows.contact}
        onClose={toggleWindow('contact')}
      >
        <div className="contact-content">
          <p>Get in touch!</p>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <textarea placeholder="Message"></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      </PopupWindow>
    </div>
  );
}

export default App; 