import React from 'react';
import Icon from '../../../components/AppIcon';

const FormProgress = ({ 
  currentStep, 
  totalSteps, 
  stepLabels, 
  language = 'en' 
}) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const defaultStepLabels = {
    en: ['Category', 'Details', 'Location', 'Media', 'Review'],
    hi: ['श्रेणी', 'विवरण', 'स्थान', 'मीडिया', 'समीक्षा']
  };

  const labels = stepLabels || defaultStepLabels?.[language];

  return (
    <div className="bg-card border-b border-border p-4 mb-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {language === 'en' ? 'Report New Issue' : 'नई समस्या रिपोर्ट करें'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {language === 'en' 
                ? `Step ${currentStep} of ${totalSteps}`
                : `चरण ${currentStep} का ${totalSteps}`
              }
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-foreground">
              {Math.round(progressPercentage)}% {language === 'en' ? 'Complete' : 'पूर्ण'}
            </div>
            <div className="text-xs text-muted-foreground">
              {labels?.[currentStep - 1]}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between mt-4">
          {labels?.map((label, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            const isUpcoming = stepNumber > currentStep;

            return (
              <div 
                key={index}
                className="flex flex-col items-center space-y-2 flex-1"
              >
                {/* Step Circle */}
                <div className={`
                  relative w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200
                  ${isCompleted 
                    ? 'bg-success text-success-foreground' 
                    : isCurrent 
                      ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' 
                      : 'bg-muted text-muted-foreground'
                  }
                `}>
                  {isCompleted ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <span>{stepNumber}</span>
                  )}
                  
                  {isCurrent && (
                    <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
                  )}
                </div>
                {/* Step Label */}
                <div className={`
                  text-xs text-center font-medium transition-colors duration-200
                  ${isCurrent 
                    ? 'text-primary' 
                    : isCompleted 
                      ? 'text-success' :'text-muted-foreground'
                  }
                `}>
                  {label}
                </div>
                {/* Connection Line */}
                {index < labels?.length - 1 && (
                  <div className={`
                    absolute top-4 left-1/2 w-full h-0.5 -z-10 transition-colors duration-200
                    ${isCompleted ? 'bg-success' : 'bg-muted'}
                  `} 
                  style={{ 
                    transform: 'translateX(50%)',
                    width: `calc(100% / ${labels?.length} - 2rem)`
                  }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Description */}
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            {currentStep === 1 && (language === 'en' ?'Select the category that best describes your issue' :'अपनी समस्या का सबसे अच्छा वर्णन करने वाली श्रेणी चुनें'
            )}
            {currentStep === 2 && (language === 'en' ?'Provide detailed information about the issue' :'समस्या के बारे में विस्तृत जानकारी प्रदान करें'
            )}
            {currentStep === 3 && (language === 'en' ?'Specify where the issue is located' :'बताएं कि समस्या कहाँ स्थित है'
            )}
            {currentStep === 4 && (language === 'en' ?'Add photos, videos, or voice recordings' :'फोटो, वीडियो या आवाज़ रिकॉर्डिंग जोड़ें'
            )}
            {currentStep === 5 && (language === 'en' ?'Review your report before submitting' :'सबमिट करने से पहले अपनी रिपोर्ट की समीक्षा करें'
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormProgress;