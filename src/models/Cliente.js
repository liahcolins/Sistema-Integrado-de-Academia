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

}

module.exports = Cliente;