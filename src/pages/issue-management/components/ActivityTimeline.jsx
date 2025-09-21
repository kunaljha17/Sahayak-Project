import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityTimeline = ({ issue, activities }) => {
  const [showAllActivities, setShowAllActivities] = useState(false);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'created':
        return 'Plus';
      case 'assigned':
        return 'UserCheck';
      case 'status_updated':
        return 'RefreshCw';
      case 'note_added':
        return 'MessageSquare';
      case 'media_uploaded':
        return 'Camera';
      case 'resolved':
        return 'CheckCircle';
      case 'escalated':
        return 'AlertTriangle';
      default:
        return 'Clock';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'created':
        return 'text-blue-600 bg-blue-100';
      case 'assigned':
        return 'text-yellow-600 bg-yellow-100';
      case 'status_updated':
        return 'text-orange-600 bg-orange-100';
      case 'note_added':
        return 'text-purple-600 bg-purple-100';
      case 'media_uploaded':
        return 'text-indigo-600 bg-indigo-100';
      case 'resolved':
        return 'text-green-600 bg-green-100';
      case 'escalated':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const displayedActivities = showAllActivities ? activities : activities?.slice(0, 5);

  return (
    <div className="bg-card rounded-lg border border-border shadow-civic-sm">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Clock" size={20} />
          <span>Activity Timeline</span>
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Complete history of all actions taken on this issue
        </p>
      </div>
      {/* Timeline */}
      <div className="p-6">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>
          
          {/* Activities */}
          <div className="space-y-6">
            {displayedActivities?.map((activity, index) => (
              <div key={activity?.id} className="relative flex items-start space-x-4">
                {/* Timeline Icon */}
                <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${getActivityColor(activity?.type)}`}>
                  <Icon name={getActivityIcon(activity?.type)} size={20} />
                </div>

                {/* Activity Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium text-foreground">
                        {activity?.title}
                      </h4>
                      {activity?.isSystemGenerated && (
                        <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                          System
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{formatTimeAgo(activity?.timestamp)}</span>
                      <span>•</span>
                      <span>{new Date(activity.timestamp)?.toLocaleString()}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-1">
                    {activity?.description}
                  </p>

                  {/* Activity Details */}
                  {activity?.details && (
                    <div className="mt-2 p-3 bg-muted rounded-lg">
                      <div className="text-sm text-foreground">
                        {activity?.details?.oldValue && activity?.details?.newValue && (
                          <div className="flex items-center space-x-2">
                            <span className="text-muted-foreground">Changed from:</span>
                            <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                              {activity?.details?.oldValue}
                            </span>
                            <Icon name="ArrowRight" size={14} className="text-muted-foreground" />
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                              {activity?.details?.newValue}
                            </span>
                          </div>
                        )}
                        {activity?.details?.note && (
                          <div className="mt-2">
                            <span className="text-muted-foreground">Note: </span>
                            <span className="text-foreground">{activity?.details?.note}</span>
                          </div>
                        )}
                        {activity?.details?.assignedTo && (
                          <div className="flex items-center space-x-2">
                            <span className="text-muted-foreground">Assigned to:</span>
                            <span className="font-medium text-foreground">
                              {activity?.details?.assignedTo}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Activity Author */}
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="User" size={12} className="text-primary-foreground" />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {activity?.performedBy} • {activity?.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Show More/Less Button */}
        {activities?.length > 5 && (
          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllActivities(!showAllActivities)}
              iconName={showAllActivities ? 'ChevronUp' : 'ChevronDown'}
              iconPosition="right"
            >
              {showAllActivities 
                ? `Show Less (${activities?.length - 5} hidden)` 
                : `Show All Activities (${activities?.length - 5} more)`
              }
            </Button>
          </div>
        )}

        {/* Timeline Summary */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-lg font-semibold text-foreground">
                {activities?.length}
              </div>
              <div className="text-xs text-muted-foreground">
                Total Activities
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-lg font-semibold text-foreground">
                {activities?.filter(a => a?.type === 'status_updated')?.length}
              </div>
              <div className="text-xs text-muted-foreground">
                Status Updates
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-lg font-semibold text-foreground">
                {activities?.filter(a => a?.performedBy !== 'System')?.length}
              </div>
              <div className="text-xs text-muted-foreground">
                Manual Actions
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-lg font-semibold text-foreground">
                {Math.ceil((new Date() - new Date(issue.reportedAt)) / (1000 * 60 * 60 * 24))}
              </div>
              <div className="text-xs text-muted-foreground">
                Days Active
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityTimeline;