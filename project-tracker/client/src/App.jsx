import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ProjectDetails from './pages/ProjectDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import { projectService, taskService } from './services/api';

function App() {
  const [user, setUser] = useState({ id: '1', name: 'Demo Student', email: 'student@example.com' });
  const [currentView, setCurrentView] = useState('dashboard');
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [tasks, setTasks] = useState([]);

  // Load Projects from Backend
  const fetchProjects = async () => {
    try {
      const res = await projectService.getAll();
      setProjects(res.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  // Load Tasks when a Project is selected
  const fetchTasks = async (projectId) => {
    try {
      const res = await taskService.getByProject(projectId);
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProjectId) {
      fetchTasks(selectedProjectId);
    }
  }, [selectedProjectId]);

  // Project Handlers
  const handleCreateProject = async (projectData) => {
    try {
      const res = await projectService.create(projectData);
      setProjects([...projects, res.data]);
    } catch (err) {
      console.error('Error creating project:', err);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await projectService.delete(id);
      setProjects(projects.filter(p => p.id !== id));
      if (selectedProjectId === id) {
        setSelectedProjectId(null);
        setCurrentView('dashboard');
      }
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  const handleSelectProject = (id) => {
    setSelectedProjectId(id);
    setCurrentView('details');
  };

  const handleAddMember = async (projectId, memberName) => {
    try {
      const res = await projectService.addMember(projectId, memberName);
      setProjects(projects.map(p => (p.id === projectId ? res.data : p)));
    } catch (err) {
      console.error('Error adding member:', err);
    }
  };

  // Task Handlers
  const handleAddTask = async (projectId, taskData) => {
    try {
      const res = await taskService.create({ ...taskData, projectId });
      setTasks([...tasks, res.data]);
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      const res = await taskService.update(taskId, { status: newStatus });
      setTasks(tasks.map(t => (t.id === taskId ? res.data : t)));
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleAddComment = async (taskId, commentText) => {
    try {
      const res = await taskService.addComment(taskId, commentText);
      setTasks(tasks.map(t => (t.id === taskId ? res.data : t)));
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.delete(taskId);
      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const activeProject = projects.find(p => p.id === selectedProjectId);

  return (
    <div style={{ backgroundColor: '#f1f5f9', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Navbar 
        user={user} 
        onLogout={() => { setUser(null); setCurrentView('login'); }}
        onNavigate={(view) => setCurrentView(view)}
        currentView={currentView}
      />

      <main>
        {currentView === 'login' && (
          <Login 
            onLoginSuccess={(loggedInUser) => { setUser(loggedInUser); setCurrentView('dashboard'); }} 
            onSwitchToRegister={() => setCurrentView('register')} 
          />
        )}

        {currentView === 'register' && (
          <Register 
            onRegisterSuccess={(newUser) => { setUser(newUser); setCurrentView('dashboard'); }} 
            onSwitchToLogin={() => setCurrentView('login')} 
          />
        )}

        {currentView === 'dashboard' && (
          <Dashboard 
            projects={projects} 
            onSelectProject={handleSelectProject} 
            onCreateProject={handleCreateProject} 
            onDeleteProject={handleDeleteProject} 
          />
        )}

        {currentView === 'details' && activeProject && (
          <ProjectDetails 
            project={activeProject} 
            tasks={tasks} 
            onBack={() => { setSelectedProjectId(null); setCurrentView('dashboard'); }}
            onAddMember={handleAddMember}
            onAddTask={handleAddTask}
            onUpdateTaskStatus={handleUpdateTaskStatus}
            onAddComment={handleAddComment}
            onDeleteTask={handleDeleteTask}
          />
        )}
      </main>
    </div>
  );
}

export default App;
