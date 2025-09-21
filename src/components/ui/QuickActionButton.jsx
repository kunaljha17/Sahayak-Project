import React, { useState } from 'react';
import Button from './Button';


const QuickActionButton = ({ 
  userRole = 'citizen',
  language = 'en',
  onAction,
  className = '',
  variant = 'default',
  size = 'default'
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const actionConfig = {
    citizen: {
      en: {
        label: 'Report Issue',
        icon: 'Plus',
        description: 'Report a new civic issue'
      },
      hi: {
        label: 'समस्या रिपोर्ट करें',
        icon: 'Plus',
        description: 'नई नागरिक समस्या की रिपोर्ट करें'
      }
    },
    staff: {
      en: {
        label: 'Quick Update',
        icon: 'Edit3',
        description: 'Update issue status quickly'
      },
      hi: {
        label: 'त्वरित अपडेट',
        icon: 'Edit3',
        description: 'समस्या की स्थिति को जल्दी अपडेट करें'
      }
    },
    admin: {
      en: {
        label: 'System Overview',
        icon: 'BarChart3',
        description: 'View system analytics'
      },
      hi: {
        label: 'सिस्टम अवलोकन',
        icon: 'BarChart3',
        description: 'सिस्टम एनालिटिक्स देखें'
      }
    }
  };

  const config = actionConfig?.[userRole]?.[language] || actionConfig?.citizen?.en;

  const handleClick = async () => {
    setIsLoading(true);
    
    try {
      if (onAction) {
        await onAction(userRole);
      } else {
        // Default actions based on user role
        switch (userRole) {
          case 'citizen': console.log('Navigating to report issue page');
            // window.location.href = '/report-issue';
            break;
          case 'staff': console.log('Opening quick update modal');
            // Open modal or navigate to quick update
            break;
          case 'admin': console.log('Navigating to analytics dashboard');
            // window.location.href = '/analytics-dashboard';
            break;
          default:
            console.log('Default action');
        }
      }
    } catch (error) {
      console.error('Quick action failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      loading={isLoading}
      iconName={config?.icon}
      iconPosition="left"
      className={`civic-hover civic-focus ${className}`}
      title={config?.description}
      aria-label={config?.description}
    >
      {config?.label}
    </Button>
  );
};

export default QuickActionButton;