const Usuario = require('./Usuario'); //Essa linha é semelhante ao import

class PersonalTrainer extends Usuario {
    constructor(id, nome, email, senha, cref) {
        super(id, nome, email, senha);
        this.cref = cref;
    }

    montarTreino() {}

    editarTreino() {}

    assumirCliente() {}
}

module.exports = PersonalTrainer; //Essa linha disponibiliza a classe para outros arquivos