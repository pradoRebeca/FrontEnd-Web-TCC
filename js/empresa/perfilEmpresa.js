"use strict";
console.log("perfil emepresa funfa");

import baseURL from "../baseUrl.js";
import { validacaoArray, idExist } from "../utils/function.js";

const idEmpresa = localStorage.getItem('idEmpresa')

idExist(idEmpresa)

//selecionar img da galeria
let titulo = document.getElementById('titulo-img');
let input = document.getElementById('img-input');

titulo.addEventListener('click', () => {
  input.click();
})


const limparFormulario = (endereco) => {
  document.getElementById("rua").value = "";
  document.getElementById("numero").value = "";
  document.getElementById("bairro").value = "";
  document.getElementById("cidade").value = "";
  document.getElementById("estado").value = "";
};

const preencherFormulario = (endereco) => {
  document.getElementById("rua").value = endereco.logradouro;
  document.getElementById("bairro").value = endereco.bairro;
  document.getElementById("cidade").value = endereco.localidade;
  document.getElementById("estado").value = endereco.uf;
};

const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const pesquisarCep = async () => {
  limparFormulario();

  const cep = document.getElementById("cep").value.replace("-", "");
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  if (cepValido(cep)) {
    const dados = await fetch(url);
    const endereco = await dados.json();
    if (endereco.hasOwnProperty("erro")) {
      document.getElementById("endereco").value = "CEP não encontrado!";
    } else {
      preencherFormulario(endereco);
    }
  } else {
    document.getElementById("endereco").value = "CEP incorreto!";
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

const criarAreaAtuacao = ({ areaAtuacao, id }) => {
  const container = document.querySelector("#areaAtuacao");
  const linha = document.createElement("option");
  linha.value = id;
  linha.textContent = areaAtuacao;
  container.appendChild(linha);
};

const getAreaAtuacao = async () => {
  const urlListar = `${baseURL}curso/area/listar`;
  const options = {
    method: "GET",
  };

  fetch(urlListar, options)
    .then((resp) => resp.json())
    .then((json) => {
      const conteudo = json.content;
      conteudo.map(criarAreaAtuacao);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDadosEmpresa = async () => {
  const urlListar = `${baseURL}empresa/buscar/${idEmpresa}`;
  const response = await fetch(urlListar)
    .then((resp) => resp.json())
    .catch((error) => undefined);
  console.log(response);

  if (!response) {
    console.log("sem conecao");
  } else {
    marcarSelect("#areaAtuacao", response.areaAtuacao.id);
    document.getElementById("nome").value = response.nome ? response.nome : "";
    document.getElementById("email").value = response.email[0]
      ? response.email[0].email
      : "";
    document.getElementById("emailRecuperacao").value = response.email[1]
      ? response.email[1].email
      : "";
    document.getElementById("telefone").value = response.telefone[0]
      ? response.telefone[0].telefone
      : "";
    document.getElementById("telefone2").value = response.telefone[1]
      ? response.telefone[1].telefone
      : "";
    document.getElementById("descricao").value = response.descricao
      ? response.descricao
      : "";
    document.getElementById("cep").value = response.endereco.cep
      ? response.endereco.cep
      : "";
    document.getElementById("rua").value = response.endereco.rua
      ? response.endereco.rua
      : "";
    document.getElementById("bairro").value = response.endereco.bairro
      ? response.endereco.bairro
      : "";
    document.getElementById("cidade").value = response.endereco.cidade
      ? response.endereco.cidade
      : "";
    document.getElementById("estado").value = response.endereco.sigla
      ? response.endereco.sigla
      : "";
      document.getElementById("numero").value = response.endereco.numero
      ? response.endereco.numero
      : "";
  }
};

const pesquisarCidade = async (uf) => {
  const urlListar = `https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome`;
  const response = await fetch(urlListar)
    .then((resp) => resp.json())
    .catch((error) => undefined);

  const estado = response.filter((item) => item.sigla == uf);

  if (estado.length > 0) {
    return estado[0].nome;
  } else {
    return null;
  }
};

const createArray = async (dados) => {
  const array = [];
  dados.map((item) => {
    if (item != "") {
      array.push(item);
    } else {
      console.log(item);
    }
  });

  return array;
};

const putEmpresa = async (dados) => {
  console.log("dados: ", dados);

  const urlAtualizarVaga = `${baseURL}empresa/atualizar/${idEmpresa}`;
  const options = {
    method: "PUT",
    body: JSON.stringify(dados),
    headers: {
      "content-Type": "application/json",
    },
  };

await fetch(urlAtualizarVaga, options)
    .then((response) =>  console.log('atualizado'))

    .catch((err) => console.log("erro: deu erro aqui "));
};

const getDadosFormulario = async () => {
  const estado = pesquisarCidade(document.getElementById("estado").value);
  const arrayTelefone = createArray([
    document.getElementById("telefone").value,
    document.getElementById("telefone2").value,
  ]);

  const arrayEmail = createArray([
    document.getElementById("email").value,
    document.getElementById("emailRecuperacao").value,
  ]);
  
  const dadosEmpresa = {
    nome: document.getElementById("nome").value,
    descricao: document.getElementById('descricao').value,
    email: await arrayEmail,
    telefone: await arrayTelefone,
    areaAtuacao: document.getElementById("areaAtuacao").value,
    rua: document.getElementById("rua").value,
    numero: document.getElementById("numero").value,
    cep: document.getElementById("cep").value,
    bairro: document.getElementById("bairro").value,
    cidade: document.getElementById("cidade").value,
    estado: await estado,
    sigla: document.getElementById("estado").value,
  };
  await putEmpresa(dadosEmpresa);
};


//previw image
function readImage() {
    if (this.files && this.files[0]) {
        var file = new FileReader();
        file.onload = function(e) {
            document.getElementById("preview").src = e.target.result;
        };       
        file.readAsDataURL(this.files[0]);
    }
}


const carregarPagina = () => {
  getAreaAtuacao();
  getDadosEmpresa();
};

document.getElementById("img-input").addEventListener("change", readImage, false);

document.getElementById("cep").addEventListener("focusout", pesquisarCep);
document.addEventListener("DOMContentLoaded", carregarPagina);

document
  .getElementById("btnSalvar")
  .addEventListener("click", getDadosFormulario);

