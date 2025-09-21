import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';


const AddUserModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    permissions: [],
    sendCredentials: true,
    requirePasswordChange: true
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roleOptions = [
    { value: 'Super Admin', label: 'Super Admin', description: 'Full system access and user management' },
    { value: 'Municipal Staff', label: 'Municipal Staff', description: 'Issue management and reporting' },
    { value: 'Field Officer', label: 'Field Officer', description: 'Field work and status updates' }
  ];

  const departmentOptions = [
    { value: 'Public Works', label: 'Public Works' },
    { value: 'Sanitation', label: 'Sanitation' },
    { value: 'Water Management', label: 'Water Management' },
    { value: 'Electricity', label: 'Electricity' },
    { value: 'Transportation', label: 'Transportation' },
    { value: 'IT Department', label: 'IT Department' }
  ];

  const permissionOptions = [
    { id: 'view_issues', label: 'View Issues', description: 'Can view all reported issues' },
    { id: 'manage_issues', label: 'Manage Issues', description: 'Can update issue status and assign tasks' },
    { id: 'view_analytics', label: 'View Analytics', description: 'Access to dashboard and reports' },
    { id: 'manage_users', label: 'Manage Users', description: 'Create and manage user accounts' },
    { id: 'system_config', label: 'System Configuration', description: 'Modify system settings' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handlePermissionChange = (permissionId, checked) => {
    setFormData(prev => ({
      ...prev,
      permissions: checked 
        ? [...prev?.permissions, permissionId]
        : prev?.permissions?.filter(id => id !== permissionId)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]{10,}$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData?.role) {
      newErrors.role = 'Role is required';
    }

    if (!formData?.department) {
      newErrors.department = 'Department is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: '',
        department: '',
        permissions: [],
        sendCredentials: true,
        requirePasswordChange: true
      });
    } catch (error) {
      console.error('Failed to create user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDefaultPermissions = (role) => {
    switch (role) {
      case 'Super Admin':
        return ['view_issues', 'manage_issues', 'view_analytics', 'manage_users', 'system_config'];
      case 'Municipal Staff':
        return ['view_issues', 'manage_issues', 'view_analytics'];
      case 'Field Officer':
        return ['view_issues', 'manage_issues'];
      default:
        return [];
    }
  };

  // Auto-select permissions based on role
  React.useEffect(() => {
    if (formData?.role) {
      const defaultPerms = getDefaultPermissions(formData?.role);
      setFormData(prev => ({
        ...prev,
        permissions: defaultPerms
      }));
    }
  }, [formData?.role]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative bg-card border border-border rounded-lg shadow-civic-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground font-heading">
              Add New Staff Member
            </h2>
            <p className="text-sm text-muted-foreground font-caption mt-1">
              Create a new user account with appropriate permissions
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
            className="h-8 w-8 p-0"
          />
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground font-heading">
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                type="text"
                placeholder="Enter full name"
                value={formData?.name}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
                error={errors?.name}
                required
              />
              
              <Input
                label="Email Address"
                type="email"
                placeholder="user@municipality.gov"
                value={formData?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                error={errors?.email}
                required
              />
            </div>

            <Input
              label="Phone Number"
              type="tel"
              placeholder="+91 98765 43210"
              value={formData?.phone}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
              error={errors?.phone}
              required
            />
          </div>

          {/* Role & Department */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground font-heading">
              Role & Department
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Role"
                placeholder="Select role"
                options={roleOptions}
                value={formData?.role}
                onChange={(value) => handleInputChange('role', value)}
                error={errors?.role}
                required
              />
              
              <Select
                label="Department"
                placeholder="Select department"
                options={departmentOptions}
                value={formData?.department}
                onChange={(value) => handleInputChange('department', value)}
                error={errors?.department}
                required
              />
            </div>
          </div>

          {/* Permissions */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground font-heading">
              Permissions
            </h3>
            <p className="text-sm text-muted-foreground font-caption">
              Permissions are automatically set based on role, but can be customized
            </p>
            
            <div className="space-y-3">
              {permissionOptions?.map((permission) => (
                <div key={permission?.id} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                  <Checkbox
                    checked={formData?.permissions?.includes(permission?.id)}
                    onChange={(e) => handlePermissionChange(permission?.id, e?.target?.checked)}
                    className="mt-0.5"
                  />
                  <div>
                    <div className="font-medium text-foreground">
                      {permission?.label}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {permission?.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Account Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground font-heading">
              Account Settings
            </h3>
            
            <div className="space-y-3">
              <Checkbox
                label="Send login credentials via email"
                description="User will receive email with temporary password"
                checked={formData?.sendCredentials}
                onChange={(e) => handleInputChange('sendCredentials', e?.target?.checked)}
              />
              
              <Checkbox
                label="Require password change on first login"
                description="User must set new password on first access"
                checked={formData?.requirePasswordChange}
                onChange={(e) => handleInputChange('requirePasswordChange', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              loading={isSubmitting}
              iconName="UserPlus"
              iconPosition="left"
            >
              {isSubmitting ? 'Creating User...' : 'Create User'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;