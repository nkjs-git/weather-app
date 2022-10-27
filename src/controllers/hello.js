const { HelloService } = require('../services')

async function get (req, res) {
  const data = await HelloService.sayHello()
  req.responseObject = { data }
  console.log('data: ', data)
}

module.exports = {
  get
}
