const express = require('express');
const path = require('path');

require('./config/database');

const clienteRoutes = require('./routes/clienteRoutes');
const exercicioRoutes = require('./routes/exercicioRoutes');
const personalTrainerRoutes = require('./routes/personalTrainerRoutes');
const administradorRoutes = require('./routes/administradorRoutes');

const app = express();

const PORT = 3000;

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use('/clientes', clienteRoutes);
app.use('/exercicios', exercicioRoutes);
app.use('/personal-trainers', personalTrainerRoutes);
app.use('/administradores', administradorRoutes);

app.use(
    '/bootstrap',
    express.static(
        path.join(
            __dirname,
            '..',
            'node_modules',
            'bootstrap',
            'dist'
        )
    )
);

app.use(
    express.static(
        path.join(__dirname, 'public')
    )
);

app.get('/', (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            'views',
            'admin',
            'dashboard.html'
        )
    );

});

app.get('/admin/clientes', (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            'views',
            'admin',
            'clientes.html'
        )
    );

});

app.listen(PORT, () => {
    console.log(
        `Servidor rodando na porta ${PORT}`
    );
});
