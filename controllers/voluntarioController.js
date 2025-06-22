const Voluntario = require('../models/Voluntario');

// Listar todos os voluntários do usuário logado
exports.getAllVoluntarios = async (req, res) => {
  try {
    const voluntarios = await Voluntario.find({ usuario: req.usuario.id });
    res.json(voluntarios);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar voluntários', erro: err.message });
  }
};

// Buscar um voluntário específico pelo ID e pelo dono (usuário logado)
exports.getVoluntarioById = async (req, res) => {
  try {
    const voluntario = await Voluntario.findOne({ _id: req.params.id, usuario: req.usuario.id });
    if (!voluntario) return res.status(404).json({ mensagem: 'Voluntário não encontrado' });
    res.json(voluntario);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar voluntário', erro: err.message });
  }
};

// Criar um novo voluntário
exports.createVoluntario = async (req, res) => {
  try {
    const novoVoluntario = new Voluntario({ ...req.body, usuario: req.usuario.id });
    await novoVoluntario.save();
    res.status(201).json(novoVoluntario);
  } catch (err) {
    res.status(400).json({ mensagem: 'Erro ao criar voluntário', erro: err.message });
  }
};

// Atualizar voluntário
exports.updateVoluntario = async (req, res) => {
  try {
    const voluntarioAtualizado = await Voluntario.findOneAndUpdate(
      { _id: req.params.id, usuario: req.usuario.id },
      req.body,
      { new: true }
    );

    if (!voluntarioAtualizado) return res.status(404).json({ mensagem: 'Voluntário não encontrado' });
    res.json(voluntarioAtualizado);
  } catch (err) {
    res.status(400).json({ mensagem: 'Erro ao atualizar voluntário', erro: err.message });
  }
};

// Excluir voluntário
exports.deleteVoluntario = async (req, res) => {
  try {
    const voluntarioRemovido = await Voluntario.findOneAndDelete({ _id: req.params.id, usuario: req.usuario.id });
    if (!voluntarioRemovido) return res.status(404).json({ mensagem: 'Voluntário não encontrado' });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao excluir voluntário', erro: err.message });
  }
};
