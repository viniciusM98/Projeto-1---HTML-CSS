const express = require('express');
const router = express.Router();

router.get('/logou',(req, res) =>{
    res.send({ok: true});
})

module.exports = app =>  app.use('/projects', router);