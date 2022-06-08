"use strict";

import baseURL from "../baseUrl.js";
import { validacaoArray, idExist } from "../utils/function.js";

const idEmpresa = localStorage.getItem('idEmpresa')

idExist(idEmpresa)

var url_string = window.location.href;
var url = new URL(url_string);
var idVaga = url.searchParams.get("idVaga");

const limparElementos = (elemento) => {
  while (elemento.firstChild) {
    elemento.removeChild(elemento.lastChild);
  }
};

function formatarMoeda() {
  var valor = document.getElementById("salarioValor").value;

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

const tituloVaga = (nome) => {
  const container = document.querySelector(".menuItens");
  const linha = document.createElement("p");
  linha.innerHTML = `Editando: ${nome}`;

  container.appendChild(linha);
};

const marcarCkecked = async (elemento) => {
  const container = document.getElementsByName("chkBeneficio");
  for (let i = 0; i < container.length; i++) {
    if (elemento[i].idBeneficio == container[i].value) {
      container[i].checked = true;
    }
  }
};

const marcarCkeckedB = async () => {
  const container = document.getElementsByName("chkSuporte");
  for (let i = 0; i < container.length; i++) {
    if (elemento[i].id == container[i].value) {
      container[i].checked = true;
    }
  }
};

const marcarSelect = async (nome, elemento) => {
  const select = document.querySelector(nome).options;
  //console.log('elemento: ', select)

  for (var i = 0; i < select.length; i++) {
    //console.log(elemento, 'text', select[i].text)

    if (select[i].value == elemento) {
      select[i].selected = true;
    }
  }
};

const getValuesChekbox = (nome) => {
  var nomeElemento = `[name=${nome}]:checked`;
  var pacote = document.querySelectorAll(nomeElemento);
  var values = [];

  for (var i = 0; i < pacote.length; i++) {
    values.push(pacote[i].value);
  }
  return values;
};

const getDadosVaga = async () => {
  const urlListar = `${baseURL}vaga/buscar/${idVaga}`;
  const response = await fetch(urlListar).then((resp) => resp.json());

  tituloVaga(response.titulo);

  document.querySelector("#tituloVaga").value = response.titulo;
  document.querySelector("#requisitosVaga").value = response.requisitos;
  document.querySelector("#salarioVaga").value = response.salario.salario;
  document.querySelector("#descricaoVaga").value = response.descricao;
  document.querySelector("#logradouro").value = response.localTrabalho.rua;
  document.querySelector("#cidade").value = response.localTrabalho.cidade;
  document.querySelector("#estado").value = response.localTrabalho.estado;
  document.querySelector("#bairro").value = response.localTrabalho.bairro;
  document.querySelector("#numero").value = response.localTrabalho.numero;
  document.querySelector("#cep").value = response.localTrabalho.cep;
  document.querySelector("#horarioInicio").value =
    response.horario.horarioInicio;
  document.querySelector("#horarioFim").value = response.horario.horarioFinal;

  marcarCkeckedB(response.suporte);
  marcarCkecked(response.beneficio);
  console.log(marcarCkecked(response.beneficio));
  marcarSelect(
    "#selectTipoDeficiencia",
    response.deficiencia[0].idTipoDeficiencia
  );
  getDeficiencia();

  marcarSelect("#selectTipoContrato", response.tipoContrato.id);
  marcarSelect("#selectGrau", response.formacaoDesejada[0].idNivel);

  marcarSelect("#selectCurso", response.formacaoDesejada[0].idCurso);
};

const criarBeneficio = ({ beneficio, id }) => {
  const container = document.querySelector(".checkboxBeneficios");
  const linha = document.createElement("div");
  linha.innerHTML = `
   <input type="checkbox" value="${id}" name="chkBeneficio"> ${beneficio}
  `;

  container.appendChild(linha);
};

const criarSuporte = ({ nome, id }) => {
  console.log("cehaga aqui no criar");
  const container = document.querySelector(".checkboxSuporte");
  const linha = document.createElement("div");
  linha.innerHTML = `
   <input type="checkbox" value="${id}" name="chkSuporte"> ${nome}
  `;

  container.appendChild(linha);
};

const criarOptionTipoDeficiencia = ({ tipo, id }) => {
  const container = document.getElementById("selectTipoDeficiencia");
  const linha = document.createElement("option");
  linha.value = id;
  linha.textContent = tipo;
  container.appendChild(linha);
};

const criarOptionDeficiencia = ({ deficiencia, id }) => {
  const container = document.getElementById("selectDeficiencia");
  const linha = document.createElement("option");
  linha.value = id;
  linha.textContent = deficiencia;
  container.appendChild(linha);
};

const criarOptionTipoContatrado = ({ id, tipo }) => {
  const container = document.getElementById("selectTipoContrato");
  const linha = document.createElement("option");
  linha.value = id;
  linha.textContent = tipo;
  container.appendChild(linha);
};

const criarOptionGrau = ({ nivel, id }) => {
  const container = document.querySelector("#selectGrau");
  const linha = document.createElement("option");
  linha.value = id;
  linha.textContent = nivel;
  container.appendChild(linha);
  const nivelSelecionado = document.getElementById("selectGrau").value;
};

const criarOptionCurso = ({ curso, id }) => {
  const container = document.querySelector("#selectCurso");
  const linha = document.createElement("option");
  linha.value = id;
  linha.textContent = curso;
  container.appendChild(linha);
};

////////////////
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

const getDeficiencia = async () => {
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

const getCursos = async () => {
  var opcaoValor = document.querySelector("#selectGrau").value;

  console.log("id cursos ", opcaoValor);
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

const carregarPagina = () => {
  getNivel();
  getCursos();
  getTipoContrato();
  getBeneficio();
  getTipoDeficiencia();
  getDadosVaga();
  getSuporte();
};


// getDadosVaga();
const limparFormularioCep = (endereco) => {
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
  limparFormularioCep();

  const cep = document.querySelector("#cep").value.replace("-", "");
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  if (cepValido(cep)) {
    const dados = await fetch(url);
    const endereco = await dados.json();
    if (endereco.hasOwnProperty("erro")) {
      document.getElementById("endereco").value = "CEP não encontrado!";
    } else {
      preencherFormulario(endereco);
    }
  } else {
    document.getElementById("endereco").value = "CEP incorreto!";
  }
};

const putDadosVaga = async (dados) => {
  const urlAtualizarVaga = `${baseURL}vaga/atualizar/${idVaga}`;
  const options = {
    method: "PUT",
    body: JSON.stringify(dados),
    headers: {
      "content-Type": "application/json",
    },
  };

  await fetch(urlAtualizarVaga, options)
    .then((response) => {
      console.log('response ', response)
      swal(
        "Sucesso!",
        "Vaga atualizada.",
        "success"
      );
      window.location.href='vagasHistorico.html'
      // window.location.reload(history.back())
    })

    .catch((err) => {
      swal(
        "Houve algum erro!",
        "Não foi possível atualizar vaga.",
        "error"
      );
      console.log("erro: deu erro aqui ")
    });
};


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

const dadosFormulario = async (e) => {
  e.preventDefault()
  const estado = pesquisarCidade(document.getElementById("estado").value);
console.log('dados')
  let dadosVaga = {
    titulo: document.querySelector("#tituloVaga").value,
    status: document.querySelector("#visibilidadeVaga").value,
    descricao: document.querySelector("#requisitosVaga").value,
    requisitos: document.querySelector("#descricaoVaga").value,
    tipoContrato: document.querySelector("#selectTipoContrato").value,
    salario: document.querySelector("#salarioVaga").value,
    statusSalario: document.querySelector("#visibilidadeSalario").value,
    suporte: getValuesChekbox("chkSuporte"),
    beneficio: getValuesChekbox("chkBeneficio"),
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

  const {rua, bairro, descricao, requisitos, numero, ...rest} = dadosVaga

  if (validacaoArray(rest)) {
    await putDadosVaga(dadosVaga);
    console.log("com campo preenchido");
  } else {
    swal("Alerta!", "Preencha os campos obrigatorios.", "info");
  }
};

document.addEventListener("DOMContentLoaded", carregarPagina);
document
  .querySelector("#selectTipoDeficiencia")
  .addEventListener("change", getDeficiencia);
document.getElementById("selectGrau").addEventListener("change", getCursos);
document
  .querySelector("#btnAtualizarDados")
  .addEventListener("click", dadosFormulario);
document.getElementById("cep").addEventListener("focusout", pesquisarCep);
document
  .getElementById("salarioVaga")
  .addEventListener("onkeyup", formatarMoeda);
