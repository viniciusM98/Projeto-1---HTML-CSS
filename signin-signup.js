const email = document.querySelector('#email-su')
const password = document.querySelector('#password-su')
const sign_up_btn = document.querySelector('#sign-up-btn')
const button_register = document.querySelector('#button-su')
const button_login = document.querySelector('#button-login')
const message_loged = document.querySelector('#signin-signup')
const containerLogin = document.querySelector(".container-login")
const materialize_visible = document.querySelector(".materialize-visualization")
const login_visible = document.querySelector(".login-visualization")
const sign_out_btn = document.querySelector(".github-button")

if(localStorage.getItem('token')){
  materialize_visible.classList.remove("materialize-visualization")
  materialize_visible.classList.add("materialize-visualization-true")
  login_visible.classList.remove("login-visualization")
  login_visible.classList.add("login-visualization-false")
}

sign_up_btn.addEventListener('click', () => {
  containerLogin.classList.add('sign-up-mode')
})

sign_out_btn.addEventListener('click', () => {
  localStorage.removeItem('token')
  materialize_visible.classList.add("materialize-visualization")
  materialize_visible.classList.remove("materialize-visualization-true")
  login_visible.classList.add("login-visualization")
  login_visible.classList.remove("login-visualization-false")
})

button_register.addEventListener('click', (event) => {
  event.preventDefault()

  let storedEmail = localStorage.getItem('email')

  if(email.value.length > 3 && password.value.length > 3){
    axios.post(`https://reqres.in/api/register`, {
      email: email.value,
      password: password.value
    })
    .then(res => {
      console.log(res.status)
      if(res.status === 200){
        createLineLogin("Cadastrado realizado com sucesso!")

        containerLogin.classList.remove('sign-up-mode')
      }
    })
    .catch(err => {
      if(email.value === storedEmail){
        createLineLogin("E-mail já existente!")
      }else{
        localStorage.setItem('email', email.value)
        localStorage.setItem('password', password.value)

        createLineLogin("Cadastro realizado com sucesso via localStorage!")
        containerLogin.classList.remove('sign-up-mode')
      }
    })
    
  } else{
    createLineLogin("Algum dos campos está vazio ou com menos de 3 caracteres!!!")
  }
})

button_login.addEventListener('click', (event) => {
  event.preventDefault()

  let email_login = document.querySelector('#user-login')
  let passw = document.querySelector('#password-login')

  let storedEmail = localStorage.getItem('email')
  let storedPassword = localStorage.getItem('password')

  axios.post(`https://reqres.in/api/login`, {
      email: email_login.value,
      password: passw.value
    })
    .then(res => {
      if(res.status === 200){
        createLineLogin("Logado com sucesso!")
        localStorage.setItem('token', res.data.token)
        materialize_visible.classList.remove("materialize-visualization")
        materialize_visible.classList.add("materialize-visualization-true")
        login_visible.classList.remove("login-visualization")
        login_visible.classList.add("login-visualization-false")
      } 
    })
    .catch(err => {
      if(email_login.value === storedEmail && passw.value === storedPassword){
        createLineLogin("Logado com sucesso via localStorage!")
        materialize_visible.classList.remove("materialize-visualization")
        materialize_visible.classList.add("materialize-visualization-true")
        login_visible.classList.remove("login-visualization")
        login_visible.classList.add("login-visualization-false")
      }else{
        createLineLogin("ERRO!")
      }
    })
})

function createLineLogin(value) {
  let line = document.createElement('p')
  let text = document.createTextNode(value)

  line.classList.add("center-p")

  line.appendChild(text)
  message_loged.appendChild(line)
}