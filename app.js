const express = require('express');
const dotenv = require('dotenv');
const conectarBanco = require('./config/database');
const usuariosRoutes = require('./routes/usuarios');
const voluntariosRoutes = require('./routes/voluntarios');
const auth = require('./middleware/auth');

dotenv.config();


const app = express();

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Rota raiz para teste rápido
app.get('/', (req, res) => {
  console.log("Rota / acessada");
  res.send('API rodando!');
});


// Rotas públicas para usuários (ex: cadastro e login)
app.use('/api/usuarios', usuariosRoutes);

// Rotas protegidas para voluntários (precisa estar autenticado)
app.use('/api/voluntarios', auth, voluntariosRoutes);

conectarBanco();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
