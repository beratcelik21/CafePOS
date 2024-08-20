const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Authorization header'dan token'ı al
  const token = req.header('Authorization').replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  try {
    // Token'ı doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // decoded içindeki kullanıcı bilgilerini req.user'a ata
    next();  // Sonraki middleware'e geç
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
