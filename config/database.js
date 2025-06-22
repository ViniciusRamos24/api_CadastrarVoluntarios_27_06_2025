const mongoose = require('mongoose');

function conectarBanco() {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI não definido no .env');
    process.exit(1);
  }

  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB conectado com sucesso'))
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1);
  });
}

module.exports = conectarBanco;
