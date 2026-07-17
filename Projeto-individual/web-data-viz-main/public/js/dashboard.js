document.getElementById('b_usuario').innerHTML = sessionStorage.NOME_USUARIO;

let parar_pokedex_all = false;
let parar_pokedex_not_registred = false;
let parar_pokedex_registred = false;

async function pokedex_all() {
        document.getElementById("div_pokedex").innerHTML = '';
        for(let p = 1;p<1026;p++) {
          if (parar_pokedex_all) {
            console.log('o stop esta ou foi ativado');
            return;
          }
            console.log('tudo normal, indo pro proximo card...')
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${p}`);
            const data = await response.json();
            console.log(data);
            console.log('quantidade de tipos do pokemon: ', data.types.length)
            document.getElementById("div_pokedex").innerHTML += `
                <div class="pokedex-card">
                    <span class="pokemon-number">#${p}</span>
                    <span class="pokemon-name"><b>${data.forms[0].name}</b></span>
                    <img src="${data.sprites.front_default}" class="pokemon-img" alt="">
                    ${data.types.length == 1 ? `<img src="../assets/imgs/${data.types[0].type.name}.png" class="pokemon-type" alt="">` : `<img src="../assets/imgs/${data.types[0].type.name}.png" class="pokemon-type" alt=""><img src="../assets/imgs/${data.types[1].type.name}.png" class="pokemon-type" alt="">`}
                    <button class="pokemon-register-button" onclick="adicionar_pokemon(${p})"><b>REGISTRAR</b></button>
                </div>
                `
        }
}

async function pokedex_not_registred() {
  document.getElementById("div_pokedex").innerHTML = '';
}

async function pokedex_registred() {
  document.getElementById("div_pokedex").innerHTML = '';
  
}

function adicionar_pokemon(p) {
    parar_pokedex_all = true;
    parar_pokedex_not_registred = true;
    parar_pokedex_registred = true;
    console.log("parei os cards");

    var usuarioVar = sessionStorage.ID_USUARIO;
    var pokemonVar = p;

    console.log('Id do Usuario: ', usuarioVar, ' Pokemon que vai ser registrado: ', pokemonVar);
    // Verificando se há algum campo em branco
  
    
    // Enviando o valor da nova input
    fetch("/pokedex/registrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        usuarioServer: usuarioVar,
        pokemonServer: pokemonVar,
        
      }),
    })
      .then(function (resposta) {

        console.log("resposta: ", resposta);
        if (resposta.ok) {

          console.log("Pokemon registrado com sucesso! recarregando a pagina...") 

          setTimeout(() => {
            window.location = "cards.html";
          }, "2000");

          limparFormulario();
          // finalizarAguardar();
        } else {
          throw "Houve um erro ao tentar registrar um pokemon";
        }
      })
}