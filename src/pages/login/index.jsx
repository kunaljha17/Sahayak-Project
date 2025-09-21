import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import TrustIndicators from './components/TrustIndicators';
import LanguageSelector from './components/LanguageSelector';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const navigate = useNavigate();

  // Mock credentials for different user types
  const mockCredentials = {
    citizen: {
      email: 'citizen@shayak.gov.in',
      password: 'citizen123',
      phone: '+91-9876543210',
      otp: '123456'
    },
    staff: {
      email: 'staff@shayak.gov.in',
      password: 'staff123',
      phone: '+91-9876543211',
      otp: '654321'
    },
    admin: {
      email: 'admin@shayak.gov.in',
      password: 'admin123',
      phone: '+91-9876543212',
      otp: '789012'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('shayak-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('shayak-language', langCode);
  };

  const handleLogin = async (formData, loginMethod) => {
    setLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const { email, password } = formData;
      let isValidCredentials = false;
      let userRole = '';

      // Check credentials against mock data
      Object.entries(mockCredentials)?.forEach(([role, credentials]) => {
        if (loginMethod === 'password') {
          if (email === credentials?.email && password === credentials?.password) {
            isValidCredentials = true;
            userRole = role;
          }
        } else if (loginMethod === 'otp') {
          if (email === credentials?.phone && password === credentials?.otp) {
            isValidCredentials = true;
            userRole = role;
          }
        }
      });

      if (isValidCredentials) {
        // Store user session
        localStorage.setItem('shayak-user', JSON.stringify({
          role: userRole,
          email: email,
          loginMethod: loginMethod,
          loginTime: new Date()?.toISOString()
        }));

        // Navigate to appropriate dashboard
        navigate('/municipal-dashboard');
      } else {
        if (loginMethod === 'password') {
          setError('Invalid email or password. Please check your credentials and try again.');
        } else {
          setError('Invalid phone number or OTP. Please verify and try again.');
        }
      }
    } catch (err) {
      setError('Login failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Language Selector */}
      <LanguageSelector 
        propCurrentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
      />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Login Form */}
        <div className="w-full max-w-md">
          <LoginForm
            onSubmit={handleLogin}
            loading={loading}
            error={error}
          />
        </div>
        
        {/* Trust Indicators */}
        <TrustIndicators />

        {/* Demo Credentials Info */}
        <div className="w-full max-w-4xl mx-auto mt-8">
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
            <div className="text-center mb-4">
              <h3 className="font-heading font-semibold text-foreground mb-2">
                Demo Credentials
              </h3>
              <p className="text-sm font-body text-muted-foreground">
                Use these credentials to test different user roles
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-body">
              <div className="bg-card border border-border rounded-md p-4">
                <h4 className="font-semibold text-foreground mb-2">Citizen</h4>
                <p className="text-muted-foreground mb-1">Email: citizen@shayak.gov.in</p>
                <p className="text-muted-foreground mb-1">Password: citizen123</p>
                <p className="text-muted-foreground mb-1">Phone: +91-9876543210</p>
                <p className="text-muted-foreground">OTP: 123456</p>
              </div>
              
              <div className="bg-card border border-border rounded-md p-4">
                <h4 className="font-semibold text-foreground mb-2">Municipal Staff</h4>
                <p className="text-muted-foreground mb-1">Email: staff@shayak.gov.in</p>
                <p className="text-muted-foreground mb-1">Password: staff123</p>
                <p className="text-muted-foreground mb-1">Phone: +91-9876543211</p>
                <p className="text-muted-foreground">OTP: 654321</p>
              </div>
              
              <div className="bg-card border border-border rounded-md p-4">
                <h4 className="font-semibold text-foreground mb-2">Super Admin</h4>
                <p className="text-muted-foreground mb-1">Email: admin@shayak.gov.in</p>
                <p className="text-muted-foreground mb-1">Password: admin123</p>
                <p className="text-muted-foreground mb-1">Phone: +91-9876543212</p>
                <p className="text-muted-foreground">OTP: 789012</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;