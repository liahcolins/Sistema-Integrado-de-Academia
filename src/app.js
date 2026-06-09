const express = require('express');
require('./config/database');

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('FitCore - Sistema Integrado de Academia');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});