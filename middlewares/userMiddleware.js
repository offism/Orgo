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
     }
     next()
}

module.exports = {
	middleware:middleware,
    forAll: true
}

function findUser(id){
	return users.find(user => user.id == id)
}