import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPlayer } from '../utils/storage';
import { Upload, CheckCircle } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    playingRole: 'Batsman',
    battingStyle: 'Right Hand',
    bowlingStyle: 'None',
    jerseyNumber: '',
    jerseySize: 'M',
    photoBase64: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoName, setPhotoName] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photoBase64: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addPlayer(formData);
      navigate('/admin');
    } catch (error) {
      console.error('Failed to register:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-8 mb-8" style={{ paddingBottom: '4rem' }}>
      <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
        <h2 className="text-center mb-8 gradient-text" style={{ fontSize: '2rem' }}>Player Registration</h2>
        
        <form onSubmit={handleSubmit}>
          
          <div className="input-group">
            <label className="input-label">Full Name</label>
            <input 
              required
              type="text" 
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="input-field" 
              placeholder="e.g. MS Dhoni" 
            />
          </div>

          <div className="input-group">
            <label className="input-label">Mobile Number</label>
            <input 
              required
              type="tel" 
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              className="input-field" 
              placeholder="10 digit mobile number" 
              pattern="[0-9]{10}"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label className="input-label">Playing Role</label>
              <select name="playingRole" value={formData.playingRole} onChange={handleInputChange} className="input-field">
                <option>Batsman</option>
                <option>Bowler</option>
                <option>All-rounder</option>
                <option>Wicket Keeper</option>
              </select>
            </div>
            
            <div className="input-group">
              <label className="input-label">Batting Style</label>
              <select name="battingStyle" value={formData.battingStyle} onChange={handleInputChange} className="input-field">
                <option>Right Hand</option>
                <option>Left Hand</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Bowling Style</label>
            <select name="bowlingStyle" value={formData.bowlingStyle} onChange={handleInputChange} className="input-field">
              <option>None</option>
              <option>Right Arm Fast</option>
              <option>Right Arm Medium</option>
              <option>Right Arm Spin</option>
              <option>Left Arm Fast</option>
              <option>Left Arm Spin</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label className="input-label">Jersey Number</label>
              <input 
                required
                type="number" 
                name="jerseyNumber"
                value={formData.jerseyNumber}
                onChange={handleInputChange}
                className="input-field" 
                placeholder="e.g. 7" 
                min="0"
                max="999"
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">Jersey Size</label>
              <select name="jerseySize" value={formData.jerseySize} onChange={handleInputChange} className="input-field">
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
                <option>XXL</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Player Photo</label>
            <div 
              className="file-input" 
              onClick={() => fileInputRef.current?.click()}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', minHeight: '100px', flexDirection: 'column' }}
            >
              {photoName ? (
                <>
                  <CheckCircle color="#10b981" size={24} />
                  <span style={{ color: '#10b981', fontSize: '0.875rem' }}>{photoName}</span>
                </>
              ) : (
                <>
                  <Upload color="var(--text-muted)" size={24} />
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Click to upload photo (Max 2MB)</span>
                </>
              )}
            </div>
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleFileChange}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Complete Registration'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
