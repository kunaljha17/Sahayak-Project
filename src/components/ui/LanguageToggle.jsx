import React, { useState, useEffect } from 'react';

import Button from './Button';

const LanguageToggle = ({ 
  className = '',
  showLabel = true,
  variant = 'ghost',
  size = 'sm'
}) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const languages = {
    en: {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      shortCode: 'EN'
    },
    hi: {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिंदी',
      shortCode: 'हिं'
    }
  };

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('sahayak-language');
    if (savedLanguage && languages?.[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    setCurrentLanguage(newLanguage);
    
    // Save to localStorage
    localStorage.setItem('sahayak-language', newLanguage);
    
    // Trigger language change event for i18next integration
    window.dispatchEvent(new CustomEvent('languageChange', { 
      detail: { language: newLanguage } 
    }));
  };

  const currentLang = languages?.[currentLanguage];
  const nextLang = languages?.[currentLanguage === 'en' ? 'hi' : 'en'];

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleLanguage}
      iconName="Globe"
      iconPosition="left"
      iconSize={16}
      className={`civic-hover civic-focus ${className}`}
      aria-label={`Switch to ${nextLang?.name}`}
      title={`Current: ${currentLang?.name} - Click to switch to ${nextLang?.name}`}
    >
      {showLabel && (
        <span className="font-caption">
          {currentLang?.shortCode}
        </span>
      )}
    </Button>
  );
};

export default LanguageToggle;