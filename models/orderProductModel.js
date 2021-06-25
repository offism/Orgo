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

async function orderProductModel () {
    let db =  await client()
    return await db.model('orderedProducts' , UserSchema)
}

async function findOrderProducts () {
	let model = await orderProductModel()
    let product = await model.find()
    return product
}
async function deleteOrderProductOne(data){
    let model =await orderProductModel()
    await model.deleteOne(data)
}
async function createOrderProduct(name , cost , imgSrc, popular){
	
	let model = await orderProductModel()
    let products = await findOrderProducts()

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
   createOrderProduct, findOrderProducts , deleteOrderProductOne
}