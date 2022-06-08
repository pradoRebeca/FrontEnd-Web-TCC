"use strict";

console.log("TELA DE LISTAGEM DE CADNIDATOS");

import baseURL from "../baseUrl.js";
import { idExist } from "../utils/function.js";

const idEmpresa = localStorage.getItem("idEmpresa");

idExist(idEmpresa);

if(idEmpresa == null){
  window.location.href = 'login.html'
  swal({text : "Faça o login para entrar na aplicação."});
}

var url_string = window.location.href;
var url = new URL(url_string);
var idVaga = url.searchParams.get("idVaga");

const getVaga = async () => {
  const urlListar = `${baseURL}vaga/listar/candidatos/${idVaga}`;
  const response = await fetch(urlListar)
    .then((resp) => resp.json())
    .then((dados) => dados.content)
    .catch((e) => []);
  return response;
};

const criarVaga = ({ nome, endereco, deficiencia, imagem, id }) => {
  let imagemCandidato =
    "https://www.promoview.com.br/uploads/images/unnamed%2819%29.png" ?? imagem;
  let nomeCandidato = nome ?? "Nome não informado";
  let deficienciaCandidato = deficiencia
    ? deficiencia.map((item) => item.tipoDeficiencia)
    : "Deficiencia não informada";
  let enderecoCandidato = endereco
    ? endereco.bairro + " - " + endereco.sigla
    : "Endereço não informado";

   

  const vaga = document.createElement("div");
  vaga.classList.add("candidatos");
  vaga.innerHTML = `
        <div class="candidatos">
        <div class="headerCandidatos">
            <div class="informacaoCandidatos">
                <div class="imgEmpresa">
                    <img src="${imagemCandidato}" alt="">
                </div>
                <div class="conteudoCandidato">
                    <h1>${nomeCandidato}</h1>
                    <div class="localCandidato">
                        <img src="../img/local.png" alt=""> 
                        <p>${enderecoCandidato}</p> 
                    </div>
                    <div class="tipoDeficiencia">
                        <h2>Deficiencia: ${deficienciaCandidato} </h2>
                    </div>
                </div>
            </div>
        </div>
        <div class="footerCandidatos">
            <div class="botaoSaibaMais">
            <button onclick='abrirSaibaMais(${id})'>Saiba mais</button>
            </div>
        </div>
    </div>
        `;

  return vaga;
};

const semResultado = () => {
  const vaga = document.createElement("div");
  vaga.classList.add("notFoundContainer");
  vaga.innerHTML = `
    <div class='notFound' > 
        <image src='../img/notFound.png' class='imgNotFound' /> 
        <p class='titleNotFound'>Não Encontrado!</p>
    </div>
    `;
  return vaga;
};

const carregarVaga = async () => {
  const container = document.querySelector(".candidatosConteiner");
  const vagas = await getVaga();

  if (vagas.length == 0) {
    container.replaceChildren(semResultado());
  } else {
    const colunas = vagas.map(criarVaga);
    container.replaceChildren(...colunas);
  }
};


const dadosVaga = async () => {
  const urlListar = `${baseURL}vaga/buscar/${idVaga}`;
  const response = await fetch(urlListar)
    .then((resp) => resp.json())
    .then((dados) => titulo(dados))
    .catch((e) => []);

 
};

const titulo = async ({titulo}) => {
const container = document.querySelector(".menuVagas");
  const vaga = document.createElement("div");
  vaga.classList.add("menuItens");
  vaga.innerHTML = `
         <p>${titulo}</p>

    `;
    container.replaceChildren(vaga);
};



const carregarPagina = () => {
  carregarVaga()
  dadosVaga()
}

// const carregarTitulo = async (titulo) => {
//   const container = document.querySelector(".menuVagas");
//   const vagas = await titulo();

//   const colunas = vagas.map(criarVaga);
//   container.replaceChildren(vagas);
// };

document.addEventListener("DOMContentLoaded", carregarPagina);
