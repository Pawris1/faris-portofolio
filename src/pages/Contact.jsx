import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [animatedCards, setAnimatedCards] = useState([]);
  const [copiedText, setCopiedText] = useState('');

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

  // Contact information
  const contactInfo = [
    {
      id: 1,
      type: 'work-email',
      label: 'Work Email',
      value: 'muhammad.ibrahim016@binus.ac.id',
      display: 'muhammad.ibrahim016@binus.ac.id',
      icon: '📧',
      color: '#4285F4', 
      action: 'mailto:muhammad.ibrahim016@binus.ac.id',
      copyable: true,
      description: 'Let’s talk opportunities and collaborations'
    },
    {
      id: 2,
      type: 'personal-email',
      label: 'Personal Email',
      value: 'farizibrahim150@gmail.com',
      display: 'farizibrahim150@gmail.com',
      icon: '📧',
      color: '#EA4335', 
      action: 'mailto:farizibrahim150@gmail.com',
      copyable: true,
      description: 'Reach me easily for general chats or info'
    },
    {
      id: 3,
      type: 'whatsapp',
      label: 'WhatsApp',
      value: '+62 813-1583-0288',
      display: '+62 813-1583-0288',
      icon: '💬',
      color: '#25D366',
      action: 'https://wa.me/6281315830288',
      copyable: false,
      description: 'Ping me directly for quick responses'
    },
    {
      id: 4,
      type: 'instagram',
      label: 'Instagram',
      value: '@f.a.risss',
      display: '@f.a.risss',
      icon: '📸',
      color: '#E4405F',
      action: 'https://instagram.com/f.a.risss',
      copyable: false,
      description: 'A glimpse of my daily life'
    },
    {
      id: 5,
      type: 'linkedin',
      label: 'LinkedIn',
      value: 'Muhammad Faris Ibrahim',
      display: 'Muhammad Faris Ibrahim',
      icon: '💼',
      color: '#0077B5',
      action: 'https://www.linkedin.com/in/muhammad-faris-ibrahim-66ba49322/',
      copyable: false,
      description: 'Let’s connect and grow professionally'
    },
    {
      id: 6,
      type: 'github',
      label: 'GitHub',
      value: '@Pawris1',
      display: '@Pawris1',
      icon: '💻',
      color: '#333',
      action: 'https://github.com/Pawris1',
      copyable: false,
      description: 'Explore my coding projects and experiments'
    }
  ];

  // Copy to clipboard function
  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(type);
      setTimeout(() => setCopiedText(''), 2000);
    });
  };

  // Handle contact action
  const handleContactAction = (contact) => {
    if (contact.copyable) {
      copyToClipboard(contact.value, contact.type);
    } else {
      window.open(contact.action, '_blank');
    }
  };

  // Animation on scroll/load
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.dataset.id);
            setAnimatedCards(prev => [...new Set([...prev, id])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
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
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/experience">Experience</Link>
            </li>
            <li>
              <Link to="/skills">Skills</Link>
            </li>
            <li>
              <Link to="/contact" className="active">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Contact Page Content */}
      <div className="contact-page">
        {/* Hero Section */}
        <section className="contact-hero">
          <div className="hero-content">
            <h1 className="fade-in-up">Let's Get In Touch</h1>
            <p className="fade-in-up delay-1 hero-subtitle">
              I'm thrilled to connect and dive into exciting opportunities, innovative collaborations, or just geek out over cutting-edge tech trends!
            </p>
            <div className="hero-decoration fade-in-up delay-2">
              <div className="tech-orbit-animation">
                <span className="orbit-icon icon-1">📱</span>
                <span className="orbit-icon icon-2">📸</span>
                <span className="orbit-icon icon-3">💬</span>
                <span className="orbit-icon icon-4">🤝</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Cards Section */}
        <section className="contact-cards-section">
          <div className="contact-container">
            <div className="section-header">
              <h2 className="fade-in-up">How to Reach Me</h2>
              <p className="fade-in-up delay-1 section-subtitle">Select your favorite channel – I'm all ears and ready to collaborate!</p>
            </div>

            <div className="contact-grid">
              {contactInfo.map((contact, index) => (
                <div
                  key={contact.id}
                  className={`contact-card ${animatedCards.includes(contact.id) ? 'animate-in' : ''}`}
                  data-id={contact.id}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleContactAction(contact)}
                >
                  <div className="contact-card-inner">
                    <div className="contact-icon" style={{ backgroundColor: contact.color }}>
                      {contact.icon}
                    </div>
                    
                    <div className="contact-info">
                      <h3 className="contact-label">{contact.label}</h3>
                      <p className="contact-value">{contact.display}</p>
                      <span className="contact-description">{contact.description}</span>
                    </div>

                    <div className="contact-action">
                      {contact.copyable ? (
                        <div className="copy-indicator">
                          {copiedText === contact.type ? (
                            <span className="copied-text">Copied!</span>
                          ) : (
                            <span className="copy-text">Click to copy</span>
                          )}
                        </div>
                      ) : (
                        <div className="link-indicator">
                          <span className="link-text">Visit</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="contact-card-hover-effect"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Availability Status */}
        <section className="availability-section fade-in-up">
          <div className="availability-content">
            <div className="status-indicator">
              <div className="status-dot online"></div>
              <span className="status-text">Currently Open to Collaborate on Innovative and Impactful Projects.</span>
            </div>
            <p className="availability-note">
              I usually respond within 12-24 hours. I'll be looking forward to hearing from you!
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
