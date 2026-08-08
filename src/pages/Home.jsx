import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, ChevronRight, Trophy } from 'lucide-react';
import { getPlayerCount } from '../utils/storage';

const Home = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      const count = await getPlayerCount();
      setCount(count);
    };
    fetchCount();
  }, []);

  return (
    <div className="container mt-8 text-center" style={{ paddingBottom: '4rem' }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '4rem 2rem',
        marginTop: '2rem'
      }} className="glass-panel">
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div style={{ 
            background: 'rgba(34, 197, 94, 0.1)', 
            padding: '1rem', 
            borderRadius: '50%',
            boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)'
          }}>
            <Trophy size={48} color="var(--primary-color)" />
          </div>
        </div>

        <h1 className="mb-4" style={{ fontSize: '3rem' }}>
          Welcome to the <br />
          <span className="gradient-text">Village Premier League</span>
        </h1>
        
        <p className="mb-8" style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>
          Join the most exciting cricket tournament in the region. 
          Showcase your talent, represent your team, and fight for glory!
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <Link to="/register" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Register as Player <ChevronRight size={20} />
          </Link>
          <Link to="/admin" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            View Dashboard
          </Link>
        </div>

        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '1rem', 
          background: 'var(--bg-card)',
          padding: '1rem 2rem',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          backdropFilter: 'blur(12px)'
        }}>
          <Users size={32} color="var(--accent)" />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', lineHeight: 1 }}>{count}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Players Registered</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
