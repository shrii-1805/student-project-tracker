import React from 'react';

function Navbar({ user, onLogout, onNavigate, currentView }) {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 24px',
      backgroundColor: '#1e293b',
      color: '#ffffff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <h2 style={{ margin: 0, fontSize: '1.25rem', cursor: 'pointer' }} onClick={() => onNavigate('dashboard')}>
          🎓 Student Project Tracker
        </h2>
        {user && (
          <button 
            onClick={() => onNavigate('dashboard')} 
            style={{
              background: currentView === 'dashboard' ? '#3b82f6' : 'transparent',
              color: '#fff',
              border: '1px solid #475569',
              borderRadius: '6px',
              padding: '6px 12px',
              cursor: 'pointer'
            }}>
            Dashboard
          </button>
        )}
      </div>

      <div>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>Welcome, <b>{user.name}</b></span>
            <button 
              onClick={onLogout}
              style={{
                backgroundColor: '#ef4444',
                color: '#fff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>
              Logout
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => onNavigate('login')}
              style={{
                backgroundColor: currentView === 'login' ? '#3b82f6' : '#334155',
                color: '#fff',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>
              Login
            </button>
            <button 
              onClick={() => onNavigate('register')}
              style={{
                backgroundColor: currentView === 'register' ? '#3b82f6' : '#334155',
                color: '#fff',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>
              Register
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
