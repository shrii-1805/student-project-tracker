import React, { useState } from 'react';
import ProjectCard from '../components/ProjectCard';

function Dashboard({ projects, onSelectProject, onCreateProject, onDeleteProject }) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [membersInput, setMembersInput] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const team = membersInput
      .split(',')
      .map(m => m.trim())
      .filter(m => m.length > 0);

    onCreateProject({
      name,
      description,
      teamMembers: team.length > 0 ? team : ['Student']
    });

    setName('');
    setDescription('');
    setMembersInput('');
    setShowModal(false);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#0f172a' }}>Academic Projects</h2>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem' }}>Track engineering deliverables and assignments</p>
        </div>
        <button 
          onClick={() => setShowModal(!showModal)}
          style={{
            backgroundColor: '#2563eb',
            color: '#fff',
            border: 'none',
            padding: '10px 18px',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
          + New Project
        </button>
      </div>

      {showModal && (
        <form onSubmit={handleCreate} style={{ backgroundColor: '#fff', border: '1px solid #cbd5e1', padding: '20px', borderRadius: '8px', marginBottom: '24px' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '1.1rem' }}>Create New Academic Project</h3>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Project Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Smart Attendance System"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
            />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Description</label>
            <textarea
              placeholder="Short description of the problem statement and scope"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', minHeight: '60px' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Team Members (comma separated)</label>
            <input
              type="text"
              placeholder="Arun, Bala, Karthik, Priya"
              value={membersInput}
              onChange={(e) => setMembersInput(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={{ backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer' }}>Save Project</button>
            <button type="button" onClick={() => setShowModal(false)} style={{ backgroundColor: '#94a3b8', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </form>
      )}

      {projects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#fff', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
          <p style={{ color: '#64748b' }}>No projects created yet. Click "+ New Project" to get started!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {projects.map(proj => (
            <ProjectCard 
              key={proj.id} 
              project={proj} 
              onSelectProject={onSelectProject} 
              onDeleteProject={onDeleteProject} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
