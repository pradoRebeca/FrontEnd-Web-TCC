" use strict";

import baseUrl from "../baseUrl.js";

console.log("TELA DE ESQUECI SENHA");

let idCandidato;

const enviarEmail = async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;

  const urlEnviar = `${baseUrl}auth/enviar/email`;
  const emailBody = {
    email: email,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(emailBody),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  if (email != "") {
    //   window.location.href = `verificacaoEmail.html?email=${emailBody.email}`;
    await fetch(urlEnviar, options)
      .then((response) => {
        swal(
          "Código Enviado!",
          "Enviamos um código para seu email ",
          "success"
        );
        localStorage.setItem("emailRecuperar", emailBody.email);
        window.location.href = `verificacaoEmail.html`;
        console.log("resp => ", response);
      })
      .catch((error) => {
        swal("Houve algum erro!", "Verifique o email inserido", "error");
        console.log("error => ", error);
      });
  } else {
    swal("Alerta!", "Preencha os campos obrigatorios.", "info");
  }
};

function voltarLogin() {
  window.location.href = "login.html";
}

document.getElementById("btnProx").addEventListener("click", enviarEmail);
document.getElementById("btn-cancelar").addEventListener("click", voltarLogin);
