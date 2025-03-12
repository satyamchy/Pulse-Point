const express = require('express')
const router = express.Router()
const {Register, Login, getAuthorProfile, Logout} = require('../controllers/authorController.js')
const isAuthenticated = require('../config/auth.js');
// const { editArticle } = require('../controllers/articleController')

router.route('/register').post(Register)
router.route('/login').post(Login)
router.route('/logout').get(Logout)
router.route('/profile/:id').get(getAuthorProfile)

// router.route('/articles/:id').get(myArticles)
// router.route('/editArticle/:id').put(editArticle)
// router.route('/edit/:id').post(howtoverity, editAuthor)

module.exports =  router;