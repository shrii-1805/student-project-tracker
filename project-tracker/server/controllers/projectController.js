// Pre-populated with your assignment sample project
let projects = [
  {
    id: "proj-1",
    name: "Smart Attendance System",
    description: "Academic project tracking attendance using smart detection.",
    teamMembers: ["Arun", "Bala", "Karthik", "Priya"],
    createdAt: new Date().toISOString()
  }
];

// 1. Get all projects
exports.getProjects = (req, res) => {
  res.json(projects);
};

// 2. Get project by ID
exports.getProjectById = (req, res) => {
  const project = projects.find(p => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }
  res.json(project);
};

// 3. Create a new project
exports.createProject = (req, res) => {
  const { name, description, teamMembers } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Project name is required" });
  }

  const newProject = {
    id: "proj-" + Date.now(),
    name,
    description: description || "",
    teamMembers: Array.isArray(teamMembers) ? teamMembers : [],
    createdAt: new Date().toISOString()
  };

  projects.push(newProject);
  res.status(201).json(newProject);
};

// 4. Add a team member to a project
exports.addTeamMember = (req, res) => {
  const { memberName } = req.body;
  const project = projects.find(p => p.id === req.params.id);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }
  if (!memberName) {
    return res.status(400).json({ message: "Member name is required" });
  }

  if (!project.teamMembers.includes(memberName)) {
    project.teamMembers.push(memberName);
  }

  res.json(project);
};

// 5. Delete a project
exports.deleteProject = (req, res) => {
  projects = projects.filter(p => p.id !== req.params.id);
  res.json({ message: "Project deleted successfully" });
};