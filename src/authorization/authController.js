import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './userModel.js';

const signup = async (username, password, role) => {
  try {
    // Check if the user already exists 
    const userExists = await User.findOne({ username });
    if (userExists) {
      throw new Error('User already exists');
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    return {
      message: `${role} created successfully`, // Return the success message
    };
  } catch (error) {
    throw new Error('Error creating user: ' + error.message); // Handle any errors
  }
};



const login = async (email, password) => {
  try {
    const user = await User.findOne({ username: email });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }  // Set token expiration time (1 hour)
    );

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role
      }
    };
  } catch (error) {
    throw new Error('Error logging in: ' + error.message);
  }

};

export { signup, login };
