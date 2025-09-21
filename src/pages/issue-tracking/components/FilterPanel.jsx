import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ 
  onFiltersChange, 
  isOpen, 
  onToggle,
  currentLanguage = 'en',
  totalCount = 0,
  filteredCount = 0 
}) => {
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    dateRange: '',
    location: '',
    priority: '',
    sortBy: 'newest'
  });

  const categoryOptions = [
    { value: '', label: currentLanguage === 'en' ? 'All Categories' : 'सभी श्रेणियां' },
    { value: 'roads', label: currentLanguage === 'en' ? 'Roads & Transport' : 'सड़क और परिवहन' },
    { value: 'sanitation', label: currentLanguage === 'en' ? 'Sanitation & Waste' : 'स्वच्छता और कचरा' },
    { value: 'electricity', label: currentLanguage === 'en' ? 'Electricity & Power' : 'बिजली और पावर' },
    { value: 'water', label: currentLanguage === 'en' ? 'Water Supply' : 'पानी की आपूर्ति' },
    { value: 'other', label: currentLanguage === 'en' ? 'Other Issues' : 'अन्य समस्याएं' }
  ];

  const statusOptions = [
    { value: '', label: currentLanguage === 'en' ? 'All Status' : 'सभी स्थिति' },
    { value: 'submitted', label: currentLanguage === 'en' ? 'Submitted' : 'प्रस्तुत' },
    { value: 'assigned', label: currentLanguage === 'en' ? 'Assigned' : 'सौंपा गया' },
    { value: 'in-progress', label: currentLanguage === 'en' ? 'In Progress' : 'प्रगति में' },
    { value: 'resolved', label: currentLanguage === 'en' ? 'Resolved' : 'हल हो गया' }
  ];

  const dateRangeOptions = [
    { value: '', label: currentLanguage === 'en' ? 'All Time' : 'सभी समय' },
    { value: 'today', label: currentLanguage === 'en' ? 'Today' : 'आज' },
    { value: 'week', label: currentLanguage === 'en' ? 'This Week' : 'इस सप्ताह' },
    { value: 'month', label: currentLanguage === 'en' ? 'This Month' : 'इस महीने' },
    { value: 'quarter', label: currentLanguage === 'en' ? 'Last 3 Months' : 'पिछले 3 महीने' }
  ];

  const priorityOptions = [
    { value: '', label: currentLanguage === 'en' ? 'All Priority' : 'सभी प्राथमिकता' },
    { value: 'high', label: currentLanguage === 'en' ? 'High Priority' : 'उच्च प्राथमिकता' },
    { value: 'medium', label: currentLanguage === 'en' ? 'Medium Priority' : 'मध्यम प्राथमिकता' },
    { value: 'low', label: currentLanguage === 'en' ? 'Low Priority' : 'कम प्राथमिकता' }
  ];

  const sortOptions = [
    { value: 'newest', label: currentLanguage === 'en' ? 'Newest First' : 'नवीनतम पहले' },
    { value: 'oldest', label: currentLanguage === 'en' ? 'Oldest First' : 'पुराना पहले' },
    { value: 'priority', label: currentLanguage === 'en' ? 'Priority' : 'प्राथमिकता' },
    { value: 'status', label: currentLanguage === 'en' ? 'Status' : 'स्थिति' },
    { value: 'votes', label: currentLanguage === 'en' ? 'Most Voted' : 'सबसे अधिक वोट' }
  ];

  useEffect(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      category: '',
      status: '',
      dateRange: '',
      location: '',
      priority: '',
      sortBy: 'newest'
    });
  };

  const hasActiveFilters = Object.values(filters)?.some(value => 
    value !== '' && value !== 'newest'
  );

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={onToggle}
          iconName="Filter"
          iconPosition="left"
          fullWidth
          className="justify-center"
        >
          {currentLanguage === 'en' ? 'Filters' : 'फिल्टर'}
          {hasActiveFilters && (
            <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
              !
            </span>
          )}
        </Button>
      </div>
      {/* Filter Panel */}
      <div className={`
        ${isOpen ? 'block' : 'hidden'} lg:block
        bg-card border border-border rounded-lg p-4 space-y-4
        lg:sticky lg:top-20
      `}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">
              {currentLanguage === 'en' ? 'Filter Issues' : 'समस्याओं को फिल्टर करें'}
            </h3>
            <p className="text-xs text-muted-foreground font-caption">
              {currentLanguage === 'en' 
                ? `Showing ${filteredCount} of ${totalCount} issues`
                : `${totalCount} में से ${filteredCount} समस्याएं दिखा रहे हैं`
              }
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            iconName="X"
            className="lg:hidden"
          />
        </div>

        {/* Category Filter */}
        <Select
          label={currentLanguage === 'en' ? 'Category' : 'श्रेणी'}
          options={categoryOptions}
          value={filters?.category}
          onChange={(value) => handleFilterChange('category', value)}
          className="w-full"
        />

        {/* Status Filter */}
        <Select
          label={currentLanguage === 'en' ? 'Status' : 'स्थिति'}
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
          className="w-full"
        />

        {/* Date Range Filter */}
        <Select
          label={currentLanguage === 'en' ? 'Date Range' : 'दिनांक सीमा'}
          options={dateRangeOptions}
          value={filters?.dateRange}
          onChange={(value) => handleFilterChange('dateRange', value)}
          className="w-full"
        />

        {/* Priority Filter */}
        <Select
          label={currentLanguage === 'en' ? 'Priority' : 'प्राथमिकता'}
          options={priorityOptions}
          value={filters?.priority}
          onChange={(value) => handleFilterChange('priority', value)}
          className="w-full"
        />

        {/* Location Search */}
        <Input
          label={currentLanguage === 'en' ? 'Location' : 'स्थान'}
          type="text"
          placeholder={currentLanguage === 'en' ? 'Search by location...' : 'स्थान से खोजें...'}
          value={filters?.location}
          onChange={(e) => handleFilterChange('location', e?.target?.value)}
          className="w-full"
        />

        {/* Sort By */}
        <Select
          label={currentLanguage === 'en' ? 'Sort By' : 'इसके द्वारा क्रमबद्ध करें'}
          options={sortOptions}
          value={filters?.sortBy}
          onChange={(value) => handleFilterChange('sortBy', value)}
          className="w-full"
        />

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={clearAllFilters}
            iconName="X"
            iconPosition="left"
            fullWidth
            className="mt-4"
          >
            {currentLanguage === 'en' ? 'Clear All Filters' : 'सभी फिल्टर साफ़ करें'}
          </Button>
        )}

        {/* Quick Stats */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-2">
            {currentLanguage === 'en' ? 'Quick Stats' : 'त्वरित आंकड़े'}
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground font-caption">
                {currentLanguage === 'en' ? 'Total Issues' : 'कुल समस्याएं'}
              </span>
              <span className="font-medium text-foreground">{totalCount}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground font-caption">
                {currentLanguage === 'en' ? 'Resolved' : 'हल हो गया'}
              </span>
              <span className="font-medium text-success">
                {Math.floor(totalCount * 0.65)}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground font-caption">
                {currentLanguage === 'en' ? 'In Progress' : 'प्रगति में'}
              </span>
              <span className="font-medium text-warning">
                {Math.floor(totalCount * 0.25)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;