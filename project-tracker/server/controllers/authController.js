// In-memory user list (no MongoDB required)
let users = [
  {
    id: "1",
    name: "Demo Student",
    email: "student@example.com",
    password: "password123"
  }
];

// Register User
exports.register = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields." });
  }

  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return res.status(400).json({ message: "User already exists with this email." });
  }

  const newUser = {
    id: String(Date.now()),
    name,
    email,
    password
  };

  users.push(newUser);

  res.status(201).json({
    message: "Registration successful!",
    user: { id: newUser.id, name: newUser.name, email: newUser.email }
  });
};

// Login User
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please provide email and password." });
  }

  const user = users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  res.json({
    message: "Login successful!",
    user: { id: user.id, name: user.name, email: user.email }
  });
};