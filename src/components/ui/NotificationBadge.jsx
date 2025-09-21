import React from 'react';

const NotificationBadge = ({ 
  count = 0, 
  variant = 'default', 
  size = 'default',
  className = '',
  showZero = false 
}) => {
  if (!showZero && count === 0) return null;

  const variants = {
    default: 'bg-error text-error-foreground',
    success: 'bg-success text-success-foreground',
    warning: 'bg-warning text-warning-foreground',
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground'
  };

  const sizes = {
    sm: 'w-4 h-4 text-xs',
    default: 'w-5 h-5 text-xs',
    lg: 'w-6 h-6 text-sm'
  };

  const displayCount = count > 99 ? '99+' : count?.toString();

  return (
    <span
      className={`
        inline-flex items-center justify-center
        rounded-full font-semibold font-caption
        ${variants?.[variant]}
        ${sizes?.[size]}
        ${className}
      `}
      aria-label={`${count} notifications`}
    >
      {displayCount}
    </span>
  );
};

export default NotificationBadge;