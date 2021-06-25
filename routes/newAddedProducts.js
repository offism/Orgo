const router = require('express').Router()
const {findProducts} = require('../models/cartModel')    
const {findNewProducts} = require('../models/newProductModel')    
const {findUser} = require('../models/UserModel')    

router.get('/' , async (req,res) => {
let productsOld = await findProducts()
let spanLength = productsOld.length
let newProducts = await findNewProducts()   
let spanNewLength = newProducts.length
   let user = await findUser()

try {
if(!(newProducts.length)) throw `No yet New Product here now!`

res.render('newAddedProducts',{
	title:'Orgo - New added products',
	path:'/newproducts',
	products: newProducts,
	spanLength:spanLength,
	spanNewLength:spanNewLength,
	userNumber:user.length
})
} catch(e) {
	res.render('newAddedProducts',{
	title:'Orgo - New added products',
	path:'/newproducts',
	error: e + "",
	spanLength:spanLength
})
}
})


module.exports = {
	path:'/newproducts',
    router: router
}