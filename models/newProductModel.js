const {client} = require('../modules/mongo')
const Schema = require('mongoose').Schema
let  UserSchema = new Schema({
        	id:{
	        	type: Number
	        },
        	name:{
	        	type: String,
	        },
            type:{
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

async function newProductModel () {
    let db =  await client()
    return await db.model('createdNewProducts' , UserSchema)
}

async function findNewProducts () {
	let model = await newProductModel()
    let product = await model.find()
    return product
}
async function createNewProduct(name ,type , cost , imgSrc, popular){
	
	let model = await newProductModel()
    let products = await findNewProducts()

    let data = await model.create({
    	id:products.length + 1,
        type:type,
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
   createNewProduct, findNewProducts
}