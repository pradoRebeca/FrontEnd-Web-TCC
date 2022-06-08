'use strict';

import baseUrl from "../baseUrl.js";

const id = localStorage.getItem('idCandidato')

console.log(id)

const limparElementos = (elemento) => {
    while (elemento.firstChild) {
      elemento.removeChild(elemento.lastChild);
    }
};


const marcarSelect = async (nome, elemento) => {
const select = document.querySelector(nome).options;

for (var i = 0; i < select.length; i++) {
    if (select[i].value == elemento) {
    select[i].selected = true;
    }
}
};

function getValuesChekbox(nome) {
var nomeElemento = `[name=${nome}]:checked`;
var pacote = document.querySelectorAll(nomeElemento);
var values = [];

for (var i = 0; i < pacote.length; i++) {
    values.push(pacote[i].value);
}
return values;
}
//informações pessoais

const getDados = async() => {
    const urlListarDados = `${baseUrl}candidato/buscar/${id}`
    const response = await fetch(urlListarDados).then(resp => resp.json()).catch(err => err)
    console.log(response)

    if (!response) {
        console.log("sem conecao");
    } else {
        marcarSelect("#sltGenero", response.genero);
        document.getElementById("nome").value = response.nome ? response.nome : "";
        document.getElementById("nomeSocial").value = response.nomeSocial ? response.nomeSocial : "";
        document.getElementById("email").value = response.email[0] ? response.email[0].email : "";
        document.getElementById("emailRecuperacao").value = response.email[1] ? response.email[1].email  : "";
        document.getElementById("dataNascimento").value = response.dataNascimento ? response.dataNascimento : "";
        document.getElementById("telefonePrimario").value = response.telefone[0]  ? response.telefone[0].telefone : "";
        document.getElementById("telefoneSecundario").value = response.telefone[1] ? response.telefone[1].telefone : "";
      }
}

const getTipoDeficiencia = async () => {
    const urlListar = `${baseUrl}deficiencia/listar/tipo`;
    const options = {
      method: "GET",
    };
  
    fetch(urlListar, options)
      .then((resp) => resp.json())
      .then((json) => {
        const conteudo = json.content;
        conteudo.map(criarCheckBoxTipoDeficiencia);
      })
      .catch((err) => {
        console.log(err);
      });
};

const getDeficiencia = async () => {

    const idTipoDeficiencia = document.querySelectorAll('input[name="chkTipoDeficiencia"]:checked');

    console.log('tipo:',idTipoDeficiencia.values);
    limparElementos(document.getElementById("checkboxDefiencia"));
    const urlDeficiencia = `${baseUrl}deficiencia/listar/2`

    await fetch(urlDeficiencia)
        .then(resp => resp.json())
        .then((json) => {
            const response = json.content
            console.log('deficiencia:', response)
            response.map(criarCheckBoxDeficiencia)
        })
        .catch(err => {
            err
        }) 

}

// fim informações pessoais

const getEstado = async () => {
    const urlEstado = `${baseUrl}pesquisa/estado`
    await fetch(urlEstado)
    .then((resp) => resp.json())
    .then((dados) => {
        const response = dados.content
        console.log('estado1:',response)
        response.map(criarEstado)
    })
    .catch(err => {
        err
    })
}

const getCidade = async () => {

    const idEstado = document.querySelector("#sltEstado").value

    document.querySelector("#sltCidade").disabled = false

    limparElementos(document.getElementById("sltCidade"));
    const urlCidade = `${baseUrl}pesquisa/cidade/1`

    console.log(urlCidade)

    await fetch(urlCidade)
        .then(resp => resp.json())
        .then((json) => {
            const response = json.content
            console.log('cidade:', response)
            response.map(criarCidade)
        })
        .catch(err => {
            err
        })

}

//informações pessoais 


const criarCheckBoxTipoDeficiencia = ({ tipo, id }) => {
    const container = document.getElementById('checkboxTipoDefiencia');
    const linha = document.createElement("div");
    linha.classList.add('checkbox')
    linha.innerHTML=
    `
        <input type="checkbox" name="chkTipoDeficiencia" id="chkTipoDeficiencia" value="${id}"/> ${tipo}
    `
    container.appendChild(linha);
}

const criarCheckBoxDeficiencia = ({ deficiencia, id }) => {
    const container = document.getElementById('checkboxDefiencia');
    const linha = document.createElement("div");
    linha.classList.add('checkbox')
    linha.innerHTML=
    `
        <input type="checkbox" name="chkDeficiencia" id="chkDeficiencia" value="${id}"/> ${deficiencia}
    `
    container.appendChild(linha);
}

//fim informações pessoais

const criarEstado = ({id, sigla}) => {
    const container = document.getElementById("sltEstado");
    const linha = document.createElement("option");
    linha.value = id;
    linha.textContent = sigla;
    container.appendChild(linha);
}

const criarCidade = ({id, cidade}) => {
    const container = document.getElementById("sltCidade");
    const linha = document.createElement("option");
    linha.value = id;
    linha.textContent = cidade;
    container.appendChild(linha);
}


const carregarPagina = () => {
    getDeficiencia();
    getTipoDeficiencia();
    getEstado();
    getCidade();
    getDados();
};

carregarPagina()
