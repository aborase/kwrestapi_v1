var kwsystemcodes = require("node-constants")(exports);
kwsystemcodes({
    OTP_REQUEST: 3001, // Request otp for new user or when session exipred
    OTP_RESEND: 3002, // OTP Resnd request from user or system
    INVALID_MOBILENO: 3003 // System not avaible to verify mobile no
   
});
