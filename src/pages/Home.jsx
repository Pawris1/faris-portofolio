import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link } from "react-router-dom";

const Home = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Initialize animated background
  useEffect(() => {
    const canvas = document.getElementById('code-bg');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Characters for coding theme: letters, numbers, symbols
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン<>(){}[]|/=+-*&#$@!%?';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
      // Semi-transparent black to fade trails
      ctx.fillStyle = 'rgba(18, 18, 18, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#61dafb';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop if it reaches bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 50);

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* Animated Background Canvas - Full page overlay */}
      <canvas id="code-bg" className="code-bg"></canvas>

      {/* Header */}
      <header className="header">
        <nav className="nav">
          {/* Menu */}
          <ul className="menu">
            <li>
              <Link to="/" className="active">
                Home
              </Link>
            </li>
            <li>
              <Link to="/experience">Experience</Link>
            </li>
            <li>
              <Link to="/skills">
                Skills
              </Link>
            </li>
            <li>
              <Link to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        {/* Large Hero Profile Picture */}
        <div className="hero-profile-pic">
          {/* Ganti 'profile.jpg' dengan nama file foto kamu di folder public */}
          <img 
            src="./public/profile4.png" 
            alt="Faris Profile" 
            className="hero-profile-img"
            onError={(e) => {
              // Fallback jika gambar tidak ditemukan, tampilkan huruf F
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          {/* Fallback text jika gambar tidak ada */}
          <span className="hero-profile-fallback">F</span>
        </div>
        
        <h1>Welcome, I'm Muhammad Faris Ibrahim</h1>
        <p className="hero-subtitle">
          Computer Science Student at <span className="highlight">Binus University</span>
        </p>
        <p className="hero-description">
          I'm a dedicated student pursuing a degree in Computer Science with a specialization in <span className="highlight">Software Engineering</span> at <span className="highlight">Binus University</span>. 
          My passions include <span className="highlight">UI/UX Design, Web Development, and Software Development</span>, where I focus on creating intuitive, innovative, and user-centered digital solutions.
        </p>
      </section>

      {/* Box Container - Only for Experience, Skills, Contact */}
      <div className="box-container">
        {/* Experience Box */}
        <Link to="/experience" className="box">
          <div className="box-icon">💼</div>
          <div className="box-text">Experience</div>
        </Link>

        {/* Skills Box */}
        <Link to="/skills" className="box">
          <div className="box-icon">🛠️</div>
          <div className="box-text">Skills</div>
        </Link>

        {/* Contact Box */}
        <Link to="/contact" className="box">
          <div className="box-icon">📧</div>
          <div className="box-text">Contact</div>
        </Link>
      </div>
    </>
  );
};

export default Home;
