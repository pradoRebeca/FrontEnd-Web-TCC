'use strict';

import baseUrl from "../baseUrl.js";

const recuperarDados = async() => {
    
    const dados = {
        login: document.getElementById('email').value,
        senha: document.getElementById('senha').value
    }
    
    await autenticar(dados)
}

const autenticar = (dados) => {
    const url = `${baseUrl}auth/candidato`
    const options = {
        method: 'POST',
        body:JSON.stringify(dados),
        headers: {
            'Content-Type': 'application/json',
            'Accept':'application/json',
        }
    }
    fetch(url, options)
    .then(resp => resp.json())
    .then(json => {
        localStorage.setItem('idCandidato', json.id)
        window.location.href = `vagas.html`
    }).catch((e) => {
        swal(
            "Houve algum erro!",
            "Não foi possível altenticar.",
            "error"
          );
        console.log('erro:' ,e)
    })
}


document.getElementById('btnEntrar').addEventListener('click', recuperarDados)