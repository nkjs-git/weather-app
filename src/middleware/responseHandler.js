module.exports = (req, res, next) => {
  // console.log({req})
  if (Object.keys(req.responseObject).length > 0) {
    const { code, data, extras } = req.responseObject

    // let { paging } = req
    // if (paging) {
    //   paging = buildPagingInfo(paging)
    // }
    res.status(code).send({
      ...extras,
      success: true,
      data
    })
    // logger.info({ res })
  }
  next()
}
