var username = document.querySelector('#username-su')
var email = document.querySelector('#email-su')
var password = document.querySelector('#password-su')
var button_register = document.querySelector('#button-su')
var button_login = document.querySelector('#button-login')

button_register.addEventListener('click', (event) => {
  event.preventDefault()

  if(username.value.length > 3 && email.value.length > 3 && password.value.length > 3){
    localStorage.setItem('username', username.value)
    localStorage.setItem('email', email.value)
    localStorage.setItem('password', password.value)
    container.classList.remove('sign-up-mode')
  } else{
    alert('Algum dos Campos está vazio ou com menos de 3 caracteres!!!')
  }
})

button_login.addEventListener('click', (event) => {
  event.preventDefault()

  var usern = document.querySelector('#user-login')
  var passw = document.querySelector('#password-login')

  var storedUsername = localStorage.getItem('username')
  var storedPassword = localStorage.getItem('password')

  if(usern.value == storedUsername && passw.value == storedPassword) {
    alert('You are loged in')
    window.location.href = "index.html"
  } else{
    alert('ERROR.')
  }
})