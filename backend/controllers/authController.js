const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { assets } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { assets } },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all fields' })
    }
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({
      name,
      email,
      password: hashedPassword
    })
    const savedUser = await user.save()
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.status(201).json({ 
      token,
      user: { id: savedUser._id, name: savedUser.name, email: savedUser.email } 
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' })
    }
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' })
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.json({ 
      token, 
      user: { id: user._id, name: user.name, email: user.email } 
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}