var username = document.querySelector('#username-su')
var email = document.querySelector('#email-su')
var password = document.querySelector('#password-su')
var button_register = document.querySelector('#button-su')
var button_login = document.querySelector('#button-login')

button_register.addEventListener('click', () => {
  localStorage.setItem('username', username.value)
  localStorage.setItem('email', email.value)
  localStorage.setItem('password', password.value)
})

button_login.addEventListener('click', (event) => {
  event.preventDefault()

  var usern = document.querySelector('#user-login')
  var passw = document.querySelector('#password-login')

  var storedUsername = localStorage.getItem('username')
  var storedPassword = localStorage.getItem('password')

  console.log(typeof(usern.value))
  console.log(passw.value)
  console.log(storedUsername)
  console.log(storedPassword)

  if(usern.value == storedUsername && passw.value == storedPassword) {
    alert('You are loged in')
    window.location.href = "../../index.html"
  } else{
    alert('ERROR.')
  }
})