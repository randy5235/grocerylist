function isAuthorized() {
  return (req, res, next) => {
    console.log(req.headers);
    if (req.headers.authorized == 'true') {
      console.log('GOTHERE');
      next();
    } else {
      return res.json({ message: 'NOT AUTHORIZED' });
    }
  };
}

module.exports = isAuthorized;
