const db = require('../config/database');

class Matricula {

    static listar(callback) {

        const sql = `
            SELECT
                matricula.id,
                matricula.data_inicio,
                matricula.status,
                matricula.cliente_id,
                cliente.nome AS cliente
            FROM matricula
            INNER JOIN cliente
                ON matricula.cliente_id = cliente.id
        `;

        db.query(sql, callback);

    }

    static criar(dados, callback) {

        const sql = `
            INSERT INTO matricula
            (
                data_inicio,
                status,
                cliente_id
            )
            VALUES (?, ?, ?)
        `;

        db.query(
            sql,
            [
                dados.data_inicio,
                dados.status,
                dados.cliente_id
            ],
            callback
        );

    }

    static atualizar(id, dados, callback) {

        const sql = `
            UPDATE matricula
            SET
                data_inicio = ?,
                status = ?,
                cliente_id = ?
            WHERE id = ?
        `;

        db.query(
            sql,
            [
                dados.data_inicio,
                dados.status,
                dados.cliente_id,
                id
            ],
            callback
        );

    }

    static excluir(id, callback) {

        const sql = `
            DELETE FROM matricula
            WHERE id = ?
        `;

        db.query(sql, [id], callback);

    }

}

module.exports = Matricula;