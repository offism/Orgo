const router = require('express').Router()
const users = require('../data')
const products = require('../allProduct')
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
router.get('/' , (req,res) => {
let selledProduct = req.cookies.selledProduction	
let spanLength = selledProduct ? (JSON.parse(selledProduct)).length : 0
res.render('index',{
	title:'Orgo - Organic Fruit & Food Shop HTML Template',
	path:'/index',
	users:users,
	a:A,
	b:B,
	c:C,
	spanLength:spanLength
})
})
// console.log(users);
module.exports = {
	path:'/index',
    router: router
}