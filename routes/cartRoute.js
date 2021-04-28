const router = require('express').Router()
const users = require('../data')
const {checkToken } = require('../modules/jwt')
	
router.get('/' , (req,res) => {
try {
let selledProduct = req.cookies.selledProduction
let totalCost = req.cookies.totalCost
if(selledProduct.length > 0){
let spanLength = selledProduct ? (JSON.parse(selledProduct)).length : 0
let token = req.cookies.token

if(token){
res.render('cart',{
	title:'Orgo - Cart',
	path:'/cart',
	users:users,
	spanLength:spanLength,
	totalCost:totalCost,
    selledProduct: JSON.parse(req.cookies.selledProduction) 
})
} else throw `You haven't yet registered, you must be to register` 
   
} else { 
    alert(`You can not visit this page if you shouldn't sell product`)
	throw `oops`
}
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
	path:'/cart',
    router: router
}