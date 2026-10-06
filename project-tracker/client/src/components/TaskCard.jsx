import React, { useState } from 'react';

function TaskCard({ task, onStatusChange, onAddComment, onDeleteTask }) {
  const [commentInput, setCommentInput] = useState('');

  const statusColors = {
    'Pending': { bg: '#fee2e2', text: '#b91c1c' },
    'In Progress': { bg: '#fef3c7', text: '#b45309' },
    'Completed': { bg: '#dcfce7', text: '#15803d' }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onAddComment(task.id, commentInput);
    setCommentInput('');
  };

  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '16px',
      backgroundColor: '#f8fafc',
      marginBottom: '14px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ margin: '0', fontSize: '1.05rem', color: '#1e293b' }}>{task.title}</h4>
        <button 
          onClick={() => onDeleteTask(task.id)}
          style={{
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            fontSize: '1rem'
          }}>
          ✕
        </button>
      </div>

      <div style={{ margin: '10px 0', display: 'flex', flexWrap: 'wrap', gap: '15px', fontSize: '0.85rem', color: '#475569' }}>
        <div>
          <b>Assigned:</b> {task.assignedTo || 'Unassigned'}
        </div>
        <div>
          <b>Deadline:</b> {task.deadline || 'No deadline'}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Status:</label>
        <select 
          value={task.status} 
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          style={{
            padding: '4px 8px',
            borderRadius: '4px',
            border: '1px solid #cbd5e1',
            backgroundColor: (statusColors[task.status] || {}).bg || '#fff',
            color: (statusColors[task.status] || {}).text || '#000',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed ✓</option>
        </select>
      </div>

      <div style={{ marginTop: '12px', borderTop: '1px dashed #cbd5e1', paddingTop: '10px' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#334155', marginBottom: '6px' }}>
          Comments ({task.comments ? task.comments.length : 0}):
        </div>
        <ul style={{ margin: '0 0 10px 0', paddingLeft: '18px', fontSize: '0.82rem', color: '#475569' }}>
          {task.comments && task.comments.map((comm, idx) => (
            <li key={idx} style={{ marginBottom: '4px' }}>{comm}</li>
          ))}
        </ul>

        <form onSubmit={handleCommentSubmit} style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            style={{
              flex: 1,
              padding: '6px 10px',
              fontSize: '0.82rem',
              border: '1px solid #cbd5e1',
              borderRadius: '4px'
            }}
          />
          <button 
            type="submit"
            style={{
              padding: '6px 12px',
              fontSize: '0.82rem',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskCard;
