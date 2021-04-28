const router = require('express').Router()
const users = require('../data')
const products = require('../allProduct')

router.get('/' , (req,res) => {
	let selledProduct = req.cookies.selledProduction	
    let spanLength = selledProduct ? (JSON.parse(selledProduct)).length : 0

res.render('contact',{
	title:'Orgo - Contact',
	path:'/contact',
	users:users,
	products:products,
	spanLength:spanLength
})
})

module.exports = {
	path:'/contact',
    router: router
}