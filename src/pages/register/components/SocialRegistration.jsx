import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialRegistration = ({ onSocialRegister, loading }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50',
      description: 'Continue with your Google account'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600 text-white hover:bg-blue-700',
      description: 'Continue with your Facebook account'
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      icon: 'Square',
      color: 'bg-gray-800 text-white hover:bg-gray-900',
      description: 'Continue with your Microsoft account'
    }
  ];

  const handleSocialRegister = (provider) => {
    if (onSocialRegister) {
      onSocialRegister(provider);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground font-caption">
            Or register with
          </span>
        </div>
      </div>
      <div className="space-y-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.id}
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => handleSocialRegister(provider?.id)}
            loading={loading === provider?.id}
            className="justify-start"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                provider?.id === 'google' ? 'bg-white' : 
                provider?.id === 'facebook' ? 'bg-blue-600' : 'bg-gray-800'
              }`}>
                <Icon 
                  name={provider?.icon} 
                  size={18} 
                  color={provider?.id === 'google' ? '#4285f4' : 'white'}
                />
              </div>
              <div className="text-left">
                <p className="font-body font-medium text-foreground">
                  Continue with {provider?.name}
                </p>
                <p className="text-xs font-caption text-muted-foreground">
                  {provider?.description}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>
      {/* Social Registration Benefits */}
      <div className="bg-muted/30 rounded-lg p-4 mt-6">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={18} className="text-primary flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="text-sm font-body font-medium text-foreground">
              Quick & Secure Registration
            </p>
            <ul className="text-xs font-caption text-muted-foreground space-y-1">
              <li>• No need to remember another password</li>
              <li>• Faster account setup process</li>
              <li>• Enhanced security with OAuth 2.0</li>
              <li>• Easy account recovery options</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Privacy Notice */}
      <div className="text-center">
        <p className="text-xs font-caption text-muted-foreground">
          By registering with social accounts, you agree to our{' '}
          <button className="text-primary hover:underline">Terms of Service</button>
          {' '}and{' '}
          <button className="text-primary hover:underline">Privacy Policy</button>
        </p>
      </div>
    </div>
  );
};

export default SocialRegistration;