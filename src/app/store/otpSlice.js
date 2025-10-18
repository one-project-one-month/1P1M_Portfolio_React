import { createSlice } from '@reduxjs/toolkit';

const OTP_EXPIRATION_TIME = 15 * 60 * 1000; 

const initialState = {
  otpSessions: {},
};

const otpSlice = createSlice({
  name: 'otp',
  initialState,
  reducers: {
    startOtpSession: (state, action) => {
      const { email } = action.payload;
      const now = Date.now();
      
      state.otpSessions[email] = {
        sentAt: now,
        expiresAt: now + OTP_EXPIRATION_TIME,
      };
    },
    
    clearOtpSession: (state, action) => {
      const { email } = action.payload;
      delete state.otpSessions[email];
    },
    
    clearExpiredSessions: (state) => {
      const now = Date.now();
      Object.keys(state.otpSessions).forEach(email => {
        if (state.otpSessions[email].expiresAt <= now) {
          delete state.otpSessions[email];
        }
      });
    },
  },
});

export const { startOtpSession, clearOtpSession, clearExpiredSessions } = otpSlice.actions;


export const selectOtpSession = (state, email) => state.otp.otpSessions[email];

export const selectIsOtpValid = (state, email) => {
  const session = state.otp.otpSessions[email];
  if (!session) return false;
  
  const now = Date.now();
  return session.expiresAt > now;
};

export const selectOtpTimeRemaining = (state, email) => {
  const session = state.otp.otpSessions[email];
  if (!session) return 0;
  
  const now = Date.now();
  const remaining = session.expiresAt - now;
  return Math.max(0, remaining);
};

export default otpSlice.reducer;