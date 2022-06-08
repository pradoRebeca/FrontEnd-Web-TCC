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


const getImg = async(e) => {
  e.preventDefault()
  const urlListar = `http://10.107.144.15:8080/file/candidato/1`
  await fetch(urlListar)
  .then(resp => resp)
  .then(dados => {
    console.log(dados);

    criarVaga(dados)
  })
  .catch((error) => console.log(error.message))
  
  }

  const criarVaga = (imagem) => {
      const vaga = document.createElement('div')
      //document.getElementById("ItemPreview").src = "data:image/jpg;base64," + imagem;
      //console.log( document.getElementById("ItemPreview").src = "data:image/jpg;base64," + imagem)
      console.log(imagem)
      // var str = imagem.slice(20)
      // console.log(str)
      vaga.classList.add("lugarImagem")
      vaga.innerHTML = `
              <img src="${imagem}">
      `;

      return vaga;
  }

  const carregarVaga = async (e) => {
    e.preventDefault()
    const container = document.querySelector(".lugarImagem");
    const vagas = await getImg();
  
      const colunas = vagas.map(criarVaga);
      container.replaceChildren(colunas);

  };
















// const manda =(e) => {
//   e.preventDefault()
//   var formdata = new FormData();
//   // formdata.append("file", fileInput.files[0], "patinho.jpeg");
//   formdata.append("file", fileInput.files[0], fileInput.name);

//   var requestOptions = {
//     method: 'POST',
//     body: formdata,
//     redirect: 'follow'
//   };

//   fetch("http://10.107.144.9:8080/upload/", requestOptions)
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));

// }



const test = (e) => {

  // const teste = e.target.files;

  // const reader = new FileReader();
  // console.log(reader);

  // return file;

  const fileInput = document.getElementById("file");
  var formdata = new FormData();
  //console.log(formdata);
  return formdata
  //formdata.append("file", fileInput.files[0], fileInput.name);
 
}

// function enviarImagem(e) {
//   e.preventDefault();
  
//   const imagem = test();
//   console.log(imagem);

//   var requestOptions = {
//     method: 'POST',
//     body: {
//       file: imagem
//     },
//     redirect: 'follow'
//   };

//   fetch("http://10.107.144.9:8080/upload/", requestOptions)
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));
// }
  





// document.getElementById("fileInput").addEventListener("change", test);
document.getElementById("botao").addEventListener("click", getImg)
