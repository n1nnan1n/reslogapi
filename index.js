const express = require('express')
const app = express()

//template
const ejs = require('ejs')

//mongodb
const mongoose = require('mongoose')

//user-session
const expressSession = require('express-session')

//collect error
const flash = require('connect-flash')

// MongoDB Connection
mongoose.connect('mongodb+srv://thanincwtnk:n1nnan1n@cluster0.od1mh68.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true
})
// mongoose.connect('mongodb://my-mongodb:27017/', {
//     useNewUrlParser: true
// })

global.loggedIn = null

// For Controllers
const indexController = require('./controllers/indexController')
const loginController = require('./controllers/loginController')
const registerController = require('./controllers/registerController')
const storeUserController = require('./controllers/storeUserController')
const loginUserController = require('./controllers/loginUserController')
const logoutController = require('./controllers/logoutController')
const homeController = require('./controllers/homeController')
const editController = require('./controllers/editController')
const edituserController = require('./controllers/edituserController')
const deleteController = require('./controllers/deleteController')
const deleteuserController = require('./controllers/deleteuserController')
// Middleware
const redirectIfAuth = require('./middleware/redirectIfAuth')
const authMiddleware = require('./middleware/authMiddleware')

//css
app.use(express.static('public'))

//for json
app.use(express.json())
app.use(express.urlencoded())
app.use(flash())
app.use(expressSession({
    secret: "node secret"
}))
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    next()
})
//set view engine(ejs)
app.set('view engine', 'ejs')

//to run page
app.get('/', indexController)
app.get('/home', authMiddleware, homeController)
app.get('/editprofile', authMiddleware, editController)
app.get('/deleteaccount', authMiddleware, deleteController)
app.post('/user/deleteaccount', authMiddleware, deleteuserController.deleteAccount);
app.get('/login', redirectIfAuth, loginController)
app.get('/register', redirectIfAuth, registerController)
app.post('/user/editprofile', authMiddleware, edituserController.editPassword)
app.post('/user/register', redirectIfAuth, storeUserController)
app.post('/user/login', redirectIfAuth, loginUserController)
app.get('/logout', logoutController)
  

//set port
app.listen(4000, () => {
    console.log("App listening on port 4000")
})