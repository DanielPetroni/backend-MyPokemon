const User = require('../model/User');
const Pokemon = require('../model/Pokemon');
const crypto = require('crypto');
const validator = require("email-validator");

const users = [];
class UserController {
    signup(req, res) {
        const { name, email, password } = req.body;
        email.trim();
        password.trim();
        if (name && email && password) {
            if (validator.validate(email)) {
                const passwordEncripted = crypto.createHash('md5').update(password).digest("hex")
                const usersFiltereds = users.filter((user) => {
                    return user.email == email;
                })
                if (usersFiltereds.length > 0) {
                    return res.status(400).json({ message: 'E-mail já cadastrado!' })
                } else {
                    const user = new User(name, email, passwordEncripted);
                    users.push(user);
                    return res.status(200).json({ message: 'Usuário criado!' })
                }
            } else {
                return res.status(400).json({ message: 'E-mail inválido!' })
            }

        } else {
            return res.status(400).json({ message: 'Todos os dados devem ser informados!' })
        }
    }

    signin(req, res) {
        const { email, password } = req.body;
        email.trim();
        password.trim();
        if (email && password) {
            const passwordEncripted = crypto.createHash('md5').update(password).digest("hex")
            const usersFiltereds = users.filter((user) => {
                return user.email == email && user.password == passwordEncripted;
            })
            if (usersFiltereds.length > 0) {
                return res.status(200).json({
                    id: usersFiltereds[0].id,
                    name: usersFiltereds[0].name,
                    email: usersFiltereds[0].email,
                    listPokemon: usersFiltereds[0].listPokemon
                });
            } else {
                return res.status(400).json({ message: 'E-mail ou senha inválidos!' })
            }
        } else {
            return res.status(400).json({ message: 'Todos os dados devem ser informados!' })
        }
    }


    addPokemon(req, res) {
        const { id } = req.headers;
        let achouUser = false;
        const { namePokemon, typePokemon, descryptionPokemon, pathImage } = req.body;
        const newPokemon = new Pokemon(namePokemon, typePokemon, descryptionPokemon, pathImage);
        users.forEach((user, index) => {
            if (user.id == id) {
                achouUser = true
                user.listPokemon.push(newPokemon);
            }
        })
        if (achouUser) {
            return res.status(200).json({ message: "Pokemon adicionado!" });

        } else {
            return res.status(400).json({ message: "Usuário não encontrado!" });
        }
    }

    updatePokemon(req, res) {
        const { id } = req.headers;
        const { indexPokemon, newNamePokemon, typePokemon, descryptionPokemon, pathImage } = req.body;
        let achouPokemon = false;
        users.forEach((user, index) => {
            console.log(user.name);
            if (user.id == id) {
                achouPokemon = true;
                newNamePokemon ? user.listPokemon[indexPokemon].name = newNamePokemon : null;
                typePokemon ? user.listPokemon[indexPokemon].type = typePokemon : null;
                descryptionPokemon ? user.listPokemon[indexPokemon].descryption = descryptionPokemon : null;
                pathImage ? user.listPokemon[indexPokemon].pathImage = pathImage : null;
                console.log(user);
            }
        });

        return res.status(200).json({ message: "Pokemon alterado!" });

    }


    deletePokemon(req, res) {
        const { id } = req.headers;
        const { indexPokemon } = req.params;
        users.forEach((user, index) => {
            if (user.id == id) {
                console.log('Achou id')
                user.listPokemon.splice(indexPokemon, 1);
            }
        })
        return res.status(200).json({ message: "Pokemon deletado!" });

    }


}

module.exports = new UserController();