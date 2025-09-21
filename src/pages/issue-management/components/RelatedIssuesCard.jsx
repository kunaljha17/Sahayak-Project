import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const RelatedIssuesCard = ({ currentIssue, onNavigateToIssue }) => {
  const [showAllRelated, setShowAllRelated] = useState(false);

  const relatedIssues = [
    {
      id: 'ISS-2024-0892',
      title: 'Pothole on Main Street near Bus Stop',
      status: 'in-progress',
      priority: 'high',
      location: { address: 'Main Street, Sector 5, Ranchi', distance: '0.2 km' },
      reportedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      reportedBy: 'Anita Kumari',
      votes: 23,
      similarity: 95,
      thumbnail: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'ISS-2024-0876',
      title: 'Road Damage After Heavy Rain',
      status: 'assigned',
      priority: 'medium',
      location: { address: 'Station Road, Ranchi', distance: '0.5 km' },
      reportedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      reportedBy: 'Rajesh Singh',
      votes: 18,
      similarity: 87,
      thumbnail: 'https://images.pexels.com/photos/2448749/pexels-photo-2448749.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'ISS-2024-0845',
      title: 'Multiple Potholes on Ring Road',
      status: 'resolved',
      priority: 'high',
      location: { address: 'Ring Road, Doranda, Ranchi', distance: '1.2 km' },
      reportedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      reportedBy: 'Priya Sharma',
      votes: 45,
      similarity: 82,
      thumbnail: 'https://images.pexels.com/photos/1029600/pexels-photo-1029600.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'ISS-2024-0823',
      title: 'Road Surface Deterioration',
      status: 'submitted',
      priority: 'low',
      location: { address: 'College Road, Ranchi', distance: '2.1 km' },
      reportedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      reportedBy: 'Vikash Kumar',
      votes: 12,
      similarity: 78,
      thumbnail: 'https://images.pexels.com/photos/1029608/pexels-photo-1029608.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const statusColors = {
    'submitted': 'bg-blue-100 text-blue-800',
    'assigned': 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-orange-100 text-orange-800',
    'resolved': 'bg-green-100 text-green-800'
  };

  const priorityColors = {
    'low': 'bg-gray-100 text-gray-800',
    'medium': 'bg-yellow-100 text-yellow-800',
    'high': 'bg-red-100 text-red-800'
  };

  const displayedIssues = showAllRelated ? relatedIssues : relatedIssues?.slice(0, 3);

  const handleBulkAction = (action) => {
    console.log(`Performing bulk action: ${action} on related issues`);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-civic-sm">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground flex items-center space-x-2">
              <Icon name="Link" size={20} />
              <span>Related Issues</span>
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Similar issues in the same area or category
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              onClick={() => console.log('Creating bulk issue')}
            >
              Bulk Create
            </Button>
          </div>
        </div>
      </div>
      {/* Related Issues List */}
      <div className="p-6">
        <div className="space-y-4">
          {displayedIssues?.map((issue) => (
            <div
              key={issue?.id}
              className="border border-border rounded-lg p-4 hover:shadow-civic-sm transition-shadow duration-200 cursor-pointer"
              onClick={() => onNavigateToIssue(issue?.id)}
            >
              <div className="flex items-start space-x-4">
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={issue?.thumbnail}
                    alt={issue?.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Issue Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-sm font-medium text-foreground truncate">
                          {issue?.title}
                        </h4>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Icon name="Zap" size={12} />
                          <span>{issue?.similarity}% match</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xs text-muted-foreground">#{issue?.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors?.[issue?.status]}`}>
                          {issue?.status?.charAt(0)?.toUpperCase() + issue?.status?.slice(1)?.replace('-', ' ')}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityColors?.[issue?.priority]}`}>
                          {issue?.priority?.charAt(0)?.toUpperCase() + issue?.priority?.slice(1)}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="MapPin" size={12} />
                          <span>{issue?.location?.address}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Navigation" size={12} />
                          <span>{issue?.location?.distance} away</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Icon name="ThumbsUp" size={12} />
                        <span>{issue?.votes}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="ExternalLink"
                        className="p-1 h-auto"
                        onClick={(e) => {
                          e?.stopPropagation();
                          onNavigateToIssue(issue?.id);
                        }}
                      />
                    </div>
                  </div>

                  {/* Reporter and Date */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Icon name="User" size={12} />
                      <span>Reported by {issue?.reportedBy}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(issue.reportedAt)?.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More/Less */}
        {relatedIssues?.length > 3 && (
          <div className="mt-4 text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllRelated(!showAllRelated)}
              iconName={showAllRelated ? 'ChevronUp' : 'ChevronDown'}
              iconPosition="right"
            >
              {showAllRelated 
                ? `Show Less (${relatedIssues?.length - 3} hidden)` 
                : `Show All Related (${relatedIssues?.length - 3} more)`
              }
            </Button>
          </div>
        )}

        {/* Bulk Actions */}
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="font-medium text-foreground mb-3">Bulk Actions</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Users"
              iconPosition="left"
              onClick={() => handleBulkAction('assign_same_staff')}
            >
              Same Staff
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              iconPosition="left"
              onClick={() => handleBulkAction('update_status')}
            >
              Update Status
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="MessageSquare"
              iconPosition="left"
              onClick={() => handleBulkAction('send_update')}
            >
              Send Update
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Merge"
              iconPosition="left"
              onClick={() => handleBulkAction('merge_issues')}
            >
              Merge Issues
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-lg font-semibold text-foreground">
                {relatedIssues?.length}
              </div>
              <div className="text-xs text-muted-foreground">
                Related Issues
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-lg font-semibold text-foreground">
                {relatedIssues?.filter(i => i?.status === 'resolved')?.length}
              </div>
              <div className="text-xs text-muted-foreground">
                Resolved
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-lg font-semibold text-foreground">
                {Math.round(relatedIssues?.reduce((sum, i) => sum + i?.similarity, 0) / relatedIssues?.length)}%
              </div>
              <div className="text-xs text-muted-foreground">
                Avg Similarity
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-lg font-semibold text-foreground">
                {relatedIssues?.reduce((sum, i) => sum + i?.votes, 0)}
              </div>
              <div className="text-xs text-muted-foreground">
                Total Votes
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedIssuesCard;