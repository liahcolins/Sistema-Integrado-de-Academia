const db = require('../config/database');

class Exercicio {

    static listarTodos(callback) {

        const sql = `
            SELECT *
            FROM exercicio
        `;

        db.query(sql, callback);
    }

    static criar(dados, callback) {

        const sql = `
            INSERT INTO exercicio
            (nome, descricao, categoria)
            VALUES (?, ?, ?)
        `;

        db.query(
            sql,
            [
                dados.nome,
                dados.descricao,
                dados.categoria
            ],
            callback
        );
    }

    static atualizar(id, dados, callback) {

        const sql = `
            UPDATE exercicio
            SET nome = ?, descricao = ?, categoria = ?
            WHERE id = ?
        `;

        db.query(
            sql,
            [
                dados.nome,
                dados.descricao,
                dados.categoria,
                id
            ],
            callback
        );
    }

    static excluir(id, callback) {

        const sql = `
            DELETE FROM exercicio
            WHERE id = ?
        `;

        db.query(sql, [id], callback);
    }



}



module.exports = Exercicio;
