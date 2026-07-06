const db = require('../config/database');

class Treino {

    static listarTodos(callback) {

        const sql = `
            SELECT
                treino.id,
                treino.nome,
                treino.data_criacao,
                treino.observacoes,
                cliente.nome AS cliente,
                personal_trainer.nome AS personal
            FROM treino
            INNER JOIN cliente
                ON treino.cliente_id = cliente.id
            INNER JOIN personal_trainer
                ON treino.personal_id = personal_trainer.id
        `;

        db.query(sql, callback);
    }

    static criar(dados, callback) {

        const sql = `
            INSERT INTO treino
            (nome, data_criacao, observacoes, cliente_id, personal_id)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
                dados.nome,
                dados.data_criacao,
                dados.observacoes,
                dados.cliente_id,
                dados.personal_id
            ],
            callback
        );
    }


    static atualizar(id, dados, callback) {

        const sql = `
            UPDATE treino
            SET
                nome = ?,
                data_criacao = ?,
                observacoes = ?,
                cliente_id = ?,
                personal_id = ?
            WHERE id = ?
        `;

        db.query(
            sql,
            [
                dados.nome,
                dados.data_criacao,
                dados.observacoes,
                dados.cliente_id,
                dados.personal_id,
                id
            ],
            callback
        );
    }

    static excluir(id, callback) {

        const sql = `
            DELETE FROM treino
            WHERE id = ?
        `;

        db.query(sql, [id], callback);
    }
}

module.exports = Treino;