const router = require('express').Router()
const products = require('../allProduct')
const {findProducts} = require('../models/cartModel')  
const {findNewProducts} = require('../models/newProductModel')  
const {findUser} = require('../models/UserModel')  

router.get('/' ,async (req,res) => {
let products = await findProducts()
let spanLength = products.length
 let newProducts = await findNewProducts()
  let spanNewLength = newProducts.length
   let user = await findUser()

res.render('contact',{
	title:'Orgo - Contact',
	path:'/contact',
	spanLength:spanLength,
	spanNewLength:spanNewLength,
	userNumber: user.length
})
})

module.exports = {
	path:'/contact',
    router: router
}