'use strict';

import baseUrl from "../baseUrl.js";
import { idExist } from "../utils/function.js";

const idEmpresa = localStorage.getItem('idEmpresa')

idExist(idEmpresa)

const getVaga = async() => {

    const urlListar = `${baseUrl}candidato/listar`
    const response = await fetch(urlListar).then(resp => resp.json()).then(dados => dados.content).catch((e) => [])
    console.log(response)
    return response
}

const limitarTexto = (texto) => {
    if(texto.length  > 15){
        return texto.substring(0, 15) + "...";
    }
   
    return texto 
}

const criarVaga = ({nome, endereco, formacaoDesejada, deficiencia, id}) => {
 
    let nomeCandidato = nome ? limitarTexto(nome) : 'Nome não informado'
    let deficienciaCandidato = deficiencia ? deficiencia.map(item =>  item.tipoDeficiencia) : 'Não informada'
    let formacaoCandidato = formacaoDesejada ? formacaoDesejada.map(item =>  `<p>Área de atuação:  ${item.areaAtuacao} Curso: ${item.curso} </p>` )  : 'Curso não informado'
    let enderecoCandidato = endereco ? (endereco.bairro + ' - '+ endereco.sigla) : 'Endereço não informado'
 
        const vaga = document.createElement('div')
        vaga.classList.add("candidatos")
        vaga.innerHTML = `
        <div class="headerCandidatos">
        <div class="informacaoCandidatos">
            <div class="conteudoCandidato">
                <h1>${nomeCandidato}</h1>
                <div class="localCandidato">
                    <img src="../img/local.png" alt=""> 
                    <p>${enderecoCandidato}</p> 
                </div>
                <div class="localCandidato">
                    <img src="../img/malaCandidato.png" alt=""> 
                   <p> ${formacaoCandidato}</p>
                </div>
            </div>
        </div>
        <div class="tipoDeficiencia">
        <h2>Deficiencia: ${deficienciaCandidato}</h2>
        </div>
    </div>
    <div class="footerCandidatos">
        <div class="botaoSaibaMais">
            <button onclick='abrirSaibaMais(${id})'>Saiba mais</button>
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


const carregarVaga = async() => {
    const container = document.querySelector('.candidatosConteiner')
    const vagas = await getVaga();
    if (vagas.length <= 0) {
        container.replaceChildren(semResultado());
      } else {
        const colunas = vagas.map(criarVaga);
        container.replaceChildren(...colunas);
      }
}


document.addEventListener('DOMContentLoaded', carregarVaga)




