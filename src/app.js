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
const Usuario = require('./models/Usuario');


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

app.get('/personal-trainer/dashboard', (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            'views',
            'personalTrainer',
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

app.get('/admin/gerenciar-matriculas', (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            'views',
            'admin',
            'gerenciar-matriculas.html'
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

                // 4. Verificar na tabela usuario (pendente de aprovação)
                const sqlUsuario = 'SELECT id, nome, email, status FROM usuario WHERE email = ? AND senha = ?';
                db.query(sqlUsuario, [email, senha], (err, resultsUsuario) => {
                    if (err) {
                        console.error('Erro ao buscar usuario pendente:', err);
                        return res.status(500).json({ erro: 'Erro interno do servidor' });
                    }

                    if (resultsUsuario.length > 0) {
                        return res.json({
                            sucesso: true,
                            perfil: 'usuario_pendente',
                            usuario: resultsUsuario[0],
                            redirecionar: '/usuario/pendente'
                        });
                    }

                    return res.status(401).json({ erro: 'E-mail ou senha incorretos' });
                });
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

// Rotas de visualização para Usuários Pendentes
app.get('/usuario/pendente', (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            'views',
            'usuario',
            'pendente.html'
        )
    );
});

app.get('/admin/usuarios-pendentes', (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            'views',
            'admin',
            'usuarios-pendentes.html'
        )
    );
});

// API de Cadastro Público de Usuário
app.post('/usuarios', (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    // Verificar se o e-mail já existe em algum perfil do sistema para evitar duplicidade
    const sqlCheck = `
        SELECT email FROM administrador WHERE email = ?
        UNION
        SELECT email FROM personal_trainer WHERE email = ?
        UNION
        SELECT email FROM cliente WHERE email = ?
        UNION
        SELECT email FROM usuario WHERE email = ?
    `;

    db.query(sqlCheck, [email, email, email, email], (err, results) => {
        if (err) {
            console.error('Erro ao verificar email existente:', err);
            return res.status(500).json({ erro: 'Erro interno do servidor ao validar e-mail' });
        }

        if (results.length > 0) {
            return res.status(400).json({ erro: 'Este e-mail já está cadastrado no sistema' });
        }

        Usuario.criar({ nome, email, senha, status: 'Pendente' }, (erro, resultado) => {
            if (erro) {
                console.error('Erro ao cadastrar usuario:', erro);
                return res.status(500).json({ erro: 'Erro ao cadastrar usuário' });
            }

            res.status(201).json({
                mensagem: 'Cadastro realizado com sucesso! Aguarde a aprovação do administrador.',
                id: resultado.insertId
            });
        });
    });
});

// API Administrativa: Listar usuários pendentes
app.get('/api/usuarios/pendentes', (req, res) => {
    Usuario.listarPendentes((erro, resultados) => {
        if (erro) {
            console.error('Erro ao listar usuários pendentes:', erro);
            return res.status(500).json({ erro: 'Erro ao buscar usuários pendentes' });
        }
        res.json(resultados);
    });
});

// API Administrativa: Aprovar usuário pendente
app.post('/api/usuarios/:id/aprovar', (req, res) => {
    const id = req.params.id;

    Usuario.buscarPorId(id, (erro, usuario) => {
        if (erro) {
            console.error('Erro ao buscar usuário para aprovação:', erro);
            return res.status(500).json({ erro: 'Erro interno ao buscar usuário' });
        }

        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }

        const Cliente = require('./models/Cliente');
        Cliente.criar({
            nome: usuario.nome,
            email: usuario.email,
            senha: usuario.senha,
            status_matricula: 'Ativa'
        }, (erroCriar, resultadoCriar) => {
            if (erroCriar) {
                console.error('Erro ao criar cliente na aprovação:', erroCriar);
                return res.status(500).json({ erro: 'Erro ao converter usuário em cliente' });
            }

            Usuario.excluir(id, (erroExcluir) => {
                if (erroExcluir) {
                    console.error('Erro ao remover usuário aprovado da fila:', erroExcluir);
                }

                res.json({
                    mensagem: 'Usuário aprovado com sucesso! Agora é um cliente.'
                });
            });
        });
    });
});

// API Administrativa: Rejeitar usuário pendente
app.post('/api/usuarios/:id/rejeitar', (req, res) => {
    const id = req.params.id;

    Usuario.excluir(id, (erro) => {
        if (erro) {
            console.error('Erro ao rejeitar usuário:', erro);
            return res.status(500).json({ erro: 'Erro ao rejeitar usuário' });
        }

        res.json({
            mensagem: 'Usuário rejeitado e cadastro excluído.'
        });
    });
});

// Alterar tabela cliente para adicionar coluna personal_id se não existir
const addColumnSql = `ALTER TABLE cliente ADD COLUMN personal_id INT NULL`;
const addConstraintSql = `ALTER TABLE cliente ADD CONSTRAINT fk_cliente_personal FOREIGN KEY (personal_id) REFERENCES personal_trainer(id) ON DELETE SET NULL`;

db.query(addColumnSql, (err) => {
    if (!err) {
        db.query(addConstraintSql, (errConst) => {
            if (errConst) console.error('Erro ao criar constraint fk_cliente_personal:', errConst);
        });
    }
});

// Criar tabela solicitacao_treino se não existir
const createTableSql = `
CREATE TABLE IF NOT EXISTS solicitacao_treino (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    cliente_nome VARCHAR(100) NOT NULL,
    personal_id INT NOT NULL,
    objetivo VARCHAR(100) NOT NULL,
    observacoes TEXT NOT NULL,
    data VARCHAR(30) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Pendente'
);
`;

const addPTColumnSql = `ALTER TABLE solicitacao_treino ADD COLUMN personal_id INT NOT NULL DEFAULT 0`;

db.query(createTableSql, (err) => {
    if (err) {
        console.error('Erro ao criar tabela solicitacao_treino:', err);
    } else {
        console.log('Tabela solicitacao_treino verificada/criada com sucesso');
        db.query(addPTColumnSql, () => {});
    }
});

// APIs para Solicitações de Treino
app.post('/api/solicitacoes-treino', (req, res) => {
    const { cliente_id, cliente_nome, personal_id, objetivo, observacoes, data } = req.body;
    const sql = 'INSERT INTO solicitacao_treino (cliente_id, cliente_nome, personal_id, objetivo, observacoes, data, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [cliente_id, cliente_nome, personal_id, objetivo, observacoes, data, 'Pendente'], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ erro: 'Erro ao cadastrar solicitação' });
        }
        res.status(201).json({ sucesso: true, id: result.insertId });
    });
});

app.get('/api/solicitacoes-treino', (req, res) => {
    const sql = 'SELECT * FROM solicitacao_treino';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ erro: 'Erro ao buscar solicitações' });
        }
        res.json(results);
    });
});

app.put('/api/solicitacoes-treino/:id/aprovar', (req, res) => {
    const id = req.params.id;
    const sql = 'UPDATE solicitacao_treino SET status = ? WHERE id = ?';
    db.query(sql, ['Aprovado', id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ erro: 'Erro ao aprovar solicitação' });
        }
        res.json({ sucesso: true });
    });
});

// Obter detalhes do cliente logado (como personal_id associado)
app.get('/api/cliente-detalhes/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT id, nome, email, status_matricula, personal_id FROM cliente WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ erro: 'Erro ao buscar detalhes do cliente' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.json(results[0]);
    });
});



