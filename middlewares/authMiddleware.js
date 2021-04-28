const users = require('../data')
const {checkToken} = require('../modules/jwt')

 async function middleware (req , res , next) {
	let token = req.cookies ? req.cookies.token : ""
     if(token){
     	let user = checkToken(token)
     	user = findUser(user.id)
        if(user){
        	req.user = {
        		id:user.id,
        		username:user.username,
        		password:user.password,
        		gender:user.gender
        	}
        }
     if(!req.user) {
     	res.redirect('/index')
     	return 0
     }

     }
     next()
}

module.exports = {
	middleware:middleware,
	forAll:false
}

function findUser(id){
	return users.find(user => user.id == id)
}