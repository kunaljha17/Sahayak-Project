import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: 'John Doe',
    role: 'Municipal Staff',
    avatar: null
  });
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState(3);

  // Mock authentication and role-based navigation
  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/municipal-staff-dashboard',
      icon: 'LayoutDashboard',
      roles: ['citizen', 'staff', 'admin'],
      badge: null
    },
    {
      label: 'Report Issue',
      path: '/report-issue',
      icon: 'AlertCircle',
      roles: ['citizen'],
      badge: null
    },
    {
      label: 'Issue Tracking',
      path: '/issue-tracking',
      icon: 'Search',
      roles: ['citizen', 'staff'],
      badge: null
    },
    {
      label: 'Issue Management',
      path: '/issue-management',
      icon: 'Settings',
      roles: ['staff', 'admin'],
      badge: notifications > 0 ? notifications : null
    },
    {
      label: 'Analytics',
      path: '/analytics-dashboard',
      icon: 'BarChart3',
      roles: ['staff', 'admin'],
      badge: null
    }
  ];

  const secondaryItems = [
    {
      label: 'User Management',
      path: '/user-management',
      icon: 'Users',
      roles: ['admin'],
      badge: null
    }
  ];

  const userRole = 'staff'; // This would come from authentication context
  const visibleItems = navigationItems?.filter(item => item?.roles?.includes(userRole));
  const visibleSecondaryItems = secondaryItems?.filter(item => item?.roles?.includes(userRole));

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const handleNavigation = (path) => {
    // Navigation logic would be handled by router
    console.log(`Navigating to: ${path}`);
    setIsMenuOpen(false);
  };

  const handleQuickAction = () => {
    if (userRole === 'citizen') {
      handleNavigation('/report-issue');
    } else {
      // Open quick update modal for staff
      console.log('Opening quick update modal');
    }
  };

  useEffect(() => {
    // Mock WebSocket connection for real-time notifications
    const interval = setInterval(() => {
      setNotifications(prev => Math.max(0, prev + Math.floor(Math.random() * 3) - 1));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-civic-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-primary-foreground"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-heading font-semibold text-foreground">
                  sahayak
                </h1>
                <p className="text-xs text-muted-foreground font-caption">
                  {language === 'en' ? 'Civic Engagement Platform' : 'नागरिक सहभागिता मंच'}
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {visibleItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className="relative flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted civic-hover civic-focus transition-colors duration-150"
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
                {item?.badge && (
                  <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {item?.badge}
                  </span>
                )}
              </button>
            ))}
            
            {/* More Menu for Secondary Items */}
            {visibleSecondaryItems?.length > 0 && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="MoreHorizontal"
                  className="px-3"
                >
                  More
                </Button>
              </div>
            )}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Quick Action Button */}
            <Button
              variant="default"
              size="sm"
              onClick={handleQuickAction}
              iconName={userRole === 'citizen' ? 'Plus' : 'Edit3'}
              iconPosition="left"
              className="hidden sm:flex"
            >
              {userRole === 'citizen' 
                ? (language === 'en' ? 'Report Issue' : 'समस्या रिपोर्ट करें')
                : (language === 'en' ? 'Quick Update' : 'त्वरित अपडेट')
              }
            </Button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted civic-hover civic-focus"
              aria-label={`Switch to ${language === 'en' ? 'Hindi' : 'English'}`}
            >
              <Icon name="Globe" size={16} />
              <span className="hidden sm:inline font-caption">
                {language === 'en' ? 'हिं' : 'EN'}
              </span>
            </button>

            {/* User Role Indicator */}
            <div className="hidden sm:flex items-center space-x-2 px-3 py-2 rounded-md bg-muted">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm font-medium text-muted-foreground font-caption">
                {currentUser?.role}
              </span>
            </div>

            {/* User Profile */}
            <button className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-muted civic-hover civic-focus">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-primary-foreground" />
              </div>
              <span className="hidden md:inline text-sm font-medium text-foreground">
                {currentUser?.name}
              </span>
              <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-muted civic-hover civic-focus"
              aria-label="Toggle menu"
            >
              <Icon name={isMenuOpen ? 'X' : 'Menu'} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-card civic-fade-in">
            <nav className="px-4 py-4 space-y-2">
              {visibleItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className="relative flex items-center space-x-3 w-full px-4 py-3 rounded-md text-left text-sm font-medium text-foreground hover:bg-muted civic-hover transition-colors duration-150"
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                  {item?.badge && (
                    <span className="ml-auto bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                      {item?.badge}
                    </span>
                  )}
                </button>
              ))}
              
              {visibleSecondaryItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-md text-left text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground civic-hover transition-colors duration-150"
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </button>
              ))}

              {/* Mobile Quick Action */}
              <div className="pt-4 border-t border-border">
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleQuickAction}
                  iconName={userRole === 'citizen' ? 'Plus' : 'Edit3'}
                  iconPosition="left"
                  fullWidth
                >
                  {userRole === 'citizen' 
                    ? (language === 'en' ? 'Report Issue' : 'समस्या रिपोर्ट करें')
                    : (language === 'en' ? 'Quick Update' : 'त्वरित अपडेट')
                  }
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;