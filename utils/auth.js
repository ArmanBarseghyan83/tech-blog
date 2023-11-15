const withAuth = (req, res, next) => {
  if (!req.session.currentUser.loggedIn) return res.redirect('/login'); 
  next()
};

module.exports = withAuth;
