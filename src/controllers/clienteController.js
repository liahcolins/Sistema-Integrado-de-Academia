const Cliente = require('../models/Cliente');

class ClienteController {

    static listar(req, res) {

        Cliente.listarTodos((erro, resultados) => {

            if (erro) {
                return res.status(500).json({
                    erro: 'Erro ao buscar clientes'
                });
            }

            res.json(resultados);

        });

    }

    static criar(req, res) {

        Cliente.criar(req.body, (erro, resultado) => {

            if (erro) {
                return res.status(500).json({
                    erro: 'Erro ao cadastrar cliente'
                });
            }

            res.status(201).json({
                mensagem: 'Cliente cadastrado com sucesso',
                id: resultado.insertId
            });

        });

    }

    static atualizar(req, res) {

        const id = req.params.id;

        Cliente.atualizar(id, req.body, (erro, resultado) => {

            if (erro) {
                return res.status(500).json({
                    erro: 'Erro ao atualizar cliente'
                });
            }

            res.json({
                mensagem: 'Cliente atualizado com sucesso'
            });

        });

    }

    static excluir(req, res) {

        const id = req.params.id;

        Cliente.excluir(id, (erro, resultado) => {

            if (erro) {
                return res.status(500).json({
                    erro: 'Erro ao excluir cliente'
                });
            }

            res.json({
                mensagem: 'Cliente excluído com sucesso'
            });

        });

    }

    static dashboard(req, res) {

        const dados = {
            nome: "João Silva",
            matricula: "2025001",
            plano: "Premium",
            treinoAtual: "Hipertrofia",
            vencimento: "15/07/2026"
        };

        res.json(dados);
    }

}


module.exports = ClienteController;