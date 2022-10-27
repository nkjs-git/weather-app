const express = require('express')
const bodyParser = require('body-parser')
const Middleware = require('../middleware')
const compression = require('compression')
const morgan = require('morgan')
const cors = require('cors')
const responseTime = require('response-time')
const helmet = require('helmet')

const DEFAULT_SERVER_CONFIGURATION = {
  port: 8080,
  adminPort: 8081
}

class ExpressServer {
  constructor (opts) {
    this.instance = express()
  }

  start () {
    this.instance.listen(8080)
    this.instance.set('etag', false)
    this.instance.set('x-powered-by', false)
    return this
  }

  addRoutes (version, routers, params) {
    Object.keys(routers).forEach(name => {
      const route = `/${version}/${name}`
      console.log(`Registering router [${name}] at ${route}...`)
      if (params) {
        this.addRoute(route, routers[name].bind(null, params))
      } else {
        this.addRoute(route, routers[name])
      }
    })
    return this
  }

  addRoute (prefix, routeConfig) {
    this.instance.use(
      prefix,
      // Pass in router instance to segregate the routing by prefix
      // Add in child server logger with reference to the route
      routeConfig({
        router: express.Router(),
        promClient: this.promClient
      })
    )
    return this
  }

  asWebService (configuration = {}) {
    const { limit = '1mb' } = configuration

    this.instance.use(compression())
    this.instance.use(cors())
    this.instance.use(bodyParser.urlencoded({ limit, extended: true }))
    this.instance.use(bodyParser.json({ limit, type: ['application/json', 'application/*+json'] }))
    this.instance.use(morgan('combined', { immediate: true }))
    this.instance.use(responseTime())
    this.instance.use(helmet())

    // if (this.hasAdminPort()) {
    //   this.adminInstance.use(helmet())
    //   this.adminInstance.use(helmet.noCache({ noEtag: true }))
    // }

    // Establish router instance
    this.router = express.Router()
    return this
  }

  addResponseHandlerMiddleware () {
    console.log('inside response header')
    this.instance.use(Middleware.responseHandler.bind(this))
    return this
  }

  stop (callback) {
    return this
  };
}

module.exports = ExpressServer
