import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const IssueCard = ({ 
  issue, 
  onVote, 
  onViewDetails, 
  onLike,
  currentLanguage = 'en' 
}) => {
  const [isLiked, setIsLiked] = useState(issue?.isLiked || false);
  const [likeCount, setLikeCount] = useState(issue?.likes || 0);
  const [voteCount, setVoteCount] = useState(issue?.votes || 0);
  const [hasVoted, setHasVoted] = useState(issue?.hasVoted || false);

  const statusConfig = {
    submitted: {
      color: 'bg-blue-100 text-blue-800',
      icon: 'Clock',
      label: currentLanguage === 'en' ? 'Submitted' : 'प्रस्तुत'
    },
    assigned: {
      color: 'bg-yellow-100 text-yellow-800',
      icon: 'UserCheck',
      label: currentLanguage === 'en' ? 'Assigned' : 'सौंपा गया'
    },
    'in-progress': {
      color: 'bg-orange-100 text-orange-800',
      icon: 'Wrench',
      label: currentLanguage === 'en' ? 'In Progress' : 'प्रगति में'
    },
    resolved: {
      color: 'bg-green-100 text-green-800',
      icon: 'CheckCircle',
      label: currentLanguage === 'en' ? 'Resolved' : 'हल हो गया'
    }
  };

  const categoryIcons = {
    'roads': 'Car',
    'sanitation': 'Trash2',
    'electricity': 'Zap',
    'water': 'Droplets',
    'other': 'AlertCircle'
  };

  const handleLike = () => {
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    setLikeCount(prev => newLiked ? prev + 1 : prev - 1);
    onLike?.(issue?.id, newLiked);
  };

  const handleVote = () => {
    if (!hasVoted) {
      setHasVoted(true);
      setVoteCount(prev => prev + 1);
      onVote?.(issue?.id);
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString(currentLanguage === 'en' ? 'en-IN' : 'hi-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const status = statusConfig?.[issue?.status] || statusConfig?.submitted;

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 civic-card">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
              <Icon 
                name={categoryIcons?.[issue?.category] || 'AlertCircle'} 
                size={20} 
                className="text-muted-foreground" 
              />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm line-clamp-1">
                {issue?.title}
              </h3>
              <p className="text-xs text-muted-foreground font-caption">
                {currentLanguage === 'en' ? 'Issue ID:' : 'समस्या ID:'} #{issue?.id}
              </p>
            </div>
          </div>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${status?.color}`}>
            <Icon name={status?.icon} size={12} className="mr-1" />
            {status?.label}
          </span>
        </div>

        {/* Image Thumbnail */}
        {issue?.image && (
          <div className="mb-3 overflow-hidden rounded-md">
            <Image
              src={issue?.image}
              alt={issue?.title}
              className="w-full h-32 object-cover hover:scale-105 transition-transform duration-200"
            />
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {issue?.description}
        </p>

        {/* Location & Date */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={12} />
            <span className="font-caption">{issue?.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={12} />
            <span className="font-caption">{formatDate(issue?.submittedAt)}</span>
          </div>
        </div>

        {/* Assigned Staff */}
        {issue?.assignedTo && (
          <div className="flex items-center space-x-2 mb-3 p-2 bg-muted rounded-md">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={12} className="text-primary-foreground" />
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">
                {currentLanguage === 'en' ? 'Assigned to:' : 'सौंपा गया:'} {issue?.assignedTo?.name}
              </p>
              <p className="text-xs text-muted-foreground font-caption">
                {issue?.assignedTo?.department}
              </p>
            </div>
          </div>
        )}

        {/* Progress Timeline */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-foreground">
              {currentLanguage === 'en' ? 'Progress' : 'प्रगति'}
            </span>
            <span className="text-xs text-muted-foreground font-caption">
              {issue?.progressPercentage || 0}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300 status-progress"
              style={{ width: `${issue?.progressPercentage || 0}%` }}
            ></div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Like Button */}
            <button
              onClick={handleLike}
              className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-foreground civic-hover transition-colors duration-150"
            >
              <Icon 
                name={isLiked ? 'Heart' : 'Heart'} 
                size={14} 
                className={isLiked ? 'text-red-500 fill-current' : ''} 
              />
              <span className="font-caption">{likeCount}</span>
            </button>

            {/* Vote Button */}
            <button
              onClick={handleVote}
              disabled={hasVoted}
              className={`flex items-center space-x-1 text-xs transition-colors duration-150 ${
                hasVoted 
                  ? 'text-primary cursor-not-allowed' :'text-muted-foreground hover:text-foreground civic-hover'
              }`}
            >
              <Icon 
                name="TrendingUp" 
                size={14} 
                className={hasVoted ? 'text-primary' : ''} 
              />
              <span className="font-caption">{voteCount}</span>
            </button>

            {/* Priority Indicator */}
            {issue?.priority === 'high' && (
              <div className="flex items-center space-x-1">
                <Icon name="AlertTriangle" size={14} className="text-warning" />
                <span className="text-xs text-warning font-caption">
                  {currentLanguage === 'en' ? 'High Priority' : 'उच्च प्राथमिकता'}
                </span>
              </div>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails?.(issue)}
            iconName="Eye"
            iconPosition="left"
            className="text-xs"
          >
            {currentLanguage === 'en' ? 'View Details' : 'विवरण देखें'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;