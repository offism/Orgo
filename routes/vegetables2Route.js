const router = require('express').Router()
const users = require('../data')
const products = require('../allProduct')

let x = [] 
   for (let product of products[1]) {
     if(product.id > 8){
        x.push(product) 
}
}

router.get('/' , (req,res) => {
	let selledProduct = req.cookies.selledProduction	
    let spanLength = selledProduct ? (JSON.parse(selledProduct)).length : 0

res.render('vegetables2',{
	title:'Orgo - Vegetables',
	path:'/vegetables2',
	users:users,
	products:x,
	spanLength:spanLength
})
})

module.exports = {
	path:'/vegetables2',
    router: router
}