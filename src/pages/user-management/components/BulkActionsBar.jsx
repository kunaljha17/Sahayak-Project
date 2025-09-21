import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const BulkActionsBar = ({ 
  selectedUsers, 
  onBulkAction, 
  onSelectAll, 
  onDeselectAll,
  totalUsers,
  allSelected 
}) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const bulkActionOptions = [
    { value: '', label: 'Choose action...' },
    { value: 'activate', label: 'Activate Users' },
    { value: 'deactivate', label: 'Deactivate Users' },
    { value: 'export', label: 'Export Selected' },
    { value: 'delete', label: 'Delete Users' }
  ];

  const handleBulkAction = async () => {
    if (!selectedAction || selectedUsers?.length === 0) return;

    setIsProcessing(true);
    try {
      await onBulkAction(selectedAction, selectedUsers);
      setSelectedAction('');
    } catch (error) {
      console.error('Bulk action failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'activate':
        return 'success';
      case 'deactivate':
        return 'warning';
      case 'delete':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'activate':
        return 'UserCheck';
      case 'deactivate':
        return 'UserX';
      case 'export':
        return 'Download';
      case 'delete':
        return 'Trash2';
      default:
        return 'Play';
    }
  };

  if (selectedUsers?.length === 0) return null;

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6 civic-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="font-medium text-foreground">
              {selectedUsers?.length} user{selectedUsers?.length !== 1 ? 's' : ''} selected
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={allSelected ? onDeselectAll : onSelectAll}
              className="text-primary hover:text-primary/80"
            >
              {allSelected ? 'Deselect All' : `Select All (${totalUsers})`}
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-48">
            <Select
              placeholder="Choose action..."
              options={bulkActionOptions}
              value={selectedAction}
              onChange={setSelectedAction}
            />
          </div>
          
          <Button
            variant={getActionColor(selectedAction)}
            size="sm"
            iconName={getActionIcon(selectedAction)}
            iconPosition="left"
            onClick={handleBulkAction}
            disabled={!selectedAction || isProcessing}
            loading={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Apply'}
          </Button>
        </div>
      </div>
      {selectedAction === 'delete' && (
        <div className="mt-3 p-3 bg-error/10 border border-error/20 rounded-md">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-error" />
            <span className="text-sm text-error font-medium">
              Warning: This action cannot be undone. {selectedUsers?.length} user{selectedUsers?.length !== 1 ? 's' : ''} will be permanently deleted.
            </span>
          </div>
        </div>
      )}
      {selectedAction === 'deactivate' && (
        <div className="mt-3 p-3 bg-warning/10 border border-warning/20 rounded-md">
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={16} className="text-warning" />
            <span className="text-sm text-warning font-medium">
              Selected users will lose access to the system until reactivated.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkActionsBar;