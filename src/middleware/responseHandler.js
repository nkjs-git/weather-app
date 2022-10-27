module.exports = (req, res, next) => {
  // console.log({req})
  if (Object.keys(req.responseObject).length > 0) {
    const {code, success,data={}, ...rest} = req.responseObject
    // let { paging } = req
    // if (paging) {
    //   paging = buildPagingInfo(paging)
    // }
    if(success === true){
      res.status(code).send({
        data,
        success,
        ...rest
      })
    }else{
      res.status(code).send({
        success,
        ...rest
      })
   }
    // logger.info({ res })
  }
  next()
}
