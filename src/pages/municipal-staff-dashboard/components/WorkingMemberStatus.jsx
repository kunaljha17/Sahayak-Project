import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WorkingMemberStatus = ({ className = '' }) => {
  const [fieldOfficers, setFieldOfficers] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock field officers data
  const mockFieldOfficers = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      role: 'Field Inspector',
      status: 'active',
      currentTask: 'Road repair inspection - Main Road',
      location: 'Ranchi Central',
      lastUpdate: new Date(Date.now() - 300000), // 5 minutes ago
      tasksCompleted: 3,
      tasksAssigned: 5,
      phone: '+91 9876543210',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 2,
      name: 'Priya Singh',
      role: 'Sanitation Officer',
      status: 'active',
      currentTask: 'Waste collection monitoring - Sector 2',
      location: 'Ranchi North',
      lastUpdate: new Date(Date.now() - 600000), // 10 minutes ago
      tasksCompleted: 4,
      tasksAssigned: 6,
      phone: '+91 9876543211',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 3,
      name: 'Amit Sharma',
      role: 'Electrical Technician',
      status: 'break',
      currentTask: 'Street light maintenance - Park Street',
      location: 'Ranchi South',
      lastUpdate: new Date(Date.now() - 900000), // 15 minutes ago
      tasksCompleted: 2,
      tasksAssigned: 4,
      phone: '+91 9876543212',
      avatar: 'https://randomuser.me/api/portraits/men/56.jpg'
    },
    {
      id: 4,
      name: 'Sunita Devi',
      role: 'Water Supply Inspector',
      status: 'offline',
      currentTask: null,
      location: 'Ranchi East',
      lastUpdate: new Date(Date.now() - 3600000), // 1 hour ago
      tasksCompleted: 5,
      tasksAssigned: 5,
      phone: '+91 9876543213',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    {
      id: 5,
      name: 'Vikash Mahto',
      role: 'General Inspector',
      status: 'active',
      currentTask: 'Park maintenance check - Tagore Hill',
      location: 'Ranchi West',
      lastUpdate: new Date(Date.now() - 180000), // 3 minutes ago
      tasksCompleted: 1,
      tasksAssigned: 3,
      phone: '+91 9876543214',
      avatar: 'https://randomuser.me/api/portraits/men/78.jpg'
    }
  ];

  useEffect(() => {
    setFieldOfficers(mockFieldOfficers);
  }, []);

  const statusConfig = {
    active: {
      color: 'text-green-600 bg-green-100',
      icon: 'CheckCircle',
      label: 'Active'
    },
    break: {
      color: 'text-yellow-600 bg-yellow-100',
      icon: 'Clock',
      label: 'On Break'
    },
    offline: {
      color: 'text-gray-600 bg-gray-100',
      icon: 'Circle',
      label: 'Offline'
    }
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

  const getProgressPercentage = (completed, total) => {
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const handleContactOfficer = (officer) => {
    console.log(`Contacting ${officer?.name} at ${officer?.phone}`);
  };

  const handleAssignTask = (officer) => {
    console.log(`Assigning task to ${officer?.name}`);
  };

  const activeOfficers = fieldOfficers?.filter(o => o?.status === 'active')?.length;
  const totalOfficers = fieldOfficers?.length;

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Field Officers</h3>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            {activeOfficers}/{totalOfficers} Active
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
          onClick={() => setIsExpanded(!isExpanded)}
          className="lg:hidden"
        />
      </div>
      {/* Officers List */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block max-h-96 overflow-y-auto`}>
        <div className="divide-y divide-border">
          {fieldOfficers?.map((officer) => {
            const status = statusConfig?.[officer?.status];
            const progress = getProgressPercentage(officer?.tasksCompleted, officer?.tasksAssigned);
            
            return (
              <div key={officer?.id} className="p-4 hover:bg-muted/50 transition-colors duration-150">
                <div className="flex items-start space-x-3">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center overflow-hidden">
                      <Icon name="User" size={20} className="text-primary-foreground" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      officer?.status === 'active' ? 'bg-green-500' :
                      officer?.status === 'break' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`} />
                  </div>

                  {/* Officer Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-foreground">
                        {officer?.name}
                      </h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${status?.color}`}>
                        <Icon name={status?.icon} size={12} className="mr-1" />
                        {status?.label}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground mt-1">
                      {officer?.role} • {officer?.location}
                    </p>

                    {/* Current Task */}
                    {officer?.currentTask && (
                      <p className="text-xs text-foreground mt-1 line-clamp-1">
                        <Icon name="MapPin" size={12} className="inline mr-1" />
                        {officer?.currentTask}
                      </p>
                    )}

                    {/* Progress Bar */}
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>Tasks: {officer?.tasksCompleted}/{officer?.tasksAssigned}</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-primary h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Last Update */}
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">
                        Last update: {getTimeAgo(officer?.lastUpdate)}
                      </span>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="xs"
                          iconName="Phone"
                          onClick={() => handleContactOfficer(officer)}
                          className="text-primary hover:text-primary/80"
                        />
                        <Button
                          variant="ghost"
                          size="xs"
                          iconName="Plus"
                          onClick={() => handleAssignTask(officer)}
                          className="text-primary hover:text-primary/80"
                          disabled={officer?.status === 'offline'}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          fullWidth
          iconName="UserPlus"
          iconPosition="left"
        >
          Manage Field Officers
        </Button>
      </div>
    </div>
  );
};

export default WorkingMemberStatus;