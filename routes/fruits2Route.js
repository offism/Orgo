const router = require('express').Router()
const products = require('../allProduct')
const {createProduct} = require('../models/cartModel')
const {findProducts} = require('../models/cartModel')  
const {findNewProducts} = require('../models/newProductModel')  
const {findUser} = require('../models/UserModel')  

let x = [] 
   for (let product of products[0]) {
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

res.render('fruits2',{
	title:'Orgo - Fruit',
	path:'/fruits2',
	products:x,
  spanLength:spanLength,
  spanNewLength:spanNewLength,
  userNumber: user.length
})
})

router.post('/' ,async (req,res)=>{
    let {productID} = req.body
      for (let product of products[0]) {
     if(product.id == productID){
     await createProduct( product.name, product.cost, product.src, product.popular)  
}
}
    res.redirect('/fruits2')
})

module.exports = {
	path:'/fruits2',
    router: router
}