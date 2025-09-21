import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const UserTableRow = ({ user, onEdit, onDelete, onToggleStatus, isSelected, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'inactive':
        return 'bg-error/10 text-error border-error/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'super admin':
        return 'bg-purple-100 text-purple-800';
      case 'municipal staff':
        return 'bg-blue-100 text-blue-800';
      case 'field officer':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatLastLogin = (date) => {
    const now = new Date();
    const loginDate = new Date(date);
    const diffInHours = Math.floor((now - loginDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return loginDate?.toLocaleDateString();
  };

  return (
    <>
      {/* Desktop Row */}
      <tr className="hidden lg:table-row border-b border-border hover:bg-muted/50 transition-colors duration-150">
        <td className="px-6 py-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelect(user?.id, e?.target?.checked)}
              className="w-4 h-4 text-primary bg-background border-border rounded civic-focus"
            />
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
              <Image
                src={user?.avatar}
                alt={user?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-medium text-foreground">{user?.name}</div>
              <div className="text-sm text-muted-foreground">{user?.email}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user?.role)}`}>
            {user?.role}
          </span>
        </td>
        <td className="px-6 py-4 text-sm text-foreground">
          {user?.department}
        </td>
        <td className="px-6 py-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(user?.status)}`}>
            <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user?.status === 'Active' ? 'bg-success' : user?.status === 'Inactive' ? 'bg-error' : 'bg-warning'}`}></div>
            {user?.status}
          </span>
        </td>
        <td className="px-6 py-4 text-sm text-muted-foreground">
          {formatLastLogin(user?.lastLogin)}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center space-x-1">
            <div className="w-16 bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${user?.performance}%` }}
              ></div>
            </div>
            <span className="text-xs text-muted-foreground ml-2">
              {user?.performance}%
            </span>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Edit"
              onClick={() => onEdit(user)}
              className="h-8 w-8 p-0"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName={user?.status === 'Active' ? 'UserX' : 'UserCheck'}
              onClick={() => onToggleStatus(user)}
              className="h-8 w-8 p-0"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Trash2"
              onClick={() => onDelete(user)}
              className="h-8 w-8 p-0 text-error hover:text-error"
            />
          </div>
        </td>
      </tr>
      {/* Mobile Card */}
      <div className="lg:hidden bg-card border border-border rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelect(user?.id, e?.target?.checked)}
              className="w-4 h-4 text-primary bg-background border-border rounded civic-focus"
            />
            <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
              <Image
                src={user?.avatar}
                alt={user?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-medium text-foreground">{user?.name}</div>
              <div className="text-sm text-muted-foreground">{user?.email}</div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8 p-0"
          />
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user?.role)}`}>
            {user?.role}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(user?.status)}`}>
            <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user?.status === 'Active' ? 'bg-success' : user?.status === 'Inactive' ? 'bg-error' : 'bg-warning'}`}></div>
            {user?.status}
          </span>
        </div>

        {isExpanded && (
          <div className="space-y-3 pt-3 border-t border-border civic-fade-in">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Department:</span>
                <div className="font-medium text-foreground">{user?.department}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Last Login:</span>
                <div className="font-medium text-foreground">{formatLastLogin(user?.lastLogin)}</div>
              </div>
            </div>
            
            <div>
              <span className="text-sm text-muted-foreground">Performance:</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${user?.performance}%` }}
                  ></div>
                </div>
                <span className="text-sm text-muted-foreground">
                  {user?.performance}%
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Edit"
                iconPosition="left"
                onClick={() => onEdit(user)}
                className="flex-1"
              >
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName={user?.status === 'Active' ? 'UserX' : 'UserCheck'}
                onClick={() => onToggleStatus(user)}
                className="px-3"
              />
              <Button
                variant="outline"
                size="sm"
                iconName="Trash2"
                onClick={() => onDelete(user)}
                className="px-3 text-error hover:text-error"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserTableRow;