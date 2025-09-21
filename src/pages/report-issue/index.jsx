import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';

// Import all components
import CategorySelector from './components/CategorySelector';
import LocationPicker from './components/LocationPicker';
import MediaUploader from './components/MediaUploader';
import VoiceRecorder from './components/VoiceRecorder';
import PrioritySelector from './components/PrioritySelector';
import FormProgress from './components/FormProgress';
import ReviewSummary from './components/ReviewSummary';

const ReportIssue = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [language, setLanguage] = useState('en');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Form data state
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    priority: null,
    location: null,
    files: [],
    voiceRecording: null,
    isDraft: false
  });

  const totalSteps = 5;
  
  // Add stepLabels for FormProgress component
  const stepLabels = language === 'en' 
    ? ['Category', 'Description', 'Location', 'Media', 'Review']
    : ['श्रेणी', 'विवरण', 'स्थान', 'मीडिया', 'समीक्षा'];

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('sahayak-language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    // Listen for language change events
    const handleLanguageChange = (event) => {
      setLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData?.category) {
          newErrors.category = language === 'en' ?'Please select a category' :'कृपया एक श्रेणी चुनें';
        }
        break;
      case 2:
        if (!formData?.title?.trim()) {
          newErrors.title = language === 'en' ?'Please enter a title' :'कृपया एक शीर्षक दर्ज करें';
        }
        if (!formData?.description?.trim()) {
          newErrors.description = language === 'en' ?'Please provide a description' :'कृपया एक विवरण प्रदान करें';
        }
        if (!formData?.priority) {
          newErrors.priority = language === 'en' ?'Please select priority and affected area' :'कृपया प्राथमिकता और प्रभावित क्षेत्र चुनें';
        }
        break;
      case 3:
        if (!formData?.location) {
          newErrors.location = language === 'en' ?'Please provide location information' :'कृपया स्थान की जानकारी प्रदान करें';
        }
        break;
      case 4:
        // Media is optional, no validation needed
        break;
      case 5:
        // Review step, no additional validation
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleEditStep = (step) => {
    setCurrentStep(step);
  };

  const handleSaveDraft = async () => {
    const draftData = {
      ...formData,
      isDraft: true,
      savedAt: new Date()?.toISOString()
    };

    // Simulate saving to localStorage
    localStorage.setItem('sahayak-draft-report', JSON.stringify(draftData));
    
    alert(
      language === 'en' ?'Draft saved successfully!' :'ड्राफ्ट सफलतापूर्वक सहेजा गया!'
    );
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) return;

    setIsSubmitting(true);

    try {
      // Simulate API submission
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate tracking number
      const trackingNumber = `SHK${Date.now()?.toString()?.slice(-8)}`;

      // Clear draft if exists
      localStorage.removeItem('sahayak-draft-report');

      // Show success message
      alert(
        language === 'en' 
          ? `Report submitted successfully! Your tracking number is: ${trackingNumber}`
          : `रिपोर्ट सफलतापूर्वक सबमिट की गई! आपका ट्रैकिंग नंबर है: ${trackingNumber}`
      );

      // Navigate to tracking page
      navigate('/issue-tracking', { 
        state: { trackingNumber, newReport: true } 
      });

    } catch (error) {
      console.error('Submission error:', error);
      alert(
        language === 'en' ?'Failed to submit report. Please try again.' :'रिपोर्ट सबमिट करने में विफल। कृपया पुनः प्रयास करें।'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <CategorySelector
            selectedCategory={formData?.category}
            onCategorySelect={(category) => setFormData({ ...formData, category })}
            language={language}
            error={errors?.category}
          />
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {language === 'en' ? 'Describe the Issue' : 'समस्या का वर्णन करें'}
              </h3>
            </div>
            <Input
              label={language === 'en' ? 'Issue Title' : 'समस्या का शीर्षक'}
              type="text"
              placeholder={
                language === 'en' ?'Brief title describing the issue...' :'समस्या का संक्षिप्त शीर्षक...'
              }
              value={formData?.title}
              onChange={(e) => setFormData({ ...formData, title: e?.target?.value })}
              error={errors?.title}
              required
              className="mb-4"
            />
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {language === 'en' ? 'Detailed Description' : 'विस्तृत विवरण'}
                <span className="text-error ml-1">*</span>
              </label>
              <textarea
                value={formData?.description}
                onChange={(e) => setFormData({ ...formData, description: e?.target?.value })}
                placeholder={
                  language === 'en' ?'Please provide detailed information about the issue, including when it started, how it affects you, and any other relevant details...' :'कृपया समस्या के बारे में विस्तृत जानकारी प्रदान करें, जिसमें यह कब शुरू हुई, यह आपको कैसे प्रभावित करती है, और कोई अन्य प्रासंगिक विवरण...'
                }
                rows={5}
                className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
              />
              {errors?.description && (
                <p className="mt-1 text-sm text-error">{errors?.description}</p>
              )}
            </div>
            <VoiceRecorder
              onRecordingComplete={(recording) => 
                setFormData({ ...formData, voiceRecording: recording })
              }
              language={language}
            />
            <PrioritySelector
              selectedPriority={formData?.priority}
              onPrioritySelect={(priority) => setFormData({ ...formData, priority })}
              language={language}
              error={errors?.priority}
            />
          </div>
        );

      case 3:
        return (
          <LocationPicker
            location={formData?.location}
            onLocationChange={(location) => setFormData({ ...formData, location })}
            language={language}
            error={errors?.location}
          />
        );

      case 4:
        return (
          <MediaUploader
            files={formData?.files}
            onFilesChange={(files) => setFormData({ ...formData, files })}
            language={language}
            error={errors?.files}
          />
        );

      case 5:
        return (
          <ReviewSummary
            formData={formData}
            onEdit={handleEditStep}
            language={language}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        <FormProgress
          currentStep={currentStep}
          totalSteps={totalSteps}
          stepLabels={stepLabels}
          language={language}
        />

        <main className="max-w-4xl mx-auto px-4 py-6">
          <div className="bg-card rounded-lg shadow-civic-sm border border-border">
            <div className="p-6">
              {renderStepContent()}
            </div>

            {/* Navigation Footer */}
            <div className="border-t border-border p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {currentStep > 1 && (
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      iconName="ChevronLeft"
                      iconPosition="left"
                    >
                      {language === 'en' ? 'Previous' : 'पिछला'}
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    onClick={handleSaveDraft}
                    iconName="Save"
                    iconPosition="left"
                    className="text-muted-foreground"
                  >
                    {language === 'en' ? 'Save Draft' : 'ड्राफ्ट सेव करें'}
                  </Button>
                </div>

                <div className="flex items-center space-x-3">
                  {currentStep < totalSteps ? (
                    <Button
                      variant="default"
                      onClick={handleNext}
                      iconName="ChevronRight"
                      iconPosition="right"
                    >
                      {language === 'en' ? 'Next' : 'अगला'}
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      onClick={handleSubmit}
                      loading={isSubmitting}
                      iconName="Send"
                      iconPosition="left"
                      className="bg-success hover:bg-success/90"
                    >
                      {isSubmitting 
                        ? (language === 'en' ? 'Submitting...' : 'सबमिट कर रहे हैं...')
                        : (language === 'en' ? 'Submit Report' : 'रिपोर्ट सबमिट करें')
                      }
                    </Button>
                  )}
                </div>
              </div>

              {/* Help Text */}
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="HelpCircle" size={16} />
                  <span>
                    {language === 'en' ?'Need help? Contact support at support@sahayak.gov.in or call 1800-XXX-XXXX' :'सहायता चाहिए? support@sahayak.gov.in पर संपर्क करें या 1800-XXX-XXXX पर कॉल करें'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportIssue;