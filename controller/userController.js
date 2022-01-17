const express = require('express');
const router = express.Router()

router.get('/usuario/cadastrar', (req, res) =>{
    res.render("./views/users/cadastrar")
})

module.exports = router;