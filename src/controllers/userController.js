import User from '../models/userModel.js';
// import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = new User({ email, password });
    await newUser.save();
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

const loginUser = async (req, res) => {

    if (!req.body) {
    return res.status(400).json({ message: 'Missing request body' });
  }
  
    console.log('Incoming request body:', req.body);
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
        if (!user || !password ) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
      const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        
        const token = jwt.sign({UserId : user._id}, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

export {registerUser, loginUser};
      