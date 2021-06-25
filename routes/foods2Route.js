const router = require('express').Router()
const products = require('../allProduct')
const {createProduct} = require('../models/cartModel')
const {findProducts} = require('../models/cartModel')  
const {findNewProducts} = require('../models/newProductModel')  
const {findUser} = require('../models/UserModel')  

 let x = [] 
   for (let product of products[2]) {
     if(product.id > 8){
        x.push(product) 
}
}

router.get('/' ,async (req,res) => {
let products = await findProducts()
let spanLength = products.length
 let newProducts = await findNewProducts()
  let spanNewLength = newProducts.length
   let user = await findUser()

res.render('foods2',{
	title:'Orgo - Fast Foods',
	path:'/foods2',
	x:x,
  spanLength:spanLength,
  spanNewLength:spanNewLength,
  userNumber: user.length
})
})

router.post('/' ,async (req,res)=>{
    let {productID} = req.body
      for (let product of products[2]) {
     if(product.id == productID){
     await createProduct(product.name, product.cost, product.src, product.popular)  
}
}
    res.redirect('/foods2')
})

module.exports = {
	path:'/foods2',
    router: router
}