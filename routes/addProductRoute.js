const router = require('express').Router()
const {findProducts} = require('../models/cartModel')  
const {findNewProducts} = require('../models/newProductModel')  
const {createNewProduct} = require('../models/newProductModel')  
const {findUser} = require('../models/UserModel')  

router.get('/' , async (req,res) => {
	let products = await findProducts()
  let spanLength = products.length
  let newProducts = await findNewProducts()
  let spanNewLength = newProducts.length
     let user = await findUser()

try {
       if(user.length == 1){
         res.render('addProduct',{
         title:'Orgo - Added Product Mood',
         path:'/addproduct',
         user:user,
         findNewProducts:newProducts,
         spanLength:spanLength,
         spanNewLength:spanNewLength,
         userNumber: user.length
})
  }
   else throw `You haven't yet registered, you must be to register` 
  } catch(e) {
    res.render('register',{
    title:'Registration',
    path:'/registration',
    spanLength:spanLength,
    error: e + ''
   })
} 
})

router.post('/' , async (req,res) => {
  let {productSelect , productName , productImgSrc ,productCost , popular} = req.body
  await createNewProduct(productName , productSelect , productCost , productImgSrc , popular)
  res.redirect('/addproduct')
})


module.exports = {
	path:'/addproduct',
    router: router
}