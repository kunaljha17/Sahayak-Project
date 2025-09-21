import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StaffPerformanceTable = ({ data, loading = false, className = '' }) => {
  const [sortBy, setSortBy] = useState('resolved');
  const [sortOrder, setSortOrder] = useState('desc');

  const mockData = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      department: 'Public Works',
      assigned: 45,
      resolved: 42,
      avgTime: 2.3,
      rating: 4.8,
      status: 'active'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      department: 'Water Supply',
      assigned: 38,
      resolved: 35,
      avgTime: 2.8,
      rating: 4.6,
      status: 'active'
    },
    {
      id: 3,
      name: 'Amit Singh',
      department: 'Sanitation',
      assigned: 52,
      resolved: 48,
      avgTime: 2.1,
      rating: 4.9,
      status: 'active'
    },
    {
      id: 4,
      name: 'Sunita Devi',
      department: 'Electricity',
      assigned: 29,
      resolved: 26,
      avgTime: 3.2,
      rating: 4.4,
      status: 'busy'
    },
    {
      id: 5,
      name: 'Vikash Yadav',
      department: 'Street Lighting',
      assigned: 33,
      resolved: 30,
      avgTime: 2.7,
      rating: 4.5,
      status: 'active'
    }
  ];

  const staffData = data || mockData;

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const sortedData = [...staffData]?.sort((a, b) => {
    const aValue = a?.[sortBy];
    const bValue = b?.[sortBy];
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success';
      case 'busy':
        return 'bg-warning/10 text-warning';
      case 'offline':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getResolutionRate = (resolved, assigned) => {
    return assigned > 0 ? Math.round((resolved / assigned) * 100) : 0;
  };

  if (loading) {
    return (
      <div className={`civic-card p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-48 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)]?.map((_, i) => (
              <div key={i} className="h-12 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`civic-card p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground font-heading mb-2">
            Staff Performance Rankings
          </h3>
          <p className="text-sm text-muted-foreground">
            Performance metrics for field staff and department heads
          </p>
        </div>
        <Button variant="outline" size="sm" iconName="Download">
          Export
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground civic-hover"
                >
                  <span>Staff Member</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-2">
                <button
                  onClick={() => handleSort('assigned')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground civic-hover"
                >
                  <span>Assigned</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-2">
                <button
                  onClick={() => handleSort('resolved')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground civic-hover"
                >
                  <span>Resolved</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-2">
                <button
                  onClick={() => handleSort('avgTime')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground civic-hover"
                >
                  <span>Avg Time</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-2">
                <button
                  onClick={() => handleSort('rating')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground civic-hover"
                >
                  <span>Rating</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-2">
                <span className="text-sm font-medium text-muted-foreground">Status</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData?.map((staff, index) => (
              <tr key={staff?.id} className="border-b border-border hover:bg-muted/50 civic-hover">
                <td className="py-4 px-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} className="text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{staff?.name}</div>
                      <div className="text-sm text-muted-foreground font-caption">
                        {staff?.department}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <span className="text-sm font-medium text-foreground">{staff?.assigned}</span>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground">{staff?.resolved}</span>
                    <span className="text-xs text-success font-caption">
                      ({getResolutionRate(staff?.resolved, staff?.assigned)}%)
                    </span>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <span className="text-sm text-foreground">{staff?.avgTime} days</span>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-warning fill-current" />
                    <span className="text-sm font-medium text-foreground">{staff?.rating}</span>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium font-caption ${getStatusColor(staff?.status)}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-current mr-1"></div>
                    {staff?.status?.charAt(0)?.toUpperCase() + staff?.status?.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffPerformanceTable;