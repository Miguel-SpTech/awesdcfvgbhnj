var database = require("../database/config")

function buscarPokemonPorUsuario(idUsuario) {
    console.log("ACESSEI O POKEDEX MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",  idUsuario)
    var instrucaoSql = `
        SELECT fk_pokemon FROM registro WHERE fk_usuario = '${idUsuario}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPokemonPorTipoEUsuario(idUsuario, tipoPokemon) {
    console.log("ACESSEI O POKEDEX MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",  idUsuario)
    var instrucaoSql = `
        SELECT fk_pokemon FROM ctahelper.registro AS r
	        JOIN ctahelper.pokemon AS p 
            ON r.fk_pokemon = p.id
	        WHERE (p.tipo_primario = '${tipoPokemon}' OR p.tipo_secundario = '${tipoPokemon}')
	        AND r.fk_usuario = '${idUsuario}';
    `
}

function buscarPokemonParaGrafico(idUsuario) {
    console.log("ACESSEI O POKEDEX MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",  idUsuario)
    var instrucaoSql = `
        SELECT
        p.id,
        p.tipo_primario,
        p.tipo_secundario,
        CASE
            WHEN r.fk_pokemon IS NOT NULL THEN 1
            ELSE 0
        END AS registrado
        FROM pokemon AS p
        LEFT JOIN registro AS r
        ON p.id = r.fk_pokemon
        AND r.fk_usuario = ${idUsuario};
    `
}


// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function registrar(idUsuario, idPokemon) {
    console.log("ACESSEI O REGISTRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function registrar():", idUsuario, idPokemon);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO registro (fk_usuario, fk_pokemon) VALUES ('${idUsuario}', '${idPokemon}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarPokemonPorUsuario,
    buscarPokemonParaGrafico,
    buscarPokemonPorTipoEUsuario,
    registrar
};