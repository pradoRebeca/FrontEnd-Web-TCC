"use strict";

console.log("TELA DE PEGAR CODIGO");

import baseUrl from "../baseUrl.js";

// const postCodEmpresa = async (empresa) => {
//   const urlPost = `${baseUrl}auth/verificar/codigo/empresa`;
//   const options = {
//     method: "POST",
//     body: JSON.stringify(empresa),
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//   };
//   await fetch(urlPost, options)
//     .then((resp) => resp.json({ email }))
//     .then((json) => {
//       idEmpresa = json.id;
//     })
//     .catch((erro) => {
//       alert("Erro, e é apenas isso");
//       console.log(erro);
//     });
// };

const enviarCod = async (e) => {
  e.preventDefault();
  // var url_string = window.location.href;
  // var url = new URL(url_string);
 // var emailUsuario = url.searchParams.get("email");

 var emailUsuario = localStorage.getItem('emailRecuperar')
  
  const codigo = document.getElementById("digito").value;

  const urlEnviar = `${baseUrl}auth/verificar/codigo/empresa`;
  const emailBody = {
    codigo: codigo,
    email: emailUsuario,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(emailBody),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  if (codigo != "") {
    await fetch(urlEnviar, options)
      .then((response) => {
        window.location.href = `redefinicao.html`;
        console.log("resp => ", response);
      })
      .catch((err) => {
        swal(
          "Houve algum erro!",
          "Verifique se o código digitado foi o mesmo que a equipe da PCDJob te enviou.",
          "error"
        );
        console.log("error => ", err);
      });
  } else {
    swal("Insira o código.");
  }
};

document.getElementById("btn-verificar").addEventListener("click", enviarCod);
