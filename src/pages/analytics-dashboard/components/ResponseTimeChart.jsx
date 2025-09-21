import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ResponseTimeChart = ({ data, loading = false, className = '' }) => {
  const mockData = [
    { month: 'Jan', avgResponse: 4.2, target: 3.0, resolved: 3.8 },
    { month: 'Feb', avgResponse: 3.8, target: 3.0, resolved: 3.5 },
    { month: 'Mar', avgResponse: 3.2, target: 3.0, resolved: 2.9 },
    { month: 'Apr', avgResponse: 2.8, target: 3.0, resolved: 2.6 },
    { month: 'May', avgResponse: 3.1, target: 3.0, resolved: 2.8 },
    { month: 'Jun', avgResponse: 2.9, target: 3.0, resolved: 2.7 },
    { month: 'Jul', avgResponse: 2.6, target: 3.0, resolved: 2.4 },
    { month: 'Aug', avgResponse: 2.8, target: 3.0, resolved: 2.5 },
    { month: 'Sep', avgResponse: 2.4, target: 3.0, resolved: 2.2 }
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

  return (
    <div className={`civic-card p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground font-heading mb-2">
          Response Time Trends
        </h3>
        <p className="text-sm text-muted-foreground">
          Average response time in days across different months
        </p>
      </div>

      <div className="w-full h-64" aria-label="Response Time Trends Line Chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              label={{ value: 'Days', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-popover)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                color: 'var(--color-popover-foreground)'
              }}
              formatter={(value, name) => [
                `${value} days`,
                name === 'avgResponse' ? 'Average Response' : 
                name === 'target' ? 'Target' : 'Average Resolution'
              ]}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="avgResponse" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              name="Average Response"
            />
            <Line 
              type="monotone" 
              dataKey="target" 
              stroke="var(--color-warning)" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: 'var(--color-warning)', strokeWidth: 2, r: 4 }}
              name="Target"
            />
            <Line 
              type="monotone" 
              dataKey="resolved" 
              stroke="var(--color-success)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
              name="Average Resolution"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ResponseTimeChart;