const express = require('express');
require('./config/database');

const clienteRoutes = require('./routes/clienteRoutes');
const exercicioRoutes = require('./routes/exercicioRoutes');

const app = express();

app.use(express.json());

app.use('/clientes', clienteRoutes);
app.use('/exercicios', exercicioRoutes);

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('FitCore - Sistema Integrado de Academia');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
