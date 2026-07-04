const express = require('express');
const path = require('path');

require('./config/database');

const clienteRoutes = require('./routes/clienteRoutes');
const exercicioRoutes = require('./routes/exercicioRoutes');
const personalTrainerRoutes = require('./routes/personalTrainerRoutes');
const administradorRoutes = require('./routes/administradorRoutes');
const treinoRoutes = require('./routes/treinoRoutes');
const matriculaRoutes = require('./routes/matriculaRoutes');

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
app.use('/treinos', treinoRoutes);
app.use('/matriculas', matriculaRoutes);

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
            'landing.html'
        )
    );

});

app.get('/admin/dashboard', (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            'views',
            'admin',
            'dashboard.html'
        )
    );

});

app.get('/admin/gerenciar-clientes', (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            'views',
            'admin',
            'gerenciar-clientes.html'
        )
    );
});

app.get('/cliente/dashboard', (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            'views',
            'cliente',
            'dashboard.html'
        )
    );

});

app.get('/cliente/meu-treino', (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            'views',
            'cliente',
            'meu-treino.html'
        )
    );

});

app.get('/admin/treinos', (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            'views',
            'admin',
            'treinos.html'
        )
    );

});

app.get('/admin/gerenciar-personais', (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            'views',
            'admin',
            'gerenciar-personais.html'
        )
    );
});

app.listen(PORT, () => {
    console.log(
        `Servidor rodando na porta ${PORT}`
    );
});

app.get('/cadastro', (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            'views',
            'cadastro.html'
        )
    );

});

app.get('/admin/gerenciar-exercicios', (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            'views',
            'admin',
            'gerenciar-exercicios.html'
        )
    );
});
