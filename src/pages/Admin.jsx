import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlayers, deletePlayer, updatePlayer } from '../utils/storage';
import { User, Phone, Activity, Shirt, LogOut, Trash2, Edit2, X, Download } from 'lucide-react';

const Admin = () => {
  const [players, setPlayers] = useState([]);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const navigate = useNavigate();

  const loadPlayers = async () => {
    const data = await getPlayers();
    setPlayers(data);
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/login');
      return;
    }
    loadPlayers();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/login');
  };

  const handleExport = () => {
    // Create CSV content
    if (players.length > 0) {
      const headers = ['fullName', 'mobileNumber', 'playingRole', 'battingStyle', 'bowlingStyle', 'jerseyNumber', 'jerseySize', 'registeredAt'];
      const csvRows = [headers.join(',')];
      
      for (const player of players) {
        const values = headers.map(header => {
          let val = player[header] || '';
          if (typeof val === 'string') {
             val = val.replace(/"/g, '""');
             return `"${val}"`;
          }
          return val;
        });
        csvRows.push(values.join(','));
      }
      
      // Download CSV
      const csvStr = "data:text/csv;charset=utf-8," + encodeURIComponent(csvRows.join('\n'));
      const csvAnchorNode = document.createElement('a');
      csvAnchorNode.setAttribute("href", csvStr);
      csvAnchorNode.setAttribute("download", "players.csv");
      document.body.appendChild(csvAnchorNode);
      csvAnchorNode.click();
      csvAnchorNode.remove();
    }

    // Download JSON (excluding photoBase64 to save size)
    const playersWithoutPhotos = players.map(({ photoBase64, ...rest }) => rest);
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(playersWithoutPhotos, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "players.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this player?')) {
      await deletePlayer(id);
      await loadPlayers();
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await updatePlayer(editingPlayer.id, editingPlayer);
    setEditingPlayer(null);
    await loadPlayers();
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingPlayer(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mt-8" style={{ paddingBottom: '4rem' }}>
      <div className="flex justify-between items-center mb-8">
        <h2 className="gradient-text" style={{ fontSize: '2.5rem' }}>Admin Dashboard</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
            Total Registered: <strong style={{ color: 'var(--primary-color)' }}>{players.length}</strong>
          </div>
          <button onClick={handleExport} className="btn btn-primary" style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Download size={16} /> Export
          </button>
          <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {players.length === 0 ? (
        <div className="glass-panel text-center" style={{ padding: '4rem 2rem' }}>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>No players have registered yet.</p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {players.map(player => (
            <div key={player.id} className="glass-panel" style={{ overflow: 'hidden', padding: 0 }}>
              
              <div style={{ 
                height: '200px', 
                background: player.photoBase64 ? `url(${player.photoBase64}) center/cover` : 'var(--bg-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: '1px solid var(--border-color)',
                position: 'relative'
              }}>
                <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => setEditingPlayer(player)} className="btn btn-secondary" style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.5)', border: 'none' }}>
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(player.id)} className="btn btn-secondary" style={{ padding: '0.5rem', background: 'rgba(244, 63, 94, 0.5)', border: 'none', color: 'white' }}>
                    <Trash2 size={16} />
                  </button>
                </div>
                {!player.photoBase64 && <User size={48} color="var(--text-muted)" />}
              </div>

              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
                  {player.fullName}
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                  <div className="flex items-center" style={{ gap: '0.5rem', color: 'var(--text-muted)' }}>
                    <Phone size={16} color="var(--primary-color)" />
                    {player.mobileNumber}
                  </div>
                  
                  <div className="flex items-center" style={{ gap: '0.5rem', color: 'var(--text-muted)' }}>
                    <Activity size={16} color="var(--accent)" />
                    {player.playingRole} • {player.battingStyle}
                  </div>

                  <div className="flex items-center" style={{ gap: '0.5rem', color: 'var(--text-muted)' }}>
                    <Shirt size={16} color="#a855f7" />
                    Jersey: {player.jerseyNumber} (Size {player.jerseySize})
                  </div>
                  
                  {player.bowlingStyle !== 'None' && (
                    <div style={{ color: 'var(--text-muted)', paddingLeft: '1.5rem' }}>
                      Bowling: {player.bowlingStyle}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingPlayer && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem'
        }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="flex justify-between items-center mb-6">
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)' }}>Edit Player</h3>
              <button onClick={() => setEditingPlayer(null)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            
            <form onSubmit={handleEditSubmit}>
              <div className="input-group">
                <label className="input-label">Full Name</label>
                <input required type="text" name="fullName" value={editingPlayer.fullName} onChange={handleEditChange} className="input-field" />
              </div>
              <div className="input-group">
                <label className="input-label">Mobile Number</label>
                <input required type="tel" name="mobileNumber" value={editingPlayer.mobileNumber} onChange={handleEditChange} className="input-field" />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label className="input-label">Playing Role</label>
                  <select name="playingRole" value={editingPlayer.playingRole} onChange={handleEditChange} className="input-field">
                    <option>Batsman</option><option>Bowler</option><option>All-rounder</option><option>Wicket Keeper</option>
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">Batting Style</label>
                  <select name="battingStyle" value={editingPlayer.battingStyle} onChange={handleEditChange} className="input-field">
                    <option>Right Hand</option><option>Left Hand</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label className="input-label">Jersey Number</label>
                  <input required type="number" name="jerseyNumber" value={editingPlayer.jerseyNumber} onChange={handleEditChange} className="input-field" />
                </div>
                <div className="input-group">
                  <label className="input-label">Jersey Size</label>
                  <select name="jerseySize" value={editingPlayer.jerseySize} onChange={handleEditChange} className="input-field">
                    <option>S</option><option>M</option><option>L</option><option>XL</option><option>XXL</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
