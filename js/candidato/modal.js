'use strict';

// import { idExist } from "../utils/function.js";

const idCandidato = localStorage.getItem('idCandidato')

// idExist(idCandidato)

const baseUrl = `http://10.107.144.13:8080/`;

const abrirModal = async (id) => {
    let idVaga = id

    console.log(idCandidato);

    const urlBuscar = `${baseUrl}vaga/buscar/${idVaga}`
    const response = await fetch(urlBuscar).then(resp => resp.json()).then(dados => dados)

    console.log(response);

    const criarModal = ({
        titulo,
        empresa,
        formacaoDesejada,
        deficiencia,
        horario,
        localTrabalho,
        salario,
        tipoContrato,
        beneficio,
        descricao,
        requisitos
    }) => {

        let imagemVaga = 'https://images.vexels.com/media/users/3/144883/isolated/preview/09a503901819e475a3c352ddd3e528b3-curso-de-construcao-de-empresa.png' ?? imagem
        let tituloVaga = titulo ?? 'Titulo não informado'
        let deficienciaVaga = deficiencia ? deficiencia.map(item =>  item.tipoDeficiencia) : 'Deficiencia não informada'
        let enderecoVaga = localTrabalho ? (localTrabalho.bairro + ' - '+ localTrabalho.sigla) : 'Endereço não informado'
        let formacao = formacaoDesejada ? formacaoDesejada.map(item =>  `<p>Área de atuação:  ${item.areaAtuacao} Curso: ${item.curso} </p>` )  : 'Não informado'
        let nomeEmpresa = empresa ? empresa.empresa : 'Nome da empresa não informado' 
        let horarioInicio = horario ? horario.horarioInicio + ' - ' : ''
        let horarioFinal = horario ? horario.horarioFinal : ''
        let contratoVaga = tipoContrato ? tipoContrato.tpoContrato :  'Não informado'
        let descricaoVaga = descricao ? descricao :  'Não informado'
        let requisitosVaga = requisitos ? requisitos :  'Não informado'
        let beneficioVaga = beneficio ? beneficio.map(item =>  `<p>${item.beneficio}</p>` )  : 'Não informado'
       // let suporteVaga = suporte ? suporte.map(item =>  `<p>${item.suporte}</p>` )  : 'Não informado'
       let salarioVaga = salario ? salario.salario : 'Não informado'

        const modal = document.createElement('div')
        modal.innerHTML = `
        <div OnClick="closeModal()" href="#fechar" title="Fechar" class='divFechar'>
        <span class="fechar">
            <img class='imgFechar' src="https://icones.pro/wp-content/uploads/2021/08/icone-x-avec-cercle-rouge.png" alt="">
        </span>
        </div>
        <div id="headerVaga">
            <div id="imgPreviewEmpresa">
                <img  class='imgFechar' src="${imagemVaga}" alt="">
            </div>
            <div id="informacoesVaga">
                <div id="tituloDeficienciaVaga">
                    <div id="tituloVaga">
                        <h1>${tituloVaga}</h1> 
                    </div>
                    <div id="deficienciaVaga">
                        <p>Deficiência: ${deficienciaVaga}</p>
                    </div>
                </div>
                <div id="nomeEmpresa">
                    <img  class="imgFechar" src="../img/empresaIcon.svg" alt=""> <p>${nomeEmpresa}</p>
                </div>
                <div id="localVaga">
                    <img class="imgFechar" src="../img/localIcon.svg" alt="" > <p>${enderecoVaga}</p>
                </div>
            </div>
        </div>
       
        <div id="buttonsContainer">
            <button id='btnCandidata' onclick='candidatar(${idVaga}, ${idCandidato}, 1)' class="formatacaoButton active"><a>Candidatar-se</a></button>
            <button id='btnSalva' onclick='candidatar(${idVaga}, ${idCandidato}, 2)' class="formatacaoButton activeSec"><img src="../img/saveIcon.svg" alt=""><a>Salvar</a></button>
            <button id='btnDispensa' onclick='candidatar(${idVaga}, ${idCandidato}, 3)' class="formatacaoButton activeSec"><img src="../img/dispensarIcon.svg" alt=""><a> Dispensar</a></button>
        </div>
        <div id="containerDescricao">
            <div class="topicoContainer">            
                <div class="tituloContainer formatacaoTitulo">
                    <img src="../img/topicoIcon.svg" alt=""><h1>Formações Acadêmicas</h1>
                </div>
                <div class="textoContainer formatacaoTexto">
                 
                    ${formacao}
                   
                </div>
            </div>
            <div class="topicoContainer">            
            <div class="tituloContainer formatacaoTitulo">
                <img src="../img/topicoIcon.svg" alt=""><h1>Descrição</h1>
            </div>
            <div class="textoContainer formatacaoTexto">
                <p>
         ${descricaoVaga}
                </p>
            </div>
        </div>
           
            <div class="topicoContainer">            
            <div class="tituloContainer formatacaoTitulo">
                <img src="../img/topicoIcon.svg" alt=""><h1>Requisitos</h1>
            </div>
            <div class="textoContainer formatacaoTexto">
                <p>${requisitosVaga} </p>
            </div>
            <div class="topicoContainer">            
            <div class="tituloContainer formatacaoTitulo">
                <img src="../img/topicoIcon.svg" alt=""><h1>Horários</h1>
            </div>
            <div class="textoContainer formatacaoTexto">
                <p>
          ${horarioInicio} ${horarioFinal}
                </p>
            </div>
        </div>
        </div>
        <div class="topicoContainer">            
        <div class="tituloContainer formatacaoTitulo">
            <img src="../img/topicoIcon.svg" alt=""><h1>Salário</h1>
        </div>
        <div class="textoContainer formatacaoTexto">
            <p>
            ${salarioVaga}
              </p>
        </div>
        </div>
            <div class="topicoContainer">            
                <div class="tituloContainer formatacaoTitulo">
                    <img src="../img/topicoIcon.svg" alt=""><h1>Tipo de Contrato</h1>
                </div>
                <div class="textoContainer formatacaoTexto">
                    <p>
                    ${contratoVaga}
                      </p>
                </div>
            </div>
            <div class="topicoContainer">            
                <div class="tituloContainer formatacaoTitulo">
                    <img src="../img/topicoIcon.svg" alt=""><h1>Benefícios</h1>
                </div>
                <div class="textoContainer formatacaoTexto">
                    ${beneficioVaga}
                </div>
            </div>
        </div>
        <div id="footerModal">
        <div id='imgFooterModal'>
            <img  class='imgLinkEmpresa' src="https://images.vexels.com/media/users/3/144883/isolated/preview/09a503901819e475a3c352ddd3e528b3-curso-de-construcao-de-empresa.png" alt="">
        </div>
            
            <a href="">Visite nosso perfil.</a>
        </div>
        `

        return modal
    }

    const container = document.querySelector('#bodyModal')
    const conteudoModal = criarModal(response)
    container.replaceChildren(conteudoModal)
    // await getVaga(idVaga)
    // console.log(response)
  
    const modal = document.getElementById('containerModal')
    // modal.classList.add('active');
    modal.style.display = 'block';
}

