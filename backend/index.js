const express = require('express')
const app = express()   
const dotenv = require('dotenv') 
const cors = require('cors')  
const cookieParser = require('cookie-parser')
const databaseConnection = require('./src/config/db.js')    
const userRoute = require('./src/routes/userRoute.js')  
const authorRoute = require('./src/routes/authorRoute.js')
const articleRoute = require('./src/routes/articleRoute.js') 
//const apiNewsRoute = require('./src/routes/apiNewsRoutes.js') 
  
//const session = require('express-session')             
// app.use(session({
//     secret: 'AbortController',  
//     resave: false,      
//     saveUninitialized: false,  
//     cookie: { secure: false }  
// }));
dotenv.config({ path: '.env' })
databaseConnection();  
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions))
app.use(cookieParser())
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} request to ${req.url}`);
    next(); 
});
//middlewares
app.use('/public', express.static('public'));  // This sets a virtual path prefix (/public) for serving static files.
app.use(express.static('public'))  //  Files are accessible directly without a prefix.
app.use(express.static('/public'))  //   trying to serve an absolute path ,  a folder in the absolute system root

app.use(express.urlencoded({ extended: true }))   
app.use(express.json())
  
//api
app.use('/api/v1/user', userRoute);
app.use('/api/v1/author', authorRoute)
app.use('/api/v1/article', articleRoute);
// app.use('/api/v1/news', apiNewsRoute)
// app.use(express.static('./public')) 
// app.use(express.static('./public/reader'))
// app.use(express.static('./public/writer'))
// app.use(express.static('./public/image'))

app.get('/home', (req, res) => {
    res.status(200).json({ message: "we are on home page of Pulse Point..", status: true })
})

app.listen(process.env.PORT_NO, (err) => {
    if (err) console.log(err)
    else console.log("server is listening at port no 3000.....")
})