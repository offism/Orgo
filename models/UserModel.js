const {client} = require('../modules/mongo')
const Schema = require('mongoose').Schema
let  UserSchema = new Schema({
        	username:{
	        	type: String,
	        	unique:true,
	        	required:true
	        },
        	number:{
	        	type: Number,
	        	required:true
	        },
        	password: {
	        	type: String,
	        	required:true
	        },
        	gender:{
	        	type: String,
	        	required:true
	        }
})

async function UserModel () {
    let db =  await client()
    return await db.model('users' , UserSchema)
}

async function findUser () {
	let model = await UserModel()
    let user = await model.find()
    return user
}
async function createUser(username , number , password , gender){
	if(!(username && password)){
		throw ReferenceError (`User not found`)
	}


	let model = await UserModel()
    let data = await model.create({
    	username:username,
    	number:number,
    	password:password,
    	gender:gender
    })
    await data.save()
    return data
}

module.exports = {
   createUser, findUser
}