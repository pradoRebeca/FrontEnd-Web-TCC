'use strict';
import baseUrl from "../baseUrl.js";
import { idExist } from "../utils/function.js";

const idCandidato = localStorage.getItem('idCandidato')

idExist(idCandidato)

const limparElementos = (elemento) => {
    console.log('cehga aqui')
    while (elemento.firstChild) {
      elemento.removeChild(elemento.lastChild);
    }
};

const urlFinal = async() => {
    const idEstado = document.querySelector("#sltEstados").value
    const idCidade = document.querySelector("#sltCidades").value
    const idSuporte = document.querySelector("#sltSuportes").value
    const idDeficiencia = document.querySelector('input[name="rdDeficiencia"]:checked').value;

    let urlFiltragem = `${baseUrl}vaga/listar?`

    if(idEstado != 'null'){
        urlFiltragem = urlFiltragem +`&idEstado=${idEstado}`
        if(idSuporte != 'null'){
            urlFiltragem = urlFiltragem +`&idSuporte=${idSuporte}`
            if(idDeficiencia != 'null'){
                urlFiltragem = urlFiltragem +`&idDeficiencia=${idDeficiencia}`
                if(idSuporte != 'null'){
                    urlFiltragem = urlFiltragem +`&idSuporte=${idSuporte}`
                    if(idCidade != 'null'){
                        urlFiltragem = urlFiltragem +`&idCidade=${idCidade}`
                    }
                }
            }
        }
    }
    
    console.log(urlFiltragem)
    return urlFiltragem
}

const getFiltro = async() => {

    // const idEstado = document.querySelector("#sltEstados").value
    // const idCidade = document.querySelector("#sltCidades").value
    // const idSuporte = document.querySelector("#sltSuportes").value
    // const idDeficiencia = document.querySelector('input[name="rdDeficiencia"]:checked').value;


    // let urlFiltragem = `${baseUrl}vaga/listar?`
const urlFiltragem = await urlFinal()
    console.log( await urlFinal())
  
    
  

   // const urlFiltragem = `${baseUrl}vaga/listar?idCidade=${idCidade}&idDeficiencia=${idDeficiencia}&idEstado=${idEstado}&idSuporte=${idSuporte}`
     fetch(urlFiltragem)
        .then((resp) => resp.json())
        .then((json) => {
        const conteudo = json.content;
        limparElementos(document.querySelector('.vagasConteiner'))
        conteudo.map(criarVaga);
        console.log(conteudo)
        })
        .catch((err) => {
            console.log(err);
        });


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
        conteudo.map(criarRadioTipoDeficiencia);
      })
      .catch((err) => {
        console.log(err);
      });
};

const getSuporte = async () => {
    const urlCidade = `${baseUrl}vaga/listar/suporte`
    await fetch(urlCidade)
        .then((resp) => resp.json())
        .then((dados) => {
            const response = dados.content
            response.map(criarSuporte)
        })
        .catch(err => {
            err
        })
}


const getEstado = async () => {
    const urlEstado = `${baseUrl}pesquisa/estado`
    await fetch(urlEstado)
    .then((resp) => resp.json())
    .then((dados) => {
        const response = dados.content
        response.map(criarEstado)
    })
    .catch(err => {
        err
    })
}

const getCidade = async () => {

    const idEstado = document.querySelector("#sltEstados").value

    console.log(idEstado);

    document.querySelector("#sltCidades").disabled = false

    limparElementos(document.getElementById("sltCidades"));
    const urlCidade = `${baseUrl}pesquisa/cidade/${idEstado}`
    await fetch(urlCidade)
        .then(resp => resp.json())
        .then((json) => {
            const response = json.content
            response.map(criarCidade)
        })
        .catch(err => {
            err
        })

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

    const container = document.querySelector('.vagasConteiner')
    container.appendChild(vaga)
}

const criarRadioTipoDeficiencia = ({ tipo, id }) => {
    const container = document.getElementById('opcoesDeficiencia');
    const linha = document.createElement("div");
    linha.classList.add('checkbox')
    linha.innerHTML=
    `
        <input type="radio" name="rdDeficiencia" id="rdDeficiencia" value="${id}"/> ${tipo}
    `
    container.appendChild(linha);
}

const criarEstado = ({id, sigla}) => {
    const container = document.getElementById("sltEstados");
    const linha = document.createElement("option");
    linha.value = id;
    linha.textContent = sigla;
    container.appendChild(linha);
}

const criarCidade = ({id, cidade}) => {
    const container = document.getElementById("sltCidades");
    const linha = document.createElement("option");
    linha.value = id;
    linha.textContent = cidade;
    container.appendChild(linha);
}

const criarSuporte = ({id, nome}) => {
    const container = document.getElementById("sltSuportes");
    const linha = document.createElement("option");;
    linha.value = id;
    linha.textContent = nome;
    container.appendChild(linha);
}

const carregar = () => {
    getEstado()
    getSuporte()
    getTipoDeficiencia()
}

carregar()

document.getElementById('btnAplicar').addEventListener('click', getFiltro)

document.getElementById('sltEstados').addEventListener('change', getCidade)

