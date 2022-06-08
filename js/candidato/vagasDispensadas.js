'use strict';

import baseUrl from "../baseUrl.js";
import { idExist } from "../utils/function.js";

const idCandidato = localStorage.getItem('idCandidato')

idExist(idCandidato)

    const getVaga = async() => {

    const urlListar = `${baseUrl}vaga/listar/vagas/status?idCandidato=${idCandidato}&idStatus=3`
    const response = await fetch(urlListar).then(resp => resp.json()).then(dados => dados.content).catch(() => [])
    return response

    }

    const criarVaga = ({titulo, empresa, localTrabalho, id, deficiencia}) => {
        const vaga = document.createElement('div')
        vaga.classList.add("vagas")
        vaga.innerHTML = `
                <div class="headerVagas">
                    <div class="informacaoVaga">
                        <div class="imgEmpresa">
                            <img src="../img/logoEmpresa.png" alt="">
                        </div>
                        <div class="conteudoVaga">
                            <div class="tituloVaga">
                                <h1>${titulo}</h1>
                                <img src="../img/cancelado.png" alt="">
                            </div>
                            <div class="empresaVaga">
                                <img src="../img/empresa.png" alt=""> 
                                <p>${empresa.empresa}</p> 
                            </div>
                            <div class="empresaVaga">
                                <img src="../img/local.png" alt=""> 
                                <p>${localTrabalho.cidade} - ${localTrabalho.sigla}</p> 
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footerVagas">
                    <div class="tipoDeficiencia">
                        <h2>Deficiencia: ${deficiencia.map(item => item.tipoDeficiencia)}</h2>
                    </div>
                    <div class="botaoSaibaMais">
                        <button id="btnSaibaMais" onClick="abrirModal(${id})"><p>Saiba mais</p></button>
                    </div>
                </div>
        `

        return vaga;
    }

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
        const container = document.querySelector(".vagasConteiner");
        const vagas = await getVaga();
      console.log('vaas: ',vagas)
        if (vagas.length <= 0) {
          container.replaceChildren(semResultado());
        } else {
          const colunas = vagas.map(criarVaga);
          container.replaceChildren(...colunas);
        }
      };

    const navegarCandidaturas = () => {
        window.location.href = `candidaturas.html?id=${idCandidato}`
    }

    const navegarVagasSalvas = () => {
        window.location.href = `vagasSalvas.html?id=${idCandidato}`
    }

    const navegarVagasDispensadas = () => {
        window.location.href = `vagasDispensadas.html?id=${idCandidato}`
    }

    const navegarHistoricoVagas = () => {
        window.location.href = `historicoVagas.html?id=${idCandidato}`
    }
    
document.getElementById("candidaturas").addEventListener("click",navegarCandidaturas)
document.getElementById("vagasSalvas").addEventListener("click",navegarVagasSalvas)
document.getElementById("vagaDispensada").addEventListener("click",navegarVagasDispensadas)
document.getElementById("historicoVagas").addEventListener("click",navegarHistoricoVagas)

// document.querySelector("#btnSaibaMais").addEventListener("click", abrirModal);

carregarVaga();