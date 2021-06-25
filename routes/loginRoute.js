const router = require('express').Router()
const { confirmHash} = require('../modules/crypt')
const {findUser} = require('../models/UserModel')
const {generateToken } = require('../modules/jwt')
const {findProducts} = require('../models/cartModel')  
const {findNewProducts} = require('../models/newProductModel')  

router.get('/' ,async (req,res)=> {
 let products = await findProducts()
let spanLength = products.length
 let newProducts = await findNewProducts()
  let spanNewLength = newProducts.length
   let user = await findUser()

   res.render('login',{
   	title: 'Login',
   	path: '/login',
   	error: '',
    spanLength:spanLength,
    spanNewLength:spanNewLength,
    userNumber:user.length
   })
})

router.post('/' ,async (req , res)=>{
  try {
  	let {username , password} = req.body 
    if(!(username && password)) throw `Username is not defined`
    let users = await findUser({username})
    users.forEach( async (user) => {
    if(!user) throw `User not found`
    let isTrue = await confirmHash(password, user.password)
    if(!isTrue)	 throw `Password is incorrect`
      
    let token = await generateToken({id: user.id})
    res
       .cookie('token' , token)
       .redirect('/index')

    })
  	} catch(e) {res.render('login',{
   	title: 'Login',
   	path: '/login',
   	error: e + ''
   })
  }
})


module.exports = {
	path:'/login',
    router: router
}
