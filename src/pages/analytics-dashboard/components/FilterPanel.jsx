import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterPanel = ({ onFiltersChange, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: 'last30days',
    category: 'all',
    location: 'all',
    status: 'all',
    priority: 'all',
    staffMember: 'all'
  });

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last3months', label: 'Last 3 Months' },
    { value: 'last6months', label: 'Last 6 Months' },
    { value: 'lastyear', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'roads', label: 'Roads & Infrastructure' },
    { value: 'water', label: 'Water Supply' },
    { value: 'sanitation', label: 'Sanitation' },
    { value: 'electricity', label: 'Electricity' },
    { value: 'lighting', label: 'Street Lighting' },
    { value: 'others', label: 'Others' }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Areas' },
    { value: 'central', label: 'Central Ranchi' },
    { value: 'doranda', label: 'Doranda' },
    { value: 'kanke', label: 'Kanke' },
    { value: 'hinoo', label: 'Hinoo' },
    { value: 'lalpur', label: 'Lalpur' },
    { value: 'bariatu', label: 'Bariatu' },
    { value: 'hatia', label: 'Hatia' },
    { value: 'ratu', label: 'Ratu' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'submitted', label: 'Submitted' },
    { value: 'assigned', label: 'Assigned' },
    { value: 'inprogress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const staffOptions = [
    { value: 'all', label: 'All Staff Members' },
    { value: 'rajesh', label: 'Rajesh Kumar' },
    { value: 'priya', label: 'Priya Sharma' },
    { value: 'amit', label: 'Amit Singh' },
    { value: 'sunita', label: 'Sunita Devi' },
    { value: 'vikash', label: 'Vikash Yadav' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFiltersChange) {
      onFiltersChange(newFilters);
    }
  };

  const handleReset = () => {
    const resetFilters = {
      dateRange: 'last30days',
      category: 'all',
      location: 'all',
      status: 'all',
      priority: 'all',
      staffMember: 'all'
    };
    setFilters(resetFilters);
    if (onFiltersChange) {
      onFiltersChange(resetFilters);
    }
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters)?.filter(value => value !== 'all' && value !== 'last30days')?.length;
  };

  return (
    <div className={`civic-card ${className}`}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Filter" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground font-heading">
              Analytics Filters
            </h3>
            {getActiveFiltersCount() > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
                {getActiveFiltersCount()}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              iconName="RotateCcw"
              disabled={getActiveFiltersCount() === 0}
            >
              Reset
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </Button>
          </div>
        </div>
      </div>
      <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Date Range Filter */}
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={filters?.dateRange}
              onChange={(value) => handleFilterChange('dateRange', value)}
              className="w-full"
            />

            {/* Category Filter */}
            <Select
              label="Category"
              options={categoryOptions}
              value={filters?.category}
              onChange={(value) => handleFilterChange('category', value)}
              className="w-full"
            />

            {/* Location Filter */}
            <Select
              label="Location"
              options={locationOptions}
              value={filters?.location}
              onChange={(value) => handleFilterChange('location', value)}
              className="w-full"
            />

            {/* Status Filter */}
            <Select
              label="Status"
              options={statusOptions}
              value={filters?.status}
              onChange={(value) => handleFilterChange('status', value)}
              className="w-full"
            />

            {/* Priority Filter */}
            <Select
              label="Priority"
              options={priorityOptions}
              value={filters?.priority}
              onChange={(value) => handleFilterChange('priority', value)}
              className="w-full"
            />

            {/* Staff Member Filter */}
            <Select
              label="Staff Member"
              options={staffOptions}
              value={filters?.staffMember}
              onChange={(value) => handleFilterChange('staffMember', value)}
              className="w-full"
            />
          </div>

          {/* Custom Date Range */}
          {filters?.dateRange === 'custom' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
              <Input
                label="Start Date"
                type="date"
                className="w-full"
              />
              <Input
                label="End Date"
                type="date"
                className="w-full"
              />
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="Download">
                Export Data
              </Button>
              <Button variant="outline" size="sm" iconName="Share">
                Share Report
              </Button>
            </div>
            <Button variant="default" size="sm" iconName="RefreshCw">
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
      {/* Quick Filter Chips */}
      {!isExpanded && (
        <div className="p-4">
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters)?.map(([key, value]) => {
              if (value === 'all' || (key === 'dateRange' && value === 'last30days')) return null;
              
              const getDisplayValue = () => {
                switch (key) {
                  case 'dateRange':
                    return dateRangeOptions?.find(opt => opt?.value === value)?.label || value;
                  case 'category':
                    return categoryOptions?.find(opt => opt?.value === value)?.label || value;
                  case 'location':
                    return locationOptions?.find(opt => opt?.value === value)?.label || value;
                  case 'status':
                    return statusOptions?.find(opt => opt?.value === value)?.label || value;
                  case 'priority':
                    return priorityOptions?.find(opt => opt?.value === value)?.label || value;
                  case 'staffMember':
                    return staffOptions?.find(opt => opt?.value === value)?.label || value;
                  default:
                    return value;
                }
              };

              return (
                <div
                  key={key}
                  className="flex items-center space-x-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                >
                  <span>{getDisplayValue()}</span>
                  <button
                    onClick={() => handleFilterChange(key, key === 'dateRange' ? 'last30days' : 'all')}
                    className="hover:bg-primary/20 rounded-full p-0.5 civic-hover"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;