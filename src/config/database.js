const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
<<<<<<< Updated upstream
    password: '192125', //alterar com a senha individual do bd de vocês
=======
    password: 'root', //alterar com a senha individual do bd de vocês
>>>>>>> Stashed changes
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