const express = require('express')

const { searchMovies, filterItems, showMovies, searchMovieById } = require('../controller/movieController')
const { validateToken } = require('../service/jwt')
const { handleSignup, handleLogin } = require('../controller/userController')

const router = express.Router()


router.get('/',(req,res)=>{
    res.send("hello from server")

})

//user routes

router.get('/login',validateToken,(req,res)=>{

})

router.post('/signup',handleSignup)
router.post('/login',handleLogin)


//movie routes

router.get('/movies', showMovies)
router.get('/search',searchMovies)
router.get('/movies/:id',searchMovieById)
router.get('/filter',filterItems)


router.get('/items/filter',(req,res)=>{

})

module.exports = router


