import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const PerformanceMetrics = ({ metrics, className = '' }) => {
  const responseTimeData = [
    { name: 'Mon', time: 2.4 },
    { name: 'Tue', time: 1.8 },
    { name: 'Wed', time: 3.2 },
    { name: 'Thu', time: 2.1 },
    { name: 'Fri', time: 1.9 },
    { name: 'Sat', time: 2.8 },
    { name: 'Sun', time: 2.3 }
  ];

  const categoryData = [
    { name: 'Roads', value: 35, color: '#1B4F72' },
    { name: 'Sanitation', value: 25, color: '#2ECC71' },
    { name: 'Electricity', value: 20, color: '#F1C40F' },
    { name: 'Water', value: 15, color: '#E74C3C' },
    { name: 'Other', value: 5, color: '#9B59B6' }
  ];

  const statCards = [
    {
      title: 'Total Assigned',
      value: metrics?.totalAssigned || 24,
      icon: 'Clipboard',
      color: 'text-blue-600 bg-blue-50',
      trend: '+12%'
    },
    {
      title: 'In Progress',
      value: metrics?.inProgress || 8,
      icon: 'Clock',
      color: 'text-yellow-600 bg-yellow-50',
      trend: '+5%'
    },
    {
      title: 'Resolved Today',
      value: metrics?.resolvedToday || 6,
      icon: 'CheckCircle',
      color: 'text-green-600 bg-green-50',
      trend: '+18%'
    },
    {
      title: 'Avg Response',
      value: `${metrics?.avgResponse || 2.3}h`,
      icon: 'Timer',
      color: 'text-purple-600 bg-purple-50',
      trend: '-8%'
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards?.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat?.color}`}>
                <Icon name={stat?.icon} size={20} />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">
                  {stat?.value}
                </div>
                <div className="text-xs text-green-600 font-medium">
                  {stat?.trend}
                </div>
              </div>
            </div>
            <div className="mt-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                {stat?.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Response Time Chart */}
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Response Time (Hours)
            </h3>
            <Icon name="TrendingDown" size={20} className="text-green-600" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E1E8ED" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12, fill: '#7F8C8D' }}
                  axisLine={{ stroke: '#E1E8ED' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#7F8C8D' }}
                  axisLine={{ stroke: '#E1E8ED' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E1E8ED',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar 
                  dataKey="time" 
                  fill="#1B4F72" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Issues by Category
            </h3>
            <Icon name="PieChart" size={20} className="text-primary" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E1E8ED',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {categoryData?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item?.color }}
                />
                <span className="text-xs text-muted-foreground">
                  {item?.name} ({item?.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Performance Summary */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Weekly Performance Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">94%</div>
            <div className="text-sm text-green-700">Resolution Rate</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">2.1h</div>
            <div className="text-sm text-blue-700">Avg Response Time</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">4.8/5</div>
            <div className="text-sm text-purple-700">Citizen Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;