require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/digital_identity_hub',
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '24h',
  
  // Google OAuth 2.0 Configuration
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '29354722301-20qcujtsjps8ck2adsf1j2e4lao3igp3.apps.googleusercontent.com',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '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',
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/auth/google/callback',
  
  // Session Configuration
  SESSION_SECRET: process.env.SESSION_SECRET || 'your-super-secret-session-key-change-this-in-production',
  
  // Passkey Configuration
  RP_ID: process.env.RP_ID || 'localhost',
  RP_NAME: process.env.RP_NAME || 'Digital Identity Hub',
  RP_ORIGIN: process.env.RP_ORIGIN || 'http://localhost:3000'
}; 