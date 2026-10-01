import mongoose from 'mongoose';
import { store } from '../data/store.js';
import { User } from '../models/User.js';
import { hashPassword, comparePassword, generateToken } from '../utils/authUtils.js';

const isMongoConnected = () => mongoose.connection.readyState === 1;

/**
 * Register a new enterprise user
 */
export const register = async (req, res, next) => {
  try {
    const { fullName, email, password, company, role } = req.body;

    if (!fullName || !fullName.trim()) {
      return res.status(400).json({
        success: false,
        error: { message: 'Full name is required' },
      });
    }

    if (!email || !email.trim() || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        error: { message: 'A valid work email is required' },
      });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        error: { message: 'Password must be at least 6 characters long' },
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanCompany = company?.trim() || 'Enterprise Org';
    const cleanRole = role?.trim() || 'VP of Sales';

    // Check if user exists
    if (isMongoConnected()) {
      const existing = await User.findOne({ email: cleanEmail });
      if (existing) {
        return res.status(409).json({
          success: false,
          error: { message: 'An account with this email already exists' },
        });
      }

      const passwordHash = hashPassword(password);
      const user = await User.create({
        fullName: fullName.trim(),
        email: cleanEmail,
        passwordHash,
        company: cleanCompany,
        role: cleanRole,
        avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}&backgroundColor=002e6a,4d8eff`,
      });

      const token = generateToken({
        id: user._id.toString(),
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        company: user.company,
      });

      return res.status(201).json({
        success: true,
        message: 'Account created successfully',
        token,
        user: {
          id: user._id.toString(),
          fullName: user.fullName,
          email: user.email,
          company: user.company,
          role: user.role,
          avatarUrl: user.avatarUrl,
        },
      });
    }

    // In-memory fallback
    const existing = store.findUserByEmail(cleanEmail);
    if (existing) {
      return res.status(409).json({
        success: false,
        error: { message: 'An account with this email already exists' },
      });
    }

    const passwordHash = hashPassword(password);
    const newUser = store.addUser({
      fullName: fullName.trim(),
      email: cleanEmail,
      passwordHash,
      company: cleanCompany,
      role: cleanRole,
    });

    const token = generateToken({
      id: newUser.id,
      email: newUser.email,
      fullName: newUser.fullName,
      role: newUser.role,
      company: newUser.company,
    });

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: store.getSafeUser(newUser),
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Login user
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        error: { message: 'Work email is required' },
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        error: { message: 'Password is required' },
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Mongo
    if (isMongoConnected()) {
      const user = await User.findOne({ email: cleanEmail });
      if (!user) {
        return res.status(401).json({
          success: false,
          error: { message: 'Invalid credentials. Please verify your email and password.' },
        });
      }

      const match = comparePassword(password, user.passwordHash);
      if (!match) {
        return res.status(401).json({
          success: false,
          error: { message: 'Invalid credentials. Please verify your email and password.' },
        });
      }

      user.lastLoginAt = new Date();
      await user.save();

      const token = generateToken({
        id: user._id.toString(),
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        company: user.company,
      });

      return res.json({
        success: true,
        message: `Welcome back, ${user.fullName}`,
        token,
        user: {
          id: user._id.toString(),
          fullName: user.fullName,
          email: user.email,
          company: user.company,
          role: user.role,
          avatarUrl: user.avatarUrl,
        },
      });
    }

    // In-memory fallback
    const user = store.findUserByEmail(cleanEmail);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: { message: 'Invalid credentials. Please verify your email and password.' },
      });
    }

    const match = comparePassword(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({
        success: false,
        error: { message: 'Invalid credentials. Please verify your email and password.' },
      });
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      company: user.company,
    });

    return res.json({
      success: true,
      message: `Welcome back, ${user.fullName}`,
      token,
      user: store.getSafeUser(user),
    });
  } catch (err) {
    next(err);
  }
};

/**
 * 1-Click Demo Login for enterprise executive personas
 */
export const demoLogin = async (req, res, next) => {
  try {
    const { persona = 'vp' } = req.body;

    const email =
      persona === 'ae' ? 'elena.rostova@cloudwave.io' : 'alex.morgan@lumina.ai';

    let user = store.findUserByEmail(email);
    if (!user) {
      user = store.users[0];
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      company: user.company,
    });

    return res.json({
      success: true,
      message: `Logged in as demo persona: ${user.fullName} (${user.role})`,
      token,
      user: store.getSafeUser(user),
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get current authenticated user
 */
export const getMe = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: { message: 'Unauthorized. Valid token required.' },
      });
    }

    if (isMongoConnected()) {
      const user = await User.findById(req.user.id);
      if (user) {
        return res.json({
          success: true,
          user: {
            id: user._id.toString(),
            fullName: user.fullName,
            email: user.email,
            company: user.company,
            role: user.role,
            avatarUrl: user.avatarUrl,
          },
        });
      }
    }

    const user = store.findUserById(req.user.id) || store.findUserByEmail(req.user.email);
    if (user) {
      return res.json({
        success: true,
        user: store.getSafeUser(user),
      });
    }

    return res.json({
      success: true,
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
};
