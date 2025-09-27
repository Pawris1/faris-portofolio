import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Skills.css';

const Skills = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('frontend'); // Default to frontend

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Initialize animated background (Matrix Rain Effect)
  useEffect(() => {
    const canvas = document.getElementById('code-bg');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Characters for coding theme: letters, numbers, symbols (Japanese katakana + code symbols)
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

  // Skills data organized by categories (icons removed)
  const skillsData = {
    frontend: [
      { name: 'React.js', level: 50, experience: '1+ years' },
      { name: 'JavaScript', level: 50, experience: '1+ years' },
      { name: 'HTML', level: 75, experience: '1+ years' },
      { name: 'CSS', level: 65, experience: '1+ years' },
    ],
    backend: [
      { name: 'MySQL', level: 35, experience: '1+ years' },
      { name: 'C++', level: 65, experience: '2+ years' },
      { name: 'C#', level: 35, experience: '<1 year' },
      { name: 'Java', level: 75, experience: '1+ years' },
      { name: 'Laravel', level: 25, experience: '<1 year' },
      { name: 'Python', level: 65, experience: '1+ year' }
    ],
    tools: [
      { name: 'GitHub', level: 45, experience: '1+ years' },
      { name: 'VS Code', level: 85, experience: '2+ years' },
      { name: 'Figma', level: 85, experience: '2+ years' },
      { name: 'Dev-C++', level: 75, experience: '1+ years' },
      { name: 'Canva', level: 90, experience: '1+ years' },
      { name: 'XAMPP', level: 25, experience: '<1 years' },
      { name: 'Eclipse', level: 75, experience: '1+ years' },
      { name: 'Google Workspace', level: 50, experience: '1+ years' }
    ],
    soft: [
      { name: 'Critical Thinking', level: 80, experience: '4+ years' },
      { name: 'Team Collaboration', level: 85, experience: '4+ years' },
      { name: 'Communication', level: 85, experience: '4+ years' },
      { name: 'Project Management', level: 85, experience: '2+ years' },
      { name: 'Learning Agility', level: 80, experience: '4+ years' },
      { name: 'Time Management', level: 90, experience: '5+ years' },
      { name: 'Adaptability', level: 85, experience: '2+ years' },
      { name: 'Leadership', level: 85, experience: '2+ years' }
    ]
  };

  // Get filtered skills based on selected category (no 'all' option)
  const getFilteredSkills = () => {
    return skillsData[selectedCategory]?.map(skill => ({ ...skill, category: selectedCategory })) || [];
  };

  // Animation on scroll/load
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillName = entry.target.dataset.skill;
            setAnimatedSkills(prev => [...new Set([...prev, skillName])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [selectedCategory]);

  const categories = [
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' },
    { key: 'tools', label: 'Tools' },
    { key: 'soft', label: 'Soft Skills' }
  ];

  return (
    <>
      {/* Header */}
      <header className="header">
        <nav className="nav">
          {/* Menu */}
          <ul className="menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/experience">Experience</Link></li>
            <li>
              <Link to="/skills" className="active">
                Skills
              </Link>
            </li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>

      {/* Skills Page Content */}
      <div className="skills-page">
        <canvas id="code-bg" className="code-bg"></canvas>

        {/* Hero Section */}
        <section className="skills-hero">
          <div className="hero-content">
            <h1 className="fade-in-up">Skills & Expertise</h1>
            <p className="fade-in-up delay-1 bold-3d-text">
              A showcase of my technical expertise built through consistent learning and hands-on experience. 
              From understanding the fundamentals of coding to developing complete projects, 
              I've gained a solid foundation that continues to expand as I explore new tools and technologies.
            </p>
            <div className="skills-summary fade-in-up delay-2">
              <div className="summary-item">
                <span className="summary-number">2+</span>
                <span className="summary-label bold-3d-text">Years Learning Coding</span>
              </div>
              <div className="summary-item">
                <span className="summary-number">3+</span>
                <span className="summary-label bold-3d-text">Projects Built</span>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="category-filter">
          <div className="filter-container">
            {categories.map((category) => (
              <button
                key={category.key}
                className={`filter-btn ${selectedCategory === category.key ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.key)}
              >
                <span className="filter-label">{category.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Skills Grid */}
        <section className="skills-grid-section">
          <div className="skills-container">
            <div className="skills-grid">
              {getFilteredSkills().map((skill, index) => (
                <div
                  key={`${skill.name}-${skill.category}`}
                  className={`skill-card ${animatedSkills.includes(skill.name) ? 'animate-in' : ''}`}
                  data-skill={skill.name}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="skill-header">
                    <div className="skill-details">
                      <h3 className="skill-name">{skill.name}</h3>
                      <span className="skill-experience">{skill.experience}</span>
                    </div>
                  </div>
                  
                  <div className="skill-progress">
                    <div className="progress-track">
                      <div 
                        className="progress-fill"
                        style={{ 
                          width: animatedSkills.includes(skill.name) ? `${skill.level}%` : '0%',
                          animationDelay: `${index * 0.1}s`
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="skill-percentage-below">
                    {skill.level}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Philosophy */}
        <section className="skills-philosophy">
          <div className="philosophy-content">
            <h2 className="fade-in-up">How I Sharpen My Skills</h2>
            <div className="philosophy-grid fade-in-up delay-1">
              <div className="philosophy-grid">
              <div className="philosophy-row">
              <div className="philosophy-card">
                <h3>Hands-On Practice</h3>
                <p className="bold-3d-text">
                  I Understand more from doing. So, I focus on applying concepts into real projects that solve actual problems.
                </p>
              </div>
              <div className="philosophy-card">
                <h3>Practical Execution</h3>
                <p className="bold-3d-text">
                  I bridge theory and practice by building real-world applications and refining skills through problem-solving.
                </p>
              </div>
              <div className="philosophy-card">
                <h3>Curious by Nature</h3>
                <p className="bold-3d-text">
                  I love exploring new technologies just for the fun of learning something new.
                </p>
              </div>
              </div>

              <div className="philosophy-row">
              <div className="philosophy-card">
                <h3>Problem-Solving Mindset</h3>
                <p className="bold-3d-text">
                  For me, coding is not just about writing code but about solving problems. I approach challenges with creativity and persistence until I find efficient and practical solutions.
                </p>
              </div>
              <div className="philosophy-card">
                <h3>Adaptability</h3>
                <p className="bold-3d-text">
                  Technology is always changing, and I believe in staying flexible. I adapt quickly to new tools, environments, and workflows to keep improving and delivering better results.
                </p>
                </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section fade-in-up">
          <div className="cta-content">
            <h2>Check Out My Projects!</h2>
            <p className="bold-3d-text">
              Here are some of the projects I've created, ranging from practice exercises to real-world applications. 
              These works represent my journey in coding, experimenting, and continuously improving. 
              Let's connect if you'd like to know more or collaborate.
            </p>
            <div className="cta-buttons">
              <a 
                href="https://github.com/Pawris1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cta-button primary github-button"
              >
                <svg className='github-icon' viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View GitHub
              </a>

              <Link to="/contact">
                <button className="cta-button secondary">
                  Contact Me
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Skills;