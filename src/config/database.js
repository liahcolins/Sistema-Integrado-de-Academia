const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senha do bd', //alterar com a senha individual do bd de vocês
    database: 'academia'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco:', err);
        return;
    }

    console.log('Conectado ao banco academia com sucesso');
});

module.exports = connection;