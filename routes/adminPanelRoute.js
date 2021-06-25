const router = require('express').Router()
const {findProducts} = require('../models/cartModel')    
const {findOrderProducts} = require('../models/orderProductModel')    
const {findUser} = require('../models/UserModel')    
const {findNewProducts} = require('../models/newProductModel')    
const {createOrderProduct} = require('../models/orderProductModel')  
const {deleteProductOne} = require('../models/cartModel')    



router.get('/' ,async (req,res) => {
    let products = await findNewProducts()
    let productsAll = await findProducts()
    let spanLength = productsAll.length
    let newProducts = await findOrderProducts()
    let spanNewLength = products.length
    let user = await findUser()
	try {
       if(user.length == 1){
         res.render('admin',{
         title:'Admin Panel',
         path:'/admin',
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

router.post('/' ,async (req , res)=>{
   let productsAll = await findProducts()
   for (let product of productsAll) {
   await createOrderProduct(product.name , product.cost , product.imgSrc , product.popular)
   let id = product._id
   await deleteProductOne({_id:id})
   }
   res.redirect('/cart')
})



module.exports = {
    path:'/admin',
    router:router
}

