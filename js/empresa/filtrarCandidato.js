"use strict";

import baseUrl from "../baseUrl.js";

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

const criarRadioTipoDeficiencia = ({ id, tipo }) => {
  const linha = document.createElement("div");
  linha.classList.add("checkbox");
  linha.innerHTML = `
    <input type="radio" name="rdDeficiencia" value="${id}"/> ${tipo}
        `;

  const container = document.querySelector(".opcoesDeficiencia");
  container.appendChild(linha);
};

const urlFinal = async () => {
  const idEstado = document.getElementById("slcEstado").value;
  const idCidade = document.getElementById("slcCidade").value;
  //   const idSuporte = document.getElementById("slcSuporte").value;
  const idDeficiencia = document.querySelector(
    'input[name="rdDeficiencia"]:checked'
  );

  console.log("def => ", idDeficiencia);
  let urlFiltragem = `${baseUrl}vaga/listar?`;

  if (idEstado != "null") {
    urlFiltragem = urlFiltragem + `&idEstado=${idEstado}`;
    if (idDeficiencia != "null" && idDeficiencia != undefined) {
      urlFiltragem = urlFiltragem + `&idDeficiencia=${idDeficiencia.value}`;
      if (idCidade != "null") {
        urlFiltragem = urlFiltragem + `&idCidade=${idCidade}`;
      }
    }
  }

  return urlFiltragem;
};

////////////////////////////////////
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

const getTipoDeficiencia = async () => {
  const urlListar = `${baseUrl}deficiencia/listar/tipo`;
  const options = {
    method: "GET",
  };

  fetch(urlListar, options)
    .then((resp) => resp.json())
    .then((json) => json.content.map((item) => criarRadioTipoDeficiencia(item)))
    .catch((err) => {
      console.log(err);
    });
};

/////////////////////////////////////
const aplicarFiltro = async (e) => {
  e.preventDefault();
  const urlFiltragem = await urlFinal();

  // const urlListar = `${baseUrl}vaga/listar?idCidade=${cidade}&idDeficiencia=${deficiencia}&idEstado=${estado}&idSuporte=${suporte}`;
  const options = {
    method: "GET",
  };
  const container = document.querySelector(".candidatosConteiner");
  await fetch(urlFiltragem, options)
    .then((resp) => resp.json())
    .then((json) => {
      const vagas = json.content;
      console.log(vagas);
      if (vagas.length <= 0) {
        container.replaceChildren(semResultado());
      } else {
        const colunas = vagas.map(criarVaga);
        container.replaceChildren(...colunas);
      }
    })
    .catch((err) => {
      container.replaceChildren(semResultado());
      return [];
    });
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

const limitarTexto = (texto) => {
  if (texto.length > 25) {
    return texto.substring(0, 25) + "...";
  }
  return texto;
};

const carregarPagina = () => {
  getEstado();
  //   getSuporte();
  getTipoDeficiencia();
};

carregarPagina();

document.getElementById("slcEstado").addEventListener("click", getCidade);
// document.addEventListener("DOMContentLoaded", carregarPagina);
document.getElementById("btnAplicar").addEventListener("click", aplicarFiltro);
