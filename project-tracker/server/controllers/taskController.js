// Pre-populated sample tasks for "Smart Attendance System"
let tasks = [
  {
    id: "task-1",
    projectId: "proj-1",
    title: "Database",
    assignedTo: "Arun",
    status: "Completed",
    deadline: "2026-10-10",
    comments: ["MongoDB collections designed successfully."]
  },
  {
    id: "task-2",
    projectId: "proj-1",
    title: "Backend API",
    assignedTo: "Bala",
    status: "Completed",
    deadline: "2026-10-15",
    comments: ["Express endpoints created and tested."]
  },
  {
    id: "task-3",
    projectId: "proj-1",
    title: "React UI",
    assignedTo: "Karthik",
    status: "In Progress",
    deadline: "2026-10-20",
    comments: ["Working on Dashboard and Project detail pages."]
  },
  {
    id: "task-4",
    projectId: "proj-1",
    title: "Testing",
    assignedTo: "Priya",
    status: "Pending",
    deadline: "2026-10-25",
    comments: []
  },
  {
    id: "task-5",
    projectId: "proj-1",
    title: "Documentation",
    assignedTo: "Arun",
    status: "Pending",
    deadline: "2026-10-30",
    comments: []
  }
];

// Get tasks by project ID
exports.getTasksByProject = (req, res) => {
  const projectTasks = tasks.filter(t => t.projectId === req.params.projectId);
  res.json(projectTasks);
};

// Create a new task
exports.createTask = (req, res) => {
  const { projectId, title, assignedTo, deadline } = req.body;
  if (!projectId || !title) {
    return res.status(400).json({ message: "Project ID and task title are required" });
  }

  const newTask = {
    id: "task-" + Date.now(),
    projectId,
    title,
    assignedTo: assignedTo || "Unassigned",
    status: "Pending",
    deadline: deadline || "",
    comments: []
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

// Update task status or assigned member
exports.updateTask = (req, res) => {
  const { status, assignedTo, deadline } = req.body;
  const task = tasks.find(t => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (status !== undefined) task.status = status;
  if (assignedTo !== undefined) task.assignedTo = assignedTo;
  if (deadline !== undefined) task.deadline = deadline;

  res.json(task);
};

// Add comment to task
exports.addComment = (req, res) => {
  const { text } = req.body;
  const task = tasks.find(t => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  if (!text) {
    return res.status(400).json({ message: "Comment text cannot be empty" });
  }

  task.comments.push(text);
  res.json(task);
};

// Delete a task
exports.deleteTask = (req, res) => {
  tasks = tasks.filter(t => t.id !== req.params.id);
  res.json({ message: "Task deleted successfully" });
};
