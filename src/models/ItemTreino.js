const db = require('../config/database');

class ItemTreino {

    static listarPorTreino(treinoId, callback) {

        const sql = `
            SELECT
                item_treino.id,
                item_treino.treino_id,
                item_treino.exercicio_id,
                exercicio.nome AS exercicio,
                exercicio.categoria,
                item_treino.series,
                item_treino.repeticoes,
                item_treino.peso,
                item_treino.tempo,
                item_treino.descanso,
                item_treino.instrucoes
            FROM item_treino
            INNER JOIN exercicio
                ON item_treino.exercicio_id = exercicio.id
            WHERE item_treino.treino_id = ?
        `;

        db.query(sql, [treinoId], callback);
    }

    static criar(dados, callback) {

        const sql = `
            INSERT INTO item_treino
            (
                treino_id,
                exercicio_id,
                series,
                repeticoes,
                peso,
                tempo,
                descanso,
                instrucoes
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
                dados.treino_id,
                dados.exercicio_id,
                dados.series,
                dados.repeticoes,
                dados.peso,
                dados.tempo,
                dados.descanso,
                dados.instrucoes
            ],
            callback
        );
    }

    static atualizar(id, dados, callback) {

        const sql = `
            UPDATE item_treino
            SET
                treino_id = ?,
                exercicio_id = ?,
                series = ?,
                repeticoes = ?,
                peso = ?,
                tempo = ?,
                descanso = ?,
                instrucoes = ?
            WHERE id = ?
        `;

        db.query(
            sql,
            [
                dados.treino_id,
                dados.exercicio_id,
                dados.series,
                dados.repeticoes,
                dados.peso,
                dados.tempo,
                dados.descanso,
                dados.instrucoes,
                id
            ],
            callback
        );
    }

    static excluir(id, callback) {

        const sql = `
            DELETE FROM item_treino
            WHERE id = ?
        `;

        db.query(sql, [id], callback);
    }

}

module.exports = ItemTreino;