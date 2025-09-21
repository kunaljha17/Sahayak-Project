import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReviewSummary = ({ 
  formData, 
  onEdit, 
  language = 'en' 
}) => {
  const categoryNames = {
    roads: { en: 'Roads & Infrastructure', hi: 'सड़क और अवसंरचना' },
    sanitation: { en: 'Sanitation & Cleanliness', hi: 'स्वच्छता और सफाई' },
    electricity: { en: 'Electricity & Power', hi: 'बिजली और पावर' },
    water: { en: 'Water Supply', hi: 'जल आपूर्ति' },
    other: { en: 'Other Issues', hi: 'अन्य समस्याएं' }
  };

  const priorityNames = {
    low: { en: 'Low Priority', hi: 'कम प्राथमिकता' },
    medium: { en: 'Medium Priority', hi: 'मध्यम प्राथमिकता' },
    high: { en: 'High Priority', hi: 'उच्च प्राथमिकता' }
  };

  const affectedAreaNames = {
    individual: { en: 'Individual/Household', hi: 'व्यक्तिगत/घरेलू' },
    street: { en: 'Street/Block', hi: 'सड़क/ब्लॉक' },
    area: { en: 'Area/Ward', hi: 'क्षेत्र/वार्ड' }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {language === 'en' ? 'Review Your Report' : 'अपनी रिपोर्ट की समीक्षा करें'}
        </h3>
        <p className="text-sm text-muted-foreground">
          {language === 'en' ?'Please review all information before submitting your report' :'कृपया अपनी रिपोर्ट सबमिट करने से पहले सभी जानकारी की समीक्षा करें'
          }
        </p>
      </div>
      {/* Category Section */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="Tag" size={18} className="text-primary" />
            <span>{language === 'en' ? 'Category' : 'श्रेणी'}</span>
          </h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(1)}
            iconName="Edit3"
          >
            {language === 'en' ? 'Edit' : 'संपादित करें'}
          </Button>
        </div>
        <p className="text-foreground font-medium">
          {categoryNames?.[formData?.category]?.[language] || formData?.category}
        </p>
      </div>
      {/* Description Section */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="FileText" size={18} className="text-primary" />
            <span>{language === 'en' ? 'Description' : 'विवरण'}</span>
          </h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(2)}
            iconName="Edit3"
          >
            {language === 'en' ? 'Edit' : 'संपादित करें'}
          </Button>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {language === 'en' ? 'Issue Title:' : 'समस्या का शीर्षक:'}
            </p>
            <p className="text-foreground">{formData?.title}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {language === 'en' ? 'Detailed Description:' : 'विस्तृत विवरण:'}
            </p>
            <p className="text-foreground text-sm leading-relaxed">
              {formData?.description}
            </p>
          </div>
          {formData?.voiceRecording && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {language === 'en' ? 'Voice Recording:' : 'आवाज़ रिकॉर्डिंग:'}
              </p>
              <div className="flex items-center space-x-2 text-sm text-success">
                <Icon name="Mic" size={16} />
                <span>
                  {language === 'en' ? 'Voice recording attached' : 'आवाज़ रिकॉर्डिंग संलग्न'}
                  ({Math.floor(formData?.voiceRecording?.duration / 60)}:
                  {(formData?.voiceRecording?.duration % 60)?.toString()?.padStart(2, '0')})
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Priority & Affected Area Section */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="AlertTriangle" size={18} className="text-primary" />
            <span>{language === 'en' ? 'Priority & Impact' : 'प्राथमिकता और प्रभाव'}</span>
          </h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(2)}
            iconName="Edit3"
          >
            {language === 'en' ? 'Edit' : 'संपादित करें'}
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {language === 'en' ? 'Priority Level:' : 'प्राथमिकता स्तर:'}
            </p>
            <p className="text-foreground">
              {priorityNames?.[formData?.priority?.priority]?.[language]}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {language === 'en' ? 'Affected Area:' : 'प्रभावित क्षेत्र:'}
            </p>
            <p className="text-foreground">
              {affectedAreaNames?.[formData?.priority?.affectedArea]?.[language]}
            </p>
          </div>
        </div>
      </div>
      {/* Location Section */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="MapPin" size={18} className="text-primary" />
            <span>{language === 'en' ? 'Location' : 'स्थान'}</span>
          </h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(3)}
            iconName="Edit3"
          >
            {language === 'en' ? 'Edit' : 'संपादित करें'}
          </Button>
        </div>
        {formData?.location && (
          <div className="space-y-3">
            <p className="text-foreground text-sm">
              {formData?.location?.address}
            </p>
            <p className="text-xs text-muted-foreground">
              {language === 'en' ? 'Coordinates:' : 'निर्देशांक:'} 
              {formData?.location?.latitude?.toFixed(6)}, {formData?.location?.longitude?.toFixed(6)}
            </p>
            <div className="w-full h-32 bg-muted rounded-md overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Issue Location"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${formData?.location?.latitude},${formData?.location?.longitude}&z=16&output=embed`}
                className="border-0"
              />
            </div>
          </div>
        )}
      </div>
      {/* Media Section */}
      {formData?.files && formData?.files?.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-foreground flex items-center space-x-2">
              <Icon name="Image" size={18} className="text-primary" />
              <span>
                {language === 'en' ? 'Attachments' : 'संलग्नक'} ({formData?.files?.length})
              </span>
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(4)}
              iconName="Edit3"
            >
              {language === 'en' ? 'Edit' : 'संपादित करें'}
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {formData?.files?.map((file, index) => (
              <div key={index} className="relative">
                {file?.preview ? (
                  <img
                    src={file?.preview}
                    alt={file?.name}
                    className="w-full h-20 object-cover rounded-md border"
                  />
                ) : (
                  <div className="w-full h-20 bg-muted rounded-md border flex items-center justify-center">
                    <Icon 
                      name={file?.type?.startsWith('video/') ? 'Video' : 'File'} 
                      size={24} 
                      className="text-muted-foreground" 
                    />
                  </div>
                )}
                <div className="mt-1">
                  <p className="text-xs text-foreground truncate" title={file?.name}>
                    {file?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file?.size)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Submission Info */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-2">
              {language === 'en' ? 'What happens next?' : 'आगे क्या होगा?'}
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>
                {language === 'en' ?'• You will receive a tracking number for your report' :'• आपको अपनी रिपोर्ट के लिए एक ट्रैकिंग नंबर मिलेगा'
                }
              </li>
              <li>
                {language === 'en' ?'• Municipal staff will review and assign your issue' :'• नगरपालिका कर्मचारी आपकी समस्या की समीक्षा करेंगे और असाइन करेंगे'
                }
              </li>
              <li>
                {language === 'en' ?'• You will receive updates on the progress' :'• आपको प्रगति पर अपडेट मिलेंगे'
                }
              </li>
              <li>
                {language === 'en' ?'• Expected response time: 24-48 hours' :'• अपेक्षित प्रतिक्रिया समय: 24-48 घंटे'
                }
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;