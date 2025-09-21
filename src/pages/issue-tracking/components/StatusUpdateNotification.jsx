import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StatusUpdateNotification = ({ 
  notification, 
  onDismiss, 
  currentLanguage = 'en' 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (notification) {
      setIsVisible(true);
      // Auto dismiss after 5 seconds
      const timer = setTimeout(() => {
        handleDismiss();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      onDismiss?.();
    }, 300);
  };

  if (!notification) return null;

  const statusConfig = {
    assigned: {
      icon: 'UserCheck',
      color: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      iconColor: 'text-yellow-600'
    },
    'in-progress': {
      icon: 'Wrench',
      color: 'bg-orange-50 border-orange-200 text-orange-800',
      iconColor: 'text-orange-600'
    },
    resolved: {
      icon: 'CheckCircle',
      color: 'bg-green-50 border-green-200 text-green-800',
      iconColor: 'text-green-600'
    }
  };

  const config = statusConfig?.[notification?.newStatus] || statusConfig?.assigned;

  const getStatusLabel = (status) => {
    const labels = {
      assigned: currentLanguage === 'en' ? 'Assigned' : 'सौंपा गया',
      'in-progress': currentLanguage === 'en' ? 'In Progress' : 'प्रगति में',
      resolved: currentLanguage === 'en' ? 'Resolved' : 'हल हो गया'
    };
    return labels?.[status] || status;
  };

  return (
    <div className={`
      fixed top-20 right-4 z-50 max-w-sm w-full
      transform transition-all duration-300 ease-out
      ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
    `}>
      <div className={`
        border rounded-lg p-4 shadow-lg backdrop-blur-sm
        ${config?.color}
      `}>
        <div className="flex items-start space-x-3">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center
            bg-white/20
          `}>
            <Icon 
              name={config?.icon} 
              size={16} 
              className={config?.iconColor} 
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm">
              {currentLanguage === 'en' ? 'Status Updated' : 'स्थिति अपडेट'}
            </h4>
            <p className="text-sm opacity-90 mt-1">
              {currentLanguage === 'en' 
                ? `Issue #${notification?.issueId} is now ${getStatusLabel(notification?.newStatus)}`
                : `समस्या #${notification?.issueId} अब ${getStatusLabel(notification?.newStatus)} है`
              }
            </p>
            {notification?.message && (
              <p className="text-xs opacity-75 mt-2">
                {notification?.message}
              </p>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            iconName="X"
            className="opacity-70 hover:opacity-100 -mt-1 -mr-1"
          />
        </div>
        
        {/* Progress bar for auto-dismiss */}
        <div className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white/40 rounded-full transition-all duration-5000 ease-linear"
            style={{ 
              width: isVisible ? '0%' : '100%',
              transition: isVisible ? 'width 5s linear' : 'none'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StatusUpdateNotification;