import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationPicker = ({ 
  location, 
  onLocationChange, 
  language = 'en',
  error = null 
}) => {
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [manualAddress, setManualAddress] = useState('');

  // Mock current location for demo
  const mockLocation = {
    latitude: 23.3441,
    longitude: 85.3096,
    address: "Ranchi, Jharkhand, India"
  };

  useEffect(() => {
    if (!location) {
      getCurrentLocation();
    }
  }, []);

  const getCurrentLocation = async () => {
    setIsLoadingLocation(true);
    setLocationError(null);

    try {
      // Simulate GPS location fetch
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const currentLocation = {
        ...mockLocation,
        accuracy: 10,
        timestamp: new Date()?.toISOString()
      };
      
      onLocationChange(currentLocation);
    } catch (error) {
      setLocationError(
        language === 'en' ?'Unable to get your location. Please enter manually.' :'आपका स्थान प्राप्त करने में असमर्थ। कृपया मैन्युअल रूप से दर्ज करें।'
      );
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleManualLocationSubmit = () => {
    if (manualAddress?.trim()) {
      const manualLocation = {
        latitude: mockLocation?.latitude + (Math.random() - 0.5) * 0.01,
        longitude: mockLocation?.longitude + (Math.random() - 0.5) * 0.01,
        address: manualAddress,
        isManual: true,
        timestamp: new Date()?.toISOString()
      };
      onLocationChange(manualLocation);
      setLocationError(null);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {language === 'en' ? 'Issue Location' : 'समस्या का स्थान'}
        </h3>
        <p className="text-sm text-muted-foreground">
          {language === 'en' ?'We need to know where the issue is located' :'हमें जानना होगा कि समस्या कहाँ स्थित है'
          }
        </p>
      </div>
      {/* Current Location Section */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={20} className="text-primary" />
            <span className="font-medium text-foreground">
              {language === 'en' ? 'Current Location' : 'वर्तमान स्थान'}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={getCurrentLocation}
            loading={isLoadingLocation}
            iconName="RefreshCw"
            disabled={isLoadingLocation}
          >
            {language === 'en' ? 'Refresh' : 'रीफ्रेश'}
          </Button>
        </div>

        {location && !locationError && (
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <Icon name="MapPin" size={16} className="text-success mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {location?.address}
                </p>
                <p className="text-xs text-muted-foreground">
                  {language === 'en' ? 'Coordinates:' : 'निर्देशांक:'} {location?.latitude?.toFixed(6)}, {location?.longitude?.toFixed(6)}
                </p>
                {location?.accuracy && (
                  <p className="text-xs text-muted-foreground">
                    {language === 'en' ? 'Accuracy:' : 'सटीकता:'} ±{location?.accuracy}m
                  </p>
                )}
              </div>
            </div>

            {/* Interactive Map */}
            <div className="w-full h-48 bg-muted rounded-lg overflow-hidden border">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Issue Location"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${location?.latitude},${location?.longitude}&z=16&output=embed`}
                className="border-0"
              />
            </div>
          </div>
        )}

        {locationError && (
          <div className="flex items-center space-x-2 text-warning text-sm bg-warning/10 p-3 rounded-md">
            <Icon name="AlertTriangle" size={16} />
            <span>{locationError}</span>
          </div>
        )}

        {isLoadingLocation && (
          <div className="flex items-center space-x-2 text-muted-foreground">
            <div className="animate-spin">
              <Icon name="Loader2" size={16} />
            </div>
            <span className="text-sm">
              {language === 'en' ? 'Getting your location...' : 'आपका स्थान प्राप्त कर रहे हैं...'}
            </span>
          </div>
        )}
      </div>
      {/* Manual Address Input */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Edit3" size={20} className="text-muted-foreground" />
          <span className="font-medium text-foreground">
            {language === 'en' ? 'Or Enter Address Manually' : 'या पता मैन्युअल रूप से दर्ज करें'}
          </span>
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            value={manualAddress}
            onChange={(e) => setManualAddress(e?.target?.value)}
            placeholder={
              language === 'en' ?'Enter specific address or landmark...' :'विशिष्ट पता या लैंडमार्क दर्ज करें...'
            }
            className="flex-1 px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleManualLocationSubmit}
            disabled={!manualAddress?.trim()}
            iconName="MapPin"
          >
            {language === 'en' ? 'Set' : 'सेट'}
          </Button>
        </div>
      </div>
      {error && (
        <div className="flex items-center space-x-2 text-error text-sm">
          <Icon name="AlertCircle" size={16} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;