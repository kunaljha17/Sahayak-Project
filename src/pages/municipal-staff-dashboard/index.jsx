import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import TaskCard from './components/TaskCard';
import PerformanceMetrics from './components/PerformanceMetrics';
import FilterPanel from './components/FilterPanel';
import NotificationPanel from './components/NotificationPanel';
import WorkingMemberStatus from './components/WorkingMemberStatus';
import QuickActions from './components/QuickActions';

const MunicipalStaffDashboard = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    priority: 'all',
    status: 'all',
    category: 'all',
    location: 'all',
    sortBy: 'newest',
    fromDate: '',
    toDate: '',
    quickFilter: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedView, setSelectedView] = useState('tasks'); // tasks, metrics

  // Mock tasks data
  const mockTasks = [
    {
      id: 'ISS-2024-001',
      title: 'Pothole on Main Road causing traffic issues',
      description: `Large pothole has formed on Main Road near the market area. It's causing significant traffic disruption and poses a safety risk to vehicles and pedestrians.\n\nMultiple citizens have reported this issue and it requires immediate attention.`,
      category: 'Roads',priority: 'high',status: 'assigned',location: 'Main Road, Ranchi Central',citizenName: 'Rajesh Kumar',citizenPhone: '+91 9876543210',
      createdAt: new Date(Date.now() - 3600000), // 1 hour ago
      estimatedResolution: new Date(Date.now() + 86400000 * 2), // 2 days from now
      images: [
        'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg','https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg'
      ]
    },
    {
      id: 'ISS-2024-002',title: 'Street light not working in residential area',
      description: `Street light pole number SL-456 has been non-functional for the past week. This is creating safety concerns for residents, especially during evening hours.\n\nThe area becomes very dark at night making it unsafe for pedestrians.`,
      category: 'Street Lights',priority: 'medium',status: 'in-progress',location: 'Sector 2, Ranchi North',citizenName: 'Priya Singh',citizenPhone: '+91 9876543211',
      createdAt: new Date(Date.now() - 7200000), // 2 hours ago
      estimatedResolution: new Date(Date.now() + 86400000), // 1 day from now
      images: [
        'https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg'
      ]
    },
    {
      id: 'ISS-2024-003',title: 'Garbage collection missed for 3 days',
      description: `Garbage has not been collected from our locality for the past 3 days. The waste is piling up and creating unhygienic conditions.\n\nResidents are concerned about health hazards and bad odor in the area.`,
      category: 'Sanitation',priority: 'high',status: 'assigned',location: 'Park Street, Ranchi South',citizenName: 'Amit Sharma',citizenPhone: '+91 9876543212',
      createdAt: new Date(Date.now() - 10800000), // 3 hours ago
      estimatedResolution: new Date(Date.now() + 86400000), // 1 day from now
      images: [
        'https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg','https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg'
      ]
    },
    {
      id: 'ISS-2024-004',title: 'Water supply disruption in colony',
      description: `Water supply has been irregular for the past 2 days in our colony. Sometimes there's no water at all, and when it comes, the pressure is very low.\n\nThis is affecting daily activities of all residents in the area.`,
      category: 'Water',
      priority: 'high',
      status: 'assigned',
      location: 'Green Valley Colony, Ranchi East',
      citizenName: 'Sunita Devi',
      citizenPhone: '+91 9876543213',
      createdAt: new Date(Date.now() - 14400000), // 4 hours ago
      estimatedResolution: new Date(Date.now() + 86400000 * 3), // 3 days from now
      images: [
        'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg'
      ]
    },
    {
      id: 'ISS-2024-005',
      title: 'Broken footpath near school',
      description: `The footpath near Government Primary School has several broken tiles and uneven surfaces. This is dangerous for school children and elderly people.\n\nParents are worried about children's safety while walking to school.`,
      category: 'Roads',priority: 'medium',status: 'in-progress',location: 'School Road, Ranchi West',citizenName: 'Vikash Mahto',citizenPhone: '+91 9876543214',
      createdAt: new Date(Date.now() - 18000000), // 5 hours ago
      estimatedResolution: new Date(Date.now() + 86400000 * 4), // 4 days from now
      images: [
        'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg'
      ]
    },
    {
      id: 'ISS-2024-006',title: 'Electrical pole leaning dangerously',description: `An electrical pole near the bus stop is leaning at a dangerous angle. It looks like it might fall any time, especially during strong winds.\n\nThis poses a serious safety risk to commuters and nearby shops.`,category: 'Electricity',priority: 'high',status: 'assigned',location: 'Bus Stand, Ranchi Central',citizenName: 'Meera Gupta',citizenPhone: '+91 9876543215',
      createdAt: new Date(Date.now() - 21600000), // 6 hours ago
      estimatedResolution: new Date(Date.now() + 86400000), // 1 day from now
      images: [
        'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg','https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg'
      ]
    }
  ];

  const performanceMetrics = {
    totalAssigned: 24,
    inProgress: 8,
    resolvedToday: 6,
    avgResponse: 2.3
  };

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
    setIsLoading(true);
    setTimeout(() => {
      setTasks(mockTasks);
      setFilteredTasks(mockTasks);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = [...tasks];

    // Search filter
    if (filters?.search) {
      filtered = filtered?.filter(task =>
        task?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        task?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        task?.location?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        task?.id?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    // Priority filter
    if (filters?.priority !== 'all') {
      filtered = filtered?.filter(task => task?.priority === filters?.priority);
    }

    // Status filter
    if (filters?.status !== 'all') {
      filtered = filtered?.filter(task => task?.status === filters?.status);
    }

    // Category filter
    if (filters?.category !== 'all') {
      filtered = filtered?.filter(task => task?.category === filters?.category);
    }

    // Quick filters
    if (filters?.quickFilter === 'urgent') {
      filtered = filtered?.filter(task => task?.priority === 'high');
    } else if (filters?.quickFilter === 'overdue') {
      const now = new Date();
      filtered = filtered?.filter(task => 
        new Date(task.estimatedResolution) < now && task?.status !== 'resolved'
      );
    } else if (filters?.quickFilter === 'nearby') {
      filtered = filtered?.filter(task => 
        task?.location?.toLowerCase()?.includes('ranchi central')
      );
    } else if (filters?.quickFilter === 'unassigned') {
      filtered = filtered?.filter(task => task?.status === 'assigned');
    }

    // Sort
    switch (filters?.sortBy) {
      case 'newest':
        filtered?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        filtered?.sort((a, b) => priorityOrder?.[b?.priority] - priorityOrder?.[a?.priority]);
        break;
      default:
        break;
    }

    setFilteredTasks(filtered);
  }, [tasks, filters]);

  const handleStatusUpdate = async (taskId, newStatus) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setTasks(prev => prev?.map(task =>
      task?.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const handleViewDetails = (task) => {
    navigate('/issue-management', { state: { selectedIssue: task } });
  };

  const handleContactCitizen = (task) => {
    console.log(`Contacting citizen: ${task?.citizenName} at ${task?.citizenPhone}`);
  };

  const handleQuickAction = (actionType) => {
    switch (actionType) {
      case 'bulk-update': console.log('Opening bulk update modal');
        break;
      case 'assign-tasks': navigate('/issue-management');
        break;
      case 'priority-review':
        setFilters(prev => ({ ...prev, priority: 'high', quickFilter: 'urgent' }));
        break;
      case 'generate-report': navigate('/analytics-dashboard');
        break;
      default:
        console.log(`Quick action: ${actionType}`);
    }
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      priority: 'all',
      status: 'all',
      category: 'all',
      location: 'all',
      sortBy: 'newest',
      fromDate: '',
      toDate: '',
      quickFilter: null
    });
  };

  const text = {
    en: {
      title: 'Municipal Staff Dashboard',
      subtitle: 'Manage assigned civic issues and coordinate field operations',
      tasksView: 'Tasks View',
      metricsView: 'Metrics View',
      totalTasks: 'Total Tasks',
      noTasks: 'No tasks found',
      noTasksDesc: 'No tasks match your current filters. Try adjusting your search criteria.',
      loading: 'Loading tasks...'
    },
    hi: {
      title: 'नगरपालिका स्टाफ डैशबोर्ड',
      subtitle: 'असाइन किए गए नागरिक मुद्दों का प्रबंधन करें और फील्ड ऑपरेशन का समन्वय करें',
      tasksView: 'कार्य दृश्य',
      metricsView: 'मेट्रिक्स दृश्य',
      totalTasks: 'कुल कार्य',
      noTasks: 'कोई कार्य नहीं मिला',
      noTasksDesc: 'आपके वर्तमान फिल्टर से कोई कार्य मेल नहीं खाता। अपने खोज मानदंड को समायोजित करने का प्रयास करें।',
      loading: 'कार्य लोड हो रहे हैं...'
    }
  };

  const currentText = text?.[currentLanguage] || text?.en;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground font-heading">
                  {currentText?.title}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {currentText?.subtitle}
                </p>
              </div>
              
              {/* View Toggle */}
              <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
                <Button
                  variant={selectedView === 'tasks' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedView('tasks')}
                  iconName="List"
                  iconPosition="left"
                >
                  {currentText?.tasksView}
                </Button>
                <Button
                  variant={selectedView === 'metrics' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedView('metrics')}
                  iconName="BarChart3"
                  iconPosition="left"
                >
                  {currentText?.metricsView}
                </Button>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Content Area */}
            <div className="xl:col-span-3 space-y-6">
              {selectedView === 'tasks' ? (
                <>
                  {/* Tasks Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <h2 className="text-lg font-semibold text-foreground">
                        {currentText?.totalTasks}: {filteredTasks?.length}
                      </h2>
                      {filters?.quickFilter && (
                        <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                          {filters?.quickFilter?.replace('-', ' ')?.toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tasks Grid */}
                  {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="text-center">
                        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-muted-foreground">{currentText?.loading}</p>
                      </div>
                    </div>
                  ) : filteredTasks?.length === 0 ? (
                    <div className="text-center py-12">
                      <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        {currentText?.noTasks}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {currentText?.noTasksDesc}
                      </p>
                      <Button
                        variant="outline"
                        onClick={clearFilters}
                        iconName="RotateCcw"
                        iconPosition="left"
                      >
                        Clear Filters
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {filteredTasks?.map((task) => (
                        <TaskCard
                          key={task?.id}
                          task={task}
                          onStatusUpdate={handleStatusUpdate}
                          onViewDetails={handleViewDetails}
                          onContactCitizen={handleContactCitizen}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <PerformanceMetrics metrics={performanceMetrics} />
              )}
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1 space-y-6">
              {/* Filter Panel */}
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={clearFilters}
              />

              {/* Quick Actions */}
              <QuickActions onAction={handleQuickAction} />

              {/* Notifications */}
              <NotificationPanel />

              {/* Working Member Status */}
              <WorkingMemberStatus />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MunicipalStaffDashboard;