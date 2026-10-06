import React, { useState } from 'react';

function Register({ onRegisterSuccess, onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    onRegisterSuccess({ id: String(Date.now()), name, email });
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '24px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#1e293b' }}>Create Student Account</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '14px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Full Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', boxSizing: 'border-box', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
          />
        </div>
        <div style={{ marginBottom: '14px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', boxSizing: 'border-box', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
          />
        </div>
        <div style={{ marginBottom: '18px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', boxSizing: 'border-box', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          Register
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.85rem', color: '#64748b' }}>
        Already registered? <span onClick={onSwitchToLogin} style={{ color: '#2563eb', cursor: 'pointer', fontWeight: 'bold' }}>Sign In</span>
      </p>
    </div>
  );
}

export default Register;
