const { v4: uuidv4 } = require('uuid');
class User {
    constructor(name, email, password) {
        this.id = uuidv4();
        this.name = name;
        this.email = email;
        this.password = password;
        this.listPokemon = [];
        function addPokemon(nomePokemon) {
            this.listPokemon.push(nomePokemon)
        }
    }


}

module.exports = User;