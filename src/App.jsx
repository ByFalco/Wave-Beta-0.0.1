import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import { motion } from "framer-motion";
import "./App.css";
import VideoSectionWithPricing from "./components/VideoSectionWithPricing";
import ScrollDownAnimation from "./components/ScrollDownAnimation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { Link as ScrollLink } from "react-scroll";

// Updated TypingEffect Component
const TypingEffect = ({ words }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting && currentText === currentWord) {
          setTimeout(() => setIsDeleting(true), 2100);
        } else if (isDeleting && currentText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        } else {
          setCurrentText((prev) =>
            isDeleting
              ? prev.slice(0, -1)
              : currentWord.slice(0, prev.length + 1)
          );
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <span className="typing-container">
      &#123; {currentText}
      <span className="cursor"></span> &#125;
    </span>
  );
};

// Componente NavLink personalizzato
const NavItem = ({ to, icon, children, smooth = false }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const LinkComponent = smooth ? ScrollLink : Link;

  return (
    <li className={`nav-item ${isActive ? "active" : ""}`}>
      <LinkComponent to={to} smooth={smooth} duration={700}>
        <i className={`fas ${icon}`}></i>
        <div className="separator"></div>
        <span>{children}</span>
      </LinkComponent>
    </li>
  );
};

// Componente Navbar aggiornato
const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="src/assets/logo-prova.png" alt="Wave Logo" />
      </div>
      <ul className="navbar-menu">
        {!isHome && (
          <NavItem to="/" icon="fa-house">
            Home
          </NavItem>
        )}
        <NavItem to="/examples" icon="fa-file-code">
          Services
        </NavItem>
        <NavItem to="/about" icon="fa-info-circle">
          About Us
        </NavItem>
        <NavItem to="/contact" icon="fa-envelope">
          Contact
        </NavItem>
      </ul>
      <div className="navbar-buttons">
        <ScrollLink
          to="video-section"
          smooth={true}
          duration={800}
          className="navbar-button piani"
        >
          <FontAwesomeIcon icon={faLayerGroup} />
          <span>Piani</span>
        </ScrollLink>
        <Link to="/login" className="auth-link">
          <i className="fas fa-user-circle auth-icon"></i>
        </Link>
      </div>
    </nav>
  );
};

// Header Component
const Header = () => (
  <header className="header">
    <motion.div
      className="slogan"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
    >
      <h1>
        <span className="highlight">
          <TypingEffect words={["Aggiorna", "Migliora", "Realizza"]} />
        </span>
        <br />
      </h1>
      <p>il tuo sito Adesso!</p>
    </motion.div>
    <motion.div
      className="cta-buttons"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4 }}
    >
      <button className="cta-button secondary">Esplora</button>
      <button className="cta-button primary">Esempi</button>
    </motion.div>
    <motion.div
      className="quote-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.8 }}
    >
      <p>Richiedi un preventivo senza impegno</p>
      <div className="quote-input">
        <input type="email" placeholder="La tua email" />
        <button aria-label="Invia">
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </motion.div>
    <motion.p
      className="quote-subtext"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1 }}
    >
      Ci pensiamo noi!
    </motion.p>
    <motion.div
      className="scroll-down-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 2.1 }}
    >
      <ScrollDownAnimation />
    </motion.div>
  </header>
);

// Footer Component
const Footer = () => (
  <footer className="footer">
    <p>&copy; 2024 Wave. All rights reserved.</p>
  </footer>
);

// New BackgroundBlob component
const BackgroundBlob = () => (
  <svg
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    className="background-blob"
  >
    <path
      fill="url(#blob-gradient)"
      d="M44.7,-76.4C58.9,-69.2,71.8,-58.6,79.6,-45.3C87.4,-32,90.2,-16,88.7,-0.9C87.2,14.3,81.4,28.5,73.6,41.5C65.8,54.5,56,66.3,43.3,74.7C30.7,83.1,15.3,88.1,0.4,87.4C-14.5,86.8,-29,80.5,-42.6,72.6C-56.2,64.7,-68.9,55.2,-77.1,42.5C-85.3,29.8,-89,14.9,-88.2,0.5C-87.4,-13.9,-82,-27.8,-74.3,-40.2C-66.6,-52.6,-56.6,-63.5,-44.3,-71.7C-32,-79.9,-16,-85.4,-0.2,-85.1C15.7,-84.8,31.4,-78.7,44.7,-76.4Z"
      transform="translate(100 100)"
    />
    <defs>
      <linearGradient id="blob-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "rgba(255, 215, 0, 0.4)" }} />
        <stop offset="100%" style={{ stopColor: "rgba(255, 140, 0, 0.6)" }} />
      </linearGradient>
    </defs>
  </svg>
);

// Home Page
const Home = () => (
  <div className="home">
    <BackgroundBlob />
    <Header />
    <VideoSectionWithPricing />
  </div>
);

// Example Page
const Examples = () => (
  <div className="examples">
    <h2>Our Work</h2>
    {/* Add your examples here */}
  </div>
);

// About Us Page
const AboutUs = () => (
  <div className="about-us">
    <h2>About Wave</h2>
    <p>We specialize in creating web presence for physical businesses.</p>
  </div>
);

// Sezione Contatti migliorata e più professionale
const Contact = () => (
  <div className="contact-page">
    <h2 className="contact-title">Contatti</h2>
    <div className="contact-content">
      <div className="contact-info-card">
        <h3>Info Generali</h3>
        <div className="contact-item">
          <i className="fas fa-phone-alt"></i>
          <div>
            <p>Telefono</p>
            <a href="tel:+393792472335">+39 379 247 2335</a>
          </div>
        </div>
        <div className="contact-item">
          <i className="fas fa-envelope"></i>
          <div>
            <p>Email</p>
            <a href="mailto:waveshop.commercial@gmail.com">
              waveshop.commercial@gmail.com
            </a>
          </div>
        </div>
        <div className="contact-item">
          <i className="fab fa-discord"></i>
          <div>
            <p>Discord</p>
            <a
              href="https://discord.gg/esempio"
              target="_blank"
              rel="noopener noreferrer"
            >
              Unisciti al nostro server
            </a>
          </div>
        </div>
      </div>
      <div className="contact-info-card">
        <h3>Orari di Assistenza</h3>
        <div className="support-hours">
          <div className="day-group">
            <p>
              <span>Lunedì - Venerdì:</span> 12:00 - 18:00
            </p>
            <p>
              <span>Sabato:</span> 11:00 - 14:00
            </p>
            <p>
              <span>Domenica:</span> Chiuso
            </p>
          </div>
        </div>
        <div className="support-note">
          <i className="fas fa-clock"></i>
          <p>Risponderemo alle tue richieste entro 24 ore lavorative.</p>
        </div>
      </div>
    </div>
    <div className="cta-section">
      <h3>Hai bisogno di assistenza immediata?</h3>
      <button className="contact-button">
        <i className="fas fa-comments"></i>
        Chatta con noi
      </button>
    </div>
  </div>
);

// Il componente App principale
const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
