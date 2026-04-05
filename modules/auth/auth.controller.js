import * as authService from './auth.service.js'
import asyncHandler from 'express-async-handler'
const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
    maxAge: 30*24*60*60*1000 //30 days

}

//@desc   Register
 const register = asyncHandler(async (req,res)=>{
    const{user,token} = await authService.register(req.body);

    res.cookie('jwt',token,cookieOptions);
    
    res.status(201).json({
        msg: 'User registed successfully',
        user
    })

})

//@desc  Login
 const login = asyncHandler(async(req,res)=>{
    const{user,token} = await authService.login(req.body);

    res.cookie('jwt',token,cookieOptions);

    res.json({
        msg: 'user logged in',
        user
    })
})


// @desc    Get current user
 const getMe = async (req, res) => {
  
    const user = await authService.getMe(req.user._id);
  
    res.json(user);
};
  
// @desc    Logout
 const logout = async (req, res) => {
    await authService.logout();
  
    res.cookie('jwt', '', {
      ...cookieOptions,
      maxAge: 0, // clears cookie
    });
  
    res.json({
      message: 'Logged out successfully',
    });
  };

  export {
    register,
    login,
    logout,
    getMe
}