import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'positive', 
  icon, 
  description,
  loading = false,
  className = ''
}) => {
  const changeColors = {
    positive: 'text-success',
    negative: 'text-error',
    neutral: 'text-muted-foreground'
  };

  const changeIcons = {
    positive: 'TrendingUp',
    negative: 'TrendingDown',
    neutral: 'Minus'
  };

  if (loading) {
    return (
      <div className={`civic-card p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 bg-muted rounded w-24"></div>
            <div className="h-8 w-8 bg-muted rounded-lg"></div>
          </div>
          <div className="h-8 bg-muted rounded w-16 mb-2"></div>
          <div className="h-3 bg-muted rounded w-20"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`civic-card-elevated p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground font-caption">
          {title}
        </h3>
        {icon && (
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={icon} size={16} className="text-primary" />
          </div>
        )}
      </div>
      <div className="space-y-2">
        <div className="text-2xl font-bold text-foreground font-heading">
          {value}
        </div>
        
        {change && (
          <div className="flex items-center space-x-1">
            <Icon 
              name={changeIcons?.[changeType]} 
              size={14} 
              className={changeColors?.[changeType]} 
            />
            <span className={`text-sm font-medium ${changeColors?.[changeType]}`}>
              {change}
            </span>
            {description && (
              <span className="text-sm text-muted-foreground">
                {description}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;