const {client} = require('../modules/mongo')
const Schema = require('mongoose').Schema
let  UserSchema = new Schema({
        	id:{
	        	type: Number
	        },
        	name:{
	        	type: String,
	        },
        	cost: {
	        	type: Number,
	        },
        	imgSrc:{
	        	type: String,
	        },
	        popular:{
	        	type: String,
	        }
})

async function ProductModel () {
    let db =  await client()
    return await db.model('addedProducts' , UserSchema)
}

async function findProducts () {
	let model = await ProductModel()
    let product = await model.find()
    return product
}
async function deleteProductOne(data){
    let model =await ProductModel()
    let deleted = await model.deleteOne(data)
}
async function createProduct(name , cost , imgSrc, popular){
	
	let model = await ProductModel()
    let products = await findProducts()

    let data = await model.create({
    	id:products.length + 1,
    	name:name,
    	cost:cost,
    	imgSrc:imgSrc,
    	popular:popular
    })
    console.log(data);
    await data.save()
    return data
}

module.exports = {
   createProduct, findProducts , deleteProductOne
}