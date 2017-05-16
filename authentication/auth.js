function isAuthorized() {
  return (req, res, next) => {
    if (req.isAuthenticated) {
      next();
    }
    return res.json({ message: 'NOT AUTHORIZED' });
  };
}

module.exports = isAuthorized;
