'use strict';

import baseURL from '../baseUrl.js'
import { validacaoArray } from "../utils/function.js";

console.log('chega aqui no endereco empresa')

const limparFormulario = (endereco) =>{
    document.getElementById('rua').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

const preencherFormulario = (endereco) =>{
    document.getElementById('rua').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep); 

const pesquisarCep = async() => {
    document.getElementById('rua').disabled = false
    document.getElementById('bairro').disabled = false
    document.getElementById('cidade').disabled = false
    document.getElementById('estado').disabled = false
    document.getElementById('numero').disabled = false
    limparFormulario();
    
    const cep = document.getElementById('cep').value.replace("-","");
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)){
        const dados = await fetch(url);
        const endereco = await dados.json();
        if (endereco.hasOwnProperty('erro')){
            document.getElementById('endereco').value = 'CEP não encontrado!';
        }else {
            preencherFormulario(endereco);
        }
    }else{
        document.getElementById('endereco').value = 'CEP incorreto!';
    }
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

  
const cadastrarEnderecoEmpresa = async(e) => {
    const estado = pesquisarCidade(document.getElementById("estado").value);
    const dadosEndereco = {
        rua: document.getElementById('rua').value,
        numero: document.getElementById('numero').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: await estado,
        sigla: document.getElementById('estado').value,
        cep: document.getElementById('cep').value
    }

const {numero, bairro, rua, ...rest} = dadosEndereco

    if(validacaoArray(rest)){
        console.log(rest)
        await postEnderecoEmpresa(dadosEndereco)
    }else{
        swal("Alerta!", "Preencha os campos obrigatorios.", "info");
    }
   
}

const postEnderecoEmpresa =  async (dados, e) => {
    const id = localStorage.getItem("newId")
  
    const urlCadastro = `${baseURL}empresa/cadastrar/endereco/${id}`
    const options = {
        method: 'POST',
        body:JSON.stringify(dados),
        headers: {
            'Content-Type': 'application/json',
            'Accept':'application/json',
        }
    }

  await  fetch(urlCadastro, options).then(resp => {
        console.log('deu certo')
        localStorage.removeItem('newId')
        window.location.href='login.html'
    }).catch(err => {
        swal(
            "Houve algum erro!",
            "Não foi cadastrar endereco.",
            "error"
          );
        console.log('Ocorreu um erro ' + err)
    })

}

document.getElementById('btnCadastro').addEventListener('click', cadastrarEnderecoEmpresa)
document.getElementById('cep').addEventListener('focusout',pesquisarCep);