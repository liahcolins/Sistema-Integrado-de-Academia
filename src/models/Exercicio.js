const db = require('../config/database');

class Exercicio {

    static listarTodos(callback) {

        const sql = `
            SELECT *
            FROM exercicio
        `;

        db.query(sql, callback);
    }

}

module.exports = Exercicio;
