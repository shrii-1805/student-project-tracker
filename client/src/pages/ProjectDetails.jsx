import React, { useState } from 'react';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

function ProjectDetails({ project, tasks, onBack, onAddMember, onAddTask, onUpdateTaskStatus, onAddComment, onDeleteTask }) {
  const [newMember, setNewMember] = useState('');

  // Calculate Progress
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleMemberSubmit = (e) => {
    e.preventDefault();
    if (!newMember.trim()) return;
    onAddMember(project.id, newMember.trim());
    setNewMember('');
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto' }}>
      <button 
        onClick={onBack}
        style={{
          background: 'none',
          border: 'none',
          color: '#2563eb',
          cursor: 'pointer',
          fontSize: '0.95rem',
          marginBottom: '16px',
          padding: 0,
          fontWeight: '500'
        }}>
        ← Back to Dashboard
      </button>

      {/* Project Overview Card */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 8px 0', color: '#0f172a' }}>{project.name}</h2>
        <p style={{ margin: '0 0 16px 0', color: '#64748b' }}>{project.description || 'No description provided.'}</p>

        {/* Progress Tracker Bar */}
        <div style={{ marginBottom: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.88rem' }}>
            <span><strong>Progress:</strong> {completedTasks} of {totalTasks} tasks completed</span>
            <strong>{progressPercent}%</strong>
          </div>
          <div style={{ width: '100%', height: '10px', backgroundColor: '#e2e8f0', borderRadius: '5px', overflow: 'hidden' }}>
            <div style={{
              width: `${progressPercent}%`,
              height: '100%',
              backgroundColor: progressPercent === 100 ? '#10b981' : '#3b82f6',
              transition: 'width 0.3s ease-in-out'
            }} />
          </div>
        </div>

        {/* Team Members List & Add Form */}
        <div>
          <strong style={{ fontSize: '0.9rem', color: '#334155' }}>Team Members:</strong>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '8px 0 12px 0' }}>
            {project.teamMembers && project.teamMembers.map((m, i) => (
              <span key={i} style={{ backgroundColor: '#e0f2fe', color: '#0284c7', padding: '4px 10px', borderRadius: '15px', fontSize: '0.85rem' }}>
                👤 {m}
              </span>
            ))}
          </div>

          <form onSubmit={handleMemberSubmit} style={{ display: 'flex', gap: '8px', maxWidth: '350px' }}>
            <input 
              type="text"
              placeholder="Add new teammate..."
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
              style={{ flex: 1, padding: '6px 10px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
            />
            <button type="submit" style={{ padding: '6px 12px', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>
              Add Member
            </button>
          </form>
        </div>
      </div>

      {/* Task Creation Form */}
      <TaskForm teamMembers={project.teamMembers || []} onAddTask={(taskData) => onAddTask(project.id, taskData)} />

      {/* Task List */}
      <div>
        <h3 style={{ color: '#1e293b', marginBottom: '14px' }}>Project Tasks ({tasks.length})</h3>
        {tasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', backgroundColor: '#fff', borderRadius: '8px', border: '1px dashed #cbd5e1', color: '#64748b' }}>
            No tasks found. Use the form above to add your first task!
          </div>
        ) : (
          tasks.map(t => (
            <TaskCard 
              key={t.id} 
              task={t} 
              onStatusChange={onUpdateTaskStatus} 
              onAddComment={onAddComment} 
              onDeleteTask={onDeleteTask} 
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ProjectDetails;
