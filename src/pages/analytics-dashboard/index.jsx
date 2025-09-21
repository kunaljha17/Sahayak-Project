import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import MetricCard from './components/MetricCard';
import ResponseTimeChart from './components/ResponseTimeChart';
import CategoryDistributionChart from './components/CategoryDistributionChart';
import ResolutionRateChart from './components/ResolutionRateChart';
import StaffPerformanceTable from './components/StaffPerformanceTable';
import GeographicHeatMap from './components/GeographicHeatMap';
import FilterPanel from './components/FilterPanel';
import AlertsPanel from './components/AlertsPanel';

const AnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [filters, setFilters] = useState({
    dateRange: 'last30days',
    category: 'all',
    location: 'all',
    status: 'all',
    priority: 'all',
    staffMember: 'all'
  });
  const [refreshing, setRefreshing] = useState(false);

  // Mock data for metrics
  const metricsData = {
    totalIssues: {
      value: '1,306',
      change: '+12.5%',
      changeType: 'positive',
      description: 'vs last month'
    },
    avgResponseTime: {
      value: '2.4 days',
      change: '-18%',
      changeType: 'positive',
      description: 'improvement'
    },
    resolutionRate: {
      value: '84.2%',
      change: '+5.3%',
      changeType: 'positive',
      description: 'this month'
    },
    citizenSatisfaction: {
      value: '4.6/5',
      change: '+0.2',
      changeType: 'positive',
      description: 'rating'
    },
    activeStaff: {
      value: '23',
      change: '2 offline',
      changeType: 'neutral',
      description: 'field officers'
    },
    pendingIssues: {
      value: '206',
      change: '-8.1%',
      changeType: 'positive',
      description: 'reduction'
    }
  };

  // Add this block - Mock data for chart components
  const chartData = {
    responseTime: [
      { month: 'Jan', avgTime: 3.2 },
      { month: 'Feb', avgTime: 2.8 },
      { month: 'Mar', avgTime: 2.4 },
      { month: 'Apr', avgTime: 2.6 },
      { month: 'May', avgTime: 2.1 },
      { month: 'Jun', avgTime: 2.4 }
    ],
    categoryDistribution: [
      { category: 'Infrastructure', count: 450 },
      { category: 'Utilities', count: 320 },
      { category: 'Public Safety', count: 280 },
      { category: 'Environment', count: 256 }
    ],
    resolutionRate: [
      { month: 'Jan', resolved: 78, pending: 22 },
      { month: 'Feb', resolved: 82, pending: 18 },
      { month: 'Mar', resolved: 84, pending: 16 }
    ],
    geographic: [
      { region: 'North', issues: 234 },
      { region: 'South', issues: 189 },
      { region: 'East', issues: 167 },
      { region: 'West', issues: 145 }
    ],
    staffPerformance: [
      { id: 1, name: 'John Doe', resolved: 45, pending: 8, rating: 4.8 },
      { id: 2, name: 'Jane Smith', resolved: 38, pending: 12, rating: 4.6 },
      { id: 3, name: 'Mike Johnson', resolved: 42, pending: 6, rating: 4.9 }
    ]
  };

  // Add this block - Mock alerts data
  const alertsData = [
    { id: 1, type: 'warning', message: 'High response time in North region', timestamp: new Date() },
    { id: 2, type: 'info', message: 'System maintenance scheduled', timestamp: new Date() },
    { id: 3, type: 'error', message: 'Staff shortage in East region', timestamp: new Date() }
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

    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters updated:', newFilters);
    // Here you would typically refetch data based on new filters
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const handleExportReport = () => {
    console.log('Exporting analytics report...');
    // Implement export functionality
  };

  const getContent = () => {
    if (currentLanguage === 'hi') {
      return {
        title: 'एनालिटिक्स डैशबोर्ड',
        subtitle: 'नागरिक मुद्दों और प्रदर्शन मेट्रिक्स की व्यापक अंतर्दृष्टि',
        lastUpdated: 'अंतिम अपडेट',
        refreshData: 'डेटा रीफ्रेश करें',
        exportReport: 'रिपोर्ट निर्यात करें',
        keyMetrics: 'मुख्य मेट्रिक्स',
        performanceCharts: 'प्रदर्शन चार्ट',
        staffAnalytics: 'स्टाफ एनालिटिक्स',
        systemAlerts: 'सिस्टम अलर्ट'
      };
    }
    return {
      title: 'Analytics Dashboard',
      subtitle: 'Comprehensive insights into civic issues and performance metrics',
      lastUpdated: 'Last updated',
      refreshData: 'Refresh Data',
      exportReport: 'Export Report',
      keyMetrics: 'Key Metrics',
      performanceCharts: 'Performance Charts',
      staffAnalytics: 'Staff Analytics',
      systemAlerts: 'System Alerts'
    };
  };

  const content = getContent();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground font-heading mb-2">
                  {content?.title}
                </h1>
                <p className="text-muted-foreground">
                  {content?.subtitle}
                </p>
                <div className="flex items-center space-x-2 mt-2 text-sm text-muted-foreground font-caption">
                  <Icon name="Clock" size={14} />
                  <span>{content?.lastUpdated}: {new Date()?.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={handleRefresh}
                  loading={refreshing}
                  iconName="RefreshCw"
                  iconPosition="left"
                >
                  {content?.refreshData}
                </Button>
                <Button
                  variant="default"
                  onClick={handleExportReport}
                  iconName="Download"
                  iconPosition="left"
                >
                  {content?.exportReport}
                </Button>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          <FilterPanel 
            onFiltersChange={handleFiltersChange}
            className="mb-8"
          />

          {/* Key Metrics Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground font-heading mb-6">
              {content?.keyMetrics}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              <MetricCard
                title="Total Issues"
                value={metricsData?.totalIssues?.value}
                change={metricsData?.totalIssues?.change}
                changeType={metricsData?.totalIssues?.changeType}
                description={metricsData?.totalIssues?.description}
                icon="BarChart3"
                loading={loading}
              />
              <MetricCard
                title="Avg Response Time"
                value={metricsData?.avgResponseTime?.value}
                change={metricsData?.avgResponseTime?.change}
                changeType={metricsData?.avgResponseTime?.changeType}
                description={metricsData?.avgResponseTime?.description}
                icon="Clock"
                loading={loading}
              />
              <MetricCard
                title="Resolution Rate"
                value={metricsData?.resolutionRate?.value}
                change={metricsData?.resolutionRate?.change}
                changeType={metricsData?.resolutionRate?.changeType}
                description={metricsData?.resolutionRate?.description}
                icon="CheckCircle"
                loading={loading}
              />
              <MetricCard
                title="Citizen Satisfaction"
                value={metricsData?.citizenSatisfaction?.value}
                change={metricsData?.citizenSatisfaction?.change}
                changeType={metricsData?.citizenSatisfaction?.changeType}
                description={metricsData?.citizenSatisfaction?.description}
                icon="Star"
                loading={loading}
              />
              <MetricCard
                title="Active Staff"
                value={metricsData?.activeStaff?.value}
                change={metricsData?.activeStaff?.change}
                changeType={metricsData?.activeStaff?.changeType}
                description={metricsData?.activeStaff?.description}
                icon="Users"
                loading={loading}
              />
              <MetricCard
                title="Pending Issues"
                value={metricsData?.pendingIssues?.value}
                change={metricsData?.pendingIssues?.change}
                changeType={metricsData?.pendingIssues?.changeType}
                description={metricsData?.pendingIssues?.description}
                icon="AlertCircle"
                loading={loading}
              />
            </div>
          </section>

          {/* Performance Charts Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground font-heading mb-6">
              {content?.performanceCharts}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <ResponseTimeChart loading={loading} data={chartData.responseTime} />
              <CategoryDistributionChart loading={loading} data={chartData.categoryDistribution} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResolutionRateChart loading={loading} data={chartData.resolutionRate} />
              <GeographicHeatMap loading={loading} data={chartData.geographic} />
            </div>
          </section>

          {/* Staff Analytics and Alerts Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground font-heading mb-6">
              {content?.staffAnalytics}
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <StaffPerformanceTable loading={loading} data={chartData.staffPerformance} />
              </div>
              <div>
                <AlertsPanel loading={loading} alerts={alertsData} />
              </div>
            </div>
          </section>

          {/* Quick Actions Footer */}
          <section className="bg-card rounded-lg border p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground font-heading mb-2">
                  Quick Actions
                </h3>
                <p className="text-sm text-muted-foreground">
                  Navigate to other sections for detailed management
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Users"
                  onClick={() => console.log('Navigate to user management')}
                >
                  User Management
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Settings"
                  onClick={() => console.log('Navigate to issue management')}
                >
                  Issue Management
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="LayoutDashboard"
                  onClick={() => console.log('Navigate to staff dashboard')}
                >
                  Staff Dashboard
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsDashboard;