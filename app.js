let button = document.querySelector('#search-btn')
let zipCodeField = document.querySelector('#input-zip')
let content = document.querySelector('#zip-code')

button.addEventListener('click', adicionaDados)

function adicionaDados(event) { 
  event.preventDefault();
  
  let zipCode = zipCodeField.value

  axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)
    .then(res => {
      content.innerHTML = ''
      createLine(res.data.logradouro)
      createLine(res.data.localidade + '/' + res.data.uf)
      createLine(res.data.bairro)
    })
    .catch(err => {
      content.innerHTML = ''
      createLine('ERRO!')
    })
}

function createLine(value) {
  let line = document.createElement('p')
  let text = document.createTextNode(value)

  line.appendChild(text)
  content.appendChild(line)
}