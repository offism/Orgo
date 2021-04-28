const router = require('express').Router()
const users = require('../data')
const products = require('../allProduct')

let newProducts = require('../newProducts')
router.get('/' , (req,res) => {
	let selledProduct = req.cookies.selledProduction	
    let spanLength = selledProduct ? (JSON.parse(selledProduct)).length : 0

res.render('addProduct',{
	title:'Orgo - Production Add Mood',
	path:'/addproduct',
	users:users,
	products:products,
	spanLength:spanLength
})
})

router.post('/' , (req , res)=>{
   let {productSelect ,productName, productImgSrc , productCost , popular} = req.body
   let selledProduct = req.cookies.selledProduction	
    let spanLength = selledProduct ? (JSON.parse(selledProduct)).length : 0
 
   newProducts.push({
   		id: products[0].length + 1,
   		name:productName,
   		type:productSelect,
   		cost:JSON.parse(productCost),
   		src:productImgSrc,
   		popular: popular ? true : false
   	})
   newProducts = JSON.stringify(newProducts)
   res.cookie('newProducts' , newProducts)
   res.redirect('/newproducts')
})

module.exports = {
	path:'/addproduct',
    router: router
}