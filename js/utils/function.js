const validacaoCampo = (campo) => {
  if (campo == "") {
    return false;
  } else {
    return true;
  }
};

const validacaoArray = (obj) => {
  const array = Object.values(obj);

  const valueArray = array
    .filter((item) => Array.isArray(item) === true)
    .filter((item) => item.includes(""));

  if (array.includes("") || valueArray.length > 0) {
    return false;
  } else {
    return true;
  }
};

const idExist = (name) => {
  if (name == null) {
    swal('Redirecionado para fazer o login');
    window.location.href = "login.html";
  }
};

function mascaraCep(campo, mask){
  var i = campo.value.length;
  var saida = mask.substring(1,0);
  var texto = mask.substring(i)
  if (texto.substring(0,1) != saida){
  campo.value += texto.substring(0,1);
  }
}



export { validacaoArray, validacaoCampo, idExist, mascaraCep };
