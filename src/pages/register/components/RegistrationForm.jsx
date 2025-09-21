import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const RegistrationForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '',
    department: '',
    employeeId: '',
    profilePhoto: null,
    identityDocument: null,
    agreeToTerms: false,
    agreeToPrivacy: false
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const roleOptions = [
    { 
      value: 'citizen', 
      label: 'Citizen',
      description: 'Report and track civic issues in your area'
    },
    { 
      value: 'municipal_staff', 
      label: 'Municipal Staff',
      description: 'Manage and resolve civic issues (requires approval)'
    },
    { 
      value: 'super_admin', 
      label: 'Super Administrator',
      description: 'Full system access and user management'
    }
  ];

  const departmentOptions = [
    { value: 'public_works', label: 'Public Works Department' },
    { value: 'sanitation', label: 'Sanitation Department' },
    { value: 'water_supply', label: 'Water Supply Department' },
    { value: 'electricity', label: 'Electricity Department' },
    { value: 'traffic', label: 'Traffic Management' },
    { value: 'health', label: 'Health Department' },
    { value: 'education', label: 'Education Department' },
    { value: 'administration', label: 'General Administration' }
  ];

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 25;
    if (/[A-Z]/?.test(password)) strength += 25;
    if (/[a-z]/?.test(password)) strength += 25;
    if (/[0-9]/?.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/?.test(password)) strength += 25;
    return Math.min(strength, 100);
  };

  const getPasswordStrengthColor = (strength) => {
    if (strength < 25) return 'bg-error';
    if (strength < 50) return 'bg-warning';
    if (strength < 75) return 'bg-accent';
    return 'bg-success';
  };

  const getPasswordStrengthText = (strength) => {
    if (strength < 25) return 'Very Weak';
    if (strength < 50) return 'Weak';
    if (strength < 75) return 'Good';
    return 'Strong';
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'password') {
      let strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (field, file) => {
    if (file && file?.size > 5 * 1024 * 1024) { // 5MB limit
      setErrors(prev => ({ ...prev, [field]: 'File size must be less than 5MB' }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [field]: file }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!formData?.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData?.role) newErrors.role = 'Please select a role';
    if ((formData?.role === 'municipal_staff' || formData?.role === 'super_admin') && !formData?.department) {
      newErrors.department = 'Department selection is required for staff roles';
    }
    if ((formData?.role === 'municipal_staff' || formData?.role === 'super_admin') && !formData?.employeeId?.trim()) {
      newErrors.employeeId = 'Employee ID is required for staff roles';
    }
    if (!formData?.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms of service';
    if (!formData?.agreeToPrivacy) newErrors.agreeToPrivacy = 'You must agree to the privacy policy';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const isStaffRole = formData?.role === 'municipal_staff' || formData?.role === 'super_admin';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-semibold text-foreground flex items-center">
          <Icon name="User" size={20} className="mr-2 text-primary" />
          Personal Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            value={formData?.firstName}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
            error={errors?.firstName}
            required
          />
          
          <Input
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            value={formData?.lastName}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
            error={errors?.lastName}
            required
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          description="We'll use this for account verification and notifications"
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="Enter your 10-digit mobile number"
          value={formData?.phone}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
          error={errors?.phone}
          description="Required for OTP verification and emergency notifications"
          required
        />
      </div>
      {/* Password Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-semibold text-foreground flex items-center">
          <Icon name="Lock" size={20} className="mr-2 text-primary" />
          Security Information
        </h3>

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground civic-transition"
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
          </button>
        </div>

        {formData?.password && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-caption text-muted-foreground">Password Strength:</span>
              <span className={`font-caption font-medium ${
                passwordStrength < 50 ? 'text-error' : passwordStrength < 75 ? 'text-warning' : 'text-success'
              }`}>
                {getPasswordStrengthText(passwordStrength)}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full civic-transition ${getPasswordStrengthColor(passwordStrength)}`}
                style={{ width: `${passwordStrength}%` }}
              />
            </div>
          </div>
        )}

        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Re-enter your password"
            value={formData?.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
            error={errors?.confirmPassword}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground civic-transition"
          >
            <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={18} />
          </button>
        </div>
      </div>
      {/* Role Selection Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-semibold text-foreground flex items-center">
          <Icon name="UserCheck" size={20} className="mr-2 text-primary" />
          Role Selection
        </h3>

        <Select
          label="Select Your Role"
          options={roleOptions}
          value={formData?.role}
          onChange={(value) => handleInputChange('role', value)}
          error={errors?.role}
          description="Choose the role that best describes your intended use of the platform"
          required
        />

        {isStaffRole && (
          <div className="space-y-4 p-4 bg-muted/30 rounded-lg border border-border">
            <div className="flex items-center space-x-2 text-warning">
              <Icon name="AlertTriangle" size={18} />
              <span className="text-sm font-caption font-medium">Staff Registration Notice</span>
            </div>
            <p className="text-sm font-body text-muted-foreground">
              Staff registrations require administrative approval. You will receive an email notification once your account is verified.
            </p>

            <Select
              label="Department"
              options={departmentOptions}
              value={formData?.department}
              onChange={(value) => handleInputChange('department', value)}
              error={errors?.department}
              searchable
              required
            />

            <Input
              label="Employee ID"
              type="text"
              placeholder="Enter your official employee ID"
              value={formData?.employeeId}
              onChange={(e) => handleInputChange('employeeId', e?.target?.value)}
              error={errors?.employeeId}
              description="Your official government employee identification number"
              required
            />
          </div>
        )}
      </div>
      {/* File Upload Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-semibold text-foreground flex items-center">
          <Icon name="Upload" size={20} className="mr-2 text-primary" />
          Document Upload
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-body font-medium text-foreground">
              Profile Photo <span className="text-muted-foreground">(Optional)</span>
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary civic-transition">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload('profilePhoto', e?.target?.files?.[0])}
                className="hidden"
                id="profilePhoto"
              />
              <label htmlFor="profilePhoto" className="cursor-pointer">
                <Icon name="Camera" size={24} className="mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-body text-muted-foreground">
                  {formData?.profilePhoto ? formData?.profilePhoto?.name : 'Click to upload profile photo'}
                </p>
                <p className="text-xs font-caption text-muted-foreground mt-1">
                  JPG, PNG up to 5MB
                </p>
              </label>
            </div>
            {errors?.profilePhoto && (
              <p className="text-sm text-error font-caption">{errors?.profilePhoto}</p>
            )}
          </div>

          {isStaffRole && (
            <div className="space-y-2">
              <label className="text-sm font-body font-medium text-foreground">
                Identity Document <span className="text-error">*</span>
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary civic-transition">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload('identityDocument', e?.target?.files?.[0])}
                  className="hidden"
                  id="identityDocument"
                />
                <label htmlFor="identityDocument" className="cursor-pointer">
                  <Icon name="FileText" size={24} className="mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-body text-muted-foreground">
                    {formData?.identityDocument ? formData?.identityDocument?.name : 'Upload ID document'}
                  </p>
                  <p className="text-xs font-caption text-muted-foreground mt-1">
                    Aadhar, PAN, or Employee ID
                  </p>
                </label>
              </div>
              {errors?.identityDocument && (
                <p className="text-sm text-error font-caption">{errors?.identityDocument}</p>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Terms and Conditions */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-semibold text-foreground flex items-center">
          <Icon name="FileCheck" size={20} className="mr-2 text-primary" />
          Legal Agreements
        </h3>

        <div className="space-y-3">
          <Checkbox
            label="I agree to the Terms of Service"
            description="By checking this box, you agree to our terms and conditions"
            checked={formData?.agreeToTerms}
            onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
            error={errors?.agreeToTerms}
            required
          />

          <Checkbox
            label="I agree to the Privacy Policy"
            description="We are committed to protecting your personal information"
            checked={formData?.agreeToPrivacy}
            onChange={(e) => handleInputChange('agreeToPrivacy', e?.target?.checked)}
            error={errors?.agreeToPrivacy}
            required
          />
        </div>
      </div>
      {/* Submit Button */}
      <div className="pt-4">
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={loading}
          iconName="UserPlus"
          iconPosition="left"
        >
          Create Account
        </Button>
      </div>
    </form>
  );
};

export default RegistrationForm;