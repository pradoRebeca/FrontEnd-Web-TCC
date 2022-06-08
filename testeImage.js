"use strict";

// function _arrayBufferToBase64( buffer ) {
//     var binary = '';
//     var bytes = new Uint8Array( buffer );
//     var len = bytes.byteLength;
//     for (var i = 0; i < len; i++) {
//         binary += String.fromCharCode( bytes[ i ] );
//     }
//     const btoa = window.btoa( binary );
//     return window.atob(btoa);
// }

// const teste =  async() => {

//     const img = _arrayBufferToBase64(document.getElementById('file').src);
//     console.log(img)
//     const urlCadastro = `${baseUrl}teste/imagem?file=${img}`
//     const options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept':'application/json',
//         }
//     }

//     await fetch(urlCadastro, options).then(resp=>console.log(resp.json(Object.id)))

// }

// const teste = () => {
//     var file = document.querySelector('#file').files[0]
//     var formData = new FormData()
//     formData.append("file", file)
//     fetch(`${baseUrl}teste/imagem?file=${img}`, {
//         method: 'POST',
//         body: formData
//     }).then(resp => resp.json).then(json => json)
// }

// document.getElementById("botao").addEventListener("click", teste)

//  function dataURLtoFile(dataurl, filename) {

//         var arr = dataurl.split(','),
//             mime = arr[0].match(/:(.*?);/)[1],
//             bstr = atob(arr[1]),
//             n = bstr.length,
//             u8arr = new Uint8Array(n);

//         while(n--){
//             u8arr[n] = bstr.charCodeAt(n);
//         }

//         return new File([u8arr], filename, {type:mime});
//     }

//     //Usage example:
//     var file = dataURLtoFile('data:text/plain;base64,rO0ABQ==');
//     console.log(file);

// function saveByteArray(reportName, byte) {
//   var blob = new Blob([byte], {type: "application/jpg"});
//   var link = document.createElement('a');
//   criarVaga(blob);
//   link.href = window.URL.createObjectURL(blob);
//   var fileName = reportName;
//   link.download = fileName;
//   link.click();
// };

var base64img;

const getImg = async (e) => {
  e.preventDefault()

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

 await fetch("http://10.107.144.13:8080/file/candidato/2", requestOptions)
    .then((resp) => resp.text())
    .then((resp) => {
      let src = `data:image/jpg;base64,${resp}`;
      criarVaga(src);
    }).catch(e => console.log('error => ', error))

  // const urlListar = `http://10.107.144.13:8080/file/candidato/1`
  // await fetch(urlListar)
  // .then(resp => resp.json())
  // .then(dados => {
  //   // console.log(dados.imagem);

  //   console.log(dados.imagem)
  //   let src = `data:image/jpg;base64,${dados.imagem}`
  //   criarVaga(src)

  // })
  // .catch((error) => console.log(error.message))
};

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

var file = document.querySelector('#files > input[type="file"]').files[0];

const criarVaga = (imagem) => {
  const vaga = document.createElement("div");

  vaga.classList.add("lugarImagem");
  vaga.innerHTML = `
      <p> Lugar da imagem</p>
              <img height="30" width="35" src="${imagem}">
      `;

  const container = document.querySelector("#files");
  container.replaceChildren(vaga);
};

const carregarVaga = async (e) => {
  e.preventDefault();
  const container = document.querySelector(".lugarImagem");
  const vagas = await getImg();

  const colunas = vagas.map(criarVaga);
  container.replaceChildren(colunas);
};

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

// var file = document.querySelector('#files > input[type="file"]').files[0];
// getBase64(file).then(
//   data => console.log(data)
// );

const manda =(e) => {
  e.preventDefault()
  var formdata = new FormData();
  // formdata.append("file", fileInput.files[0], "patinho.jpeg");
  formdata.append("file", fileInput.files[0], fileInput.name);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  fetch("http://10.107.144.9:8080/upload/", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}

const test = (e) => {
  // const teste = e.target.files;

  // const reader = new FileReader();
  // console.log(reader);

  // return file;

  const fileInput = document.getElementById("file");
  var formdata = new FormData();
  //console.log(formdata);
  return formdata;
  //formdata.append("file", fileInput.files[0], fileInput.name);
};

function enviarImagem(e) {
  e.preventDefault();

  const imagem = test();
  console.log(imagem);

  var requestOptions = {
    method: 'POST',
    body: {
      file: imagem
    },
    redirect: 'follow'
  };

  fetch("http://10.107.144.9:8080/upload/", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

// document.getElementById("fileInput").addEventListener("change", test);
document.getElementById("botao").addEventListener("click", getImg);
