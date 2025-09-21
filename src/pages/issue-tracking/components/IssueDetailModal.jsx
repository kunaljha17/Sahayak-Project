import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const IssueDetailModal = ({ 
  issue, 
  isOpen, 
  onClose, 
  onSubmitFeedback,
  currentLanguage = 'en' 
}) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  if (!isOpen || !issue) return null;

  const statusConfig = {
    submitted: {
      color: 'bg-blue-100 text-blue-800',
      icon: 'Clock',
      label: currentLanguage === 'en' ? 'Submitted' : 'प्रस्तुत'
    },
    assigned: {
      color: 'bg-yellow-100 text-yellow-800',
      icon: 'UserCheck',
      label: currentLanguage === 'en' ? 'Assigned' : 'सौंपा गया'
    },
    'in-progress': {
      color: 'bg-orange-100 text-orange-800',
      icon: 'Wrench',
      label: currentLanguage === 'en' ? 'In Progress' : 'प्रगति में'
    },
    resolved: {
      color: 'bg-green-100 text-green-800',
      icon: 'CheckCircle',
      label: currentLanguage === 'en' ? 'Resolved' : 'हल हो गया'
    }
  };

  const timelineSteps = [
    {
      status: 'submitted',
      label: currentLanguage === 'en' ? 'Issue Submitted' : 'समस्या प्रस्तुत',
      date: issue?.submittedAt,
      completed: true
    },
    {
      status: 'assigned',
      label: currentLanguage === 'en' ? 'Assigned to Staff' : 'कर्मचारी को सौंपा गया',
      date: issue?.assignedAt,
      completed: ['assigned', 'in-progress', 'resolved']?.includes(issue?.status)
    },
    {
      status: 'in-progress',
      label: currentLanguage === 'en' ? 'Work in Progress' : 'कार्य प्रगति में',
      date: issue?.startedAt,
      completed: ['in-progress', 'resolved']?.includes(issue?.status)
    },
    {
      status: 'resolved',
      label: currentLanguage === 'en' ? 'Issue Resolved' : 'समस्या हल हो गई',
      date: issue?.resolvedAt,
      completed: issue?.status === 'resolved'
    }
  ];

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date)?.toLocaleDateString(currentLanguage === 'en' ? 'en-IN' : 'hi-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSubmitFeedback = async () => {
    if (!feedback?.trim() || rating === 0) return;
    
    setIsSubmittingFeedback(true);
    try {
      await onSubmitFeedback?.(issue?.id, { feedback, rating });
      setFeedback('');
      setRating(0);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  const status = statusConfig?.[issue?.status] || statusConfig?.submitted;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden civic-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {issue?.title}
            </h2>
            <p className="text-sm text-muted-foreground font-caption">
              {currentLanguage === 'en' ? 'Issue ID:' : 'समस्या ID:'} #{issue?.id}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${status?.color}`}>
              <Icon name={status?.icon} size={16} className="mr-2" />
              {status?.label}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              iconName="X"
            />
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-6 space-y-6">
            {/* Issue Images */}
            {issue?.images && issue?.images?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {issue?.images?.map((image, index) => (
                  <div key={index} className="overflow-hidden rounded-lg">
                    <Image
                      src={image}
                      alt={`Issue image ${index + 1}`}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Issue Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {currentLanguage === 'en' ? 'Description' : 'विवरण'}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {issue?.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {currentLanguage === 'en' ? 'Location Details' : 'स्थान विवरण'}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Icon name="MapPin" size={16} className="text-muted-foreground" />
                      <span className="text-muted-foreground">{issue?.location}</span>
                    </div>
                    {issue?.address && (
                      <p className="text-sm text-muted-foreground pl-6">
                        {issue?.address}
                      </p>
                    )}
                  </div>
                </div>

                {/* Assigned Staff */}
                {issue?.assignedTo && (
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {currentLanguage === 'en' ? 'Assigned Staff' : 'सौंपा गया कर्मचारी'}
                    </h3>
                    <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <Icon name="User" size={16} className="text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{issue?.assignedTo?.name}</p>
                        <p className="text-sm text-muted-foreground">{issue?.assignedTo?.department}</p>
                        <p className="text-xs text-muted-foreground font-caption">
                          {issue?.assignedTo?.contact}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Timeline */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">
                  {currentLanguage === 'en' ? 'Status Timeline' : 'स्थिति समयरेखा'}
                </h3>
                <div className="space-y-4">
                  {timelineSteps?.map((step, index) => (
                    <div key={step?.status} className="flex items-start space-x-3">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center border-2
                        ${step?.completed 
                          ? 'bg-primary border-primary text-primary-foreground' 
                          : 'bg-muted border-border text-muted-foreground'
                        }
                      `}>
                        <Icon 
                          name={step?.completed ? 'Check' : 'Clock'} 
                          size={14} 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${
                          step?.completed ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {step?.label}
                        </p>
                        {step?.date && (
                          <p className="text-xs text-muted-foreground font-caption">
                            {formatDate(step?.date)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Municipal Responses */}
            {issue?.responses && issue?.responses?.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-4">
                  {currentLanguage === 'en' ? 'Municipal Updates' : 'नगरपालिका अपडेट'}
                </h3>
                <div className="space-y-3">
                  {issue?.responses?.map((response, index) => (
                    <div key={index} className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-foreground text-sm">
                          {response?.author}
                        </p>
                        <p className="text-xs text-muted-foreground font-caption">
                          {formatDate(response?.date)}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {response?.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Feedback Section - Only for resolved issues */}
            {issue?.status === 'resolved' && (
              <div className="border-t border-border pt-6">
                <h3 className="font-semibold text-foreground mb-4">
                  {currentLanguage === 'en' ? 'Rate Resolution' : 'समाधान को रेट करें'}
                </h3>
                
                {/* Rating Stars */}
                <div className="flex items-center space-x-2 mb-4">
                  {[1, 2, 3, 4, 5]?.map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="civic-hover"
                    >
                      <Icon
                        name="Star"
                        size={24}
                        className={`${
                          star <= rating 
                            ? 'text-yellow-400 fill-current' :'text-muted-foreground'
                        } transition-colors duration-150`}
                      />
                    </button>
                  ))}
                  <span className="text-sm text-muted-foreground ml-2 font-caption">
                    {rating > 0 && `${rating}/5`}
                  </span>
                </div>

                {/* Feedback Text */}
                <Input
                  label={currentLanguage === 'en' ? 'Your Feedback' : 'आपकी प्रतिक्रिया'}
                  type="text"
                  placeholder={currentLanguage === 'en' ?'Share your experience with the resolution...' :'समाधान के साथ अपना अनुभव साझा करें...'
                  }
                  value={feedback}
                  onChange={(e) => setFeedback(e?.target?.value)}
                  className="mb-4"
                />

                <Button
                  variant="default"
                  onClick={handleSubmitFeedback}
                  loading={isSubmittingFeedback}
                  disabled={!feedback?.trim() || rating === 0}
                  iconName="Send"
                  iconPosition="left"
                >
                  {currentLanguage === 'en' ? 'Submit Feedback' : 'फीडबैक सबमिट करें'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetailModal;