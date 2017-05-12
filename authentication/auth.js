function isAuthorized() {
  return (req, res, next) => {
    if (req.headers.authorized == 'true') {
      next();
    } else {
      return res.json({ message: 'NOT AUTHORIZED' });
    }
  };
}

module.exports = isAuthorized;
