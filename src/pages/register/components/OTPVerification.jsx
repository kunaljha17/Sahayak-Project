import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OTPVerification = ({ email, phone, onVerify, onResend, loading }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState('email');

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleOtpChange = (index, value) => {
    if (value?.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e?.key === 'Backspace' && !otp?.[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput?.focus();
    }
  };

  const handlePaste = (e) => {
    e?.preventDefault();
    const pastedData = e?.clipboardData?.getData('text')?.slice(0, 6);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData?.length; i++) {
      if (i < 6 && /^\d$/?.test(pastedData?.[i])) {
        newOtp[i] = pastedData?.[i];
      }
    }
    setOtp(newOtp);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    const otpString = otp?.join('');
    
    if (otpString?.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }
    
    if (!/^\d{6}$/?.test(otpString)) {
      setError('OTP must contain only numbers');
      return;
    }

    onVerify(otpString, verificationMethod);
  };

  const handleResend = () => {
    if (canResend) {
      setResendTimer(60);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      setError('');
      onResend(verificationMethod);
    }
  };

  const switchVerificationMethod = (method) => {
    setVerificationMethod(method);
    setOtp(['', '', '', '', '', '']);
    setError('');
    setResendTimer(60);
    setCanResend(false);
    onResend(method);
  };

  const maskedEmail = email ? email?.replace(/(.{2})(.*)(@.*)/, '$1***$3') : '';
  const maskedPhone = phone ? phone?.replace(/(\d{2})(\d{6})(\d{2})/, '$1******$3') : '';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Shield" size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-foreground">Verify Your Account</h2>
        <p className="text-muted-foreground font-body">
          We've sent a 6-digit verification code to your {verificationMethod === 'email' ? 'email' : 'phone'}
        </p>
      </div>
      {/* Verification Method Toggle */}
      <div className="flex bg-muted rounded-lg p-1">
        <button
          type="button"
          onClick={() => switchVerificationMethod('email')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md font-body font-medium civic-transition ${
            verificationMethod === 'email' ?'bg-card text-foreground civic-shadow' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name="Mail" size={18} />
          <span>Email</span>
        </button>
        <button
          type="button"
          onClick={() => switchVerificationMethod('sms')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md font-body font-medium civic-transition ${
            verificationMethod === 'sms' ?'bg-card text-foreground civic-shadow' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name="Smartphone" size={18} />
          <span>SMS</span>
        </button>
      </div>
      {/* Contact Info Display */}
      <div className="bg-muted/30 rounded-lg p-4 text-center">
        <div className="flex items-center justify-center space-x-2 text-sm font-body text-muted-foreground">
          <Icon name={verificationMethod === 'email' ? 'Mail' : 'Smartphone'} size={16} />
          <span>
            Code sent to: <span className="font-medium text-foreground">
              {verificationMethod === 'email' ? maskedEmail : maskedPhone}
            </span>
          </span>
        </div>
      </div>
      {/* OTP Input Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <label className="block text-sm font-body font-medium text-foreground text-center">
            Enter 6-digit verification code
          </label>
          
          <div className="flex justify-center space-x-3">
            {otp?.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e?.target?.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center text-lg font-heading font-semibold border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary civic-transition"
                autoComplete="off"
              />
            ))}
          </div>

          {error && (
            <div className="flex items-center justify-center space-x-2 text-error">
              <Icon name="AlertCircle" size={16} />
              <span className="text-sm font-caption">{error}</span>
            </div>
          )}
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={loading}
          iconName="CheckCircle"
          iconPosition="left"
        >
          Verify Account
        </Button>
      </form>
      {/* Resend Section */}
      <div className="text-center space-y-3">
        <p className="text-sm font-body text-muted-foreground">
          Didn't receive the code?
        </p>
        
        {canResend ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResend}
            iconName="RefreshCw"
            iconPosition="left"
          >
            Resend Code
          </Button>
        ) : (
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <Icon name="Clock" size={16} />
            <span className="text-sm font-caption">
              Resend available in {resendTimer}s
            </span>
          </div>
        )}
      </div>
      {/* Help Text */}
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={18} className="text-primary flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="text-sm font-body font-medium text-foreground">Having trouble?</p>
            <ul className="text-xs font-caption text-muted-foreground space-y-1">
              <li>• Check your spam/junk folder for the email</li>
              <li>• Ensure your phone has good signal reception</li>
              <li>• Try switching between email and SMS verification</li>
              <li>• Contact support if issues persist</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;