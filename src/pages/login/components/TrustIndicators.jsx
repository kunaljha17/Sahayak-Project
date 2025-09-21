import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicators = () => {
  const trustBadges = [
    {
      id: 1,
      icon: 'Shield',
      title: 'Government Certified',
      description: 'Verified by Jharkhand Municipal Authority'
    },
    {
      id: 2,
      icon: 'Lock',
      title: 'SSL Secured',
      description: '256-bit encryption for data protection'
    },
    {
      id: 3,
      icon: 'CheckCircle',
      title: 'Trusted Platform',
      description: 'Used by 50,000+ citizens across Jharkhand'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      <div className="text-center mb-8">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-2">
          Trusted by Citizens & Government
        </h2>
        <p className="text-sm font-body text-muted-foreground">
          Your security and privacy are our top priorities
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trustBadges?.map((badge) => (
          <div
            key={badge?.id}
            className="bg-card border border-border rounded-lg p-6 text-center civic-shadow hover:civic-shadow-lg civic-transition"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name={badge?.icon} size={24} className="text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-foreground mb-2">
              {badge?.title}
            </h3>
            <p className="text-sm font-body text-muted-foreground">
              {badge?.description}
            </p>
          </div>
        ))}
      </div>
      {/* Additional Security Info */}
      <div className="mt-8 bg-muted/50 border border-border rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Info" size={20} className="text-success" />
          </div>
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-2">
              Secure Authentication
            </h4>
            <p className="text-sm font-body text-muted-foreground mb-3">
              We use industry-standard security measures to protect your account:
            </p>
            <ul className="text-sm font-body text-muted-foreground space-y-1">
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-success" />
                <span>Two-factor authentication available</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-success" />
                <span>End-to-end encrypted data transmission</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-success" />
                <span>Regular security audits and updates</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;