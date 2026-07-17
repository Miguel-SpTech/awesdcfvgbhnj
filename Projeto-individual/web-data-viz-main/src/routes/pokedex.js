var express = require("express");
var router = express.Router();

var pokedexController = require("../controllers/pokedexController");

//Recebendo os dados do html e direcionando para a função cadastrar de pokedexController.js
router.post("/registrar", function (req, res) {
    pokedexController.registrar(req, res);
})

router.post("/buscarPokemonPorUsuario", function (req, res) {
    pokedexController.buscarPokemonPorUsuario(req, res);
})

router.post("/buscarPokemonParaGrafico", function (req, res) {
    pokedexController.buscarPokemonParaGrafico(req, res);
})

module.exports = router;