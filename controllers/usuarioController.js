const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Buscar todos os usuários
exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-senha'); // não retornar a senha
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar usuários', erro: err.message });
  }
};


// Cadastrar novo usuário
exports.cadastrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const existe = await Usuario.findOne({ email });
    if (existe) return res.status(400).json({ mensagem: 'Email já cadastrado' });

    const hash = await bcrypt.hash(senha, 10);

    const novoUsuario = new Usuario({ nome, email, senha: hash });
    await novoUsuario.save();

    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao cadastrar', erro: err.message });
  }
};

// Login de usuário
exports.loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao fazer login', erro: err.message });
  }
};
