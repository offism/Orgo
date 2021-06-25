const router = require('express').Router()
const {findProducts} = require('../models/cartModel')    
const {deleteProductOne} = require('../models/cartModel')    
const {findNewProducts} = require('../models/newProductModel')    
const {findUser} = require('../models/UserModel')  

// let text
router.get('/' ,async (req,res) => {

try {
	let products = await findProducts()
  let spanLength = products.length
  let newProducts = await findNewProducts()
  let spanNewLength = newProducts.length
  let user = await findUser()
if(user.length == 1){
  // if(!(spanLength))  text =  `No yet New Product here now!`
    res.render('cart',{
	  title:'Orgo - Cart',
	  path:'/cart',
    // text:text,
    selledProduct: products,
    spanLength:spanLength, 
    spanNewLength:spanNewLength,
     userNumber: user.length 
})
} else throw `You haven't yet registered, you must be to register` 

   
} catch(e) {
    res.render('register',{
   	title:'Registration',
   	path:'/registration',
    error: e + ''
   })
}
})

router.post('/' ,async (req, res) => {
  let {deleteProduct} = req.body
  let products = await findProducts()
  for (let p of products) {
  if(deleteProduct == p.name){
    let id = p._id
    await deleteProductOne({_id:id})
  }
  }

  res.redirect('/cart')
})

 

module.exports = {
	path:'/cart',
    router: router
}