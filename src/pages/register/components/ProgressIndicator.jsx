import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, steps }) => {
  const defaultSteps = [
    { id: 1, title: 'Personal Info', description: 'Basic information' },
    { id: 2, title: 'Verification', description: 'OTP confirmation' },
    { id: 3, title: 'Complete', description: 'Account ready' }
  ];

  const stepData = steps || defaultSteps;

  const getStepStatus = (stepNumber) => {
    if (stepNumber < currentStep) return 'completed';
    if (stepNumber === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepIcon = (stepNumber, status) => {
    if (status === 'completed') return 'CheckCircle';
    if (status === 'current') return 'Circle';
    return 'Circle';
  };

  const getStepColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10 border-success';
      case 'current': return 'text-primary bg-primary/10 border-primary';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getConnectorColor = (stepNumber) => {
    return stepNumber < currentStep ? 'bg-success' : 'bg-border';
  };

  return (
    <div className="w-full">
      {/* Mobile Progress Bar */}
      <div className="block md:hidden mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-caption text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm font-caption text-primary font-medium">
            {Math.round((currentStep / totalSteps) * 100)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full civic-transition"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        <div className="mt-2">
          <p className="text-sm font-body font-medium text-foreground">
            {stepData?.[currentStep - 1]?.title}
          </p>
          <p className="text-xs font-caption text-muted-foreground">
            {stepData?.[currentStep - 1]?.description}
          </p>
        </div>
      </div>
      {/* Desktop Step Indicator */}
      <div className="hidden md:block">
        <nav aria-label="Registration progress">
          <ol className="flex items-center justify-center space-x-8">
            {stepData?.map((step, index) => {
              const stepNumber = index + 1;
              const status = getStepStatus(stepNumber);
              const isLast = index === stepData?.length - 1;

              return (
                <li key={step?.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    {/* Step Circle */}
                    <div className={`
                      w-10 h-10 rounded-full border-2 flex items-center justify-center civic-transition
                      ${getStepColor(status)}
                    `}>
                      {status === 'completed' ? (
                        <Icon name="Check" size={20} />
                      ) : (
                        <span className="text-sm font-heading font-semibold">
                          {stepNumber}
                        </span>
                      )}
                    </div>

                    {/* Step Label */}
                    <div className="mt-3 text-center">
                      <p className={`text-sm font-body font-medium ${
                        status === 'current' ? 'text-primary' : 
                        status === 'completed' ? 'text-success' : 'text-muted-foreground'
                      }`}>
                        {step?.title}
                      </p>
                      <p className="text-xs font-caption text-muted-foreground mt-1">
                        {step?.description}
                      </p>
                    </div>
                  </div>
                  {/* Connector Line */}
                  {!isLast && (
                    <div className="flex-1 mx-4">
                      <div className={`h-0.5 civic-transition ${getConnectorColor(stepNumber)}`} />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
      {/* Step Summary */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-muted/30 rounded-full">
          <Icon name="Info" size={16} className="text-primary" />
          <span className="text-sm font-caption text-muted-foreground">
            {currentStep === totalSteps 
              ? 'Registration complete!' 
              : `${totalSteps - currentStep} step${totalSteps - currentStep !== 1 ? 's' : ''} remaining`
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;