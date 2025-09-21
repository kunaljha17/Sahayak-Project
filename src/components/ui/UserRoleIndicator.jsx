import React, { useState } from 'react';
import Icon from '../AppIcon';

const UserRoleIndicator = ({ 
  user = {
    name: 'John Doe',
    role: 'Municipal Staff',
    email: 'john.doe@municipality.gov',
    department: 'Public Works'
  },
  showDropdown = true,
  className = ''
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const roleConfig = {
    'citizen': {
      label: 'Citizen',
      color: 'bg-blue-100 text-blue-800',
      icon: 'User'
    },
    'staff': {
      label: 'Municipal Staff',
      color: 'bg-green-100 text-green-800',
      icon: 'Shield'
    },
    'admin': {
      label: 'System Admin',
      color: 'bg-purple-100 text-purple-800',
      icon: 'Crown'
    }
  };

  const userRoleKey = user?.role?.toLowerCase()?.includes('admin') ? 'admin' : 
                     user?.role?.toLowerCase()?.includes('staff') ? 'staff' : 'citizen';
  
  const roleInfo = roleConfig?.[userRoleKey];

  const handleLogout = () => {
    // Logout logic would be handled by authentication context
    console.log('Logging out...');
    setIsDropdownOpen(false);
  };

  const handleProfileClick = () => {
    // Navigate to profile page
    console.log('Opening profile...');
    setIsDropdownOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => showDropdown && setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-muted civic-hover civic-focus transition-colors duration-150"
        aria-expanded={isDropdownOpen}
        aria-haspopup="menu"
      >
        {/* User Avatar */}
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <Icon name="User" size={16} className="text-primary-foreground" />
        </div>

        {/* User Info */}
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-foreground">
            {user?.name}
          </div>
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${roleInfo?.color}`}>
              <Icon name={roleInfo?.icon} size={12} className="mr-1" />
              {roleInfo?.label}
            </span>
          </div>
        </div>

        {/* Role Indicator for Mobile */}
        <div className="md:hidden">
          <div className="w-2 h-2 bg-success rounded-full"></div>
        </div>

        {showDropdown && (
          <Icon 
            name={isDropdownOpen ? 'ChevronUp' : 'ChevronDown'} 
            size={16} 
            className="text-muted-foreground" 
          />
        )}
      </button>
      {/* Dropdown Menu */}
      {showDropdown && isDropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-civic-lg z-50 civic-fade-in">
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={20} className="text-primary-foreground" />
              </div>
              <div>
                <div className="font-medium text-popover-foreground">
                  {user?.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {user?.email}
                </div>
                {user?.department && (
                  <div className="text-xs text-muted-foreground font-caption">
                    {user?.department}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${roleInfo?.color}`}>
                <Icon name={roleInfo?.icon} size={12} className="mr-1" />
                {roleInfo?.label}
              </span>
            </div>
          </div>

          <div className="py-2">
            <button
              onClick={handleProfileClick}
              className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted civic-hover transition-colors duration-150"
            >
              <Icon name="Settings" size={16} />
              <span>Profile Settings</span>
            </button>
            
            <button
              onClick={() => console.log('Opening help...')}
              className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted civic-hover transition-colors duration-150"
            >
              <Icon name="HelpCircle" size={16} />
              <span>Help & Support</span>
            </button>
            
            <div className="border-t border-border my-2"></div>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-destructive hover:bg-destructive/10 civic-hover transition-colors duration-150"
            >
              <Icon name="LogOut" size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
      {/* Backdrop for mobile */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default UserRoleIndicator;