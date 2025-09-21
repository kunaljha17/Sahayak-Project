import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LanguageSelector = ({ onLanguageChange, currentLanguage: propCurrentLanguage }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showDropdown, setShowDropdown] = useState(false);

  const languages = [
    { 
      code: 'en', 
      label: 'English', 
      nativeLabel: 'English',
      flag: '🇺🇸'
    },
    { 
      code: 'hi', 
      label: 'Hindi', 
      nativeLabel: 'हिंदी',
      flag: '🇮🇳'
    }
  ];

  useEffect(() => {
    const savedLanguage = propCurrentLanguage || localStorage.getItem('sahayak-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, [propCurrentLanguage]);

  const getCurrentLanguageData = () => {
    return languages?.find(lang => lang?.code === currentLanguage) || languages?.[0];
  };

  const toggleLanguage = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('sahayak-language', langCode);
    setShowDropdown(false);
    
    if (onLanguageChange) {
      onLanguageChange(langCode);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const currentLangData = getCurrentLanguageData();

  return (
    <div className="absolute top-6 right-6 z-10">
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleDropdown}
          className="flex items-center space-x-2 bg-card/80 backdrop-blur-sm border border-border/50"
        >
          <span className="text-lg" role="img" aria-label={`${currentLangData?.label} flag`}>
            {currentLangData?.flag}
          </span>
          <span className="text-sm font-caption font-medium">
            {currentLangData?.nativeLabel}
          </span>
          <Icon name="ChevronDown" size={14} className="text-muted-foreground" />
        </Button>

        {/* Language Dropdown */}
        {showDropdown && (
          <>
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setShowDropdown(false)}
            />
            <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg civic-shadow-lg z-50">
              <div className="p-2">
                <div className="px-3 py-2 border-b border-border mb-2">
                  <p className="text-xs font-caption font-medium text-muted-foreground uppercase tracking-wide">
                    Select Language
                  </p>
                </div>
                {languages?.map((lang) => (
                  <button
                    key={lang?.code}
                    onClick={() => toggleLanguage(lang?.code)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-body civic-transition ${
                      currentLanguage === lang?.code 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-popover-foreground hover:bg-muted'
                    }`}
                  >
                    <span className="text-lg" role="img" aria-label={`${lang?.label} flag`}>
                      {lang?.flag}
                    </span>
                    <div className="flex-1 text-left">
                      <p className="font-medium">{lang?.nativeLabel}</p>
                      <p className="text-xs opacity-75">{lang?.label}</p>
                    </div>
                    {currentLanguage === lang?.code && (
                      <Icon name="Check" size={16} className="flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;