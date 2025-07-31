import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import './AuthPage.css';

const AuthPages = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (currentPage === 'signup' && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (currentPage === 'signup' && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (currentPage === 'login') {
        setMessage('Login successful! Redirecting...');
      } else {
        setMessage('Account created successfully! Please login.');
        setTimeout(() => setCurrentPage('login'), 2000);
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchPage = (page) => {
    setCurrentPage(page);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    setMessage('');
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-header">
          <h1>DevCircle</h1>
          <p>Join the ultimate hackathon platform</p>
        </div>

        <div className="auth-card">
          <div className="auth-tabs">
            <button
              onClick={() => switchPage('login')}
              className={currentPage === 'login' ? 'active' : ''}
            >
              Login
            </button>
            <button
              onClick={() => switchPage('signup')}
              className={currentPage === 'signup' ? 'active' : ''}
            >
              Sign Up
            </button>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            {currentPage === 'signup' && (
              <div className="input-group">
                <label>Full Name</label>
                <div className="input-wrapper">
                  <User className="input-icon" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`input-field ${errors.name ? 'input-error' : ''}`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && <p className="error-msg"><AlertCircle size={16} /> {errors.name}</p>}
              </div>
            )}

            <div className="input-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`input-field ${errors.email ? 'input-error' : ''}`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="error-msg"><AlertCircle size={16} /> {errors.email}</p>}
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`input-field ${errors.password ? 'input-error' : ''}`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="error-msg"><AlertCircle size={16} /> {errors.password}</p>}
            </div>

            {currentPage === 'signup' && (
              <div className="input-group">
                <label>Confirm Password</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`input-field ${errors.confirmPassword ? 'input-error' : ''}`}
                    placeholder="Confirm your password"
                  />
                </div>
                {errors.confirmPassword && <p className="error-msg"><AlertCircle size={16} /> {errors.confirmPassword}</p>}
              </div>
            )}

            {message && (
              <div className={`auth-message ${message.includes('successful') || message.includes('created') ? 'success' : 'error'}`}>
                {message.includes('successful') || message.includes('created') ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                <span style={{ marginLeft: '0.5rem' }}>{message}</span>
              </div>
            )}

            <button type="submit" disabled={loading} className="submit-button">
              {loading ? (
                <span>{currentPage === 'login' ? 'Signing In...' : 'Creating Account...'}</span>
              ) : (
                currentPage === 'login' ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {currentPage === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button type="button" onClick={() => switchPage(currentPage === 'login' ? 'signup' : 'login')}>
                {currentPage === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPages;