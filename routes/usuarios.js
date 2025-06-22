const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rota para buscar todos os usuários
router.get('/', usuarioController.getAllUsuarios);

// Rota para cadastrar novo usuário
router.post('/cadastrar', usuarioController.cadastrarUsuario);

// Rota para login de usuário
router.post('/login', usuarioController.loginUsuario);

module.exports = router;
