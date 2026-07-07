const db = require('../config/database');

class Usuario {
    constructor(id, nome, email, senha, status) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.status = status;
    }

    static criar(dados, callback) {
        const sql = `
            INSERT INTO usuario (nome, email, senha, status)
            VALUES (?, ?, ?, ?)
        `;
        db.query(
            sql,
            [
                dados.nome,
                dados.email,
                dados.senha,
                dados.status || 'Pendente'
            ],
            callback
        );
    }

    static listarPendentes(callback) {
        const sql = `
            SELECT id, nome, email, status
            FROM usuario
            WHERE status = 'Pendente'
        `;
        db.query(sql, callback);
    }

    static buscarPorId(id, callback) {
        const sql = `
            SELECT id, nome, email, senha, status
            FROM usuario
            WHERE id = ?
        `;
        db.query(sql, [id], (err, results) => {
            if (err) return callback(err);
            if (results.length === 0) return callback(null, null);
            callback(null, results[0]);
        });
    }

    static excluir(id, callback) {
        const sql = `
            DELETE FROM usuario
            WHERE id = ?
        `;
        db.query(sql, [id], callback);
    }
}

module.exports = Usuario;