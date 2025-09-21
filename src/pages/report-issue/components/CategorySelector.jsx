import React from 'react';
import Icon from '../../../components/AppIcon';

const CategorySelector = ({ 
  selectedCategory, 
  onCategorySelect, 
  language = 'en',
  error = null 
}) => {
  const categories = [
    {
      id: 'roads',
      icon: 'Road',
      name: {
        en: 'Roads & Infrastructure',
        hi: 'सड़क और अवसंरचना'
      },
      description: {
        en: 'Potholes, broken roads, traffic signals',
        hi: 'गड्ढे, टूटी सड़कें, ट्रैफिक सिग्नल'
      },
      color: 'bg-orange-50 border-orange-200 hover:bg-orange-100'
    },
    {
      id: 'sanitation',
      icon: 'Trash2',
      name: {
        en: 'Sanitation & Cleanliness',
        hi: 'स्वच्छता और सफाई'
      },
      description: {
        en: 'Garbage collection, drainage, public toilets',
        hi: 'कचरा संग्रह, जल निकासी, सार्वजनिक शौचालय'
      },
      color: 'bg-green-50 border-green-200 hover:bg-green-100'
    },
    {
      id: 'electricity',
      icon: 'Zap',
      name: {
        en: 'Electricity & Power',
        hi: 'बिजली और पावर'
      },
      description: {
        en: 'Power outages, street lights, electrical issues',
        hi: 'बिजली कटौती, स्ट्रीट लाइट, विद्युत समस्याएं'
      },
      color: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
    },
    {
      id: 'water',
      icon: 'Droplets',
      name: {
        en: 'Water Supply',
        hi: 'जल आपूर्ति'
      },
      description: {
        en: 'Water shortage, quality issues, pipe leaks',
        hi: 'पानी की कमी, गुणवत्ता की समस्या, पाइप लीक'
      },
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
    {
      id: 'other',
      icon: 'MoreHorizontal',
      name: {
        en: 'Other Issues',
        hi: 'अन्य समस्याएं'
      },
      description: {
        en: 'Parks, buildings, general civic issues',
        hi: 'पार्क, भवन, सामान्य नागरिक समस्याएं'
      },
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
    }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {language === 'en' ? 'Select Issue Category' : 'समस्या श्रेणी चुनें'}
        </h3>
        <p className="text-sm text-muted-foreground">
          {language === 'en' ?'Choose the category that best describes your issue' :'अपनी समस्या का सबसे अच्छा वर्णन करने वाली श्रेणी चुनें'
          }
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => onCategorySelect(category?.id)}
            className={`
              relative p-4 rounded-lg border-2 text-left transition-all duration-200
              ${selectedCategory === category?.id 
                ? 'border-primary bg-primary/5 shadow-md' 
                : `${category?.color} border-2`
              }
              civic-hover civic-focus
            `}
            aria-pressed={selectedCategory === category?.id}
          >
            <div className="flex items-start space-x-3">
              <div className={`
                p-2 rounded-lg
                ${selectedCategory === category?.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-white shadow-sm'
                }
              `}>
                <Icon 
                  name={category?.icon} 
                  size={20} 
                  className={selectedCategory === category?.id ? 'text-primary-foreground' : 'text-foreground'}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground mb-1">
                  {category?.name?.[language]}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {category?.description?.[language]}
                </p>
              </div>
            </div>
            
            {selectedCategory === category?.id && (
              <div className="absolute top-2 right-2">
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Check" size={12} className="text-primary-foreground" />
                </div>
              </div>
            )}
          </button>
        ))}
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

export default CategorySelector;