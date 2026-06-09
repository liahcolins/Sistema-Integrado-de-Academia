const Exercicio = require('../models/Exercicio');

class ExercicioController {

    static listar(req, res) {

        Exercicio.listarTodos((erro, resultados) => {

            if (erro) {
                return res.status(500).json({
                    erro: 'Erro ao buscar exercícios'
                });
            }

            res.json(resultados);

        });

    }

}

module.exports = ExercicioController;
