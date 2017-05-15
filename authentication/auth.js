function isAuthorized() {
  return (req, res, next) => {
    if (req.isAuthenticate) {
      next();
    }
    return res.json({ message: 'NOT AUTHORIZED' });
  };
}

module.exports = isAuthorized;
