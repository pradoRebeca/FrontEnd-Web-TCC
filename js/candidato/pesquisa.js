'use strict'

import baseUrl from "../baseUrl.js";

import { idExist } from "../utils/function.js";

const idCandidato = localStorage.getItem('idCandidato')

idExist(idCandidato)

const limparElementos = (elemento) => {
    while (elemento.firstChild) {
      elemento.removeChild(elemento.lastChild);
    }
  };

  const semResultado = () => {
    const container = document.querySelector(".vagasConteiner");
    const vaga = document.createElement("div");
    vaga.classList.add("notFoundContainer");
    vaga.innerHTML = `
          <div class='notFound' > 
              <image src='../img/notFound.png' class='imgNotFound' /> 
              <p class='titleNotFound'>Não Encontrado!</p>
          </div>
          `;
    container.appendChild(vaga);
  };

  const pesquisar = async (event) => {
    if (event.key == "Enter") {
      const pesquisa = event.target.value;
      console.log(pesquisa);
      const url = `${baseUrl}pesquisa/?palavra=${pesquisa}`;
      const response = await fetch(url)
        .then((resp) => resp.json())
        .then((dados) => dados.content);
      const vagas = await response;
      console.log(vagas);

      limparElementos(document.querySelector(".vagasConteiner"));
      if (vagas <= 0) {
          semResultado()
      }else{
          carregarVagas(vagas);
      }
    }
  };

  const criarVagaPesquisa = async ({
    titulo,
    empresa,
    localTrabalho,
    id,
    deficiencia,
  }) => {
    const container = document.querySelector(".vagasConteiner");
    const vaga = document.createElement("div");
    vaga.classList.add("vagas");
    vaga.innerHTML = `
                  <div class="headerVagas">
                      <div class="informacaoVaga">
                          <div class="imgEmpresa">
                              <img src="../img/logoEmpresa.png" alt="">
                          </div>
                      <div class="conteudoVaga">
                      <h1>${titulo}</h1>
                      <div class="empresaVaga">
                          <img src="../img/empresa.png" alt=""> 
                          <p>${empresa.empresa}</p> 
                      </div>
                      <div class="empresaVaga">
                          <img src="../img/local.png" alt=""> 
                          <p>${localTrabalho.cidade} - ${
                              localTrabalho.sigla
                          }</p> 
                      </div>
                  </div>
              </div>
          </div>
          <div class="footerVagas">
              <div class="tipoDeficiencia">
                  <h2>Deficiencia: ${deficiencia.map(
                    (item) => item.tipoDeficiencia
                  )}</h2>
              </div>
              <div class="botaoSaibaMais">
                  <button id="btnSaibaMais" onClick="abrirModal(${id})">Saiba mais</button>
              </div>
          </div>
          `;

    container.appendChild(vaga);
  };

  const carregarVagas = (vaga) => vaga.forEach(criarVagaPesquisa);

  document
    .getElementById("classe-classe")
    .addEventListener("keypress", pesquisar);