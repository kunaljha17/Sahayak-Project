import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import IssueCard from './components/IssueCard';
import FilterPanel from './components/FilterPanel';
import IssueDetailModal from './components/IssueDetailModal';
import StatusUpdateNotification from './components/StatusUpdateNotification';

const IssueTracking = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for issues
  const mockIssues = [
    {
      id: "ISS001",
      title: "Broken streetlight on Main Road",
      description: "The streetlight near the bus stop has been flickering for weeks and now completely stopped working. This creates safety concerns for pedestrians during night hours.",
      category: "electricity",
      status: "in-progress",
      priority: "high",
      location: "Main Road, Sector 15",
      address: "Near Central Bus Stop, Main Road, Sector 15, Ranchi",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
      ],
      submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      assignedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      startedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      assignedTo: {
        name: "Rajesh Kumar",
        department: "Electrical Department",
        contact: "+91 98765 43210"
      },
      progressPercentage: 65,
      likes: 23,
      votes: 45,
      isLiked: false,
      hasVoted: false,
      responses: [
        {
          author: "Municipal Engineer",
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          message: "Work has been started. New LED streetlight will be installed within 2 days."
        }
      ]
    },
    {
      id: "ISS002",
      title: "Pothole on Ring Road causing accidents",
      description: "Large pothole has formed on Ring Road near the market area. Multiple vehicles have been damaged and it\'s becoming a major safety hazard.",
      category: "roads",
      status: "assigned",
      priority: "high",
      location: "Ring Road, Market Area",
      address: "Ring Road, Near Central Market, Ranchi",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
      images: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"
      ],
      submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      assignedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      assignedTo: {
        name: "Amit Singh",
        department: "Public Works Department",
        contact: "+91 87654 32109"
      },
      progressPercentage: 25,
      likes: 67,
      votes: 89,
      isLiked: true,
      hasVoted: true,
      responses: [
        {
          author: "PWD Officer",
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          message: "Issue has been assigned to road repair team. Work will commence tomorrow morning."
        }
      ]
    },
    {
      id: "ISS003",
      title: "Garbage not collected for 5 days",
      description: "Garbage collection has been irregular in our locality. The bins are overflowing and creating unhygienic conditions.",
      category: "sanitation",
      status: "resolved",
      priority: "medium",
      location: "Residential Colony, Block A",
      address: "Block A, Residential Colony, Doranda, Ranchi",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400",
      images: [
        "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400"
      ],
      submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      assignedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      startedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      resolvedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      assignedTo: {
        name: "Priya Sharma",
        department: "Sanitation Department",
        contact: "+91 76543 21098"
      },
      progressPercentage: 100,
      likes: 34,
      votes: 56,
      isLiked: false,
      hasVoted: false,
      responses: [
        {
          author: "Sanitation Supervisor",
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          message: "Regular garbage collection schedule has been restored. Additional bins have been placed in the area."
        }
      ]
    },
    {
      id: "ISS004",
      title: "Water supply disruption in residential area",
      description: "No water supply for the past 3 days in our residential complex. Residents are facing severe inconvenience.",
      category: "water",
      status: "submitted",
      priority: "high",
      location: "Green Valley Apartments",
      address: "Green Valley Apartments, Bariatu, Ranchi",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400",
      images: [
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400"
      ],
      submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      progressPercentage: 10,
      likes: 12,
      votes: 28,
      isLiked: false,
      hasVoted: false
    },
    {
      id: "ISS005",
      title: "Stray dogs causing safety concerns",
      description: "Increasing number of stray dogs in the park area. Children and elderly people are afraid to visit the park.",
      category: "other",
      status: "assigned",
      priority: "medium",
      location: "Central Park, Lalpur",
      address: "Central Park, Lalpur, Ranchi",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400",
      images: [
        "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400"
      ],
      submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      assignedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      assignedTo: {
        name: "Dr. Sunita Devi",
        department: "Animal Control Department",
        contact: "+91 65432 10987"
      },
      progressPercentage: 40,
      likes: 18,
      votes: 32,
      isLiked: false,
      hasVoted: true
    }
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

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIssues(mockIssues);
      setFilteredIssues(mockIssues);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Simulate real-time status updates
    const interval = setInterval(() => {
      const randomIssue = mockIssues?.[Math.floor(Math.random() * mockIssues?.length)];
      const statuses = ['assigned', 'in-progress', 'resolved'];
      const currentIndex = statuses?.indexOf(randomIssue?.status);
      
      if (currentIndex < statuses?.length - 1 && Math.random() > 0.8) {
        const newStatus = statuses?.[currentIndex + 1];
        setNotification({
          issueId: randomIssue?.id,
          newStatus: newStatus,
          message: `Work progress updated by ${randomIssue?.assignedTo?.name || 'Municipal Staff'}`
        });
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleFiltersChange = (filters) => {
    let filtered = [...issues];

    // Category filter
    if (filters?.category) {
      filtered = filtered?.filter(issue => issue?.category === filters?.category);
    }

    // Status filter
    if (filters?.status) {
      filtered = filtered?.filter(issue => issue?.status === filters?.status);
    }

    // Date range filter
    if (filters?.dateRange) {
      const now = new Date();
      let startDate;
      
      switch (filters?.dateRange) {
        case 'today':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case 'quarter':
          startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          break;
      }
      
      if (startDate) {
        filtered = filtered?.filter(issue => new Date(issue.submittedAt) >= startDate);
      }
    }

    // Priority filter
    if (filters?.priority) {
      filtered = filtered?.filter(issue => issue?.priority === filters?.priority);
    }

    // Location filter
    if (filters?.location) {
      filtered = filtered?.filter(issue => 
        issue?.location?.toLowerCase()?.includes(filters?.location?.toLowerCase()) ||
        issue?.address?.toLowerCase()?.includes(filters?.location?.toLowerCase())
      );
    }

    // Sort
    switch (filters?.sortBy) {
      case 'oldest':
        filtered?.sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt));
        break;
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        filtered?.sort((a, b) => priorityOrder?.[b?.priority] - priorityOrder?.[a?.priority]);
        break;
      case 'status':
        const statusOrder = { submitted: 1, assigned: 2, 'in-progress': 3, resolved: 4 };
        filtered?.sort((a, b) => statusOrder?.[a?.status] - statusOrder?.[b?.status]);
        break;
      case 'votes':
        filtered?.sort((a, b) => b?.votes - a?.votes);
        break;
      default: // newest
        filtered?.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    }

    setFilteredIssues(filtered);
  };

  const handleVote = (issueId) => {
    setIssues(prev => prev?.map(issue => 
      issue?.id === issueId 
        ? { ...issue, votes: issue?.votes + 1, hasVoted: true }
        : issue
    ));
  };

  const handleLike = (issueId, isLiked) => {
    setIssues(prev => prev?.map(issue => 
      issue?.id === issueId 
        ? { 
            ...issue, 
            likes: isLiked ? issue?.likes + 1 : issue?.likes - 1,
            isLiked: isLiked
          }
        : issue
    ));
  };

  const handleViewDetails = (issue) => {
    setSelectedIssue(issue);
    setIsDetailModalOpen(true);
  };

  const handleSubmitFeedback = async (issueId, feedback) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Feedback submitted for issue:', issueId, feedback);
    setIsDetailModalOpen(false);
  };

  const handleReportNewIssue = () => {
    // Navigate to report issue page
    window.location.href = '/report-issue';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">
                  {currentLanguage === 'en' ? 'Loading your issues...' : 'आपकी समस्याएं लोड हो रही हैं...'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground font-heading">
                  {currentLanguage === 'en' ? 'Issue Tracking' : 'समस्या ट्रैकिंग'}
                </h1>
                <p className="text-muted-foreground mt-2">
                  {currentLanguage === 'en' ?'Track the status of your submitted issues and community reports' :'अपनी प्रस्तुत समस्याओं और सामुदायिक रिपोर्ट्स की स्थिति को ट्रैक करें'
                  }
                </p>
              </div>
              
              <Button
                variant="default"
                onClick={handleReportNewIssue}
                iconName="Plus"
                iconPosition="left"
                className="shrink-0"
              >
                {currentLanguage === 'en' ? 'Report New Issue' : 'नई समस्या रिपोर्ट करें'}
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="flex items-center space-x-2">
                  <Icon name="FileText" size={20} className="text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{issues?.length}</p>
                    <p className="text-xs text-muted-foreground font-caption">
                      {currentLanguage === 'en' ? 'Total Issues' : 'कुल समस्याएं'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {issues?.filter(i => i?.status === 'resolved')?.length}
                    </p>
                    <p className="text-xs text-muted-foreground font-caption">
                      {currentLanguage === 'en' ? 'Resolved' : 'हल हो गया'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={20} className="text-warning" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {issues?.filter(i => i?.status === 'in-progress')?.length}
                    </p>
                    <p className="text-xs text-muted-foreground font-caption">
                      {currentLanguage === 'en' ? 'In Progress' : 'प्रगति में'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="flex items-center space-x-2">
                  <Icon name="TrendingUp" size={20} className="text-accent" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {issues?.reduce((sum, issue) => sum + issue?.votes, 0)}
                    </p>
                    <p className="text-xs text-muted-foreground font-caption">
                      {currentLanguage === 'en' ? 'Total Votes' : 'कुल वोट'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filter Panel */}
            <div className="lg:col-span-1">
              <FilterPanel
                onFiltersChange={handleFiltersChange}
                isOpen={isFilterPanelOpen}
                onToggle={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                currentLanguage={currentLanguage}
                totalCount={issues?.length}
                filteredCount={filteredIssues?.length}
              />
            </div>

            {/* Issues List */}
            <div className="lg:col-span-3">
              {filteredIssues?.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {currentLanguage === 'en' ? 'No Issues Found' : 'कोई समस्या नहीं मिली'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {currentLanguage === 'en' ?'Try adjusting your filters or report a new issue' :'अपने फिल्टर को समायोजित करने का प्रयास करें या नई समस्या रिपोर्ट करें'
                    }
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleReportNewIssue}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    {currentLanguage === 'en' ? 'Report Issue' : 'समस्या रिपोर्ट करें'}
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredIssues?.map((issue) => (
                    <IssueCard
                      key={issue?.id}
                      issue={issue}
                      onVote={handleVote}
                      onLike={handleLike}
                      onViewDetails={handleViewDetails}
                      currentLanguage={currentLanguage}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Issue Detail Modal */}
      <IssueDetailModal
        issue={selectedIssue}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onSubmitFeedback={handleSubmitFeedback}
        currentLanguage={currentLanguage}
      />
      {/* Status Update Notification */}
      <StatusUpdateNotification
        notification={notification}
        onDismiss={() => setNotification(null)}
        currentLanguage={currentLanguage}
      />
    </div>
  );
};

export default IssueTracking;