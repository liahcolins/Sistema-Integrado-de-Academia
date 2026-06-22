const Administrador = require('../models/Administrador');

class AdministradorController {

    static listar(req, res) {

        Administrador.listarTodos((erro, resultados) => {

            if (erro) {
                return res.status(500).json({
                    erro: 'Erro ao buscar administradores'
                });
            }

            res.json(resultados);

        });

    }

    static criar(req, res) {

        Administrador.criar(req.body, (erro, resultado) => {

            if (erro) {
                return res.status(500).json({
                    erro: 'Erro ao cadastrar administrador'
                });
            }

            res.status(201).json({
                mensagem: 'Administrador cadastrado com sucesso',
                id: resultado.insertId
            });

        });

    }

    static atualizar(req, res) {

        const id = req.params.id;

        Administrador.atualizar(id, req.body, (erro, resultado) => {

            if (erro) {
                return res.status(500).json({
                    erro: 'Erro ao atualizar administrador'
                });
            }

            res.json({
                mensagem: 'Administrador atualizado com sucesso'
            });

        });

    }

    static excluir(req, res) {

        const id = req.params.id;

        Administrador.excluir(id, (erro, resultado) => {

            if (erro) {
                return res.status(500).json({
                    erro: 'Erro ao excluir administrador'
                });
            }

            res.json({
                mensagem: 'Administrador excluído com sucesso'
            });

        });

    }

}

module.exports = AdministradorController;