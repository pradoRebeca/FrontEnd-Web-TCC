'use strict'

const sair = () => {
    localStorage.removeItem('idEmpresa')
    window.location.href = 'login.html'
}

document.getElementById('logout').addEventListener('click', sair)