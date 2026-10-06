const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProjectById,
  createProject,
  addTeamMember,
  deleteProject
} = require('../controllers/projectController');

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', createProject);
router.post('/:id/team', addTeamMember);
router.delete('/:id', deleteProject);

module.exports = router;
