import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegistrationSuccess = ({ userRole, userName, onContinue }) => {
  const getSuccessMessage = (role) => {
    switch (role) {
      case 'citizen':
        return {
          title: 'Welcome to Sahayak!',
          message: 'Your citizen account has been created successfully. You can now report and track civic issues in your area.',
          nextSteps: [
            'Start reporting civic issues in your locality',
            'Track the status of your submitted complaints',
            'Vote on community issues to help prioritize them',
            'Receive notifications about issue resolutions'
          ]
        };
      case 'municipal_staff':
        return {
          title: 'Registration Submitted!',
          message: 'Your staff registration is pending approval. You will receive an email notification once your account is verified by the administrator.',
          nextSteps: [
            'Wait for admin approval (usually within 24-48 hours)',
            'Check your email for verification updates',
            'Prepare your work credentials for verification',
            'Contact support if approval takes longer than expected'
          ]
        };
      case 'super_admin':
        return {
          title: 'Admin Registration Submitted!',
          message: 'Your administrator registration requires verification. The system admin will review your credentials and activate your account.',
          nextSteps: [
            'Await verification from system administrator',
            'Ensure all submitted documents are valid',
            'Check email for approval notifications',
            'Contact IT support for urgent access requirements'
          ]
        };
      default:
        return {
          title: 'Registration Complete!',
          message: 'Your account has been created successfully.',
          nextSteps: ['Complete your profile setup', 'Explore the platform features']
        };
    }
  };

  const successData = getSuccessMessage(userRole);
  const isApprovalRequired = userRole === 'municipal_staff' || userRole === 'super_admin';

  return (
    <div className="text-center space-y-6">
      {/* Success Icon */}
      <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto">
        <Icon name={isApprovalRequired ? "Clock" : "CheckCircle"} size={40} className="text-success" />
      </div>
      {/* Success Message */}
      <div className="space-y-3">
        <h2 className="text-2xl font-heading font-bold text-foreground">
          {successData?.title}
        </h2>
        <p className="text-muted-foreground font-body max-w-md mx-auto">
          {successData?.message}
        </p>
        {userName && (
          <p className="text-primary font-body font-medium">
            Welcome, {userName}!
          </p>
        )}
      </div>
      {/* Status Badge */}
      <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-muted">
        <Icon
          name={isApprovalRequired ? "Clock" : "CheckCircle"}
          size={16}
          className={isApprovalRequired ? "text-warning" : "text-success"}
        />
        <span className={`text-sm font-caption font-medium ${isApprovalRequired ? "text-warning" : "text-success"
          }`}>
          {isApprovalRequired ? "Pending Approval" : "Account Active"}
        </span>
      </div>
      {/* Next Steps */}
      <div className="bg-muted/30 rounded-lg p-6 text-left">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
          <Icon name="List" size={20} className="mr-2 text-primary" />
          Next Steps
        </h3>
        <ul className="space-y-3">
          {successData?.nextSteps?.map((step, index) => (
            <li key={index} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-caption font-semibold">{index + 1}</span>
              </div>
              <span className="text-sm font-body text-foreground">{step}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Action Buttons */}
      {/*
      <div className="space-y-3">
        {!isApprovalRequired ? (
          <Button
            variant="default"
            size="lg"
            fullWidth
            onClick={onContinue}
            iconName="ArrowRight"
            iconPosition="right"
          > 
            <Link to="/report-issue">
              
              Report Issue
            </Link>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="lg"
            fullWidth
            asChild
          >
            <Link to="/login">
              <Icon name="LogIn" size={18} className="mr-2" />
              Back to Login
            </Link>
          </Button>
        )}

        <Button
          variant="ghost"
          size="sm"
          asChild
        >
          <Link to="/analytics-dashboard">
            <Icon name="Home" size={16} className="mr-2" />
            Go to Homepage
          </Link>
        </Button>
      </div>*/}

      <div className="space-y-3">
        {!isApprovalRequired ? (
          <Button
            variant="default"
            size="lg"
            fullWidth
            asChild
          >
            <Link to="/report-issue">
              <Icon name="ArrowRight" size={18} className="mr-2" />
              Report Issue
            </Link>
          </Button>
        ) : (
          <Button variant="outline" size="lg" fullWidth asChild>
            <Link to="/login">
              <Icon name="LogIn" size={18} className="mr-2" />
              Back to Login
            </Link>
          </Button>
        )}

        <Button
          variant="ghost"
          size="sm"
          asChild
        >
          <Link to="/issue-tracking">
            <Icon name="ArrowRight" size={16} className="mr-2" />
            Track issue
          </Link>
        </Button>

      </div>

      {/* Support Information */}
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="HelpCircle" size={18} className="text-primary flex-shrink-0 mt-0.5" />
          <div className="text-left space-y-2">
            <p className="text-sm font-body font-medium text-foreground">
              Need Help?
            </p>
            <div className="space-y-1 text-xs font-caption text-muted-foreground">
              <p>• Email: support@sahayak.gov.in</p>
              <p>• Phone: 1800-XXX-XXXX (Toll Free)</p>
              <p>• Help Center: Available 24/7</p>
            </div>
          </div>
        </div>
      </div>
      {/* Additional Information for Staff */}
      {isApprovalRequired && (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={18} className="text-warning flex-shrink-0 mt-0.5" />
            <div className="text-left space-y-2">
              <p className="text-sm font-body font-medium text-foreground">
                Important Notice
              </p>
              <p className="text-xs font-caption text-muted-foreground">
                Your account will remain inactive until approved by the administrator.
                Please ensure all submitted information is accurate and complete to avoid delays.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationSuccess;