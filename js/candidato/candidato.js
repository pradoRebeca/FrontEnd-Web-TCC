'use strict';

import baseUrl from "../baseUrl.js";

const validacao = ({nome, email, senha}) => {

    if(nome.length > 3 && nome.length <= 50 && email.length > 9 && email.length <= 100  && senha.length > 3 && senha.length <= 50) {
        return true

    } else {
        return false
    }
} 

const cadastrarEmpresa = async() => {
    const candidato = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value,
        genero: "PREFIRO_NAO_INFORMAR"
    }

    if(validacao(candidato)) {
        await postCandidato(candidato).then(resp => resp.json()).then(json => json.id).catch(e => swal(
            "Sucesso!",
            "Cadastro efetuado.",
            "success"
          ))
    } else {
        swal("Alerta!", "Preencha os campos vazios.", "info");
    }
}

document.getElementById('btnCadastro').addEventListener('click', cadastrarEmpresa)


const postCandidato =  async(candidato) => {
    const urlCadastro = `${baseUrl}candidato/cadastrar'`
    const options = {
        method: 'POST',
        body:JSON.stringify(candidato),
        headers: {
            'Content-Type': 'application/json',
            'Accept':'application/json',
        }
    }

    await fetch(urlCadastro, options).then(resp=>console.log(resp.json(Object.id)))
   

}


