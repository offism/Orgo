const Express = require('express')
const Fs = require('fs')
const Path = require('path')
const app = Express()
//environments
require('dotenv').config({path: Path.join(__dirname,'.env')})
const PORT = process.env.PORT


// listen
app.listen(PORT , _=>{ console.log(`server is working in ${PORT}`)})

const cookieParser = require('cookie-parser')

let middlewaresPath = Path.join(__dirname , 'middlewares')
Fs.readdir(middlewaresPath , (err , files)=>{
	files.forEach(files => {
		let filesPath = Path.join(middlewaresPath , files)
        let Middleware = require(filesPath)
        if(Middleware.middleware && Middleware.forAll) app.use(Middleware.middleware) 
	})
})

//middleswares
app.use(Express.json())
app.use(Express.urlencoded({extended:true}))
app.use('/public' , Express.static('public'))
app.use(cookieParser())
//settings
app.set('view engine' , 'ejs')
//routes
let routesPath = Path.join(__dirname , 'routes')
Fs.readdir(routesPath , (err , files)=>{
	files.forEach(files => {
		let filesPath = Path.join(routesPath , files)
        let Route = require(filesPath)
        if(Route.path && Route.router) app.use(Route.path, Route.router) 
	})
})