const db = require('../config/database');

class Administrador {

    static listarTodos(callback) {

        const sql = `
            SELECT
                id,
                nome,
                email
            FROM administrador
        `;

        db.query(sql, callback);
    }

    static criar(dados, callback) {

        const sql = `
            INSERT INTO administrador
            (nome, email, senha)
            VALUES (?, ?, ?)
        `;

        db.query(
            sql,
            [
                dados.nome,
                dados.email,
                dados.senha
            ],
            callback
        );
    }

    static atualizar(id, dados, callback) {

        const sql = `
            UPDATE administrador
            SET
                nome = ?,
                email = ?,
                senha = ?
            WHERE id = ?
        `;

        db.query(
            sql,
            [
                dados.nome,
                dados.email,
                dados.senha,
                id
            ],
            callback
        );
    }

    static excluir(id, callback) {

        const sql = `
            DELETE FROM administrador
            WHERE id = ?
        `;

        db.query(sql, [id], callback);
    }

}

module.exports = Administrador;