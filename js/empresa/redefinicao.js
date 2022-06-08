import baseUrl from "../baseUrl.js";
import { validacaoArray, validacaoCampo } from "../utils/function.js";


var emailUsuario = localStorage.getItem('emailRecuperar')

const redefinir = (e) => {
  e.preventDefault();
  const senha = document.getElementById("senha").value;
  const repeteSenha = document.getElementById("repeteSenha").value;

  const url = `${baseUrl}auth/senha/candidato?email=${emailUsuario}`;
  const options = {
    method: "PUT",
    body: JSON.stringify({ senha: senha }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  if (!validacaoCampo(senha) || !validacaoCampo(repeteSenha)) {
    swal("Preencha todos os campos");
  } else {
    if (senha != repeteSenha) {
      swal("Alerta!", "As senhas devem ser iguais.", "info");
    } else {
      fetch(url, options)
        .then((resp) => resp.json())
        .then((json) => {
          console.log(json);
          swal(
            "Sucesso!",
            "Senha alterada. Faça login com a sua nova senha.",
            "success"
          );
          
          window.location.href = `login.html`;
        })
        .catch((e) => {
          swal(
            "Houve algum erro!",
            "Não foi possível alterar a senha. Tente Novamente.",
            "error"
          );
          console.log("erro:", e);
        });
    }
  }
};

document.getElementById("btnProx").addEventListener("click", redefinir);
