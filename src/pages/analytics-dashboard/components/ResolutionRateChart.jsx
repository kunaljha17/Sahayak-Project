import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ResolutionRateChart = ({ data, loading = false, className = '' }) => {
  const mockData = [
    { category: 'Roads', resolved: 85, pending: 15, total: 342 },
    { category: 'Water', resolved: 78, pending: 22, total: 289 },
    { category: 'Sanitation', resolved: 92, pending: 8, total: 234 },
    { category: 'Electricity', resolved: 88, pending: 12, total: 187 },
    { category: 'Lighting', resolved: 76, pending: 24, total: 156 },
    { category: 'Others', resolved: 82, pending: 18, total: 98 }
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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-civic-md">
          <p className="text-sm font-medium text-popover-foreground mb-2">
            {label}
          </p>
          <p className="text-sm text-success">
            Resolved: {data?.resolved}% ({Math.round(data?.total * data?.resolved / 100)} issues)
          </p>
          <p className="text-sm text-warning">
            Pending: {data?.pending}% ({Math.round(data?.total * data?.pending / 100)} issues)
          </p>
          <p className="text-sm text-muted-foreground">
            Total Issues: {data?.total}
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
          Resolution Rate by Category
        </h3>
        <p className="text-sm text-muted-foreground">
          Percentage of resolved vs pending issues across categories
        </p>
      </div>

      <div className="w-full h-64" aria-label="Resolution Rate Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="category" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              label={{ value: 'Percentage', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="resolved" 
              stackId="a" 
              fill="var(--color-success)"
              name="Resolved"
              radius={[0, 0, 0, 0]}
            />
            <Bar 
              dataKey="pending" 
              stackId="a" 
              fill="var(--color-warning)"
              name="Pending"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-success rounded"></div>
          <span className="text-sm text-muted-foreground font-caption">Resolved</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-warning rounded"></div>
          <span className="text-sm text-muted-foreground font-caption">Pending</span>
        </div>
      </div>
    </div>
  );
};

export default ResolutionRateChart;