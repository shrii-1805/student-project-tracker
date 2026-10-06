import React, { useState } from 'react';

function TaskForm({ teamMembers, onAddTask }) {
  const [title, setTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState(teamMembers[0] || '');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title,
      assignedTo: assignedTo || (teamMembers[0] || 'Unassigned'),
      deadline
    });

    setTitle('');
    setDeadline('');
  };

  return (
    <form onSubmit={handleSubmit} style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '20px'
    }}>
      <h4 style={{ margin: '0 0 12px 0', color: '#1e293b' }}>Add New Task</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', color: '#475569', marginBottom: '4px' }}>Task Title *</label>
          <input
            type="text"
            placeholder="e.g. Database setup"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', boxSizing: 'border-box', padding: '6px 8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', color: '#475569', marginBottom: '4px' }}>Assign To</label>
          <select 
            value={assignedTo} 
            onChange={(e) => setAssignedTo(e.target.value)}
            style={{ width: '100%', boxSizing: 'border-box', padding: '6px 8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
            {teamMembers.map((member, i) => (
              <option key={i} value={member}>{member}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', color: '#475569', marginBottom: '4px' }}>Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            style={{ width: '100%', boxSizing: 'border-box', padding: '6px 8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
          />
        </div>
      </div>

      <button 
        type="submit"
        style={{
          marginTop: '12px',
          backgroundColor: '#10b981',
          color: '#ffffff',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: '500'
        }}>
        + Create Task
      </button>
    </form>
  );
}

export default TaskForm;
