const mongoose = require('mongoose');

const VoluntarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  telefone: String,
  obra: String,
  dataCadastro: {
    type: Date,
    default: Date.now
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario', // refere-se ao model de usuários
    required: true
  }
});

module.exports = mongoose.model('Voluntario', VoluntarioSchema);
