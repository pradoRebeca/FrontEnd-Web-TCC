"use strict";
console.log("na pagina de login empresa");

import baseURL from "../baseUrl.js";
import { validacaoArray, validacaoCampo } from "../utils/function.js";

//SELECT AREA-ATUACAO
const criarAreaAtuacao = ({ areaAtuacao, id }) => {
  const container = document.querySelector("#area-atuacao");
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

 await fetch(urlListar, options)
    .then((resp) => resp.json())
    .then((json) => {
      const conteudo = json.content;
      conteudo.map(criarAreaAtuacao);
    })
    .catch((err) => {
      console.log(err);
    });
};

const postEmpresa = async (dados) => {
  const urlCadastro = `${baseURL}empresa/cadastrar`;
  const options = {
    method: "POST",
    body: JSON.stringify(dados),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  await fetch(urlCadastro, options)
    .then((resp) => resp.json())
    .then((json) => {
      localStorage.setItem('newId', json.id)
      window.location.href = 'segundoCadastro.html'
    })
    .catch((err) => {
      swal(
        "Houve algum erro!",
        "Não foi possível se cadastrar.",
        "error"
      );
      console.log(err);
    });
};

const getDadosFormulario = async (e) => {
  console.log("pegando os dados do formulario");
  const dadosEmpresa = {
    nome: document.getElementById("nome").value,
    email: [document.getElementById("email").value],
    senha: document.getElementById("senha").value,
    telefone: [document.getElementById("telefone").value],
    areaAtuacao: document.getElementById("area-atuacao").value,
  };
  e.preventDefault();
  
  if (validacaoArray(dadosEmpresa)) {
    await postEmpresa(dadosEmpresa);
  } else {
    swal("Alerta!", "Preencha os campos obrigatorios.", "info");
  }
};

const proximaTela = () => {
  window.location.href = "login.html";
};

document
  .getElementById("btnCadastro")
  .addEventListener("click", getDadosFormulario);
document.getElementById("btn-entrar").addEventListener("click", proximaTela);
document.addEventListener("DOMContentLoaded", getAreaAtuacao);
