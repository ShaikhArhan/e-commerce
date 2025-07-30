import React, { useState, useEffect, useRef } from 'react';
import './Otp.css';
import { useNavigate } from 'react-router-dom';

export const Otp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  const email = "user@example.com"; // Replace with actual email from props or context

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResendOtp = () => {
    // Add your resend OTP logic here
    setTimer(120);
    setCanResend(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    // Add your OTP verification logic here
    console.log('OTP submitted:', otpValue);
  };

  const handleBack = () => {
    navigate(-1); // This will navigate back to the previous page
  };

  return (
    <div className="otp-container">
      <div className="otp-box">
        <button onClick={handleBack} className="back-button">
          ← Back
        </button>
        <h2>Verify Your Email</h2>
        <p className="email-display">OTP sent to: {email}</p>
        
        <form onSubmit={handleSubmit}>
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="otp-input"
              />
            ))}
          </div>

          <div className="timer-section">
            {!canResend ? (
              <p className="timer">
                Resend OTP in: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResendOtp}
                className="resend-button"
              >
                Resend OTP
              </button>
            )}
          </div>

          <button type="submit" className="verify-button">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};
