const access = (...permiedRoles) => {
    return (req, res, next) => {
      if (permiedRoles.includes(req.user.role)) {
        next();
      }
    };
  };
  
  module.exports = {
    access,
  };
  