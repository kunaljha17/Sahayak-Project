import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const IssueDetailsCard = ({ issue, onStatusUpdate, onAssignStaff, onAddNote }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const statusColors = {
    'submitted': 'bg-blue-100 text-blue-800',
    'assigned': 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-orange-100 text-orange-800',
    'resolved': 'bg-green-100 text-green-800'
  };

  const priorityColors = {
    'low': 'bg-gray-100 text-gray-800',
    'medium': 'bg-yellow-100 text-yellow-800',
    'high': 'bg-red-100 text-red-800',
    'critical': 'bg-red-200 text-red-900'
  };

  const nextImage = () => {
    if (issue?.media && issue?.media?.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % issue?.media?.length);
    }
  };

  const prevImage = () => {
    if (issue?.media && issue?.media?.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + issue?.media?.length) % issue?.media?.length);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-civic-sm">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-xl font-heading font-semibold text-foreground">
                Issue #{issue?.id}
              </h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors?.[issue?.status]}`}>
                {issue?.status?.charAt(0)?.toUpperCase() + issue?.status?.slice(1)?.replace('-', ' ')}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${priorityColors?.[issue?.priority]}`}>
                {issue?.priority?.charAt(0)?.toUpperCase() + issue?.priority?.slice(1)} Priority
              </span>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              {issue?.title}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="User" size={16} />
                <span>{issue?.reportedBy}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={16} />
                <span>{new Date(issue.reportedAt)?.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={16} />
                <span>{issue?.location?.address}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Icon name="ThumbsUp" size={16} />
              <span>{issue?.votes}</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Icon name="Eye" size={16} />
              <span>{issue?.views}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Media Section */}
          {issue?.media && issue?.media?.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Attached Media</h4>
              <div className="relative">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={issue?.media?.[currentImageIndex]?.url}
                    alt={`Issue media ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                {issue?.media?.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      <Icon name="ChevronLeft" size={16} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      <Icon name="ChevronRight" size={16} />
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                      {issue?.media?.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                {issue?.media?.length} image{issue?.media?.length > 1 ? 's' : ''} attached
              </div>
            </div>
          )}

          {/* Location Map */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Location</h4>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title={issue?.location?.address}
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${issue?.location?.lat},${issue?.location?.lng}&z=16&output=embed`}
                className="border-0"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={14} />
                <span>{issue?.location?.address}</span>
              </div>
              <div className="mt-1">
                Coordinates: {issue?.location?.lat}, {issue?.location?.lng}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 space-y-4">
          <h4 className="font-medium text-foreground">Issue Description</h4>
          <div className="bg-muted rounded-lg p-4">
            <p className="text-foreground leading-relaxed">
              {showFullDescription ? issue?.description : `${issue?.description?.substring(0, 300)}${issue?.description?.length > 300 ? '...' : ''}`}
            </p>
            {issue?.description?.length > 300 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="mt-2 p-0 h-auto text-primary hover:text-primary/80"
              >
                {showFullDescription ? 'Show Less' : 'Show More'}
              </Button>
            )}
          </div>
        </div>

        {/* Category and Tags */}
        <div className="mt-6 space-y-4">
          <h4 className="font-medium text-foreground">Category & Tags</h4>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {issue?.category}
            </span>
            {issue?.tags && issue?.tags?.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Community Engagement */}
        <div className="mt-6 space-y-4">
          <h4 className="font-medium text-foreground">Community Engagement</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-foreground">{issue?.votes}</div>
              <div className="text-sm text-muted-foreground">Votes</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-foreground">{issue?.views}</div>
              <div className="text-sm text-muted-foreground">Views</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-foreground">{issue?.comments || 0}</div>
              <div className="text-sm text-muted-foreground">Comments</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetailsCard;