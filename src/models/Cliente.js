const db = require('../config/database');

class Cliente {

    static listarTodos(callback) {

        const sql = `
            SELECT
                id,
                nome,
                email,
                status_matricula
            FROM cliente
        `;

        db.query(sql, callback);
    }

    static criar(dados, callback) {

        const sql = `
            INSERT INTO cliente
            (nome, email, senha, status_matricula)
            VALUES (?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
                dados.nome,
                dados.email,
                dados.senha,
                dados.status_matricula
            ],
            callback
        );
    }

    static atualizar(id, dados, callback) {
        let sql = `
            UPDATE cliente
            SET
                nome = ?,
                email = ?,
                status_matricula = ?
        `;
        const params = [dados.nome, dados.email, dados.status_matricula];

        if (dados.senha && dados.senha.trim() !== '') {
            sql += `, senha = ?`;
            params.push(dados.senha);
        }

        sql += ` WHERE id = ?`;
        params.push(id);

        db.query(sql, params, callback);
    }

    static excluir(id, callback) {

        const sql = `
            DELETE FROM cliente
            WHERE id = ?
        `;

        db.query(sql, [id], callback);
    }

}

module.exports = Cliente;