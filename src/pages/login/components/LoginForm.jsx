import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LoginForm = ({ onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' or 'otp'
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (onSubmit) {
      onSubmit(formData, loginMethod);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleLoginMethod = () => {
    setLoginMethod(loginMethod === 'password' ? 'otp' : 'password');
    setFormData(prev => ({ ...prev, password: '' }));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-lg civic-shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Building2" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
            Welcome to Sahayak
          </h1>
          <p className="text-sm font-body text-muted-foreground">
            Sign in to your civic engagement account
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-md">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <p className="text-sm font-body text-error">{error}</p>
            </div>
          </div>
        )}

        {/* Login Method Toggle */}
        <div className="flex bg-muted rounded-lg p-1 mb-6">
          <button
            type="button"
            onClick={() => setLoginMethod('password')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-body font-medium civic-transition ${
              loginMethod === 'password' ?'bg-card text-foreground civic-shadow' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="Lock" size={16} className="inline mr-2" />
            Password
          </button>
          <button
            type="button"
            onClick={() => setLoginMethod('otp')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-body font-medium civic-transition ${
              loginMethod === 'otp' ?'bg-card text-foreground civic-shadow' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="Smartphone" size={16} className="inline mr-2" />
            OTP
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email/Phone Input */}
          <Input
            label="Email or Phone Number"
            type={loginMethod === 'otp' ? 'tel' : 'email'}
            name="email"
            value={formData?.email}
            onChange={handleInputChange}
            placeholder={loginMethod === 'otp' ? 'Enter your phone number' : 'Enter your email address'}
            required
            className="w-full"
          />

          {/* Password/OTP Input */}
          {loginMethod === 'password' ? (
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData?.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
                className="w-full pr-12"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-9 text-muted-foreground hover:text-foreground civic-transition"
              >
                <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
              </button>
            </div>
          ) : (
            <Input
              label="OTP"
              type="text"
              name="password"
              value={formData?.password}
              onChange={handleInputChange}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              required
              className="w-full"
            />
          )}

          {/* Forgot Password Link */}
          {loginMethod === 'password' && (
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm font-body text-primary hover:text-primary/80 civic-transition"
              >
                Forgot Password?
              </Link>
            </div>
          )}

          {/* Send OTP Button */}
          {loginMethod === 'otp' && formData?.email && (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              iconName="Send"
              iconPosition="right"
            >
              Send OTP
            </Button>
          )}

          {/* Login Button */}
          <Button
            type="submit"
            variant="default"
            className="w-full bg-secondary hover:bg-secondary/90"
            loading={loading}
            disabled={!formData?.email || !formData?.password}
            iconName="LogIn"
            iconPosition="right"
          >
            /* <Link to="/municipal-staff-dashboard"></Link> */
            {loginMethod === 'password' ? 'Sign go' : 'Verify OTP'}
          </Button>
        </form>

        {/* Divider */}
        <div className="my-8 flex items-center">
          <div className="flex-1 border-t border-border"></div>
          <span className="px-4 text-sm font-body text-muted-foreground">or continue with</span>
          <div className="flex-1 border-t border-border"></div>
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            iconName="Mail"
            iconPosition="left"
          >
            <Link to="/issue-tracking">
            Continue with Google
            </Link>
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            iconName="Facebook"
            iconPosition="left"
          >
            Continue with Facebook
          </Button>
        </div>

        {/* Register Link */}
        <div className="mt-8 text-center">
          <p className="text-sm font-body text-muted-foreground">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-primary hover:text-primary/80 font-medium civic-transition"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;