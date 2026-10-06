import React from 'react';

function ProjectCard({ project, onSelectProject, onDeleteProject }) {
  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '18px',
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: '12px'
    }}>
      <div>
        <h3 style={{ margin: '0 0 8px 0', color: '#0f172a' }}>{project.name}</h3>
        <p style={{ margin: '0 0 12px 0', color: '#64748b', fontSize: '0.9rem' }}>
          {project.description || "No description provided."}
        </p>
        <div>
          <strong style={{ fontSize: '0.85rem', color: '#334155' }}>Team Members:</strong>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
            {project.teamMembers && project.teamMembers.length > 0 ? (
              project.teamMembers.map((member, index) => (
                <span key={index} style={{
                  backgroundColor: '#e0f2fe',
                  color: '#0369a1',
                  padding: '3px 8px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: '500'
                }}>
                  {member}
                </span>
              ))
            ) : (
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>None</span>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <button 
          onClick={() => onSelectProject(project.id)}
          style={{
            backgroundColor: '#2563eb',
            color: '#ffffff',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500'
          }}>
          View Details →
        </button>
        <button 
          onClick={() => onDeleteProject(project.id)}
          style={{
            backgroundColor: 'transparent',
            color: '#ef4444',
            border: '1px solid #fca5a5',
            padding: '8px 12px',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;
