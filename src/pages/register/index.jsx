import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import LanguageToggle from '../../components/ui/LanguageToggle';
import RegistrationForm from './components/RegistrationForm';
import OTPVerification from './components/OTPVerification';
import SocialRegistration from './components/SocialRegistration';
import RegistrationSuccess from './components/RegistrationSuccess';
import ProgressIndicator from './components/ProgressIndicator';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null);
  const [registrationData, setRegistrationData] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const steps = [
    { id: 1, title: 'Registration', description: 'Create your account' },
    { id: 2, title: 'Verification', description: 'Confirm your identity' },
    { id: 3, title: 'Complete', description: 'Account ready' }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('sahayak-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
  };

  const handleRegistrationSubmit = async (formData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock registration logic
      const userData = {
        id: Date.now(),
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        email: formData?.email,
        phone: formData?.phone,
        role: formData?.role,
        department: formData?.department,
        employeeId: formData?.employeeId,
        createdAt: new Date()?.toISOString()
      };

      setRegistrationData(userData);
      setCurrentStep(2);
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error - show notification
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerification = async (otp, method) => {
    setLoading(true);
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock OTP validation (accept 123456 as valid OTP)
      if (otp === '123456') {
        setCurrentStep(3);
      } else {
        throw new Error('Invalid OTP. Please use 123456 for demo.');
      }
    } catch (error) {
      console.error('OTP verification failed:', error);
      // Handle error - show notification
    } finally {
      setLoading(false);
    }
  };

  const handleOTPResend = async (method) => {
    try {
      // Simulate resend OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`OTP resent via ${method}`);
      // Show success notification
    } catch (error) {
      console.error('Failed to resend OTP:', error);
    }
  };

  const handleSocialRegistration = async (provider) => {
    setSocialLoading(provider);
    try {
      // Simulate social registration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock social registration success
      const socialUserData = {
        id: Date.now(),
        firstName: 'John',
        lastName: 'Doe',
        email: `john.doe@${provider}.com`,
        phone: '+91 98765 43210',
        role: 'citizen',
        provider: provider,
        createdAt: new Date()?.toISOString()
      };

      setRegistrationData(socialUserData);
      setCurrentStep(3); // Skip OTP for social registration
    } catch (error) {
      console.error('Social registration failed:', error);
    } finally {
      setSocialLoading(null);
    }
  };

  const handleRegistrationComplete = () => {
    // Redirect based on user role
    if (registrationData?.role === 'citizen') {
      navigate('/municipal-dashboard');
    } else {
      navigate('/login');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <RegistrationForm 
              onSubmit={handleRegistrationSubmit}
              loading={loading}
            />
            <SocialRegistration 
              onSocialRegister={handleSocialRegistration}
              loading={socialLoading}
            />
          </div>
        );
      case 2:
        return (
          <OTPVerification
            email={registrationData?.email}
            phone={registrationData?.phone}
            onVerify={handleOTPVerification}
            onResend={handleOTPResend}
            loading={loading}
          />
        );
      case 3:
        return (
          <RegistrationSuccess
            userRole={registrationData?.role}
            userName={`${registrationData?.firstName} ${registrationData?.lastName}`}
            onContinue={handleRegistrationComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Register - sahayak | Civic Engagement Platform</title>
        <meta name="description" content="Create your sahayak account to report civic issues, track resolutions, and engage with your municipal government. Join thousands of citizens making their communities better." />
        <meta name="keywords" content="civic registration, municipal account, citizen portal, government services, issue reporting" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border civic-shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link to="/municipal-dashboard" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Building2" size={20} color="white" />
                </div>
                <div>
                  <h1 className="text-lg font-heading font-semibold text-foreground">sahayak</h1>
                  <p className="text-xs font-caption text-muted-foreground">Civic Engagement Platform</p>
                </div>
              </Link>

              {/* Language Toggle */}
              <LanguageToggle 
                propCurrentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Progress Indicator */}
            <div className="mb-8">
              <ProgressIndicator 
                currentStep={currentStep}
                totalSteps={3}
                steps={steps}
              />
            </div>

            {/* Registration Card */}
            <div className="bg-card rounded-lg civic-shadow-lg border border-border overflow-hidden">
              {/* Card Header */}
              <div className="bg-primary/5 border-b border-border px-6 py-4">
                <div className="text-center">
                  <h2 className="text-2xl font-heading font-bold text-foreground">
                    {currentStep === 1 && 'Create Your Account'}
                    {currentStep === 2 && 'Verify Your Identity'}
                    {currentStep === 3 && 'Registration Complete'}
                  </h2>
                  <p className="text-muted-foreground font-body mt-2">
                    {currentStep === 1 && 'Join the sahayak community and start making a difference'}
                    {currentStep === 2 && 'We need to verify your contact information'}
                    {currentStep === 3 && 'Welcome to the sahayak platform'}
                  </p>
                </div>
              </div>

              {/* Card Content */}
              <div className="px-6 py-8">
                {renderStepContent()}
              </div>

              {/* Card Footer */}
              {currentStep === 1 && (
                <div className="bg-muted/30 border-t border-border px-6 py-4">
                  <div className="text-center space-y-3">
                    <p className="text-sm font-body text-muted-foreground">
                      Already have an account?
                    </p>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/login">
                        <Icon name="LogIn" size={16} className="mr-2" />
                        Sign In Instead
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Help Section */}
            <div className="mt-8 bg-card rounded-lg civic-shadow border border-border p-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="HelpCircle" size={20} className="text-primary" />
                  <h3 className="text-lg font-heading font-semibold text-foreground">
                    Need Help?
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-body">
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2 text-primary">
                      <Icon name="Mail" size={16} />
                      <span className="font-medium">Email Support</span>
                    </div>
                    <p className="text-muted-foreground">support@sahayak.gov.in</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2 text-primary">
                      <Icon name="Phone" size={16} />
                      <span className="font-medium">Phone Support</span>
                    </div>
                    <p className="text-muted-foreground">1800-XXX-XXXX</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2 text-primary">
                      <Icon name="Clock" size={16} />
                      <span className="font-medium">Available</span>
                    </div>
                    <p className="text-muted-foreground">24/7 Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4 text-sm font-caption text-muted-foreground">
                <button className="hover:text-primary civic-transition">Privacy Policy</button>
                <span>•</span>
                <button className="hover:text-primary civic-transition">Terms of Service</button>
                <span>•</span>
                <button className="hover:text-primary civic-transition">Help Center</button>
              </div>
              
              <div className="text-sm font-caption text-muted-foreground">
                © {new Date()?.getFullYear()} sahayak. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Register;