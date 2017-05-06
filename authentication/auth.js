function isAuthorized() {
  return ((req, res, next) => {
    if (req.headers.authorized !== 'true') {
      return res.json({ message: 'NOT AUTHORIZED' });
    }
    next();
  });
}
//test

module.exports = isAuthorized;
