import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import IssueDetailsCard from './components/IssueDetailsCard';
import ManagementPanel from './components/ManagementPanel';
import ActivityTimeline from './components/ActivityTimeline';
import CommunicationPanel from './components/CommunicationPanel';
import RelatedIssuesCard from './components/RelatedIssuesCard';

const IssueManagement = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedIssueId, setSelectedIssueId] = useState('ISS-2024-0891');
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState('detailed'); // detailed, compact

  // Mock issue data
  const mockIssue = {
    id: 'ISS-2024-0891',
    title: 'Large Pothole on Main Road Causing Traffic Issues',
    description: `There is a very large pothole on the main road near the market area that has been causing significant traffic problems. The pothole is approximately 3 feet wide and 1 foot deep, making it dangerous for vehicles, especially two-wheelers.\n\nThe issue has worsened after the recent heavy rains, and water accumulates in the pothole making it even more hazardous. Several minor accidents have occurred due to vehicles trying to avoid the pothole.\n\nThis is a high-traffic area with schools and offices nearby, so immediate attention is required. The pothole is located right in front of the State Bank branch, making it a critical location for repair.\n\nLocal residents and commuters are facing daily inconvenience, and the situation becomes worse during peak hours when traffic congestion increases due to vehicles avoiding the damaged area.`,
    status: 'assigned',
    priority: 'high',
    category: 'Roads & Infrastructure',
    tags: ['pothole', 'traffic', 'safety', 'urgent'],
    reportedBy: 'Ramesh Kumar',
    reporterEmail: 'ramesh.kumar@email.com',
    reporterPhone: '+91 9876543210',
    reportedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    assignedTo: 'staff-001',
    estimatedResolution: 5,
    location: {
      address: 'Main Road, Near State Bank, Sector 3, Ranchi, Jharkhand',
      lat: 23.3441,
      lng: 85.3096
    },
    media: [
      {
        id: 1,
        type: 'image',
        url: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800',
        caption: 'Large pothole on main road'
      },
      {
        id: 2,
        type: 'image',
        url: 'https://images.pexels.com/photos/2448749/pexels-photo-2448749.jpeg?auto=compress&cs=tinysrgb&w=800',
        caption: 'Water accumulation in pothole'
      },
      {
        id: 3,
        type: 'image',
        url: 'https://images.pexels.com/photos/1029600/pexels-photo-1029600.jpeg?auto=compress&cs=tinysrgb&w=800',
        caption: 'Traffic congestion due to pothole'
      }
    ],
    votes: 47,
    views: 234,
    comments: 12
  };

  // Mock activity timeline data
  const mockActivities = [
    {
      id: 1,
      type: 'created',
      title: 'Issue Reported',
      description: 'New issue reported by citizen',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      performedBy: 'Ramesh Kumar',
      role: 'Citizen',
      isSystemGenerated: false,
      details: null
    },
    {
      id: 2,
      type: 'assigned',
      title: 'Issue Assigned',
      description: 'Issue assigned to field staff member',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      performedBy: 'System',
      role: 'System',
      isSystemGenerated: true,
      details: {
        assignedTo: 'Rajesh Kumar - Senior Field Officer'
      }
    },
    {
      id: 3,
      type: 'status_updated',
      title: 'Status Updated',
      description: 'Issue status changed from submitted to assigned',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      performedBy: 'Priya Sharma',
      role: 'Municipal Staff',
      isSystemGenerated: false,
      details: {
        oldValue: 'Submitted',
        newValue: 'Assigned',
        note: 'Assigned to road maintenance team for immediate action'
      }
    },
    {
      id: 4,
      type: 'note_added',
      title: 'Internal Note Added',
      description: 'Staff member added internal coordination note',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      performedBy: 'Rajesh Kumar',
      role: 'Field Officer',
      isSystemGenerated: false,
      details: {
        note: 'Site inspection completed. Materials required: 2 bags cement, 1 truck gravel. Estimated completion: 2 days.'
      }
    },
    {
      id: 5,
      type: 'media_uploaded',
      title: 'Progress Photos Uploaded',
      description: 'Field officer uploaded progress documentation',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      performedBy: 'Rajesh Kumar',
      role: 'Field Officer',
      isSystemGenerated: false,
      details: null
    },
    {
      id: 6,
      type: 'status_updated',
      title: 'Status Updated',
      description: 'Work has begun on the issue',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      performedBy: 'Rajesh Kumar',
      role: 'Field Officer',
      isSystemGenerated: false,
      details: {
        oldValue: 'Assigned',
        newValue: 'In Progress',
        note: 'Road repair work started. Traffic diversion in place.'
      }
    }
  ];

  // Mock recent issues for quick navigation
  const recentIssues = [
    { value: 'ISS-2024-0891', label: 'ISS-2024-0891 - Large Pothole on Main Road' },
    { value: 'ISS-2024-0890', label: 'ISS-2024-0890 - Broken Street Light' },
    { value: 'ISS-2024-0889', label: 'ISS-2024-0889 - Garbage Collection Delay' },
    { value: 'ISS-2024-0888', label: 'ISS-2024-0888 - Water Supply Disruption' },
    { value: 'ISS-2024-0887', label: 'ISS-2024-0887 - Drainage Blockage' }
  ];

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('sahayak-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Listen for language change events
    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const handleStatusUpdate = async (issueId, newStatus, options = {}) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Status updated:', { issueId, newStatus, options });
      
      // In real app, this would update the issue data
      mockIssue.status = newStatus;
      if (options?.estimatedDays) {
        mockIssue.estimatedResolution = options?.estimatedDays;
      }
    } catch (error) {
      console.error('Status update failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAssignStaff = async (issueId, staffId) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Staff assigned:', { issueId, staffId });
      mockIssue.assignedTo = staffId;
    } catch (error) {
      console.error('Staff assignment failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNote = async (issueId, note) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      console.log('Note added:', { issueId, note });
    } catch (error) {
      console.error('Note addition failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadProgress = async (issueId, files) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Progress photos uploaded:', { issueId, fileCount: files?.length });
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (issueId, messageData) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      console.log('Message sent:', { issueId, messageData });
    } catch (error) {
      console.error('Message sending failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCallReporter = (phoneNumber) => {
    console.log('Initiating call to:', phoneNumber);
    // In real app, this would integrate with telephony system
    window.open(`tel:${phoneNumber}`);
  };

  const handleNavigateToIssue = (issueId) => {
    setSelectedIssueId(issueId);
    console.log('Navigating to issue:', issueId);
  };

  const handleBulkActions = () => {
    console.log('Opening bulk actions panel');
  };

  const handleExportData = () => {
    console.log('Exporting issue data');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border shadow-civic-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Settings" size={24} className="text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-heading font-bold text-foreground">
                    {currentLanguage === 'en' ? 'Issue Management' : 'समस्या प्रबंधन'}
                  </h1>
                  <p className="text-muted-foreground">
                    {currentLanguage === 'en' ?'Comprehensive tools for processing and resolving civic issues' :'नागरिक समस्याओं को संसाधित करने और हल करने के लिए व्यापक उपकरण'
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Issue Selector */}
              <div className="hidden lg:block w-80">
                <Select
                  options={recentIssues}
                  value={selectedIssueId}
                  onChange={setSelectedIssueId}
                  searchable
                  placeholder="Search or select issue..."
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-muted rounded-lg p-1">
                <button
                  onClick={() => setViewMode('detailed')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'detailed' ?'bg-background text-foreground shadow-civic-sm' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="Layout" size={16} className="mr-1" />
                  Detailed
                </button>
                <button
                  onClick={() => setViewMode('compact')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'compact' ?'bg-background text-foreground shadow-civic-sm' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="List" size={16} className="mr-1" />
                  Compact
                </button>
              </div>

              {/* Action Buttons */}
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
                onClick={handleExportData}
              >
                Export
              </Button>

              <Button
                variant="outline"
                size="sm"
                iconName="MoreHorizontal"
                iconPosition="left"
                onClick={handleBulkActions}
              >
                Bulk Actions
              </Button>
            </div>
          </div>

          {/* Mobile Issue Selector */}
          <div className="lg:hidden mt-4">
            <Select
              options={recentIssues}
              value={selectedIssueId}
              onChange={setSelectedIssueId}
              searchable
              placeholder="Search or select issue..."
            />
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        {viewMode === 'detailed' ? (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Issue Details */}
            <div className="xl:col-span-2 space-y-8">
              <IssueDetailsCard
                issue={mockIssue}
                onStatusUpdate={handleStatusUpdate}
                onAssignStaff={handleAssignStaff}
                onAddNote={handleAddNote}
              />

              <ActivityTimeline
                issue={mockIssue}
                activities={mockActivities}
              />

              <RelatedIssuesCard
                currentIssue={mockIssue}
                onNavigateToIssue={handleNavigateToIssue}
              />
            </div>

            {/* Right Column - Management Tools */}
            <div className="space-y-8">
              <ManagementPanel
                issue={mockIssue}
                onStatusUpdate={handleStatusUpdate}
                onAssignStaff={handleAssignStaff}
                onAddNote={handleAddNote}
                onUploadProgress={handleUploadProgress}
              />

              <CommunicationPanel
                issue={mockIssue}
                onSendMessage={handleSendMessage}
                onCallReporter={handleCallReporter}
              />
            </div>
          </div>
        ) : (
          /* Compact View */
          (<div className="space-y-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="text-center py-12">
                <Icon name="Layout" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Compact View Coming Soon
                </h3>
                <p className="text-muted-foreground">
                  Switch to detailed view to access all management features
                </p>
                <Button
                  variant="default"
                  className="mt-4"
                  onClick={() => setViewMode('detailed')}
                >
                  Switch to Detailed View
                </Button>
              </div>
            </div>
          </div>)
        )}
      </div>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card rounded-lg p-6 shadow-civic-lg">
            <div className="flex items-center space-x-3">
              <div className="animate-spin">
                <Icon name="Loader2" size={20} className="text-primary" />
              </div>
              <span className="text-foreground font-medium">
                {currentLanguage === 'en' ? 'Processing...' : 'प्रसंस्करण...'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueManagement;