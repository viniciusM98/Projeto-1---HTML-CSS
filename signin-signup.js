const username = document.querySelector('#username-su')
const email = document.querySelector('#email-su')
const password = document.querySelector('#password-su')
const sign_up_btn = document.querySelector('#sign-up-btn')
const button_register = document.querySelector('#button-su')
const button_login = document.querySelector('#button-login')
const message_loged = document.querySelector('#signin-signup')
const container = document.querySelector("#container")

sign_up_btn.addEventListener('click', () => {
  container.classList.add('sign-up-mode')
})

button_register.addEventListener('click', (event) => {
  event.preventDefault()

  if(email.value.length > 3 && password.value.length > 3){
    axios.post(`https://reqres.in/api/register`, {
      email: email.value,
      password: password.value
    })
    .then(res => {
      if(res.status === 200){
        createLine("Cadastrado com Sucesso!")
        container.classList.remove('sign-up-mode')
      }
    })
    .catch(err => {
      createLine("ERRO!")
    })
    
  } else{
    createLine("Algum dos Campos está vazio ou com menos de 3 caracteres!!!")
  }
})

button_login.addEventListener('click', (event) => {
  event.preventDefault()

  let email_login = document.querySelector('#user-login')
  let passw = document.querySelector('#password-login')

  axios.post(`https://reqres.in/api/login`, {
      email: email_login.value,
      password: passw.value
    })
    .then(res => {
      if(res.status === 200){
        console.log("Sucesso")
        createLine("Você está logado!")
        localStorage.setItem('token', res.data.token)
        window.location.href = "index.html"
      }    
    })
    .catch(err => {
      console.log("Erro!")
    })
})

function createLine(value) {
  let line = document.createElement('p')
  let text = document.createTextNode(value)

  line.appendChild(text)
  message_loged.appendChild(line)
}