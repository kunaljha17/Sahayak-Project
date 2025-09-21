import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import NotificationBadge from '../../../components/ui/NotificationBadge';

const NotificationPanel = ({ className = '' }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock notifications data
  const mockNotifications = [
    {
      id: 1,
      type: 'new_assignment',
      title: 'New Issue Assigned',
      message: 'High priority road repair issue assigned to you in Ranchi Central',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      isRead: false,
      priority: 'high',
      issueId: 'ISS-2024-001'
    },
    {
      id: 2,
      type: 'citizen_feedback',
      title: 'Citizen Feedback Received',
      message: 'Positive feedback received for water supply issue resolution',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      isRead: false,
      priority: 'medium',
      issueId: 'ISS-2024-002'
    },
    {
      id: 3,
      type: 'deadline_reminder',
      title: 'Deadline Reminder',
      message: 'Street light repair due in 2 hours - Kanke Road',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      isRead: true,
      priority: 'high',
      issueId: 'ISS-2024-003'
    },
    {
      id: 4,
      type: 'status_update',
      title: 'Status Update Required',
      message: 'Please update status for sanitation issue in Doranda',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      isRead: false,
      priority: 'medium',
      issueId: 'ISS-2024-004'
    },
    {
      id: 5,
      type: 'system_alert',
      title: 'System Maintenance',
      message: 'Scheduled maintenance tonight from 11 PM to 2 AM',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      isRead: true,
      priority: 'low',
      issueId: null
    }
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications?.filter(n => !n?.isRead)?.length);
  }, []);

  const notificationIcons = {
    new_assignment: 'UserPlus',
    citizen_feedback: 'MessageSquare',
    deadline_reminder: 'Clock',
    status_update: 'Edit3',
    system_alert: 'Bell'
  };

  const priorityColors = {
    high: 'text-red-600 bg-red-50 border-red-200',
    medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    low: 'text-green-600 bg-green-50 border-green-200'
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev?.map(n => 
        n?.id === notificationId ? { ...n, isRead: true } : n
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev?.map(n => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };

  const handleNotificationClick = (notification) => {
    if (!notification?.isRead) {
      markAsRead(notification?.id);
    }
    
    if (notification?.issueId) {
      // Navigate to issue details
      console.log(`Navigating to issue: ${notification?.issueId}`);
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Bell" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Notifications</h3>
          <NotificationBadge count={unreadCount} variant="error" />
        </div>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
            >
              Mark All Read
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden"
          />
        </div>
      </div>
      {/* Notifications List */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block max-h-96 overflow-y-auto`}>
        {notifications?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No notifications</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {notifications?.map((notification) => (
              <div
                key={notification?.id}
                onClick={() => handleNotificationClick(notification)}
                className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors duration-150 ${
                  !notification?.isRead ? 'bg-blue-50/50' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    priorityColors?.[notification?.priority]
                  }`}>
                    <Icon 
                      name={notificationIcons?.[notification?.type]} 
                      size={16} 
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-medium ${
                        !notification?.isRead ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {notification?.title}
                      </h4>
                      {!notification?.isRead && (
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {notification?.message}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">
                        {getTimeAgo(notification?.timestamp)}
                      </span>
                      {notification?.issueId && (
                        <span className="text-xs text-primary font-medium">
                          {notification?.issueId}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Footer */}
      {notifications?.length > 0 && (
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            iconName="ExternalLink"
            iconPosition="right"
          >
            View All Notifications
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;