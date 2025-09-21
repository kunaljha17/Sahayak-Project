import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters,
  className = '' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Roads', label: 'Roads' },
    { value: 'Sanitation', label: 'Sanitation' },
    { value: 'Electricity', label: 'Electricity' },
    { value: 'Water', label: 'Water Supply' },
    { value: 'Street Lights', label: 'Street Lights' },
    { value: 'Parks', label: 'Parks & Recreation' },
    { value: 'Other', label: 'Other' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'assigned', label: 'Assigned' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'nearby', label: 'Nearby (5km)' },
    { value: 'ranchi-central', label: 'Ranchi Central' },
    { value: 'ranchi-north', label: 'Ranchi North' },
    { value: 'ranchi-south', label: 'Ranchi South' },
    { value: 'ranchi-east', label: 'Ranchi East' },
    { value: 'ranchi-west', label: 'Ranchi West' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'priority', label: 'Priority High to Low' },
    { value: 'location', label: 'Nearest First' },
    { value: 'category', label: 'Category A-Z' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const getActiveFilterCount = () => {
    return Object.values(filters)?.filter(value => value && value !== 'all')?.length;
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Filters</h3>
          {getActiveFilterCount() > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            disabled={getActiveFilterCount() === 0}
          >
            Clear All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden"
          />
        </div>
      </div>
      {/* Filter Content */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block p-4 space-y-4`}>
        {/* Quick Search */}
        <div>
          <Input
            type="search"
            placeholder="Search by ID, location, or description..."
            value={filters?.search || ''}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Primary Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          <Select
            label="Priority"
            options={priorityOptions}
            value={filters?.priority || 'all'}
            onChange={(value) => handleFilterChange('priority', value)}
          />
          
          <Select
            label="Status"
            options={statusOptions}
            value={filters?.status || 'all'}
            onChange={(value) => handleFilterChange('status', value)}
          />
        </div>

        {/* Secondary Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          <Select
            label="Category"
            options={categoryOptions}
            value={filters?.category || 'all'}
            onChange={(value) => handleFilterChange('category', value)}
          />
          
          <Select
            label="Location"
            options={locationOptions}
            value={filters?.location || 'all'}
            onChange={(value) => handleFilterChange('location', value)}
          />
        </div>

        {/* Sort Options */}
        <div>
          <Select
            label="Sort By"
            options={sortOptions}
            value={filters?.sortBy || 'newest'}
            onChange={(value) => handleFilterChange('sortBy', value)}
          />
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="date"
            label="From Date"
            value={filters?.fromDate || ''}
            onChange={(e) => handleFilterChange('fromDate', e?.target?.value)}
          />
          <Input
            type="date"
            label="To Date"
            value={filters?.toDate || ''}
            onChange={(e) => handleFilterChange('toDate', e?.target?.value)}
          />
        </div>

        {/* Quick Filter Buttons */}
        <div className="pt-4 border-t border-border">
          <p className="text-sm font-medium text-foreground mb-2">Quick Filters:</p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filters?.quickFilter === 'urgent' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleFilterChange('quickFilter', 
                filters?.quickFilter === 'urgent' ? null : 'urgent')}
            >
              Urgent Issues
            </Button>
            <Button
              variant={filters?.quickFilter === 'overdue' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleFilterChange('quickFilter', 
                filters?.quickFilter === 'overdue' ? null : 'overdue')}
            >
              Overdue
            </Button>
            <Button
              variant={filters?.quickFilter === 'nearby' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleFilterChange('quickFilter', 
                filters?.quickFilter === 'nearby' ? null : 'nearby')}
            >
              Nearby
            </Button>
            <Button
              variant={filters?.quickFilter === 'unassigned' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleFilterChange('quickFilter', 
                filters?.quickFilter === 'unassigned' ? null : 'unassigned')}
            >
              Unassigned
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;