const mongoose = require('mongoose')

async function connect() {
  try {
    await mongoose
      .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log('DB Connected'))
  } catch (err) {
    console.log('db connection error')
    console.log(err)
  }
}

module.exports = { connect }
