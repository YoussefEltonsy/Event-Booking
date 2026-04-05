import User from '../user/user.model.js';
import { verifyToken } from '../../utils/jwt.js';

// @desc Protect routes
const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    //verify using utils
    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        message: 'Not authorized, user not found',
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Not authorized, token failed',
    });
  }
};

export default protect;