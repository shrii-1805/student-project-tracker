import React, { useState } from 'react';

function Login({ onLoginSuccess, onSwitchToRegister }) {
  const [email, setEmail] = useState('student@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    // Simple demo login
    onLoginSuccess({ id: '1', name: 'Demo Student', email });
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '24px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#1e293b' }}>Student Login</h2>
      {error && <div style={{ color: '#ef4444', marginBottom: '12px', fontSize: '0.9rem' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '14px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', boxSizing: 'border-box', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
          />
        </div>
        <div style={{ marginBottom: '18px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', boxSizing: 'border-box', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          Sign In
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.85rem', color: '#64748b' }}>
        Don't have an account? <span onClick={onSwitchToRegister} style={{ color: '#2563eb', cursor: 'pointer', fontWeight: 'bold' }}>Register</span>
      </p>
    </div>
  );
}

export default Login;
