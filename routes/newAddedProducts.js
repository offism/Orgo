const router = require('express').Router()
const users = require('../data')
    

router.get('/' , (req,res) => {
    let selledProduct = req.cookies.selledProduction	
    let spanLength = selledProduct ? (JSON.parse(selledProduct)).length : 0
   
    var allNewProduct = req.cookies.newProducts 

res.render('newAddedProducts',{
	title:'Orgo - New added products',
	path:'/newproducts',
	users:users,
	products: allNewProduct ? JSON.parse(allNewProduct) : undefined,
	spanLength:spanLength
})
})
module.exports = {
	path:'/newproducts',
    router: router
}