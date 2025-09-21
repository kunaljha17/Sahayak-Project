import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onAction, className = '' }) => {
  const [isLoading, setIsLoading] = useState({});

  const quickActions = [
    {
      id: 'bulk-update',
      title: 'Bulk Status Update',
      description: 'Update multiple issues at once',
      icon: 'Edit3',
      color: 'text-blue-600 bg-blue-50 hover:bg-blue-100',
      action: 'bulk-update'
    },
    {
      id: 'assign-tasks',
      title: 'Assign Tasks',
      description: 'Assign issues to field officers',
      icon: 'UserPlus',
      color: 'text-green-600 bg-green-50 hover:bg-green-100',
      action: 'assign-tasks'
    },
    {
      id: 'priority-review',
      title: 'Priority Review',
      description: 'Review high priority issues',
      icon: 'AlertTriangle',
      color: 'text-red-600 bg-red-50 hover:bg-red-100',
      action: 'priority-review'
    },
    {
      id: 'generate-report',
      title: 'Generate Report',
      description: 'Create performance report',
      icon: 'FileText',
      color: 'text-purple-600 bg-purple-50 hover:bg-purple-100',
      action: 'generate-report'
    },
    {
      id: 'field-coordination',
      title: 'Field Coordination',
      description: 'Coordinate with field officers',
      icon: 'Radio',
      color: 'text-orange-600 bg-orange-50 hover:bg-orange-100',
      action: 'field-coordination'
    },
    {
      id: 'citizen-communication',
      title: 'Citizen Updates',
      description: 'Send updates to citizens',
      icon: 'MessageSquare',
      color: 'text-teal-600 bg-teal-50 hover:bg-teal-100',
      action: 'citizen-communication'
    }
  ];

  const handleAction = async (actionId, actionType) => {
    setIsLoading(prev => ({ ...prev, [actionId]: true }));
    
    try {
      if (onAction) {
        await onAction(actionType);
      } else {
        // Default action handlers
        switch (actionType) {
          case 'bulk-update': console.log('Opening bulk update modal');
            break;
          case 'assign-tasks': console.log('Opening task assignment panel');
            break;
          case 'priority-review': console.log('Navigating to priority issues');
            break;
          case 'generate-report': console.log('Generating performance report');
            break;
          case 'field-coordination': console.log('Opening field coordination panel');
            break;
          case 'citizen-communication': console.log('Opening citizen communication panel');
            break;
          default:
            console.log(`Action: ${actionType}`);
        }
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Action failed:', error);
    } finally {
      setIsLoading(prev => ({ ...prev, [actionId]: false }));
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Zap" size={20} className="text-primary" />
        <h3 className="font-semibold text-foreground">Quick Actions</h3>
      </div>
      {/* Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => handleAction(action?.id, action?.action)}
            disabled={isLoading?.[action?.id]}
            className={`
              p-4 rounded-lg border border-border text-left transition-all duration-200
              hover:shadow-md hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
              ${action?.color}
            `}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {isLoading?.[action?.id] ? (
                  <div className="w-6 h-6 animate-spin">
                    <Icon name="Loader2" size={24} />
                  </div>
                ) : (
                  <Icon name={action?.icon} size={24} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm mb-1">
                  {action?.title}
                </h4>
                <p className="text-xs opacity-80 line-clamp-2">
                  {action?.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
      {/* Additional Actions */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Calendar"
            iconPosition="left"
            className="flex-1"
            onClick={() => handleAction('schedule', 'schedule-maintenance')}
          >
            Schedule Maintenance
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="MapPin"
            iconPosition="left"
            className="flex-1"
            onClick={() => handleAction('map-view', 'open-map-view')}
          >
            Map View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;