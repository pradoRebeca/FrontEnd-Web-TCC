"use strict";

// import { idExist } from "../utils/function.js";

const idEmpresa = localStorage.getItem("idEmpresa");

const baseURL = `http://10.107.144.13:8080/`;

const abrirModal = async (id) => {
  console.log("id modal: ", id);
  let idVaga = id;

  const urlBuscar = `${baseURL}vaga/buscar/${idVaga}`;
  const response = await fetch(urlBuscar)
    .then((resp) => resp.json())
    .then((dados) => dados)
    .catch((e) => console.log("error: ", e));

  const criarModal = ({
    titulo,
    empresa,
    formacaoDesejada,
    deficiencia,
    horario,
    descricao,
    localTrabalho,
    salario,
    tipoContrato,
    beneficio,
    imagem,
    requisitos,
    suporte,
  }) => {
    console.log("aksnaksnakn");
    let imagemVaga =
      "https://images.vexels.com/media/users/3/144883/isolated/preview/09a503901819e475a3c352ddd3e528b3-curso-de-construcao-de-empresa.png" ??
      imagem;
    let tituloVaga = titulo ?? "Titulo não informado";
    let deficienciaVaga = deficiencia
      ? deficiencia.map((item) => item.tipoDeficiencia)
      : "Deficiencia não informada";
    let enderecoVaga = localTrabalho
      ? localTrabalho.bairro + " - " + localTrabalho.sigla
      : "Endereço não informado";
    let formacao = formacaoDesejada
      ? formacaoDesejada.map(
          (item) =>
            `<p>  <span class="infoSubtitulo"> Área de atuação: </span>  ${item.areaAtuacao}  </p> <p> <span class="infoSubtitulo"> Nome do Curso: </span>  ${item.curso} </p>`
        )
      : "Não informado";
    let nomeEmpresa = empresa
      ? empresa.empresa
      : "Nome da empresa não informado";
    let horarioInicio = horario ? horario.horarioInicio : "Não informado";
    let horarioFinal = horario ? horario.horarioFinal : "Não informado";
    let contratoVaga = tipoContrato
      ? tipoContrato.tpoContrato
      : "Não informado";
    let descricaoVaga = descricao ? descricao : "Não informado";
    let requisitosVaga = requisitos ? requisitos : "Não informado";
    let beneficioVaga = beneficio
      ? beneficio.map((item) => `<p>${item.beneficio}</p>`)
      : "Não informado";
    let suporteVaga = suporte
      ? suporte.map((item) => `<p>${item.suporte}</p>`)
      : "Não informado";
    let salarioVaga = salario ? `R$ ${salario.salario}` : "Não informado";

    const modal = document.createElement("div");
    // modal.classList.add('divConteudoModal');
    modal.innerHTML = `
            <div OnClick="closeModal()" href="#fechar" title="Fechar" class='divFechar'>
            <span class="fechar">
                <img class='imgFechar' src="https://icones.pro/wp-content/uploads/2021/08/icone-x-avec-cercle-rouge.png" alt="">
            </span>
            </div>
            <div id="headerVaga">
                
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
                <p> <span class="infoSubtitulo"> Horário de Entrada: </span> ${horarioInicio}</p>
                <p> <span class="infoSubtitulo"> Horário de Saída: </span> ${horarioFinal}</p>
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
                <div class="topicoContainer">            
                <div class="tituloContainer formatacaoTitulo">
                    <img src="../img/topicoIcon.svg" alt=""><h1>Suporte</h1>
                </div>
                <div class="textoContainer formatacaoTexto">
                    ${suporteVaga}
                </div>
            </div>
            </div>
            <div id="footerModalEditarDeletar">
                <div id="buttonsContainer">
                    <Button onClick='deletarVaga(${id})' >Deletar</Button>
                    <Button onClick='editarVaga(${id})' >Editar</Button>
                </div>
            </div>
        `;

    return modal;
  };

  const container = document.querySelector("#bodyModal");
  const conteudoModal = await criarModal(response);
  container.replaceChildren(conteudoModal);

  const modal = document.getElementById("containerModal");

  modal.style.display = "block";
};

const closeModal = () => {
  const modal = document.getElementById("containerModal");
  // modal.classList.remove('active');
  modal.style.display = "none";
  // modal.body.style.overflow = 'auto';
};

const editarVaga = (id) => {
  window.location.href = `atualizarVaga.html?idVaga=${id}`;
};

const deletarVaga = async (id) => {
  swal({
    title: "Deletar Vaga",
    text: "Tem certeza que deseja deletar essa vaga?",
    icon: "info",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      const urlListar = `${baseURL}vaga/deletar/${id}`;
      const options = {
        method: "DELETE",
      };

      fetch(urlListar, options)
        .then((resp) => {
          swal("Vaga deletada!", {
            icon: "success",
          }).then((ok) => {
            window.location.reload(history.back());
          })
          
        })
        .catch((err) => {
          swal("Algo deu errado. Tente Novamente!", {
            icon: "error",
          });
          console.log(err);
        });
    }
  });

//   const resultConfirm = confirm("Tem certeza que deseja deletar essa vaga?");

//   if (resultConfirm) {
//     const urlListar = `${baseURL}vaga/deletar/${id}`;
//     const options = {
//       method: "DELETE",
//     };

//     fetch(urlListar, options)
//       .then((resp) => window.location.reload(history.back()))
//       .catch((err) => {
//         console.log(err);
//       });
//   }
};
