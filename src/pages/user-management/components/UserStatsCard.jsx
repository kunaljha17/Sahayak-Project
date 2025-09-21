import React from 'react';
import Icon from '../../../components/AppIcon';

const UserStatsCard = ({ title, value, change, changeType, icon, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-error/10 text-error'
  };

  const changeColor = changeType === 'increase' ? 'text-success' : 
                     changeType === 'decrease' ? 'text-error' : 'text-muted-foreground';

  return (
    <div className="bg-card border border-border rounded-lg p-6 civic-card-elevated">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground font-caption">
            {title}
          </p>
          <p className="text-2xl font-bold text-foreground font-heading mt-1">
            {value}
          </p>
          {change && (
            <div className="flex items-center mt-2">
              <Icon 
                name={changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
                className={changeColor}
              />
              <span className={`text-sm font-medium ml-1 ${changeColor}`}>
                {change}
              </span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses?.[color]}`}>
          <Icon name={icon} size={24} />
        </div>
      </div>
    </div>
  );
};

export default UserStatsCard;