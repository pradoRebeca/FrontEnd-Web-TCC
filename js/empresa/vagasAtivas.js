"use strict";

import baseURL from "../baseUrl.js";
import baseUrl from "../baseUrl.js";
import { idExist } from "../utils/function.js";

const idEmpresa = localStorage.getItem("idEmpresa");

idExist(idEmpresa);

const limitarTexto = (texto) => {
  if (texto.length > 25) {
    return texto.substring(0, 25) + "...";
  }

  return texto;
};

const getVaga = async () => {
  const urlListar = `${baseURL}vaga/listar/empresa/${idEmpresa}`;
  const response = await fetch(urlListar)
    .then((resp) => resp.json())
    .then((dados) => dados.content)
    .then((content) => content.filter((item) => item.status != 0))
    .catch((e) => []);
  console.log(response);
  return response;
};

const previewVaga = ({ titulo, localTrabalho, status, deficiencia, id }) => {
  let imagemVaga =
    "https://images.vexels.com/media/users/3/144883/isolated/preview/09a503901819e475a3c352ddd3e528b3-curso-de-construcao-de-empresa.png" ??
    imagem;
  let tituloVaga = titulo ? limitarTexto(titulo) : "Titulo não informado";
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
        <div class="candidatoAtivo">
        <img src="../img/ativo.png" alt=""> 
        <p>Ativo</p>
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
const listarCandidatos = (id) => {
  window.location.href = `listagemCandidatos.html?idVaga=${id}`;
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
  if (vagas.length <= 0) {
    container.replaceChildren(semResultado());
  } else {
    const colunas = vagas.filter((item) => item.status == 1).map(previewVaga);
    console.log('colunas =>',colunas)
    container.replaceChildren(...colunas);
  }
};

///////////////////////////////////////////////////////
const criarRadioTipoDeficiencia = ({ tipo, id }) => {
  console.log("ajbsjd", tipo);
  const container = document.getElementById("opcoesDeficiencia");
  const linha = document.createElement("div");
  linha.classList.add("checkbox");
  linha.innerHTML = `
        <input type="radio" name="rdDeficiencia" value="${id}"/> ${tipo}
    `;

  container.appendChild(linha);
};

const criarSelectEstado = ({ estado, id }) => {
  const container = document.querySelector("#slcEstado");
  const linha = document.createElement("option");
  linha.value = id;
  linha.textContent = estado;
  container.appendChild(linha);
};

const criarSelectCidade = ({ cidade, id }) => {
  const container = document.querySelector("#slcCidade");
  const linha = document.createElement("option");
  linha.value = id;
  linha.textContent = cidade;
  container.appendChild(linha);
};

const criarSelectSuporte = ({ nome, id }) => {
  const container = document.querySelector("#slcSuporte");
  const linha = document.createElement("option");
  linha.value = id;
  linha.textContent = nome;
  container.appendChild(linha);
};

//GET DADOS API
const getTipoDeficiencia = async () => {
  const urlListar = `${baseUrl}deficiencia/listar/tipo`;
  const options = {
    method: "GET",
  };

  await fetch(urlListar, options)
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
  const urlListar = `${baseUrl}vaga/listar/suporte`;
  const options = {
    method: "GET",
  };

  fetch(urlListar, options)
    .then((resp) => resp.json())
    .then((json) => {
      const conteudo = json.content;
      conteudo.map(criarSelectSuporte);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getEstado = async () => {
  const urlListar = `${baseUrl}pesquisa/estado`;
  const options = {
    method: "GET",
  };

  fetch(urlListar, options)
    .then((resp) => resp.json())
    .then((json) => {
      const conteudo = json.content;
      conteudo.map(criarSelectEstado);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getCidade = async () => {
  document.getElementById("slcCidade").disabled = false;
  const idEstado = document.getElementById("slcEstado").value;

  const urlListar = `${baseUrl}pesquisa/cidade/${idEstado}`;
  const options = {
    method: "GET",
  };

  fetch(urlListar, options)
    .then((resp) => resp.json())
    .then((json) => {
      const conteudo = json.content;
      conteudo.map(criarSelectCidade);
    })
    .catch((err) => {
      console.log(err);
    });
};

const carregarPagina = () => {
  carregarVaga();
  getEstado();
  getSuporte();
  getTipoDeficiencia();
};

const urlFinal = async () => {
  const idEstado = document.getElementById("slcEstado").value;
  const idCidade = document.getElementById("slcCidade").value;
  const idSuporte = document.getElementById("slcSuporte").value;
  const idDeficiencia = document.querySelector(
    'input[name="rdDeficiencia"]:checked'
  ).value;

  let urlFiltragem = `${baseUrl}vaga/listar?`;

  if (idEstado != "null") {
    urlFiltragem = urlFiltragem + `&idEstado=${idEstado}`;
    if (idSuporte != "null") {
      urlFiltragem = urlFiltragem + `&idSuporte=${idSuporte}`;
      if (idDeficiencia != "null" && idDeficiencia != "undefined") {
        urlFiltragem = urlFiltragem + `&idDeficiencia=${idDeficiencia}`;
        if (idSuporte != "null") {
          urlFiltragem = urlFiltragem + `&idSuporte=${idSuporte}`;
          if (idCidade != "null") {
            urlFiltragem = urlFiltragem + `&idCidade=${idCidade}`;
          }
        }
      }
    }
  }

  return urlFiltragem;
};

const aplicarFiltro = async (e) => {
  e.preventDefault();
  const urlFiltragem = await urlFinal();

  // const urlListar = `${baseUrl}vaga/listar?idCidade=${cidade}&idDeficiencia=${deficiencia}&idEstado=${estado}&idSuporte=${suporte}`;
  const options = {
    method: "GET",
  };

  await fetch(urlFiltragem, options)
    .then((resp) => resp.json())
    .then((json) => {
      const container = document.querySelector(".candidatosConteiner");
      const vagas = json.content;
      const colunas =  vagas.filter((item) => item.status == 1).map(previewVaga);
      if (vagas.length == 0 || colunas.length == 0) {
        container.replaceChildren(semResultado());
      } else {
     
        container.replaceChildren(...colunas);
      }
    })
    .catch((err) => {
      container.replaceChildren(semResultado());
      return [];
    });
};

document.addEventListener("DOMContentLoaded", carregarPagina);
document.getElementById("slcEstado").addEventListener("click", getCidade);
document.getElementById("btnAplicar").addEventListener("click", aplicarFiltro);
