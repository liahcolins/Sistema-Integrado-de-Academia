const db = require('../config/database');

class PersonalTrainer {

    static listarTodos(callback) {

        const sql = `
            SELECT
                id,
                nome,
                email,
                cref
            FROM personal_trainer
        `;

        db.query(sql, callback);
    }

    static criar(dados, callback) {

        const sql = `
            INSERT INTO personal_trainer
            (nome, email, senha, cref)
            VALUES (?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
                dados.nome,
                dados.email,
                dados.senha,
                dados.cref
            ],
            callback
        );
    }

}

module.exports = PersonalTrainer;