import baseUrl from "../baseUrl.js";
import { validacaoArray, validacaoCampo } from "../utils/function.js";

const autenticar = async (dados) => {
  const url = `${baseUrl}auth/empresa`;
  const options = {
    method: "POST",
    body: JSON.stringify(dados),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  fetch(url, options)
    .then((resp) => resp.json())
    .then((json) => {
      console.log(json);
      localStorage.setItem("idEmpresa", json.id);
      window.location.href = `vagasHistorico.html`;
    })
    .catch((e) => {
      swal("Náo foi possivel fazer a atuenticacao");
      console.log("erro:", e);
    });
};

const recuperarDados = async (e) => {
  const dados = {
    login: document.getElementById("email").value,
    senha: document.getElementById("senha").value,
  };
  e.preventDefault();

  if (validacaoArray(dados)) {
    await autenticar(dados);
  } else {
    swal("Alerta!", "Preencha os campos obrigatorios.", "info");
    // alert('Preencha todos os campos')
  }
};

document.getElementById("btnEntrar").addEventListener("click", recuperarDados);
