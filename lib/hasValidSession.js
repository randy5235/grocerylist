const hasValidSession = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(403);
    res.json({ error: 'Please log in first.' });
  }
};

module.exports = hasValidSession;
