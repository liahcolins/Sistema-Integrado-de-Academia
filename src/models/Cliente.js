const db = require('../config/database');

class Cliente {

    static listarTodos(callback) {

        const sql = `
            SELECT
                c.id,
                c.nome,
                c.email,
                c.status_matricula,
                c.personal_id,
                p.nome AS personal_nome
            FROM cliente c
            LEFT JOIN personal_trainer p ON c.personal_id = p.id
        `;

        db.query(sql, callback);
    }

    static criar(dados, callback) {

        const sql = `
            INSERT INTO cliente
            (nome, email, senha, status_matricula, personal_id)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
                dados.nome,
                dados.email,
                dados.senha,
                dados.status_matricula,
                dados.personal_id || null
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
                status_matricula = ?,
                personal_id = ?
        `;
        const params = [dados.nome, dados.email, dados.status_matricula, dados.personal_id || null];

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