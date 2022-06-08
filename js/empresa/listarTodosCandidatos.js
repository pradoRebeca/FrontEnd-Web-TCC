'use strict';
console.log('tela de listas todos candidatos')

import baseURL from "../baseUrl.js";
import { idExist } from "../utils/function.js";

const idEmpresa = localStorage.getItem('idEmpresa')

idExist(idEmpresa)

const getVaga = async() => {
    const urlListar = `${baseURL}candidato/listar`
    const response = await fetch(urlListar).then(resp => resp.json()).then(dados => dados.content).catch((e) => [])
    console.log(response)
    return response

}

const criarVaga = ({nome, endereco, curso, deficiencia, imagem}) => {
 let imagemCandidato = 'https://www.promoview.com.br/uploads/images/unnamed%2819%29.png' ?? imagem
 let nomeCandidato = nome ?? 'Nome não informado'
let deficienciaCandidato = deficiencia ? deficiencia.map(item => item.tipoDeficiencia) : 'Deficiencia não informada'
let enderecoCandidato = endereco ? (endereco.bairro + ' - '+ endereco.sigla) : 'Endereço não informado'

        const vaga = document.createElement('div')
        vaga.classList.add("candidatos")
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
                <button>Saiba mais</button>
            </div>
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

    if(vagas.length == 0){
        container.replaceChildren(semResultado())
    }else{
        const colunas = vagas.map(criarVaga)
        container.replaceChildren(...colunas)
    }

}


document.addEventListener('DOMContentLoaded', carregarVaga)

