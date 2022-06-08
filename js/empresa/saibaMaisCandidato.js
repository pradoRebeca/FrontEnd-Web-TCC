console.log("CHEGA NA MODAL DO CANDITADO");

// const baseURL = require('../baseUrl.js')

const baseURL = `http://10.107.144.13:8080/`;

const retirarValores = (valor) => {
  if (valor) {
    console.log("existe");
  } else {
    return "Não informado";
  }
};

console.log('TELA DE SAIBA MAIS')

const existeInformacao = (texto) => {
  if (texto) {
    return texto;
  }
  return "Não informado";
};

const listarCursos = (objCurso) => {
  if (objCurso.area) {
    const render = ` 
    <p> <span class="infoSubtitulo"> Área do Curso: </span> ${existeInformacao(
      objCurso.area
    )}</p>
    <p> <span class="infoSubtitulo"> Nome do Curso: </span> ${existeInformacao(
      objCurso.curso
    )}</p>
    <p> <span class="infoSubtitulo"> Nível do Curso: </span> ${existeInformacao(
      objCurso.nivelCurso
    )}</p>
    `;
    return render;
  }
};

const listarExpericencia = (obj) => {
  const render = ` 
    <p> <span class="infoSubtitulo"> Cargo: </span> ${existeInformacao(
      obj.cargo
    )}</p>
    <p> <span class="infoSubtitulo"> Nome da Empresa: </span> ${existeInformacao(
      obj.nomeEmpresa
    )}</p>
    <p> <span class="infoSubtitulo"> Atribuições: </span> ${existeInformacao(
      obj.atribuicoes
    )}</p>  
    <p> <span class="infoSubtitulo"> Data de Início: </span> ${existeInformacao(
      obj.dataInicio
    )} <span class="infoSubtitulo">    Data de Saída: </span> ${existeInformacao(
    obj.dataSaida
  )}  </p>
    `;
  return render;
};

const listarDeficiencias = (obj) => {
  if (obj.tipoDeficiencia) {
    const render = ` 
    <p> <span class="infoSubtitulo"> Tipo de Deficiência: </span> ${existeInformacao(
      obj.tipoDeficiencia
    )}</p>
    <p> <span class="infoSubtitulo"> Deficiência </span> ${existeInformacao(
      obj.deficiencia
    )}</p>
    `;
    return render;
  }
};

