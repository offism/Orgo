const mongoose = require('mongoose')

async function client () {
    return await mongoose.connect('mongodb+srv://offism:sma01022002@cluster0.hnbti.mongodb.net/orgo?authSource=admin&replicaSet=atlas-nk6xyl-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
}

module.exports = {client}