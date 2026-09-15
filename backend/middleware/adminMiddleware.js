// Middleware: restricts a route to admin users only.
// Must run after an auth middleware that sets req.user (e.g. `protect`)
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { admin };
