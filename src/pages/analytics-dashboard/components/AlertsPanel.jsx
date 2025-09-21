import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertsPanel = ({ alerts, loading = false, className = '' }) => {
  const [selectedAlert, setSelectedAlert] = useState(null);

  const mockAlerts = [
    {
      id: 1,
      type: 'performance',
      severity: 'high',
      title: 'Response Time Exceeded',
      message: 'Average response time in Central Ranchi has exceeded 4 days for the past week.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      area: 'Central Ranchi',
      category: 'Roads & Infrastructure',
      actionRequired: true,
      acknowledged: false
    },
    {
      id: 2,
      type: 'volume',
      severity: 'medium',
      title: 'Issue Volume Spike',
      message: 'Water supply complaints have increased by 45% compared to last month.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      area: 'Doranda',
      category: 'Water Supply',
      actionRequired: false,
      acknowledged: true
    },
    {
      id: 3,
      type: 'staff',
      severity: 'medium',
      title: 'Staff Availability Low',
      message: 'Only 3 out of 8 field officers are currently active in Kanke area.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      area: 'Kanke',
      category: 'General',
      actionRequired: true,
      acknowledged: false
    },
    {
      id: 4,
      type: 'trend',
      severity: 'low',
      title: 'Positive Trend Detected',
      message: 'Sanitation issue resolution rate has improved by 12% this month.',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      area: 'All Areas',
      category: 'Sanitation',
      actionRequired: false,
      acknowledged: true
    }
  ];

  const alertData = alerts || mockAlerts;

  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'high':
        return {
          color: 'text-error',
          bgColor: 'bg-error/10',
          borderColor: 'border-error/20',
          icon: 'AlertTriangle'
        };
      case 'medium':
        return {
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          icon: 'AlertCircle'
        };
      case 'low':
        return {
          color: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20',
          icon: 'Info'
        };
      default:
        return {
          color: 'text-muted-foreground',
          bgColor: 'bg-muted/10',
          borderColor: 'border-muted/20',
          icon: 'Bell'
        };
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'performance':
        return 'TrendingDown';
      case 'volume':
        return 'BarChart3';
      case 'staff':
        return 'Users';
      case 'trend':
        return 'TrendingUp';
      default:
        return 'Bell';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return 'Just now';
    }
  };

  const handleAcknowledge = (alertId) => {
    console.log(`Acknowledging alert ${alertId}`);
    // Update alert acknowledgment status
  };

  const handleTakeAction = (alertId) => {
    console.log(`Taking action on alert ${alertId}`);
    // Navigate to relevant action page or open modal
  };

  if (loading) {
    return (
      <div className={`civic-card p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-48 mb-4"></div>
          <div className="space-y-3">
            {[...Array(4)]?.map((_, i) => (
              <div key={i} className="h-16 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const unacknowledgedAlerts = alertData?.filter(alert => !alert?.acknowledged);
  const acknowledgedAlerts = alertData?.filter(alert => alert?.acknowledged);

  return (
    <div className={`civic-card ${className}`}>
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Bell" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground font-heading">
              System Alerts
            </h3>
            {unacknowledgedAlerts?.length > 0 && (
              <span className="bg-error text-error-foreground text-xs px-2 py-1 rounded-full font-medium">
                {unacknowledgedAlerts?.length}
              </span>
            )}
          </div>
          <Button variant="outline" size="sm" iconName="Settings">
            Configure
          </Button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {/* Unacknowledged Alerts */}
        {unacknowledgedAlerts?.length > 0 && (
          <div className="p-4 border-b border-border">
            <h4 className="text-sm font-medium text-foreground mb-3 font-caption">
              Requires Attention ({unacknowledgedAlerts?.length})
            </h4>
            <div className="space-y-3">
              {unacknowledgedAlerts?.map((alert) => {
                const severityConfig = getSeverityConfig(alert?.severity);
                return (
                  <div
                    key={alert?.id}
                    className={`p-4 rounded-lg border-l-4 ${severityConfig?.bgColor} ${severityConfig?.borderColor} civic-hover cursor-pointer`}
                    onClick={() => setSelectedAlert(selectedAlert === alert?.id ? null : alert?.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <Icon 
                          name={getTypeIcon(alert?.type)} 
                          size={16} 
                          className={severityConfig?.color} 
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h5 className="font-medium text-foreground text-sm">
                              {alert?.title}
                            </h5>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${severityConfig?.color} ${severityConfig?.bgColor}`}>
                              {alert?.severity?.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {alert?.message}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground font-caption">
                            <span>{formatTimestamp(alert?.timestamp)}</span>
                            <span>•</span>
                            <span>{alert?.area}</span>
                            <span>•</span>
                            <span>{alert?.category}</span>
                          </div>
                        </div>
                      </div>
                      <Icon 
                        name={selectedAlert === alert?.id ? 'ChevronUp' : 'ChevronDown'} 
                        size={16} 
                        className="text-muted-foreground" 
                      />
                    </div>
                    {selectedAlert === alert?.id && (
                      <div className="mt-4 pt-4 border-t border-border/50">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e?.stopPropagation();
                              handleAcknowledge(alert?.id);
                            }}
                            iconName="Check"
                          >
                            Acknowledge
                          </Button>
                          {alert?.actionRequired && (
                            <Button
                              variant="default"
                              size="sm"
                              onClick={(e) => {
                                e?.stopPropagation();
                                handleTakeAction(alert?.id);
                              }}
                              iconName="ArrowRight"
                            >
                              Take Action
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Acknowledged Alerts */}
        {acknowledgedAlerts?.length > 0 && (
          <div className="p-4">
            <h4 className="text-sm font-medium text-muted-foreground mb-3 font-caption">
              Recent Activity ({acknowledgedAlerts?.length})
            </h4>
            <div className="space-y-2">
              {acknowledgedAlerts?.map((alert) => {
                const severityConfig = getSeverityConfig(alert?.severity);
                return (
                  <div
                    key={alert?.id}
                    className="p-3 rounded-lg bg-muted/30 border border-border/50"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon 
                        name={getTypeIcon(alert?.type)} 
                        size={14} 
                        className="text-muted-foreground" 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h5 className="font-medium text-foreground text-sm">
                            {alert?.title}
                          </h5>
                          <Icon name="Check" size={12} className="text-success" />
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground font-caption">
                          <span>{formatTimestamp(alert?.timestamp)}</span>
                          <span>•</span>
                          <span>{alert?.area}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {alertData?.length === 0 && (
          <div className="p-8 text-center">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">All Clear!</h4>
            <p className="text-sm text-muted-foreground">
              No alerts or issues requiring attention at this time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPanel;