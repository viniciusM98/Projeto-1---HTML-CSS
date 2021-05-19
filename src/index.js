const  express = require('express');
const app = express();
const path = require('path')

app.use(express.urlencoded({
    extended: false
  }));

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.get('/', (req, res) =>{
    res.render('home');
})

require('./controllers/authcontroller')(app);
app.listen(3000);