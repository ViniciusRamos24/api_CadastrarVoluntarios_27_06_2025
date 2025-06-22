const express = require('express');
const router = express.Router();
const voluntarioController = require('../controllers/voluntarioController');

// GET /api/voluntarios
router.get('/', voluntarioController.getAllVoluntarios);

// GET /api/voluntarios/:id
router.get('/:id', voluntarioController.getVoluntarioById);

// POST /api/voluntarios
router.post('/', voluntarioController.createVoluntario);

// PUT /api/voluntarios/:id
router.put('/:id', voluntarioController.updateVoluntario);

// DELETE /api/voluntarios/:id
router.delete('/:id', voluntarioController.deleteVoluntario);

module.exports = router;