const closeModal = () => {
    const modal = document.getElementById('containerModal')
    // modal.classList.remove('active');
    modal.style.display = 'none';
    
}

const candidatar = async (idVaga, idCandidato, idStatus) => {

    console.log(idVaga, idCandidato, idStatus);

    const urlAcoes = `${baseUrl}vaga/candidatar?idVaga=${idVaga}&idStatus=${idStatus}&idCandidato=${idCandidato}`
    console.log(urlAcoes);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }
    await fetch(urlAcoes, options).then(resp => resp.json()).then(json =>  {retornarStatus(json.idStatus)}
    ).catch((err) => {
        console.log(err);
    })

}

const popUpVisible = () => {
    const popUp = document.getElementsByClassName('popUp')
    popUp.classList.add('')
}

const retornarStatus = (idStatus) =>{
    switch (idStatus) {
        case 1:
            swal(
                "Sucesso!",
                "Realizado.",
                "success"
              );
            closeModal()
            document.location.reload(true)
            break;
        case 2:
            swal(
                "Sucesso!",
                "Realizado.",
                "success"
              );
            closeModal()
            document.location.reload(true)
            break;
        case 3:
            swal(
                "Sucesso!",
                "Realizado.",
                "success"
              );
            closeModal()
            document.location.reload(true)
            break;            
    
       
    }
}

document.getElementById('containerModal').addEventListener('click', closeModal)

// const closeModal = () => {
//     const modal = document.getElementById('containerModal')
//     modal.classList.remove('active');

// }