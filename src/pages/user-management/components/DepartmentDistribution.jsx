import React from 'react';
import Icon from '../../../components/AppIcon';

const DepartmentDistribution = ({ departments }) => {
  const totalUsers = departments?.reduce((sum, dept) => sum + dept?.count, 0);

  const getProgressColor = (index) => {
    const colors = [
      'bg-primary',
      'bg-success', 
      'bg-warning',
      'bg-error',
      'bg-purple-500',
      'bg-blue-500'
    ];
    return colors?.[index % colors?.length];
  };

  const getDepartmentIcon = (name) => {
    switch (name?.toLowerCase()) {
      case 'public works':
        return 'Hammer';
      case 'sanitation':
        return 'Trash2';
      case 'water management':
        return 'Droplets';
      case 'electricity':
        return 'Zap';
      case 'transportation':
        return 'Car';
      case 'it department':
        return 'Monitor';
      default:
        return 'Building';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground font-heading">
            Department Distribution
          </h3>
          <p className="text-sm text-muted-foreground font-caption">
            Staff allocation across departments
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground font-heading">
            {totalUsers}
          </div>
          <div className="text-sm text-muted-foreground">
            Total Staff
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {departments?.map((department, index) => {
          const percentage = totalUsers > 0 ? (department?.count / totalUsers) * 100 : 0;
          
          return (
            <div key={department?.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getProgressColor(index)}/10`}>
                    <Icon 
                      name={getDepartmentIcon(department?.name)} 
                      size={16} 
                      className={`${getProgressColor(index)?.replace('bg-', 'text-')}`}
                    />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">
                      {department?.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {department?.activeCount} active, {department?.count - department?.activeCount} inactive
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-foreground">
                    {department?.count}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {percentage?.toFixed(1)}%
                  </div>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(index)}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-success">
              {departments?.reduce((sum, dept) => sum + dept?.activeCount, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Active</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-warning">
              {departments?.reduce((sum, dept) => sum + (dept?.count - dept?.activeCount), 0)}
            </div>
            <div className="text-sm text-muted-foreground">Inactive</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-primary">
              {departments?.length}
            </div>
            <div className="text-sm text-muted-foreground">Departments</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDistribution;