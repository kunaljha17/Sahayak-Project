import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const ManagementPanel = ({ issue, onStatusUpdate, onAssignStaff, onAddNote, onUploadProgress }) => {
  const [selectedStatus, setSelectedStatus] = useState(issue?.status);
  const [selectedStaff, setSelectedStaff] = useState(issue?.assignedTo || '');
  const [estimatedDays, setEstimatedDays] = useState(issue?.estimatedResolution || '');
  const [internalNote, setInternalNote] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const statusOptions = [
    { value: 'submitted', label: 'Submitted', description: 'Issue has been reported' },
    { value: 'assigned', label: 'Assigned', description: 'Issue assigned to staff member' },
    { value: 'in-progress', label: 'In Progress', description: 'Work is being done' },
    { value: 'resolved', label: 'Resolved', description: 'Issue has been fixed' }
  ];

  const staffOptions = [
    { value: '', label: 'Unassigned', description: 'No staff member assigned' },
    { value: 'staff-001', label: 'Rajesh Kumar', description: 'Senior Field Officer - Roads' },
    { value: 'staff-002', label: 'Priya Sharma', description: 'Sanitation Supervisor' },
    { value: 'staff-003', label: 'Amit Singh', description: 'Electrical Maintenance' },
    { value: 'staff-004', label: 'Sunita Devi', description: 'Water Supply Technician' },
    { value: 'staff-005', label: 'Vikash Yadav', description: 'General Maintenance' }
  ];

  const handleStatusUpdate = async () => {
    setIsUpdating(true);
    try {
      await onStatusUpdate(issue?.id, selectedStatus, {
        estimatedDays: estimatedDays ? parseInt(estimatedDays) : null,
        note: internalNote?.trim() || null
      });
      setInternalNote('');
    } catch (error) {
      console.error('Status update failed:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAssignStaff = async () => {
    setIsUpdating(true);
    try {
      await onAssignStaff(issue?.id, selectedStaff);
    } catch (error) {
      console.error('Staff assignment failed:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddNote = async () => {
    if (!internalNote?.trim()) return;
    
    setIsUpdating(true);
    try {
      await onAddNote(issue?.id, internalNote?.trim());
      setInternalNote('');
    } catch (error) {
      console.error('Note addition failed:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleProgressUpload = (event) => {
    const files = event?.target?.files;
    if (files && files?.length > 0) {
      onUploadProgress(issue?.id, files);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-civic-sm">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Settings" size={20} />
          <span>Issue Management</span>
        </h3>
      </div>
      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Status Update */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Status Management</h4>
          <Select
            label="Current Status"
            options={statusOptions}
            value={selectedStatus}
            onChange={setSelectedStatus}
            className="mb-4"
          />
          
          {(selectedStatus === 'assigned' || selectedStatus === 'in-progress') && (
            <Input
              label="Estimated Resolution (Days)"
              type="number"
              placeholder="Enter number of days"
              value={estimatedDays}
              onChange={(e) => setEstimatedDays(e?.target?.value)}
              min="1"
              max="365"
              className="mb-4"
            />
          )}

          <Button
            variant="default"
            onClick={handleStatusUpdate}
            loading={isUpdating}
            iconName="RefreshCw"
            iconPosition="left"
            fullWidth
            disabled={selectedStatus === issue?.status}
          >
            Update Status
          </Button>
        </div>

        {/* Staff Assignment */}
        <div className="space-y-4 pt-6 border-t border-border">
          <h4 className="font-medium text-foreground">Staff Assignment</h4>
          <Select
            label="Assign to Staff Member"
            options={staffOptions}
            value={selectedStaff}
            onChange={setSelectedStaff}
            searchable
            className="mb-4"
          />
          
          <Button
            variant="outline"
            onClick={handleAssignStaff}
            loading={isUpdating}
            iconName="UserCheck"
            iconPosition="left"
            fullWidth
            disabled={selectedStaff === issue?.assignedTo}
          >
            {selectedStaff ? 'Assign Staff' : 'Remove Assignment'}
          </Button>
        </div>

        {/* Internal Notes */}
        <div className="space-y-4 pt-6 border-t border-border">
          <h4 className="font-medium text-foreground">Internal Notes</h4>
          <Input
            label="Add Internal Note"
            type="text"
            placeholder="Add note for team coordination..."
            value={internalNote}
            onChange={(e) => setInternalNote(e?.target?.value)}
            description="This note will only be visible to staff members"
            className="mb-4"
          />
          
          <Button
            variant="outline"
            onClick={handleAddNote}
            loading={isUpdating}
            iconName="MessageSquare"
            iconPosition="left"
            fullWidth
            disabled={!internalNote?.trim()}
          >
            Add Note
          </Button>
        </div>

        {/* Progress Documentation */}
        <div className="space-y-4 pt-6 border-t border-border">
          <h4 className="font-medium text-foreground">Progress Documentation</h4>
          <div className="space-y-3">
            <label className="block">
              <span className="text-sm font-medium text-foreground mb-2 block">
                Upload Progress Photos
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleProgressUpload}
                className="block w-full text-sm text-muted-foreground
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-medium
                  file:bg-primary file:text-primary-foreground
                  hover:file:bg-primary/90
                  file:cursor-pointer cursor-pointer"
              />
            </label>
            <p className="text-xs text-muted-foreground">
              Upload photos showing work progress. Maximum 5 files, 10MB each.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4 pt-6 border-t border-border">
          <h4 className="font-medium text-foreground">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="sm"
              iconName="Phone"
              iconPosition="left"
              onClick={() => console.log('Calling reporter')}
            >
              Call Reporter
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="MessageCircle"
              iconPosition="left"
              onClick={() => console.log('Sending message')}
            >
              Send Message
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="AlertTriangle"
              iconPosition="left"
              onClick={() => console.log('Escalating issue')}
            >
              Escalate
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Copy"
              iconPosition="left"
              onClick={() => console.log('Duplicating issue')}
            >
              Duplicate
            </Button>
          </div>
        </div>

        {/* Resolution Actions */}
        {selectedStatus === 'resolved' && (
          <div className="space-y-4 pt-6 border-t border-border">
            <h4 className="font-medium text-foreground">Resolution Actions</h4>
            <div className="space-y-3">
              <Button
                variant="success"
                iconName="CheckCircle"
                iconPosition="left"
                fullWidth
                onClick={() => console.log('Confirming resolution')}
              >
                Confirm Resolution & Notify Citizen
              </Button>
              <Button
                variant="outline"
                iconName="RotateCcw"
                iconPosition="left"
                fullWidth
                onClick={() => setSelectedStatus('in-progress')}
              >
                Reopen Issue
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagementPanel;