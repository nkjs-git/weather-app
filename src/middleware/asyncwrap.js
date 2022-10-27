module.exports = fn => (req, res, next) => {
  // Make sure to `.catch()` any errors and pass them along to the `next()` middleware in the chain
  // If actual route handlers are wrapped using this, they don't need to catch errors and call `next(err)`.
  Promise.resolve(fn(req, res))
    .then(next)
    .catch(next)
}
