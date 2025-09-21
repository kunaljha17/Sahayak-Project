import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GeographicHeatMap = ({ data, loading = false, className = '' }) => {
  const [selectedArea, setSelectedArea] = useState(null);

  const mockData = [
    { area: 'Central Ranchi', issues: 156, density: 'high', lat: 23.3441, lng: 85.3096 },
    { area: 'Doranda', issues: 89, density: 'medium', lat: 23.3258, lng: 85.3214 },
    { area: 'Kanke', issues: 134, density: 'high', lat: 23.4241, lng: 85.3370 },
    { area: 'Hinoo', issues: 67, density: 'medium', lat: 23.3703, lng: 85.2993 },
    { area: 'Lalpur', issues: 45, density: 'low', lat: 23.3621, lng: 85.2734 },
    { area: 'Bariatu', issues: 78, density: 'medium', lat: 23.3089, lng: 85.2839 },
    { area: 'Hatia', issues: 92, density: 'medium', lat: 23.2599, lng: 85.2677 },
    { area: 'Ratu', issues: 34, density: 'low', lat: 23.2156, lng: 85.2456 }
  ];

  const areaData = data || mockData;

  const getDensityColor = (density) => {
    switch (density) {
      case 'high':
        return 'bg-error text-error-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getDensityIcon = (density) => {
    switch (density) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'AlertCircle';
      case 'low':
        return 'CheckCircle';
      default:
        return 'Circle';
    }
  };

  if (loading) {
    return (
      <div className={`civic-card p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-48 mb-4"></div>
          <div className="h-64 bg-muted rounded mb-4"></div>
          <div className="space-y-2">
            {[...Array(4)]?.map((_, i) => (
              <div key={i} className="h-8 bg-muted rounded"></div>
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
            Geographic Distribution
          </h3>
          <p className="text-sm text-muted-foreground">
            Issue density across different areas of Ranchi
          </p>
        </div>
        <Button variant="outline" size="sm" iconName="Map">
          Full Map
        </Button>
      </div>
      {/* Interactive Map Placeholder */}
      <div className="relative bg-muted rounded-lg h-64 mb-6 overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Ranchi City Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=23.3441,85.3096&z=12&output=embed"
          className="rounded-lg"
        />
        
        {/* Overlay with density indicators */}
        <div className="absolute inset-0 pointer-events-none">
          {areaData?.slice(0, 4)?.map((area, index) => (
            <div
              key={area?.area}
              className={`absolute w-4 h-4 rounded-full ${getDensityColor(area?.density)} opacity-80`}
              style={{
                left: `${20 + (index * 20)}%`,
                top: `${30 + (index * 15)}%`
              }}
            />
          ))}
        </div>
      </div>
      {/* Area Statistics */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm font-medium text-muted-foreground mb-3">
          <span>Area</span>
          <span>Issues</span>
          <span>Density</span>
        </div>
        
        {areaData?.map((area) => (
          <div
            key={area?.area}
            className={`flex items-center justify-between p-3 rounded-lg border civic-hover cursor-pointer transition-colors duration-150 ${
              selectedArea === area?.area ? 'bg-primary/5 border-primary' : 'border-border hover:bg-muted/50'
            }`}
            onClick={() => setSelectedArea(selectedArea === area?.area ? null : area?.area)}
          >
            <div className="flex items-center space-x-3">
              <Icon name="MapPin" size={16} className="text-muted-foreground" />
              <span className="font-medium text-foreground">{area?.area}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-foreground min-w-[3rem] text-right">
                {area?.issues}
              </span>
              
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getDensityColor(area?.density)}`}>
                <Icon name={getDensityIcon(area?.density)} size={12} />
                <span className="capitalize">{area?.density}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground font-caption">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Low (&lt;50)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span>Medium (50-100)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-error rounded-full"></div>
              <span>High (&gt;100)</span>
            </div>
          </div>
          <span>Issue Density</span>
        </div>
      </div>
    </div>
  );
};

export default GeographicHeatMap;