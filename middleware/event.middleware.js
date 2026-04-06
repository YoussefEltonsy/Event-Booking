import User from '../modules/user/user.model'


const isAdmin = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                msg: 'Unauthorized: no user found'
            })
        }

        if (!req.user.role) {
            return res.status(403).json({
                success: false,
                msg: 'Forbidden, no role assigned'
            })
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                msg: 'NOT ALLOWED, Admins access only'
            })
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Server error in isAdmin',
            error: error.msg
        })
    }
}

export default isAdmin