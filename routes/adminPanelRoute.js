const router = require('express').Router()
const users = require('../data')
const {checkToken } = require('../modules/jwt')
let userName
for (let user of users) {
     userName = user.username
}
router.get('/' , (req,res) => {
	try {
		

let selledProduct = req.cookies.selledProduction	
let spanLength = selledProduct ? (JSON.parse(selledProduct)).length : 0
let token = req.cookies.token
if(token){
res.render('admin',{
    title:'Admin Panel',
    path:'/admin',
    username:userName,
    users:users,
    spanLength:spanLength,
    selledProduct: selledProduct ? JSON.parse(selledProduct) : '' 
})
	}
	 else throw `You haven't yet registered, you must be to register` 
	} catch(e) {
    let selledProduct = req.cookies.selledProduction	
	let spanLength = selledProduct ? (JSON.parse(selledProduct)).length : 0
	res.render('register',{
   	title:'Registration',
   	path:'/registration',
    spanLength:spanLength,
    error: e + ''
   })
} 
})


module.exports = {
    path:'/admin',
    router:router
}

