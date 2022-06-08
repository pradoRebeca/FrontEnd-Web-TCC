"use strict";

import baseURL from '../baseUrl.js'
import { idExist } from "../utils/function.js";

const idEmpresa = localStorage.getItem('idEmpresa')

idExist(idEmpresa)
console.log(idEmpresa)

const getVaga = async () => {
  const urlListar = `${baseURL}vaga/listar/empresa/${idEmpresa}`;
  const response = await fetch(urlListar)
    .then((resp) => resp.json())
    .then((dados) => dados.content).catch(() => [])
  console.log(response);
  return response;
};


const limitarTexto = (texto) => {
  if(texto.length  > 25){
      return texto.substring(0, 25) + "...";
  }
 
  return texto 
}

const previewVaga = ({ titulo, localTrabalho, status, deficiencia, id }) => {
const iconStatusVaga =   status == 0  ? '../img/inativo.png' : '../img/ativo.png'
const classeCss = status == 0 ? 'candidatoInativo' : 'candidatoAtivo'
const titleStatus = status == 0 ? 'Inativo' : 'Ativo'


  let imagemVaga =
    "https://images.vexels.com/media/users/3/144883/isolated/preview/09a503901819e475a3c352ddd3e528b3-curso-de-construcao-de-empresa.png" ??
    imagem;
  let tituloVaga = titulo ? limitarTexto(titulo) :  "Titulo não informado";
  let deficienciaVaga = deficiencia
    ? deficiencia.map((item) => item.tipoDeficiencia)
    : "Deficiencia não informada";
  let enderecoVaga = localTrabalho
    ? localTrabalho.bairro + " - " + localTrabalho.sigla
    : "Endereço não informado";

  const vaga = document.createElement("div");
  vaga.classList.add("candidatos");
  vaga.innerHTML = `
        <div class="headerCandidatos">
        <div class="informacaoCandidatos">
            <div class="imgEmpresa">
                <img src="${imagemVaga}" alt="">
            </div>
            <div class="conteudoCandidato">
                <h1>${tituloVaga}</h1>
                <div class="localCandidato">
                    <img src="../img/local.png" alt=""> 
                    <p>${enderecoVaga}</p> 
                </div>
                <div class="tipoDeficiencia">
                    <h2>Deficiencia: ${deficienciaVaga}</h2>
                </div>
            </div>
        </div>
        <div class="${classeCss}">
        <img src="${iconStatusVaga}" alt=""> 
        <p>${titleStatus}</p>
        </div>
    </div>
    <div class="footerCandidatos">
    
    <a class="botaoCandidatos" href='listagemCandidatos.html?idVaga=${id}'>
    <button id='btnCandidatos'>Candidatos</button>
</a>
        <div class="botaoSaibaMais">    
        <button onclick='abrirModal(${id})'>Saiba mais</button>
        </div>
    </div>
        `;

  return vaga;
};

const semResultado = () => {
  const vaga = document.createElement('div')
  vaga.classList.add("notFoundContainer")
  vaga.innerHTML = `
  <div class='notFound' > 
      <image src='../img/notFound.png' class='imgNotFound' /> 
      <p class='titleNotFound'>Não Encontrado!</p>
  </div>
  `
  return vaga;
}

const carregarVaga = async () => {
  const container = document.querySelector(".candidatosConteiner");
  const vagas = await getVaga();
console.log('vagas; ', vagas)
  if (vagas.length <= 0) {
    container.replaceChildren(semResultado());
  } else {
    const colunas = vagas.map(previewVaga);
    container.replaceChildren(...colunas);
  }
};

document.addEventListener("DOMContentLoaded", carregarVaga);



// document.getElementById("btnCandidatos").addEventListener('click', listarCandidatos)
