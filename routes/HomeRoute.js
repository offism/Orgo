const router = require('express').Router()
const products = require('../allProduct')
const {createProduct} = require('../models/cartModel')
const {findProducts} = require('../models/cartModel')  
const {findNewProducts} = require('../models/newProductModel')  
const {findUser} = require('../models/UserModel')  


let x = [] 
   for (let product of products) {
   for (let product1 of product) {
     if(product1.popular){
        x.push(product1)
}
}
}
x = x.sort()
let a = []
let b = []
let c = []
a.push(x.slice(0 , 8))
b.push(x.slice(8 , 16))
c.push(x.slice(16 , x.length))
let A 
for ( let ma of a) {
   A = ma 
}
let B 
for ( let ma of b) {
   B = ma 
}
let C 
for ( let ma of c) {
   C = ma
}

router.get('/' , async (req,res) => {
let products = await findProducts()
let spanLength = products.length
let newProducts = await findNewProducts()
let spanNewLength = newProducts.length
   let user = await findUser()

res.render('index',{
	title:'Orgo - Organic Fruit & Food Shop HTML Template',
	path:'/index',
	a:A,
	b:B,
	c:C,
  newProducts:newProducts,
  spanLength:spanLength,
  spanNewLength:spanNewLength,
  userNumber: user.length
})
})

router.post('/' ,async (req,res)=>{
    let {productID , productType} = req.body
for (let a1 of A) {
  if(productID == a1.id && productType == a1.type){
     await createProduct( a1.name, a1.cost, a1.src, a1.popular)
}
}
for (let b1 of B) {
  if(productID == b1.id && productType == b1.type){
     await createProduct( b1.name, b1.cost, b1.src, b1.popular)
}
}
for (let c1 of C) {
  if(productID == c1.id && productType == c1.type){
     await createProduct( c1.name, c1.cost, c1.src, c1.popular)
}
}   

    res.redirect('/index')

})


module.exports = {
	path:['/index' , '/'],
    router: router
}