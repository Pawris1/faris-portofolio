import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Experience.css';

const Experience = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [animatedItems, setAnimatedItems] = useState([]);

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

  const experiences = [
    {
      id: 1,
      company: "Binus University Project",
      position: "Data Analyst - Assurance of Learning Project",
      duration: "2024",
      location: "Jakarta, Indonesia",
      description: "Conducted data analysis as part of the Assurance of Learning program at Binus University. The project involved processing datasets using Excel, cleaning and organizing data for better accuracy, and applying Python to transform numerical results into clear visual graphs. The analysis focused on identifying key patterns, summarizing findings, and presenting insights in a way that supported decision-making and academic evaluation.",
      technologies: ["Excel", "VS Code", "Python (Matplotlib)"],
      achievements: "Successfully transformed raw data into meaningful insights by applying structured data cleaning and statistical analysis techniques. Created visual representations such as bar charts and trend graphs using Python to effectively communicate results. The final outcome improved the clarity of data interpretation, provided valuable input for academic assessment, and demonstrated strong analytical as well as presentation skills."
    },
    {
      id: 2,
      company: "Binus University Project",
      position: "Front-End Developer - VKellogs Website",
      duration: "2024",
      location: "Jakarta, Indonesia",
      description: "Developed an individual website project called VKellogs, a cereal-inspired brand created for academic purposes to avoid copyright issues. The website was built using HTML, CSS, and JavaScript, and includes multiple sections: Home, Products, Recipes, About Us, and Contact Us. The project emphasized clean design, responsive layout, and structured navigation to provide users with a smooth browsing experience.",
      technologies: ["VS Code", "HTML", "CSS", "JavaScript"],
      achievements: "Successfully created a fully functional and responsive static website that showcases product information, recipe ideas, and company details for the fictional brand VKellogs. Designed intuitive navigation and styled the pages for a professional look, demonstrating strong front-end development skills. This project highlighted my ability to translate design concepts into functional code while applying creativity within academic constraints."
    },
    {
      id: 3,
      company: "Binus University Project",
      position: "Machine Learning Developer - Chronic Kidney Disease Prediction",
      duration: "2024",
      location: "Jakarta, Indonesia",
      description: "Developed a predictive web-based application to detect the likelihood of Chronic Kidney Disease (CKD) using a dataset containing thousands of medical records. The project involved preprocessing and analyzing raw Excel data, training machine learning models to classify CKD presence, and integrating the trained model into a user-friendly website. End users can input key medical parameters, and the system provides instant predictions on whether they are likely to have CKD.",
      technologies: ["Excel", "Figma", "HTML", "CSS", "Python (Scikit-learn)", "Flask"],
      achievements: "Successfully built and trained a machine learning model with high accuracy to predict Chronic Kidney Disease based on patient data. Designed and deployed a web application that allows users to input their health parameters and instantly receive prediction results. The project demonstrated practical application of data preprocessing, model training, and real-world deployment, bridging the gap between machine learning research and accessible healthcare tools."
    },
    {
      id: 4,
      company: "Binus University Project",
      position: "QA Automation Engineer - Digital Banking Feature Testing",
      duration: "2025",
      location: "Jakarta, Indonesia",
      description: "Developed and executed automated testing for a digital banking system using Java and Cucumber (BDD). The testing process included creating feature files with Gherkin syntax, writing step definitions in Java, and implementing supporting services to simulate real banking operations. Five core features were tested thoroughly: Customer Service, Loyalty, Top Up, Transaction, and Transfer, ensuring both positive and negative scenarios were validated.",
      technologies: ["Eclipse", "Java", "Cucumber", "Gherkin", "JUnit"],
      achievements: "Successfully designed and implemented end-to-end automated testing for five major digital banking features. Created reusable and maintainable step definitions that improved testing efficiency, while detailed console logs provided better traceability of test outcomes. The project enhanced overall system reliability and demonstrated strong skills in test automation, behavior-driven development (BDD), and structured validation of financial application workflows."
    },
    {
      id: 5,
      company: "Binus University Project",
      position: "Software Engineer - Payroll System Code Refactoring",
      duration: "2025",
      location: "Jakarta, Indonesia",
      description: "Conducted a code refactoring project on an open-source Payroll System taken from GitHub. The objective was to identify and resolve code smells (such as long methods, duplicated code, poor naming conventions, and tight coupling) and then systematically refactor the codebase to improve maintainability, readability, and performance. The process followed best practices in software engineering to ensure cleaner architecture and sustainable code quality.",
      technologies: ["Eclipse", "GitHub", "Java"],
      achievements: "Successfully identified multiple instances of code smells within the Payroll System and applied structured refactoring techniques to eliminate them. Improvements included reducing code duplication, enhancing method readability, applying proper design patterns where necessary, and restructuring classes for better modularity. The final refactored version of the system became more maintainable, easier to understand, and aligned with clean code principles, demonstrating strong skills in software quality assurance and continuous improvement."
    }
  ];

  // Animation on scroll/load hanya untuk cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.dataset.id);
            setAnimatedItems(prev => [...new Set([...prev, id])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach(card => observer.observe(card));

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
            <li><Link to="/">Home</Link></li>
            <li>
              <Link to="/experience" className="active">
                Experience
              </Link>
            </li>
            <li><Link to="/skills">Skills</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>

      {/* Experience Page Content */}
      <div className="experience-page">
        {/* Hero Section */}
        <section className="experience-hero">
          <div className="hero-content">
            <h1 className="fade-in-up">My Academic Journey</h1>
            <p className="fade-in-up delay-1">
              <span className="bold-white">A showcase of the projects I’ve completed during my studies at Binus University, reflecting my growth and skills development.</span>
            </p>
            <div className="hero-stats fade-in-up delay-2">
              <div className="stat">
                <span className="stat-number">2+</span>
                <span className="stat-label">Years of Learning & Growing</span>
              </div>
              <div className="stat">
                <span className="stat-number">4+</span>
                <span className="stat-label">University Projects Completed</span>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="timeline-section">
          <div className="timeline-container">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="timeline-item">
                {/* Experience Card dengan Timeline */}
                <div 
                  className={`experience-card ${animatedItems.includes(exp.id) ? 'animate-in' : ''}`}
                  data-id={exp.id}
                >
                  <div className="experience-content">
                    <div className="experience-header">
                      <h3 className="position">{exp.position}</h3>
                      <span className="duration">{exp.duration}</span>
                    </div>
                    <div className="company-info">
                      <h4 className="company">{exp.company}</h4>
                      <span className="location">📍 {exp.location}</span>
                    </div>
                    <p className="description">{exp.description}</p>
                    <div className="technologies">
                      <h5>Technologies Used:</h5>
                      <div className="tech-tags">
                        {exp.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                    <div className="achievements">
                      <h5>Key Achievements:</h5>
                      <div className="achievements-content">
                        {exp.achievements}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section fade-in-up">
          <div className="cta-content">
            <h2>Looking for Someone Who Delivers Results?</h2>
            <p>
              <span className="bold-white">I combine creativity and technical expertise to help businesses achieve their goals. Let's collaborate!</span>
            </p>
            <Link to="/contact">
              <button className="cta-button">Get In Touch</button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Experience;