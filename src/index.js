const routes = require('./routers')
const ExpressServer = require('./express/server')

try {
  new ExpressServer({})
    .start()
    .asWebService()
    .addRoutes('v1', routes)
    .addResponseHandlerMiddleware()
    .stop()
} catch (err) {
  console.error(err)
  process.exit(err.code)
}
