let button = document.querySelector('#search-btn')
let buttonClose = document.querySelector('#close-button')
let zipCodeField = document.querySelector('#input-zip')
let content = document.querySelector('#zip-code-modal .modal-main')
let title = document.querySelector('#zip-code-modal .modal-title')

const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.zip-code-modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.zip-code-modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  adicionaDados()
  if(modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if(modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}

function adicionaDados() { 
  let zipCode = zipCodeField.value
  let zip = document.createElement('h1')
  let txt = document.createTextNode(zipCode)

  zipCode = zipCode.replace(' ', '')
  zipCode = zipCode.replace('.', '')
  zipCode = zipCode.trim()

  title.innerHTML = ''
  zip.appendChild(txt)
  title.appendChild(zip)

  axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)
    .then(res => {
      if(res.data.erro){
        throw new Error('CEP inválido!')
      }

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