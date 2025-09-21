import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const UserFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters,
  totalUsers,
  filteredUsers 
}) => {
  const departmentOptions = [
    { value: '', label: 'All Departments' },
    { value: 'Public Works', label: 'Public Works' },
    { value: 'Sanitation', label: 'Sanitation' },
    { value: 'Water Management', label: 'Water Management' },
    { value: 'Electricity', label: 'Electricity' },
    { value: 'Transportation', label: 'Transportation' },
    { value: 'IT Department', label: 'IT Department' }
  ];

  const roleOptions = [
    { value: '', label: 'All Roles' },
    { value: 'Super Admin', label: 'Super Admin' },
    { value: 'Municipal Staff', label: 'Municipal Staff' },
    { value: 'Field Officer', label: 'Field Officer' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Pending', label: 'Pending' }
  ];

  const activityOptions = [
    { value: '', label: 'All Activity' },
    { value: 'today', label: 'Active Today' },
    { value: 'week', label: 'Active This Week' },
    { value: 'month', label: 'Active This Month' },
    { value: 'inactive', label: 'Inactive 30+ Days' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground font-heading">
            Filter Users
          </h3>
          <p className="text-sm text-muted-foreground font-caption">
            Showing {filteredUsers} of {totalUsers} users
          </p>
        </div>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            iconName="X"
            iconPosition="left"
            onClick={onClearFilters}
          >
            Clear Filters
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <Input
            type="search"
            placeholder="Search users..."
            value={filters?.search}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>

        <div>
          <Select
            placeholder="Department"
            options={departmentOptions}
            value={filters?.department}
            onChange={(value) => handleFilterChange('department', value)}
          />
        </div>

        <div>
          <Select
            placeholder="Role"
            options={roleOptions}
            value={filters?.role}
            onChange={(value) => handleFilterChange('role', value)}
          />
        </div>

        <div>
          <Select
            placeholder="Status"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => handleFilterChange('status', value)}
          />
        </div>

        <div>
          <Select
            placeholder="Activity"
            options={activityOptions}
            value={filters?.activity}
            onChange={(value) => handleFilterChange('activity', value)}
          />
        </div>
      </div>
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {filters?.search && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                Search: "{filters?.search}"
                <button
                  onClick={() => handleFilterChange('search', '')}
                  className="ml-2 hover:text-primary/80"
                >
                  ×
                </button>
              </span>
            )}
            {filters?.department && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                Dept: {filters?.department}
                <button
                  onClick={() => handleFilterChange('department', '')}
                  className="ml-2 hover:text-primary/80"
                >
                  ×
                </button>
              </span>
            )}
            {filters?.role && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                Role: {filters?.role}
                <button
                  onClick={() => handleFilterChange('role', '')}
                  className="ml-2 hover:text-primary/80"
                >
                  ×
                </button>
              </span>
            )}
            {filters?.status && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                Status: {filters?.status}
                <button
                  onClick={() => handleFilterChange('status', '')}
                  className="ml-2 hover:text-primary/80"
                >
                  ×
                </button>
              </span>
            )}
            {filters?.activity && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                Activity: {activityOptions?.find(opt => opt?.value === filters?.activity)?.label}
                <button
                  onClick={() => handleFilterChange('activity', '')}
                  className="ml-2 hover:text-primary/80"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserFilters;