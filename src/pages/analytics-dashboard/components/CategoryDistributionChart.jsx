import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const CategoryDistributionChart = ({ data, loading = false, className = '' }) => {
  const mockData = [
    { name: 'Roads & Infrastructure', value: 342, color: '#1B4F72' },
    { name: 'Water Supply', value: 289, color: '#2ECC71' },
    { name: 'Sanitation', value: 234, color: '#F1C40F' },
    { name: 'Electricity', value: 187, color: '#E74C3C' },
    { name: 'Street Lighting', value: 156, color: '#9B59B6' },
    { name: 'Others', value: 98, color: '#95A5A6' }
  ];

  const chartData = data || mockData;

  if (loading) {
    return (
      <div className={`civic-card p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-48 mb-4"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-civic-md">
          <p className="text-sm font-medium text-popover-foreground">
            {data?.name}
          </p>
          <p className="text-sm text-muted-foreground">
            Issues: <span className="font-semibold text-foreground">{data?.value}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Percentage: <span className="font-semibold text-foreground">
              {((data?.value / chartData?.reduce((sum, item) => sum + item?.value, 0)) * 100)?.toFixed(1)}%
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`civic-card p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground font-heading mb-2">
          Issue Distribution by Category
        </h3>
        <p className="text-sm text-muted-foreground">
          Breakdown of reported issues across different categories
        </p>
      </div>
      <div className="w-full h-64" aria-label="Category Distribution Pie Chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value, entry) => (
                <span style={{ color: entry?.color, fontSize: '12px' }}>
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {chartData?.slice(0, 4)?.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item?.color }}
            ></div>
            <span className="text-xs text-muted-foreground font-caption">
              {item?.name}: {item?.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDistributionChart;