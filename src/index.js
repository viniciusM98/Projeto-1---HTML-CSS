const  express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path')
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
/*
app.get('/', (req, res)=>{
    res.send('Ok');
});*/
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.get('/', (req, res) =>{
    res.render('index');
    //res.send('Ok');

})
require('./controllers/authController')(app);
app.listen(3000);