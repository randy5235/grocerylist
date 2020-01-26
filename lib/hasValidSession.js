const hasValidSession = (req, res, next) => {
  console.log(req.user);
  if (req.user) {
    next();
  } else {
    res.json({ error: "Please log in first." });
  }
};

module.exports = hasValidSession;