const abrirSaibaMais = async (id) => {
  console.log("id modal: ", id);
  let idVaga = id;

  const urlBuscar = `${baseURL}candidato/buscar/${id}`;
  const response = await fetch(urlBuscar)
    .then((resp) => resp.json())
    .then((dados) => dados)
    .catch((e) => console.log("error: ", e));
  console.log(response);

  
  const criarModal = ({
    nome,
    endereco,
    deficiencia,
    imagem,
    email,
    telefone,
    nomeSocial,
    experiencia,
    genero,
    curso,
    dataNascimento,
    curriculo,
  }) => {
    let imagemCandidato =
      "https://www.promoview.com.br/uploads/images/unnamed%2819%29.png" ??
      imagem;
    let nomeCandidato = nomeSocial ?? nome ?? "Nome não informado";
    let deficienciaCandidato = deficiencia
      ? deficiencia.map((item) => item.tipoDeficiencia)
      : "Deficiencia não informada";
    let enderecoCandidato = endereco
      ? endereco.bairro + " - " + endereco.sigla
      : "Endereço não informado";
    let emailCandidato = email ? email[0].email : "Não informado";
    let primeiroTelefoneCandidato = telefone
      ? telefone.map((item) => item.numero)
      : "Não informado";
    let segundoTelefoneCandidato =   telefone ?  telefone.map((item) => item.numero)
   : ''
    let generoCandidato = genero ? genero : "Não informado";
    let dataNascimentoCandidato = dataNascimento
      ? dataNascimento
      : "Não informado";
    let cursoCandidato = curso
      ? curso.map((item) => listarCursos(item))
      : "Não nformado";
    let experienciaCandidato = experiencia
      ? experiencia.map((item) => listarExpericencia(item))
      : "Não nformado";
    let listaDeficienciaCandiadto = deficiencia
      ? deficiencia.map((item) => listarDeficiencias(item))
      : "Não nformado";

    const modal = document.createElement("div");
    modal.innerHTML = `
            <div OnClick="closeModal()" href="#fechar" title="Fechar" class='divFechar'>
            <span class="fechar">
                <img class='imgFechar' src="https://icones.pro/wp-content/uploads/2021/08/icone-x-avec-cercle-rouge.png" alt="">
            </span>
            </div>
            <div id="headerVaga">
                <div id="imgPreviewEmpresa">
                    <img  class='imgFechar' src="${imagemCandidato}" alt="">
                </div>
                <div id="informacoesVaga">
                    <div id="tituloDeficienciaVaga">
                        <div id="tituloVaga">
                            <h1>${nomeCandidato}</h1> 
                        </div>
                        <div id="deficienciaVaga">
                            <p>Deficiência: ${deficienciaCandidato}</p>
                        </div>
                    </div>
                    <div id="localVaga">
                        <img class="imgFechar" src="../img/localIcon.svg" alt="" > <p>${enderecoCandidato}</p>
                    </div>
                </div>
            </div>
            <div id="containerDescricao">
            <div class="topicoContainer">            
            <div class="tituloContainer formatacaoTitulo">
                <img src="../img/topicoIcon.svg" alt=""><h1>Sobre a(s) Deficiência(s)</h1>
            </div>
            <div class="textoContainer formatacaoTexto">
             ${listaDeficienciaCandiadto}
            </div>
        </div>   

                <div class="topicoContainer">            
                    <div class="tituloContainer formatacaoTitulo">
                        <img src="../img/topicoIcon.svg" alt=""><h1>Dados Pessoais</h1>
                    </div>
                    <div class="textoContainer formatacaoTexto">
                        <p> <span class="infoSubtitulo"> Email: </span> ${emailCandidato} </p>
                        <p> <span class="infoSubtitulo"> Telefones: </span> ${primeiroTelefoneCandidato}   ${segundoTelefoneCandidato}</p>
                        <p> <span class="infoSubtitulo"> Data de Nascimento: </span> ${dataNascimentoCandidato}</p>
                        <p> <span class="infoSubtitulo"> Gênero: </span> ${generoCandidato}</p>
                    </div>
                </div>             
                <div class="topicoContainer">            
                <div class="tituloContainer formatacaoTitulo">
                    <img src="../img/topicoIcon.svg" alt=""><h1>Formação Acadêmica</h1>
                </div>
                <div class="textoContainer formatacaoTexto">
                    ${cursoCandidato}
                </div>
                <div class="topicoContainer">            
                <div class="tituloContainer formatacaoTitulo">
                    <img src="../img/topicoIcon.svg" alt=""><h1>Experiência Profissional</h1>
                </div>
                <div class="textoContainer formatacaoTexto">
                  ${experienciaCandidato}
                </div>
            </div>
            </div>
            </div>
            <div id="footerModalEditarDeletar">
                <div id="buttonsContainer">
                    <Button onClick='abrirCurriculo(${curriculo})' >Vizualizar Curriculo</Button>
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
  const resultConfirm = confirm("Tem certeza que deseja deletar essa vaga?");

  if (resultConfirm) {
    const urlListar = `${baseURL}vaga/deletar/${id}`;
    const options = {
      method: "DELETE",
    };

    fetch(urlListar, options)
      .then((resp) => window.location.reload(history.back()))
      .catch((err) => {
        console.log(err);
      });
  }
};

const abrirCurriculo = (link) => {
  if (link) {
    window.location.href = link;
  } else {
    swal("Alerta!", "Candidato não possui um curriculo.", "info");
  }
};