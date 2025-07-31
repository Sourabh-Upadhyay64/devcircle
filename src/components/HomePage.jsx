import React, { useState } from 'react';
import {
  Code,
  Users,
  Trophy,
  Calendar,
  MessageCircle,
  Zap,
  ArrowRight,
  Play,
  Star,
  CheckCircle,
  Menu,
  X
} from 'lucide-react';
import './HomePage.css';

const HomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <Code className="icon" />,
      title: "Real-time Collaboration",
      description: "Work together seamlessly with integrated chat and project sharing"
    },
    {
      icon: <Users className="icon" />,
      title: "Team Management",
      description: "Create teams, assign roles, and manage participants effortlessly"
    },
    {
      icon: <Trophy className="icon" />,
      title: "Hackathon Organization",
      description: "Host and participate in hackathons with comprehensive event management"
    },
    {
      icon: <MessageCircle className="icon" />,
      title: "Instant Messaging",
      description: "Stay connected with your team through real-time chat powered by Socket.IO"
    },
    {
      icon: <Calendar className="icon" />,
      title: "Event Scheduling",
      description: "Track deadlines, milestones, and important dates with built-in timers"
    },
    {
      icon: <Zap className="icon" />,
      title: "Quick Submissions",
      description: "Submit projects with GitHub integration and automatic deadline validation"
    }
  ];

  const stats = [
    { number: "1000+", label: "Active Developers" },
    { number: "50+", label: "Hackathons Hosted" },
    { number: "200+", label: "Projects Submitted" },
    { number: "95%", label: "Success Rate" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Full Stack Developer",
      content: "DevCircle made organizing our company hackathon incredibly smooth. The real-time features are game-changing!",
      rating: 5
    },
    {
      name: "Alex Rodriguez",
      role: "Tech Lead",
      content: "Love how easy it is to manage teams and track submissions. The platform is intuitive and powerful.",
      rating: 5
    },
    {
      name: "Maya Patel",
      role: "Product Manager",
      content: "Finally, a hackathon platform that gets it right. Everything we needed in one place.",
      rating: 5
    }
  ];

  return (
    <div className="homepage">
      <nav className="navbar">
        <div className="container">
          <div className="navbar-content">
            <div className="logo">DevCircle</div>
            <div className="menu desktop-menu">
              <a href="#">Home</a>
              <a href="#">Hackathons</a>
              <a href="#">Teams</a>
              <a href="#">About</a>
            </div>
            <div className="auth-buttons desktop-menu">
              <button className="btn login">Login</button>
              <button className="btn signup">Sign Up</button>
            </div>
            <div className="mobile-menu-button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <a href="#">Home</a>
            <a href="#">Hackathons</a>
            <a href="#">Teams</a>
            <a href="#">About</a>
            <button className="btn login">Login</button>
            <button className="btn signup">Sign Up</button>
          </div>
        )}
      </nav>

      <section className="hero">
        <div className="container">
          <h1>Welcome to <span className="highlight">DevCircle</span></h1>
          <p>The ultimate hackathon platform where developers collaborate, compete, and create amazing projects together</p>
          <div className="hero-buttons">
            <button className="btn primary">Create Hackathon <ArrowRight /></button>
            <button className="btn outline"><Play /> Join Hackathon</button>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Everything You Need for <span className="highlight">Successful Hackathons</span></h2>
            <p>From team formation to project submission, DevCircle provides all the tools you need</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>What Developers Say About <span className="highlight">DevCircle</span></h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, index) => (
              <div key={index} className="testimonial-card">
                <div className="stars">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="star" />)}
                </div>
                <p>"{t.content}"</p>
                <div className="author">
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to Start Your Next Hackathon?</h2>
            <p>Join thousands of developers already using DevCircle to create amazing projects</p>
            <div className="cta-buttons">
              <button className="btn white"><CheckCircle  onClick={() => navigate('/auth')} /> Get Started Free</button>
              <button className="btn transparent">Learn More</button>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-about">
            <h3 className="logo">DevCircle</h3>
            <p>Empowering developers to collaborate, compete, and create through seamless hackathon experiences.</p>
          </div>
          <div className="footer-links">
            <h4>Platform</h4>
            <ul>
              <li><a href="#">Features</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">API</a></li>
              <li><a href="#">Documentation</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Status</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 DevCircle. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
