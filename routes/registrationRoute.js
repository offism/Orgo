const router = require('express').Router()
const Joi = require('joi')
const {generateHash } = require('../modules/crypt')
const {v4: uuidv4} = require('uuid')
const {createUser} = require('../models/UserModel')
const {findProducts} = require('../models/cartModel')    
const {findNewProducts} = require('../models/newProductModel')    
const {findUser} = require('../models/UserModel')    

const RegistrationValidation = new Joi.object({
  number: Joi.number()
  .min(10000)
  .max(999999999999)
  .error(new Error ('Phone number is incorrect'))
  .required(),
  username: Joi.string()
  .alphanum()
  .min(6)
  .max(16)
  .error(new Error ('Username is incorrect'))
  .required(),
  password: Joi.string()
  .min(6)
  .max(32)
  .error(new Error ('Password is incorrect'))
  .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  .required(),
  gender: Joi.string()
})

router.get('/' ,async (req,res)=> {
  let products = await findProducts()
let spanLength = products.length
 let newProducts = await findNewProducts()
  let spanNewLength = newProducts.length
   let user = await findUser()

   res.render('register',{
   	title:'Registration',
   	path:'/registration',
    spanLength:spanLength,
    spanNewLength:spanNewLength,
    userNumber: user.length
   })
})

router.post('/' ,async (req , res) => {
	try {
		    const {username , number , password , gender} = await RegistrationValidation.validateAsync(req.body)
        if(!(username && password)) throw `Username or Password not found`
        let passwordGen = await generateHash(password)
        let user = await createUser(username , number , passwordGen , gender)
        res.redirect('/login')

	} catch(e) {
		res.render('register' , {
			title:'Registration',
			path:'/registration',
      error:e + ''
		})
	}
})

module.exports = {
	path:'/registration',
    router: router
}

