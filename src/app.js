const express = require('express');
const path = require('path');

const db = require('./config/database');

const clienteRoutes = require('./routes/clienteRoutes');
const exercicioRoutes = require('./routes/exercicioRoutes');
const personalTrainerRoutes = require('./routes/personalTrainerRoutes');
const administradorRoutes = require('./routes/administradorRoutes');
const treinoRoutes = require('./routes/treinoRoutes');
const matriculaRoutes = require('./routes/matriculaRoutes');
const itemTreinoRoutes = require('./routes/itemTreinoRoutes');


const app = express();

const PORT = process.env.PORT || 3000;

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
app.use('/itens-treino', itemTreinoRoutes);


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

app.get('/cliente/evolucao', (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            'views',
            'cliente',
            'evolucao.html'
        )
    );

});

app.get('/cliente/minha-matricula', (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            'views',
            'cliente',
            'minha-matricula.html'
        )
    );

});

app.get('/cliente/perfil', (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            'views',
            'cliente',
            'perfil.html'
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

app.get('/login', (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            'views',
            'auth',
            'login.html'
        )
    );
});

app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ erro: 'E-mail e senha são obrigatórios' });
    }

    // 1. Verificar na tabela administrador
    const sqlAdmin = 'SELECT id, nome, email FROM administrador WHERE email = ? AND senha = ?';
    db.query(sqlAdmin, [email, senha], (err, resultsAdmin) => {
        if (err) {
            console.error('Erro ao buscar admin:', err);
            return res.status(500).json({ erro: 'Erro interno do servidor' });
        }

        if (resultsAdmin.length > 0) {
            return res.json({
                sucesso: true,
                perfil: 'admin',
                usuario: resultsAdmin[0],
                redirecionar: '/admin/dashboard'
            });
        }

        // 2. Verificar na tabela personal_trainer
        const sqlPersonal = 'SELECT id, nome, email FROM personal_trainer WHERE email = ? AND senha = ?';
        db.query(sqlPersonal, [email, senha], (err, resultsPersonal) => {
            if (err) {
                console.error('Erro ao buscar personal:', err);
                return res.status(500).json({ erro: 'Erro interno do servidor' });
            }

            if (resultsPersonal.length > 0) {
                return res.json({
                    sucesso: true,
                    perfil: 'personal',
                    usuario: resultsPersonal[0],
                    redirecionar: '/personal-trainer/dashboard'
                });
            }

            // 3. Verificar na tabela cliente
            const sqlCliente = 'SELECT id, nome, email, status_matricula FROM cliente WHERE email = ? AND senha = ?';
            db.query(sqlCliente, [email, senha], (err, resultsCliente) => {
                if (err) {
                    console.error('Erro ao buscar cliente:', err);
                    return res.status(500).json({ erro: 'Erro interno do servidor' });
                }

                if (resultsCliente.length > 0) {
                    return res.json({
                        sucesso: true,
                        perfil: 'cliente',
                        usuario: resultsCliente[0],
                        redirecionar: '/cliente/dashboard'
                    });
                }

                return res.status(401).json({ erro: 'E-mail ou senha incorretos' });
            });
        });
    });
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

