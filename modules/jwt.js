let JWT = 	require('jsonwebtoken')

const SECRED_WORD = process.env.SECRED_WORD

function generateToken(data){
   let token = JWT.sign(data , SECRED_WORD)
   return token
}

function checkToken(token){
	try {
		let data = jwt.verify(token , SECRED_WORD)	
	return data
	} catch(e) {
       return false
	}
}

module.exports = {
	generateToken , checkToken
}