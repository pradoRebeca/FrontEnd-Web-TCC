"use strict";

import baseURL from "../baseUrl.js";
import {
  validacaoArray,
  validacaoCampo,
  idExist,
  mascaraCep,
} from "../utils/function.js";

const idEmpresa = localStorage.getItem("idEmpresa");

idExist(idEmpresa);

const btnSalvar = document.querySelector("#btnSalvarDados");

//MASCARA DE MOEDA
function formatarMoeda() {
  var elemento = document.getElementById("salarioVaga");
  var valor = elemento.value;
  console.log("valor: ", valor);
  valor = valor + "";
  valor = parseInt(valor.replace(/[\D]+/g, ""));
  valor = valor + "";
  valor = valor.replace(/([0-9]{2})$/g, ",$1");

  if (valor.length > 6) {
    valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
  }

  elemento.value = valor;
  if (valor == "NaN") elemento.value = "";
}

const limparElementos = (elemento) => {
  while (elemento.firstChild) {
    elemento.removeChild(elemento.lastChild);
  }
};

//GERAR DADOS DINAMICOS
const criarBeneficio = ({ beneficio, id }) => {
  const container = document.querySelector(".checkboxBeneficios");
  const linha = document.createElement("div");
  linha.innerHTML = `
   <input type="checkbox" value="${id}" name="chkBeneficio"> ${beneficio}
  `;

  container.appendChild(linha);
};

const criarOptionGrau = ({ nivel, id }, event) => {
  const container = document.querySelector("#selectGrau");
  const linha = document.createElement("option");
  linha.value = id;
  linha.textContent = nivel;
  container.appendChild(linha);

  //console.log("nivel", id);
  const nivelSelecionado = document.getElementById("selectGrau").value;
};

const criarOptionCurso = ({ curso, id }) => {
  const container = document.querySelector("#selectCurso");
  const linha = document.createElement("option");
  linha.value = id;
  linha.textContent = curso;
  container.appendChild(linha);
};

const criarOptionTipoContatrado = ({ id, tipo }) => {
  const container = document.getElementById("selectTipoContrato");
  const linha = document.createElement("option");
  console.log("íd deficiencia ", id);
  linha.value = id;
  linha.textContent = tipo;
  container.appendChild(linha);
};

const criarOptionTipoDeficiencia = ({ tipo, id }) => {
  const container = document.getElementById("selectTipoDeficiencia");
  const linha = document.createElement("option");
  linha.value = id;
  linha.textContent = tipo;
  container.appendChild(linha);

  // console.log('tipo deficiencia',tipoDeficiencia)
};

const criarOptionDeficiencia = ({ deficiencia, id }) => {
  const container = document.getElementById("selectDeficiencia");
  const linha = document.createElement("option");
  // console.log("íd deficiencia ", id);
  linha.value = id;
  linha.textContent = deficiencia;
  container.appendChild(linha);
};

const criarSuporte = ({ nome, id }) => {
  // console.log("cehaga aqui no criar");
  const container = document.querySelector(".checkboxSuporte");
  const linha = document.createElement("div");
  linha.innerHTML = `
   <input type="checkbox" value="${id}" name="chkSuporte"> ${nome}
  `;

  container.appendChild(linha);
};

