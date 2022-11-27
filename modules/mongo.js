const mongoose = require("mongoose");

async function client() {
  return await mongoose.connect(
    "mongodb://127.0.0.1/orgo-mall",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
}

module.exports = { client };

