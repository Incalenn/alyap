import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { FaTwitter, FaGithub, FaInstagram, FaMusic, FaVolumeMute } from 'react-icons/fa';
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
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [activeFaq, setActiveFaq] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const audioRef = useRef(null);

  // Add Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Theme toggle effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Attempt to autoplay when component mounts
  useEffect(() => {
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            await playPromise;
            setIsMusicPlaying(true);
          }
        }
      } catch (error) {
        console.log("Autoplay prevented by browser");
        setIsMusicPlaying(false);
      }
    };
    
    playAudio();
  }, []);

  const toggleWindow = (windowName) => (e) => {
    e.preventDefault();
    setOpenWindows(prev => ({
      ...prev,
      [windowName]: !prev[windowName]
    }));
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="app-container">
      <audio ref={audioRef} src="/background-music.mp3" loop preload="auto" />
      
      <button className="theme-toggle" onClick={toggleTheme}>
        <img 
          src={isDarkMode ? "/icons/light-mode.png" : "/icons/dark-mode.png"} 
          alt={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"} 
        />
      </button>

      <div className="card">
        <div className="logo">
          <img src="/me.png" alt="Star Logo" className="star-logo" />
        </div>
        
        <nav className="nav-bar">
          <span>welcome to my personal website!</span>
        </nav>

        <main className="content">
          <h1>
            hi! <span className="highlight">i'm alenn</span>
          </h1>
          <p className="subtitle">developer, artist, and content creator</p>

          <div className="nav-icons">
            <button onClick={toggleWindow('about')} className="nav-button">
              <div className="icon-circle">
                <img src="/icons/about.png" alt="About" />
              </div>
              <span>About</span>
            </button>
            <button onClick={toggleWindow('links')} className="nav-button">
              <div className="icon-circle">
                <img src="/icons/links.png" alt="Links" />
              </div>
              <span>Links</span>
            </button>
            <button onClick={toggleWindow('work')} className="nav-button">
              <div className="icon-circle">
                <img src="/icons/work.png" alt="Work" />
              </div>
              <span>Work</span>
            </button>
            <button onClick={toggleWindow('faq')} className="nav-button">
              <div className="icon-circle">
                <img src="/icons/faq.png" alt="FAQ" />
              </div>
              <span>FAQ</span>
            </button>
            <button onClick={toggleWindow('contact')} className="nav-button">
              <div className="icon-circle">
                <img src="/icons/contact.png" alt="Contact" />
              </div>
              <span>Contact</span>
            </button>
          </div>
        </main>

        <footer className="social-links">
          <a href="https://github.com/Incalenn" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://www.instagram.com/alennpham/" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <div className="copyright">
            © 2025 Alenn
          </div>
        </footer>
      </div>

      <button className="music-toggle" onClick={toggleMusic}>
        <img 
          src={isMusicPlaying ? "/music-on.png" : "/music-off.png"} 
          alt={isMusicPlaying ? "Stop Music" : "Play Music"} 
        />
      </button>

      <div className="windows-container">
        <PopupWindow
          title="about"
          isOpen={openWindows.about}
          onClose={toggleWindow('about')}
        >
          <div className="about-content">
            <div className="about-header">
              <img src="/profile-pic.jpg" alt="Profile" className="about-header-image" />
              <div className="about-header-info">
                <h2>Alenn</h2>
                <p>Software Engineer, GenAI & ML</p>
                <p>Former Fullstack Developer at <a href="https://www.societegenerale.com/en">Société Générale</a></p>
              </div>
            </div>
            
            <div className="about-scrollable">
              <p>hi! i'm alenn, a software engineer, content creator, and artist at the same time. i... uhhh</p>
                <li>create nice IT projects (ai agents, genAI ML and plenty) </li>
                <li>create hand-drawn illustrations (web3 related - sometimes)</li>
                <li>create video montages</li>
                <li>do frontend web development! a lot of things actually...</li>
              <p>interested in working with me? send me an email at <a href="mailto:van.alenn.pham@gmail.com">van.alenn.pham@gmail.com</a>!</p>
              
              <b>Education</b>
              <li>Master of Science in Computer Science</li>
              <p>Graduated EFREI Paris 2024</p>

              <b>Other interests</b>
                <li>cooking ! i'm a good cook</li>
                <li>fashion ! how could i not like it, the french touch</li>
                <li>competitive gaming ! i think i'm pretty good at it...</li>
                <li>spending passionate time with beloved ones ! very important yep</li>

              <b>Language Proficiency</b>
              <p>i have native fluency in English and French, i can understand a bit of Spanish and Vietnamese.</p>
            </div>
          </div>
        </PopupWindow>

        <PopupWindow
          title="links"
          isOpen={openWindows.links}
          onClose={toggleWindow('links')}
        >
          <div className="links-content">
          <a href="https://www.linkedin.com/in/vanalennpham/" target="_blank" rel="noopener noreferrer" className="link-item">
              <div className="link-icon">
                <img src="/icons/linkedin.png" alt="LinkedIn" />
              </div>
              <span className="link-label">LinkedIn</span>
            </a>

            <a href="https://x.com/_55aph" target="_blank" rel="noopener noreferrer" className="link-item">
              <div className="link-icon">
                <img src="/icons/twitter.png" alt="Twitter" />
              </div>
              <span className="link-label">Twitter</span>
            </a>

            <a href="https://youtube.com/your-channel" target="_blank" rel="noopener noreferrer" className="link-item">
              <div className="link-icon">
                <img src="/icons/youtube.png" alt="YouTube" />
              </div>
              <span className="link-label">YouTube</span>
            </a>

            <a href="https://www.instagram.com/alennpham/" target="_blank" rel="noopener noreferrer" className="link-item">
              <div className="link-icon">
                <img src="/icons/instagram.png" alt="Instagram" />
              </div>
              <span className="link-label">Instagram</span>
            </a>

            <a href="https://discord.gg/your-server" target="_blank" rel="noopener noreferrer" className="link-item">
              <div className="link-icon">
                <img src="/icons/discord.png" alt="Discord" />
              </div>
              <span className="link-label">Discord</span>
            </a>
          </div>
          <div className="links-footer">
            clicking any of the links will open a new tab! (it's safe i promise)
          </div>
        </PopupWindow>

        <PopupWindow
          title="work"
          isOpen={openWindows.work}
          onClose={toggleWindow('work')}
        >
          <div className="work-content">
            <div className="work-notice">
              Accepting work offers via my <a href="mailto:van.alenn.pham@gmail.com">work email</a>!
              <br />
              I do software engineering, AI development, and web/app development. :)
            </div>

            <div className="work-section">
              <h2>Tools</h2>
              <div className="skills-grid">
                <span className="skill-tag">VS Code</span>
                <span className="skill-tag">Intellij IDEA</span>
                <span className="skill-tag">Cursor</span>
                <span className="skill-tag">n8n</span>
                <span className="skill-tag">LangChain</span>
                <span className="skill-tag">OpenAI</span>
                <span className="skill-tag">Docker</span>
                <span className="skill-tag">Git</span>
                <span className="skill-tag">TensorFlow</span>
                <span className="skill-tag">Figma</span>
                <span className="skill-tag">Canva</span>
                <span className="skill-tag">Jira</span>
                <span className="skill-tag">Google Workspace</span>
                <span className="skill-tag">Milanote</span>
                <span className="skill-tag">HitFilm Express</span>
                <span className="skill-tag">Davinci Resolve</span>
                <span className="skill-tag">Adobe Suite</span>
                <span className="skill-tag">Clip Studio Paint</span>
              </div>
            </div>

            <div className="work-section">
              <h2>Development</h2>
              <div className="skills-grid">
                <span className="skill-tag">Python</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">React</span>
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">C</span>
                <span className="skill-tag">HTML/CSS</span>
                <span className="skill-tag">Solidity</span>
              </div>
            </div>

            <div className="work-section">
              <h2>Projects</h2>
              <div className="project-card">
                <h3>Python AI Agent</h3>
                <p>My AI Agent Project focuses on conducting an in-depth audit of pre-existing applications while developing a secure Python-based application designed for AI training.</p>
                <p>Built with Python, Pydantic, and various AI/ML technologies such as LangChain, OpenAI.</p>
                <a href="https://github.com/Incalenn/AI-Agent" className="download-button">View Project</a>
              </div>

              <div className="project-card">
                <h3>n8n AI Agent (no code)</h3>
                <p>This workflow implements a Telegram-integrated AI Agent using n8n that can : transcribe voice messages using OpenAI Whisper. Understand and respond to text inputs using GPT-4. Trigger Gmail operations (send/read emails). Provide smart, AI-powered responses via Telegram using natural language understanding.</p>
                <p>Built with n8n, it's really good and easy to use!</p>
                <a href="https://github.com/Incalenn/N8N-AI-Agent" className="download-button">View Project</a>
              </div>

              <div className="project-card">
                <h3>ILLUSTRATION</h3>
                <div className="image-grid">
                  <div className="image-item">
                    <img src="/illustrations/illustration1.jpg" alt="illustration 1" />
                  </div>
                  <div className="image-item">
                    <img src="/illustrations/illustration2.jpg" alt="illustration 2" />
                  </div>
                  <div className="image-item">
                    <img src="/illustrations/illustration3.jpg" alt="illustration 3" />
                  </div>
                  <div className="image-item">
                    <img src="/illustrations/illustration4.jpg" alt="illustration 4" />
                  </div>
                  <div className="image-item">
                    <img src="/illustrations/illustration5.jpg" alt="illustration 5" />
                  </div>
                  <div className="image-item">
                    <img src="/illustrations/illustration6.jpg" alt="illustration 6" />
                  </div>
                </div>
                <div className="social-links-work">
                  See more on <a href="https://www.canva.com/design/DAFaMjC_g_g/U5RCMvZ0ySoLiSQ5b8Eh4g/edit?utm_content=DAFaMjC_g_g&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">my Art portfolio</a>
                </div>
              </div>
            </div>

            <div className="work-section">
              <h2>Other Projects</h2>
              <ul>
                <li>This website!</li>
                <li>More projects coming soon...</li>
              </ul>
              <div className="social-links-work">
                See more on <a href="https://github.com/Incalenn">GitHub</a>
              </div>
            </div>
          </div>
        </PopupWindow>

        <PopupWindow
          title="frequently asked questions (i think uh oh)"
          isOpen={openWindows.faq}
          onClose={toggleWindow('faq')}
        >
          <div className="faq-content">
            <div className="faq-item">
              <div 
                className={`faq-question ${activeFaq === 'sound' ? 'active' : ''}`}
                onClick={() => setActiveFaq(activeFaq === 'sound' ? '' : 'sound')}
              >
                are you seeking for a job?
                <span className="arrow">{activeFaq === 'sound' ? '∧' : '∨'}</span>
              </div>
              <div className={`faq-answer ${activeFaq === 'sound' ? 'active' : ''}`}>
                <p>yes, I am seeking for a job! more than anything else - actually, i'm seeking for a job right now. haha</p>
                <p>please contact me via my <a href="mailto:van.alenn.pham@gmail.com">work email</a> or my <a href="https://www.linkedin.com/in/vanalennpham/">linkedin</a>!</p>
              </div>
            </div>

            <div className="faq-item">
              <div 
                className={`faq-question ${activeFaq === 'software' ? 'active' : ''}`}
                onClick={() => setActiveFaq(activeFaq === 'software' ? '' : 'software')}
              >
                what software do you use?
                <span className="arrow">{activeFaq === 'software' ? '∧' : '∨'}</span>
              </div>
              <div className={`faq-answer ${activeFaq === 'software' ? 'active' : ''}`}>
                for development: VS Code, Cursor, Git, Intellij IDEA
                <br />
                for design: Figma, Adobe Suite, Clip Studio Paint, Canva
                <br />
                for video editing: DaVinci Resolve, HitFilm Express, Adobe Premiere Pro
              </div>
            </div>

            <div className="faq-item">
              <div 
                className={`faq-question ${activeFaq === 'commissions' ? 'active' : ''}`}
                onClick={() => setActiveFaq(activeFaq === 'commissions' ? '' : 'commissions')}
              >
                are your commissions for dev/art open?
                <span className="arrow">{activeFaq === 'commissions' ? '∧' : '∨'}</span>
              </div>
              <div className={`faq-answer ${activeFaq === 'commissions' ? 'active' : ''}`}>
                for commission work regarding development or illustrations, please contact me via my <a href="mailto:van.alenn.pham@gmail.com">work email</a>.
              </div>
            </div>

            <div className="faq-item">
              <div 
                className={`faq-question ${activeFaq === 'setup' ? 'active' : ''}`}
                onClick={() => setActiveFaq(activeFaq === 'setup' ? '' : 'setup')}
              >
                what's your setup?
                <span className="arrow">{activeFaq === 'setup' ? '∧' : '∨'}</span>
              </div>
              <div className={`faq-answer ${activeFaq === 'setup' ? 'active' : ''}`}>
                i use a quite basic PC build with a single monitor, mechanical keyboard, and a drawing tablet for illustrations.
                <p>here are my PC specs :</p>
                <li>CPU: Ryzen 5 5600X 6-Core Processor</li>
                <li>GPU: NVIDIA GeForce RTX 2060</li>
                <li>RAM: 16 GB</li>
                <li>SSD: Samsung SSD 870 QVO 1TB</li>
                <li>Motherboard: A320M PRO-E</li>

                <p>and my accessories :</p>
                <li>Keyboard: Corsair K55 RGB</li>
                <li>Mouse:  Razer Deathadder V3</li>
                <li>Headphones: Earpods</li>
                <li>Microphone: Blue Yeti Microphone</li>
                <li>Tablet: XP-PEN Star03V2</li>
                <li>Monitor: IIYAMA G-Master Red Eagle 144hz</li>
              </div>
            </div>

          </div>
        </PopupWindow>

        <PopupWindow
          title="contact"
          isOpen={openWindows.contact}
          onClose={toggleWindow('contact')}
        >
          <div className="contact-content">
            <h2>yippee mail!</h2>
            <p>i would love to hear from you! i don't really check my social media messages, sometimes i'm a bit tunnel-visioned on whatever i'm doing hehe. please direct questions to my email instead 👍</p>
            
            <div className="contact-illustration">
              <img src="/icons/mail-illustration.png" alt="Mail Illustration" />
            </div>

            <div className="contact-email">
              <p>email me at: <a href="mailto:van.alenn.pham@gmail.com">van.alenn.pham@gmail.com</a></p>
              <p>or press the button below to open your mail app.</p>
              <a href="mailto:van.alenn.pham@gmail.com" className="email-button">
                send me an email!
              </a>
            </div>
          </div>
        </PopupWindow>
      </div>
    </div>
  );
}

export default App; 