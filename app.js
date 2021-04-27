const button = document.querySelector('#search-btn')
const buttonClose = document.querySelector('#close-button')
const countryField = document.querySelector('#input-zip')
const content = document.querySelector('#zip-code-modal .modal-main')
const title = document.querySelector('#zip-code-modal .modal-title')

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
  let country = countryField.value
  let ctry = document.createElement('h1')

  country = country[0].toUpperCase() + country.substr(1)
  country = country.trim()

  let txt = document.createTextNode(country)

  console.log(country, country[0])
  title.innerHTML = ''
  ctry.appendChild(txt)
  title.appendChild(ctry)

  if(country.length > 3){
    axios.get(`https://covid-api.mmediagroup.fr/v1/cases?country=${country}`)
    .then(res => {
      if(res.data.erro){
        throw new Error('País inválido!')
      }

      content.innerHTML = ''
      createLine(`País: ${res.data.All.country}`)
      createLine(`Casos confirmados: ${res.data.All.confirmed}`)
      createLine(`Casos Recuperados: ${res.data.All.recovered}`)
      createLine(`Mortes: ${res.data.All.deaths}`)
    })
    .catch(err => {
      content.innerHTML = ''
      createLine('ERRO!')
    })
  }else{
    createLine("Campo vazio ou com menos de três caracteres!!")
  }
  
}

function createLine(value) {
  let line = document.createElement('p')
  let text = document.createTextNode(value)

  line.appendChild(text)
  content.appendChild(line)
}