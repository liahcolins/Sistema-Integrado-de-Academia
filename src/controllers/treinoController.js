const Treino = require('../models/Treino');

class TreinoController {

    static listar(req, res) {

        Treino.listarTodos((erro, resultados) => {

            if (erro) {
                return res.status(500).json({
                    erro: 'Erro ao buscar treinos'
                });
            }

            res.json(resultados);

        });

    }

    static criar(req, res) {

        Treino.criar(req.body, (erro, resultado) => {

            if (erro) {

                console.error('Erro ao cadastrar treino:', erro);
                return res.status(500).json({
                    erro: 'Erro ao cadastrar treino'
                });
            }

            res.status(201).json({
                mensagem: 'Treino cadastrado com sucesso',
                id: resultado.insertId
            });

        });

    }

}

module.exports = TreinoController;