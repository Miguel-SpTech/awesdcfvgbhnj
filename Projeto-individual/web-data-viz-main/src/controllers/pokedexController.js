var pokedexModel = require("../models/pokedexModel");

function buscarPokemonPorUsuario(req, res) {
    var usuario = req.body.usuarioServer;

    if (usuario == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {

        pokedexModel.buscarPokemonPorUsuario(usuario)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                        console.log(resultadoAutenticar);
                        res.json({
                            pokemon: resultadoAutenticar,
                        });
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function buscarPokemonParaGrafico(req, res) {
    var usuario = req.body.usuarioServer;

    if (usuario == undefined) {
        res.status(400).send("Seu usuario está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo pokedexModel.js
        pokedexModel.buscarPokemonParaGrafico(usuario)
            .then(
                function (resultado) {
                    console.log(resultado)
                    res.json(resultado); 
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function registrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var usuario = req.body.usuarioServer;
    var pokemon = req.body.pokemonServer;

    // Faça as validações dos valores
    if (usuario == undefined) {
        res.status(400).send("Seu usuario está undefined!");
    } else if (pokemon == undefined) {
        res.status(400).send("Seu pokemon está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo pokedexModel.js
        pokedexModel.registrar(usuario, pokemon)
            .then(
                function (resultado) {
                    res.status(200).json(resultado); 
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    buscarPokemonPorUsuario,
    registrar
}