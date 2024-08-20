const authorize = (roles = []) => {
    // Eğer tek bir rol verildiyse, bunu diziye çevir
    if (typeof roles === 'string') {
      roles = [roles];
    }
  
    return (req, res, next) => {
      // Kullanıcı rolü bu rollerden birine sahip değilse
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
      next();  // Sonraki middleware'e geç
    };
  };
  
  module.exports = authorize;
  