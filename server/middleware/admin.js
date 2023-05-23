const isAdmin = () => {
  return (req, res, next) => {
    if (req.user.role === 'admin') {
      return next()
    } else {
      return res.status(401).json({
        message: 'You are not admin to access this route'
      })
    }
  }
}

module.exports = { isAdmin }
