import React from 'react';
import Icon from '../../../components/AppIcon';

const PrioritySelector = ({ 
  selectedPriority, 
  onPrioritySelect, 
  language = 'en',
  error = null 
}) => {
  const priorities = [
    {
      id: 'low',
      name: {
        en: 'Low Priority',
        hi: 'कम प्राथमिकता'
      },
      description: {
        en: 'Minor issues that can wait',
        hi: 'छोटी समस्याएं जो इंतजार कर सकती हैं'
      },
      color: 'bg-blue-50 border-blue-200 text-blue-800',
      icon: 'ArrowDown',
      iconColor: 'text-blue-600'
    },
    {
      id: 'medium',
      name: {
        en: 'Medium Priority',
        hi: 'मध्यम प्राथमिकता'
      },
      description: {
        en: 'Issues that need attention soon',
        hi: 'समस्याएं जिन पर जल्द ध्यान देने की जरूरत है'
      },
      color: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      icon: 'Minus',
      iconColor: 'text-yellow-600'
    },
    {
      id: 'high',
      name: {
        en: 'High Priority',
        hi: 'उच्च प्राथमिकता'
      },
      description: {
        en: 'Urgent issues affecting safety',
        hi: 'सुरक्षा को प्रभावित करने वाली तत्काल समस्याएं'
      },
      color: 'bg-red-50 border-red-200 text-red-800',
      icon: 'ArrowUp',
      iconColor: 'text-red-600'
    }
  ];

  const affectedAreaOptions = [
    {
      id: 'individual',
      name: {
        en: 'Individual/Household',
        hi: 'व्यक्तिगत/घरेलू'
      },
      description: {
        en: 'Affects only you or your household',
        hi: 'केवल आपको या आपके घर को प्रभावित करता है'
      }
    },
    {
      id: 'street',
      name: {
        en: 'Street/Block',
        hi: 'सड़क/ब्लॉक'
      },
      description: {
        en: 'Affects your street or block',
        hi: 'आपकी सड़क या ब्लॉक को प्रभावित करता है'
      }
    },
    {
      id: 'area',
      name: {
        en: 'Area/Ward',
        hi: 'क्षेत्र/वार्ड'
      },
      description: {
        en: 'Affects a larger area or ward',
        hi: 'एक बड़े क्षेत्र या वार्ड को प्रभावित करता है'
      }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Priority Selection */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {language === 'en' ? 'Issue Priority' : 'समस्या की प्राथमिकता'}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {language === 'en' ?'Help us understand how urgent this issue is' :'हमें समझने में मदद करें कि यह समस्या कितनी तत्काल है'
          }
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {priorities?.map((priority) => (
            <button
              key={priority?.id}
              onClick={() => onPrioritySelect({ priority: priority?.id })}
              className={`
                relative p-4 rounded-lg border-2 text-left transition-all duration-200
                ${selectedPriority?.priority === priority?.id 
                  ? 'border-primary bg-primary/5 shadow-md' 
                  : `${priority?.color} border-2 hover:shadow-sm`
                }
                civic-hover civic-focus
              `}
              aria-pressed={selectedPriority?.priority === priority?.id}
            >
              <div className="flex items-start space-x-3">
                <div className={`
                  p-2 rounded-lg bg-white shadow-sm
                  ${selectedPriority?.priority === priority?.id ? 'bg-primary text-primary-foreground' : ''}
                `}>
                  <Icon 
                    name={priority?.icon} 
                    size={18} 
                    className={
                      selectedPriority?.priority === priority?.id 
                        ? 'text-primary-foreground' 
                        : priority?.iconColor
                    }
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">
                    {priority?.name?.[language]}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {priority?.description?.[language]}
                  </p>
                </div>
              </div>
              
              {selectedPriority?.priority === priority?.id && (
                <div className="absolute top-2 right-2">
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Check" size={12} className="text-primary-foreground" />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Affected Area Selection */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {language === 'en' ? 'Affected Area Size' : 'प्रभावित क्षेत्र का आकार'}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {language === 'en' ?'How many people or areas are affected by this issue?' :'इस समस्या से कितने लोग या क्षेत्र प्रभावित हैं?'
          }
        </p>

        <div className="space-y-2">
          {affectedAreaOptions?.map((option) => (
            <label
              key={option?.id}
              className={`
                flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-all duration-200
                ${selectedPriority?.affectedArea === option?.id 
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
                }
                civic-hover
              `}
            >
              <input
                type="radio"
                name="affectedArea"
                value={option?.id}
                checked={selectedPriority?.affectedArea === option?.id}
                onChange={(e) => onPrioritySelect({ 
                  ...selectedPriority, 
                  affectedArea: e?.target?.value 
                })}
                className="mt-1 w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
              />
              <div className="flex-1">
                <div className="font-medium text-foreground">
                  {option?.name?.[language]}
                </div>
                <div className="text-sm text-muted-foreground">
                  {option?.description?.[language]}
                </div>
              </div>
            </label>
          ))}
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

export default PrioritySelector;