const router = require('express').Router()
const users = require('../data')
const {generateHash } = require('../modules/crypt')
const {v4: uuidv4} = require('uuid')
const {createUser} = require('../models/UserModel')
router.get('/' ,(req,res)=> {
  let selledProduct = req.cookies.selledProduction 
  let spanLength = selledProduct ? (JSON.parse(selledProduct)).length : 0

   res.render('register',{
   	title:'Registration',
   	path:'/registration',
    spanLength:spanLength
   })
})

router.post('/' ,async (req , res) => {
	try {
		let {username , number , password , gender} = req.body
		if(!(username && number && password && gender)) throw `Fields aren't completed`
        if(findUser(username)) throw `Username  is already taken`
        username = String(username)
        username = username.toLowerCase()
        var a = users ? users.length : 0
        // await createUser(username , number , password , gender)
    if(a == 0){
        users.push({
            id: uuidv4(),
        	  username:username,
        	  number:number,
        	  password: await generateHash(password),
        	  gender:gender
        })
    } else{ 
      throw `You have already registered this web site!`
      res.resdirect('/index')
    }
    // console.log(users);
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

function findUser(username){
	return users.find(user => user.username == username)
}