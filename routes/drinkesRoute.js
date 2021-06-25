const router = require('express').Router()
const {createProduct} = require('../models/cartModel')
const productsAll = require('../allProduct') 
const {findProducts} = require('../models/cartModel')  
const {findNewProducts} = require('../models/newProductModel')  
const {findUser} = require('../models/UserModel')  

router.get('/' ,async (req,res) => {
let products = await findProducts()
let spanLength = products.length
 let newProducts = await findNewProducts()
let spanNewLength = newProducts.length
   let user = await findUser()

res.render('drinkes',{
	title:'Orgo - Drinkes',
	path:'/drinkes',
	products:productsAll,
    spanLength:spanLength,
    spanNewLength:spanNewLength,
    userNumber: user.length
})
})

router.post('/' ,async (req,res)=>{
    let {productID} = req.body
    let products = require('../allProduct')
    for (let product of products[3]) {
    if(product.id == productID){
    await createProduct( product.name, product.cost, product.src, product.popular)  
}
}
    res.redirect('/drinkes')
})

module.exports = {
	path:'/drinkes',
    router: router
}