//GET DADOS API
const getSuporte = async () => {
  const urlListar = `${baseURL}vaga/listar/suporte`;
  const options = {
    method: "GET",
  };

  fetch(urlListar, options)
    .then((resp) => resp.json())
    .then((json) => {
      const conteudo = json.content;
      conteudo.map(criarSuporte);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getTipoDeficiencia = async () => {
  limparElementos(document.getElementById("selectTipoDeficiencia"));
  const urlListar = `${baseURL}deficiencia/listar/tipo`;
  const options = {
    method: "GET",
  };

  fetch(urlListar, options)
    .then((resp) => resp.json())
    .then((json) => {
      const conteudo = json.content;
      conteudo.map(criarOptionTipoDeficiencia);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getTipoContrato = async () => {
  limparElementos(document.getElementById("selectTipoContrato"));
  const urlListar = `${baseURL}vaga/listar/contrato`;
  const options = {
    method: "GET",
  };

  fetch(urlListar, options)
    .then((resp) => resp.json())
    .then((json) => {
      const conteudo = json.content;
      conteudo.map(criarOptionTipoContatrado);
    })
    .catch((err) => {
      console.log("erro ", err);
    });
};

const getDeficiencia = async () => {
  var select = document.querySelector("#selectDeficiencia");
  select.disabled = false;
  var opcaoValor = document.querySelector("#selectTipoDeficiencia").value;

  limparElementos(document.getElementById("selectDeficiencia"));
  const urlListar = `${baseURL}deficiencia/listar/${opcaoValor}`;
  const options = {
    method: "GET",
  };

  fetch(urlListar, options)
    .then((resp) => resp.json())
    .then((json) => {
      const conteudo = json.content;
      conteudo.map(criarOptionDeficiencia);
    })
    .catch((err) => {
      console.log("erro ", err);
    });
};

const getCursos = async () => {
  var select = document.querySelector("#selectCurso");
  select.disabled = false;
  var opcaoValor = document.querySelector("#selectGrau").value;

  //console.log("id cursos ", opcaoValor);
  limparElementos(document.querySelector("#selectCurso"));
  const urlListar = `${baseURL}curso/listar?idNivel=${opcaoValor}`;
  const options = {
    method: "GET",
  };

  fetch(urlListar, options)
    .then((resp) => resp.json())
    .then((json) => {
      const conteudo = json.content;
      conteudo.map(criarOptionCurso);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getBeneficio = async () => {
  const urlListar = `${baseURL}vaga/listar/beneficio`;
  const options = {
    method: "GET",
  };

  fetch(urlListar, options)
    .then((resp) => resp.json())
    .then((json) => {
      const conteudo = json.content;
      conteudo.map(criarBeneficio);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getNivel = async () => {
  limparElementos(document.querySelector("#selectGrau"));
  const urlListar = `${baseURL}curso/nivel/listar`;
  const options = {
    method: "GET",
  };

  fetch(urlListar, options)
    .then((resp) => resp.json())
    .then((json) => {
      const conteudo = json.content;
      conteudo.map(criarOptionGrau);
    })
    .catch((err) => {
      console.log(err);
    });
};

//CEP
const limparFormulario = (endereco) => {
  document.getElementById("logradouro").value = "";
  document.getElementById("numero").value = "";
  document.getElementById("bairro").value = "";
  document.getElementById("cidade").value = "";
  document.getElementById("estado").value = "";
};

const preencherFormulario = (endereco) => {
  document.getElementById("logradouro").value = endereco.logradouro;
  document.getElementById("bairro").value = endereco.bairro;
  document.getElementById("cidade").value = endereco.localidade;
  document.getElementById("estado").value = endereco.uf;
};

const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const pesquisarCep = async () => {
  //habilitando os campos
  document.getElementById("logradouro").disabled = false;
  document.getElementById("bairro").disabled = false;
  document.getElementById("cidade").disabled = false;
  document.getElementById("estado").disabled = false;
  document.getElementById("numero").disabled = false;

  limparFormulario();

  const cep = document.querySelector("#cep").value.replace("-", "");
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  if (cepValido(cep)) {
    const dados = await fetch(url);
    const endereco = await dados.json();
    if (endereco.hasOwnProperty("erro")) {
      swal("Alerta!", "Cep não encontrado.", "info");
    } else {
      preencherFormulario(endereco);
    }
  } else {
    swal("Alerta!", "Cep não encontrado.", "info");
  }
};

//POST
const postVaga = async (dados) => {
  console.log(dados);
  //funcao para não fazer o submit
  const urlCadastrarVaga = `${baseURL}vaga/cadastrar/${idEmpresa}`;
  const options = {
    method: "POST",
    body: JSON.stringify(dados),
    headers: {
      "content-Type": "application/json",
    },
  };

  await fetch(urlCadastrarVaga, options)
    .then((response) => response.json())
    .then((json) =>
      swal("Sucesso!", "Vaga cadastrada.", "success").then(
        (item) => (window.location.href = "vagasHistorico.html")
      )
    )
    .catch((err) => {
      swal("Houve algum erro!", "Não foi possível cadastrar vaga.", "error");
      console.log("erro: ", err);
    });
};

function getValuesChekbox(nome) {
  var nomeElemento = `[name=${nome}]:checked`;
  var pacote = document.querySelectorAll(nomeElemento);
  var values = [];

  for (var i = 0; i < pacote.length; i++) {
    values.push(pacote[i].value);
  }
  return values;
}

const pesquisarCidade = async (uf) => {
  const urlListar = `https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome`;
  const response = await fetch(urlListar)
    .then((resp) => resp.json())
    .catch((error) => undefined);

  const estado = response.filter((item) => item.sigla == uf);

  if (estado.length > 0) {
    return estado[0].nome;
  } else {
    return null;
  }
};

const cadastrarVaga = async (e) => {
  e.preventDefault();
  const estado = pesquisarCidade(document.getElementById("estado").value);
  let arrayBeneficios = getValuesChekbox("chkBeneficio");
  let arraySuporte = getValuesChekbox("chkSuporte");

  let dadosVaga = {
    titulo: document.querySelector("#tituloVaga").value,
    status: "1",
    descricao: document.querySelector("#requisitosVaga").value,
    requisitos: document.querySelector("#descricaoVaga").value,
    tipoContrato: document.querySelector("#selectTipoContrato").value,
    salario: document.querySelector("#salarioVaga").value,
    statusSalario: document.querySelector("#visibilidadeSalario").value,
    suporte: arraySuporte,
    beneficio: arrayBeneficios,
    formacaoDesejada: [document.querySelector("#selectCurso").value],
    deficiencia: [document.querySelector("#selectDeficiencia").value],
    rua: document.querySelector("#logradouro").value,
    cidade: document.querySelector("#cidade").value,
    sigla: document.querySelector("#estado").value,
    estado: await estado,
    bairro: document.querySelector("#bairro").value,
    numero: document.querySelector("#numero").value,
    cep: document.querySelector("#cep").value,
    horarioInicio: document.querySelector("#horarioInicio").value,
    horarioSaida: document.querySelector("#horarioFim").value,
    statusHorario: document.querySelector("#visibilidade").value,
  };

  const { rua, bairro, descricao, requisitos, numero, ...rest } = dadosVaga;

  if (validacaoArray(rest)) {
    await postVaga(dadosVaga);
    console.log("com campo preenchido");
  } else {
    swal("Alerta!", "Preencha os campos obrigatorios.", "info");
  }
};

const mascaraParaCep = () => {
  const cep = document.getElementById("cep");
  mascaraCep(cep, "#####-###");
};

const carregaPagina = () => {
  getBeneficio();
  getNivel();
  getTipoDeficiencia();
  getSuporte();
  getTipoContrato();
};

//EVENT
document.addEventListener("DOMContentLoaded", carregaPagina);

document.getElementById("selectGrau").addEventListener("change", getCursos);
document
  .getElementById("selectTipoDeficiencia")
  .addEventListener("change", getDeficiencia);

btnSalvar.addEventListener("click", cadastrarVaga);
document.getElementById("cep").addEventListener("focusout", pesquisarCep);
// document.getElementById("salarioVaga").addEventListener("keyup", formatarMoeda);
document.getElementById("cep").addEventListener("keyup", mascaraParaCep);
