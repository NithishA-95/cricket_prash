import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';

const Navbar = () => {
  return (
    <nav style={{
      padding: '1rem 2rem',
      background: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
        <Trophy size={24} color="var(--primary-color)" />
        <span className="gradient-text">Village Premier League</span>
      </Link>
      
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Home</Link>
        <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Register Now</Link>
      </div>
    </nav>
  );
};

export default Navbar;
