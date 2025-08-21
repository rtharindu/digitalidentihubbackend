require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const config = require('../config/config');

// Import routes
const agreementRoutes = require('../routes/agreement.route');
const userRoleRoutes = require('../routes/userRole.route');
const partyRoutes = require('../routes/party.route');
const authUserRoutes = require('../routes/authUser.route');
const loginHistoryRoutes = require('../routes/loginHistory.route');
const sessionRoutes = require('../routes/sessionRoutes');
const userProfileRoutes = require('../routes/userProfile.route');
const userManagementRoutes = require('../routes/userManagement.route');
const passkeyRoutes = require('../routes/passkey.route');
const googleAuthRoutes = require('../routes/googleAuth.route');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || config.RP_ORIGIN,
  credentials: true
}));
app.use(bodyParser.json());

// Session middleware (simplified for serverless)
app.use(session({
  secret: process.env.SESSION_SECRET || config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'lax'
  },
  name: 'sid'
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[Request] ${req.method} ${req.url}`);
  next();
});

// API routes
app.use('/api/agreements', agreementRoutes);
app.use('/api/user-roles', userRoleRoutes);
app.use('/api/parties', partyRoutes);
app.use('/api/auth', authUserRoutes);
app.use('/api/auth', googleAuthRoutes);
app.use('/api/passkey', passkeyRoutes);
app.use('/api/logs/login-history', loginHistoryRoutes);
app.use('/api/logs', loginHistoryRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/profile', userProfileRoutes);
app.use('/api/admin/users', userManagementRoutes);

// Root endpoint
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Digital Identity Hub Backend API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || config.MONGO_URI;
    await mongoose.connect(mongoUri, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// Initialize database connection
connectDB();

// Export for Vercel serverless
module.exports = app;
