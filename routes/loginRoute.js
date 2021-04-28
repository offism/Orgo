const router = require('express').Router()
const users = require('../data')
const { confirmHash} = require('../modules/crypt')
const {generateToken } = require('../modules/jwt')
router.get('/' ,(req,res)=> {
  let selledProduct = req.cookies.selledProduction  
  let spanLength = selledProduct ? (JSON.parse(selledProduct)).length : 0

   res.render('login',{
   	users:users,
   	title: 'Login',
   	path: '/login',
    spanLength:spanLength,
   	error: ''
   })
})

router.post('/' ,async (req , res)=>{
  try {
  	let {username , password} = req.body 
    if(!(username && password)) throw `Username is not defined`
    let user = findUser(username)
    if(!user) throw `User not found`
    let isTrue = await confirmHash(password, user.password)
    if(!isTrue)	 throw `Password is incorrect`
      
    let token = await generateToken({id: user.id})
    res  
       .cookie('token' , token)
       .redirect('/index')

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

function findUser(username){
	return users.find(user => user.username == username)
}