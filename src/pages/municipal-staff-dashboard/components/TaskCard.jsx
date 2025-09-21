import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const TaskCard = ({ 
  task, 
  onStatusUpdate, 
  onViewDetails, 
  onContactCitizen,
  className = '' 
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(task?.status);

  const statusOptions = [
    { value: 'assigned', label: 'Assigned' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' }
  ];

  const priorityConfig = {
    high: { color: 'text-red-600 bg-red-50', icon: 'AlertTriangle' },
    medium: { color: 'text-yellow-600 bg-yellow-50', icon: 'Clock' },
    low: { color: 'text-green-600 bg-green-50', icon: 'CheckCircle' }
  };

  const categoryIcons = {
    'Roads': 'Car',
    'Sanitation': 'Trash2',
    'Electricity': 'Zap',
    'Water': 'Droplets',
    'Street Lights': 'Lightbulb',
    'Parks': 'Trees',
    'Other': 'AlertCircle'
  };

  const handleStatusChange = async (newStatus) => {
    setIsUpdating(true);
    try {
      await onStatusUpdate(task?.id, newStatus);
      setSelectedStatus(newStatus);
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  const priority = priorityConfig?.[task?.priority] || priorityConfig?.medium;

  return (
    <div className={`bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200 ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon 
              name={categoryIcons?.[task?.category] || 'AlertCircle'} 
              size={20} 
              className="text-primary" 
            />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm">
              {task?.title}
            </h3>
            <p className="text-xs text-muted-foreground">
              ID: {task?.id} • {task?.category}
            </p>
          </div>
        </div>
        
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${priority?.color} flex items-center space-x-1`}>
          <Icon name={priority?.icon} size={12} />
          <span>{task?.priority?.toUpperCase()}</span>
        </div>
      </div>
      {/* Description */}
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {task?.description}
      </p>
      {/* Location and Time */}
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
        <div className="flex items-center space-x-1">
          <Icon name="MapPin" size={12} />
          <span>{task?.location}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Clock" size={12} />
          <span>{getTimeAgo(task?.createdAt)}</span>
        </div>
      </div>
      {/* Images */}
      {task?.images && task?.images?.length > 0 && (
        <div className="flex space-x-2 mb-3 overflow-x-auto">
          {task?.images?.slice(0, 3)?.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
              <Image
                src={image}
                alt={`Issue ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {task?.images?.length > 3 && (
            <div className="flex-shrink-0 w-16 h-16 bg-muted rounded-md flex items-center justify-center">
              <span className="text-xs text-muted-foreground">
                +{task?.images?.length - 3}
              </span>
            </div>
          )}
        </div>
      )}
      {/* Citizen Info */}
      <div className="flex items-center space-x-2 mb-3 p-2 bg-muted/50 rounded-md">
        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
          <Icon name="User" size={12} className="text-primary-foreground" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-medium text-foreground">{task?.citizenName}</p>
          <p className="text-xs text-muted-foreground">{task?.citizenPhone}</p>
        </div>
        <Button
          variant="ghost"
          size="xs"
          iconName="Phone"
          onClick={() => onContactCitizen(task)}
          className="text-primary hover:text-primary/80"
        />
      </div>
      {/* Status Update */}
      <div className="mb-3">
        <Select
          label="Status"
          options={statusOptions}
          value={selectedStatus}
          onChange={handleStatusChange}
          disabled={isUpdating}
          className="text-xs"
        />
      </div>
      {/* Actions */}
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Eye"
          iconPosition="left"
          onClick={() => onViewDetails(task)}
          className="flex-1"
        >
          View Details
        </Button>
        <Button
          variant="default"
          size="sm"
          iconName="MessageSquare"
          iconPosition="left"
          onClick={() => onContactCitizen(task)}
          className="flex-1"
        >
          Contact
        </Button>
      </div>
      {/* Estimated Resolution */}
      {task?.estimatedResolution && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Est. Resolution:</span>
            <span className="font-medium text-foreground">
              {new Date(task.estimatedResolution)?.toLocaleDateString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;