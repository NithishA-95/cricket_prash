import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Hardcoded credentials for the village tournament demo
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      localStorage.setItem('isAdminLoggedIn', 'true');
      navigate('/admin');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container mt-8" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
        
        <div className="text-center mb-8">
          <div style={{ 
            display: 'inline-flex', 
            background: 'rgba(244, 63, 94, 0.1)', 
            padding: '1rem', 
            borderRadius: '50%',
            marginBottom: '1rem'
          }}>
            <Lock size={32} color="var(--accent)" />
          </div>
          <h2 className="gradient-text" style={{ fontSize: '1.75rem' }}>Admin Login</h2>
        </div>

        {error && (
          <div style={{ background: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label className="input-label">Username</label>
            <input 
              required
              type="text" 
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              className="input-field" 
              placeholder="Enter username" 
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input 
              required
              type="password" 
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              className="input-field" 
              placeholder="Enter password" 
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Secure Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
