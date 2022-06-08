'use strict';

import baseUrl from "../baseUrl.js";
import { idExist } from "../utils/function.js";

const idCandidato = localStorage.getItem('idCandidato')

idExist(idCandidato)

    const getVaga = async(idCandidato) => {

    const urlListar = `${baseUrl}vaga/listar/${idCandidato}`
    const response = await fetch(urlListar).then(resp => resp.json()).then(dados => dados.content)

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
                            <h1>${titulo}</h1>
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
                        <h2>Deficiencia: ${deficiencia.map(item => item.tipoDeficiencia)[0]}</h2>
                    </div>
                    <div class="botaoSaibaMais">
                        <button id="btnSaibaMais" onClick="abrirModal(${id})">Saiba mais</button>
                    </div>
                </div>
        `

        return vaga;
    }

    const carregarVaga = async() => {
    const container = document.querySelector('.vagasConteiner')
    const vagas = await getVaga(idCandidato);
    const colunas = vagas.map(criarVaga)
    container.replaceChildren(...colunas)
    }

carregarVaga();

export {
    carregarVaga,
}