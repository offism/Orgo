const router = require('express').Router()
const products = require('../allProduct')
const {createProduct} = require('../models/cartModel')
const {findProducts} = require('../models/cartModel')  
const {findUser} = require('../models/UserModel')  
const {findNewProducts} = require('../models/newProductModel')  

let x = [] 
   for (let product of products[0]) {
     if(product.id < 9){
        x.push(product) 
}
}
router.get('/' ,async (req,res) => {
let products = await findProducts()
let spanLength = products.length
 let newProducts = await findNewProducts()
  let spanNewLength = newProducts.length
   let user = await findUser()

res.render('fruits',{
	title:'Orgo - Fruit',
	path:'/fruits',
	products:x,
  spanLength:spanLength,
  spanNewLength:spanNewLength,
  userNumber:user.length
})
})

router.post('/' ,async (req,res)=>{
    let {productID} = req.body
      for (let product of products[0]) {
     if(product.id == productID){
     await createProduct( product.name, product.cost, product.src, product.popular)  
}
}
    res.redirect('/fruits')
})

module.exports = {
	path:'/fruits',
    router: router
}