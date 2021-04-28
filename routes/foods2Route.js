const router = require('express').Router()
const users = require('../data')
const products = require('../allProduct')

 let x = [] 
   for (let product of products[2]) {
     if(product.id > 8){
        x.push(product) 
}
}
router.get('/' , (req,res) => {
	let selledProduct = req.cookies.selledProduction	
    let spanLength = selledProduct ? (JSON.parse(selledProduct)).length : 0

res.render('foods2',{
	title:'Orgo - Fast Foods',
	path:'/foods2',
	users:users,
	x:x,
	spanLength:spanLength
})
})

module.exports = {
	path:'/foods2',
    router: router
}