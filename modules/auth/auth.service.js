import bcrypt from 'bcrypt'
import User from'../user/user.model.js'
import generateToken from '../../utils/jwt.js'
import asyncHandler from "express-async-handler";


//@desc    register user
export const register = async ({name,email,password}) =>{
    const existingUser = await User.findOne({email});
    if(existingUser){
        throw new Error('Email already exists');
    }

    const user = await User.create({
        name,email,password
    })

    const token = generateToken({
        id: user._id,
        role: user.role
    })
    
    return {user, token}
  
}

// @desc   login user
export const login = async ({ email, password }) => {
    const user = await User.findOne({ email }).select('+password');
  
    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid credentials');
    }
  
    const token = generateToken({
      id: user._id,
      role: user.role,
    });
  
    return { user, token };
  };

// @desc    Get current user
export const getMe = async (userId) => {
    const user = await User.findById(userId).select('-password');
  
    if (!user) {
      throw new Error('User not found');
    }
  
    return user;
  };

// @desc    Logout user
export const logout = async () => {
    // No DB operation needed for basic JWT logout
    return true;
  };