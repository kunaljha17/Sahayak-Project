import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import UserStatsCard from './components/UserStatsCard';
import UserTableRow from './components/UserTableRow';
import UserFilters from './components/UserFilters';
import BulkActionsBar from './components/BulkActionsBar';
import AddUserModal from './components/AddUserModal';
import DepartmentDistribution from './components/DepartmentDistribution';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    department: '',
    role: '',
    status: '',
    activity: ''
  });
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [language, setLanguage] = useState('en');

  // Mock user data
  const mockUsers = [
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@municipality.gov",
      role: "Municipal Staff",
      department: "Public Works",
      status: "Active",
      lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
      performance: 92,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      phone: "+91 98765 43210",
      joinDate: new Date('2023-01-15')
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@municipality.gov",
      role: "Field Officer",
      department: "Sanitation",
      status: "Active",
      lastLogin: new Date(Date.now() - 30 * 60 * 1000),
      performance: 88,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      phone: "+91 98765 43211",
      joinDate: new Date('2023-02-20')
    },
    {
      id: 3,
      name: "Amit Singh",
      email: "amit.singh@municipality.gov",
      role: "Super Admin",
      department: "IT Department",
      status: "Active",
      lastLogin: new Date(Date.now() - 15 * 60 * 1000),
      performance: 96,
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      phone: "+91 98765 43212",
      joinDate: new Date('2022-11-10')
    },
    {
      id: 4,
      name: "Sunita Devi",
      email: "sunita.devi@municipality.gov",
      role: "Municipal Staff",
      department: "Water Management",
      status: "Inactive",
      lastLogin: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      performance: 75,
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      phone: "+91 98765 43213",
      joinDate: new Date('2023-03-05')
    },
    {
      id: 5,
      name: "Vikash Gupta",
      email: "vikash.gupta@municipality.gov",
      role: "Field Officer",
      department: "Electricity",
      status: "Active",
      lastLogin: new Date(Date.now() - 4 * 60 * 60 * 1000),
      performance: 84,
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      phone: "+91 98765 43214",
      joinDate: new Date('2023-04-12')
    },
    {
      id: 6,
      name: "Meera Patel",
      email: "meera.patel@municipality.gov",
      role: "Municipal Staff",
      department: "Transportation",
      status: "Pending",
      lastLogin: null,
      performance: 0,
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      phone: "+91 98765 43215",
      joinDate: new Date('2025-01-08')
    }
  ];

  // Mock department distribution data
  const departmentDistribution = [
    { name: 'Public Works', count: 12, activeCount: 10 },
    { name: 'Sanitation', count: 8, activeCount: 7 },
    { name: 'Water Management', count: 6, activeCount: 5 },
    { name: 'Electricity', count: 5, activeCount: 4 },
    { name: 'Transportation', count: 4, activeCount: 3 },
    { name: 'IT Department', count: 3, activeCount: 3 }
  ];

  useEffect(() => {
    setUsers(mockUsers);
    
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

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users?.filter(user => {
      const matchesSearch = !filters?.search || 
        user?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        user?.email?.toLowerCase()?.includes(filters?.search?.toLowerCase());
      
      const matchesDepartment = !filters?.department || user?.department === filters?.department;
      const matchesRole = !filters?.role || user?.role === filters?.role;
      const matchesStatus = !filters?.status || user?.status === filters?.status;
      
      let matchesActivity = true;
      if (filters?.activity) {
        const now = new Date();
        const lastLogin = user?.lastLogin;
        
        switch (filters?.activity) {
          case 'today':
            matchesActivity = lastLogin && (now - lastLogin) < 24 * 60 * 60 * 1000;
            break;
          case 'week':
            matchesActivity = lastLogin && (now - lastLogin) < 7 * 24 * 60 * 60 * 1000;
            break;
          case 'month':
            matchesActivity = lastLogin && (now - lastLogin) < 30 * 24 * 60 * 60 * 1000;
            break;
          case 'inactive':
            matchesActivity = !lastLogin || (now - lastLogin) > 30 * 24 * 60 * 60 * 1000;
            break;
        }
      }
      
      return matchesSearch && matchesDepartment && matchesRole && matchesStatus && matchesActivity;
    });

    // Sort users
    filtered?.sort((a, b) => {
      let aValue = a?.[sortConfig?.key];
      let bValue = b?.[sortConfig?.key];
      
      if (sortConfig?.key === 'lastLogin') {
        aValue = aValue ? aValue?.getTime() : 0;
        bValue = bValue ? bValue?.getTime() : 0;
      }
      
      if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [users, filters, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedUsers?.length / itemsPerPage);
  const paginatedUsers = filteredAndSortedUsers?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Statistics
  const stats = useMemo(() => {
    const total = users?.length;
    const active = users?.filter(u => u?.status === 'Active')?.length;
    const inactive = users?.filter(u => u?.status === 'Inactive')?.length;
    const pending = users?.filter(u => u?.status === 'Pending')?.length;
    
    return {
      total: { value: total, change: '+12%', changeType: 'increase' },
      active: { value: active, change: '+5%', changeType: 'increase' },
      inactive: { value: inactive, change: '-8%', changeType: 'decrease' },
      pending: { value: pending, change: '+3', changeType: 'increase' }
    };
  }, [users]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleUserSelect = (userId, selected) => {
    setSelectedUsers(prev => 
      selected 
        ? [...prev, userId]
        : prev?.filter(id => id !== userId)
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(filteredAndSortedUsers?.map(user => user?.id));
  };

  const handleDeselectAll = () => {
    setSelectedUsers([]);
  };

  const handleBulkAction = async (action, userIds) => {
    console.log(`Performing ${action} on users:`, userIds);
    
    switch (action) {
      case 'activate':
        setUsers(prev => prev?.map(user => 
          userIds?.includes(user?.id) ? { ...user, status: 'Active' } : user
        ));
        break;
      case 'deactivate':
        setUsers(prev => prev?.map(user => 
          userIds?.includes(user?.id) ? { ...user, status: 'Inactive' } : user
        ));
        break;
      case 'delete':
        setUsers(prev => prev?.filter(user => !userIds?.includes(user?.id)));
        break;
      case 'export':
        // Export functionality
        console.log('Exporting users...');
        break;
    }
    
    setSelectedUsers([]);
  };

  const handleAddUser = async (userData) => {
    const newUser = {
      id: users?.length + 1,
      ...userData,
      status: 'Pending',
      lastLogin: null,
      performance: 0,
      avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 99)}.jpg`,
      joinDate: new Date()
    };
    
    setUsers(prev => [...prev, newUser]);
    console.log('User created:', newUser);
  };

  const handleEditUser = (user) => {
    console.log('Editing user:', user);
    // Open edit modal or navigate to edit page
  };

  const handleDeleteUser = (user) => {
    if (window.confirm(`Are you sure you want to delete ${user?.name}?`)) {
      setUsers(prev => prev?.filter(u => u?.id !== user?.id));
    }
  };

  const handleToggleUserStatus = (user) => {
    const newStatus = user?.status === 'Active' ? 'Inactive' : 'Active';
    setUsers(prev => prev?.map(u => 
      u?.id === user?.id ? { ...u, status: newStatus } : u
    ));
  };

  const text = {
    en: {
      title: "User Management",
      subtitle: "Manage municipal staff accounts and permissions",
      addUser: "Add New Staff",
      totalUsers: "Total Users",
      activeUsers: "Active Users", 
      inactiveUsers: "Inactive Users",
      pendingUsers: "Pending Users",
      name: "Name",
      role: "Role",
      department: "Department",
      status: "Status",
      lastLogin: "Last Login",
      performance: "Performance",
      actions: "Actions",
      noUsers: "No users found",
      noUsersDesc: "No users match your current filters. Try adjusting your search criteria."
    },
    hi: {
      title: "उपयोगकर्ता प्रबंधन",
      subtitle: "नगरपालिका कर्मचारी खाते और अनुमतियां प्रबंधित करें",
      addUser: "नया कर्मचारी जोड़ें",
      totalUsers: "कुल उपयोगकर्ता",
      activeUsers: "सक्रिय उपयोगकर्ता",
      inactiveUsers: "निष्क्रिय उपयोगकर्ता", 
      pendingUsers: "लंबित उपयोगकर्ता",
      name: "नाम",
      role: "भूमिका",
      department: "विभाग",
      status: "स्थिति",
      lastLogin: "अंतिम लॉगिन",
      performance: "प्रदर्शन",
      actions: "कार्य",
      noUsers: "कोई उपयोगकर्ता नहीं मिला",
      noUsersDesc: "आपके वर्तमान फिल्टर से कोई उपयोगकर्ता मेल नहीं खाता। अपने खोज मानदंड को समायोजित करने का प्रयास करें।"
    }
  };

  const currentText = text?.[language] || text?.en;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground font-heading">
                {currentText?.title}
              </h1>
              <p className="text-muted-foreground font-caption mt-2">
                {currentText?.subtitle}
              </p>
            </div>
            <Button
              variant="default"
              iconName="UserPlus"
              iconPosition="left"
              onClick={() => setIsAddUserModalOpen(true)}
              className="mt-4 sm:mt-0"
            >
              {currentText?.addUser}
            </Button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <UserStatsCard
              title={currentText?.totalUsers}
              value={stats?.total?.value}
              change={stats?.total?.change}
              changeType={stats?.total?.changeType}
              icon="Users"
              color="primary"
            />
            <UserStatsCard
              title={currentText?.activeUsers}
              value={stats?.active?.value}
              change={stats?.active?.change}
              changeType={stats?.active?.changeType}
              icon="UserCheck"
              color="success"
            />
            <UserStatsCard
              title={currentText?.inactiveUsers}
              value={stats?.inactive?.value}
              change={stats?.inactive?.change}
              changeType={stats?.inactive?.changeType}
              icon="UserX"
              color="error"
            />
            <UserStatsCard
              title={currentText?.pendingUsers}
              value={stats?.pending?.value}
              change={stats?.pending?.change}
              changeType={stats?.pending?.changeType}
              icon="UserClock"
              color="warning"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Filters */}
              <UserFilters
                filters={filters}
                onFilterChange={setFilters}
                onClearFilters={() => setFilters({ search: '', department: '', role: '', status: '', activity: '' })}
                totalUsers={users?.length}
                filteredUsers={filteredAndSortedUsers?.length}
              />

              {/* Bulk Actions */}
              <BulkActionsBar
                selectedUsers={selectedUsers}
                onBulkAction={handleBulkAction}
                onSelectAll={handleSelectAll}
                onDeselectAll={handleDeselectAll}
                totalUsers={filteredAndSortedUsers?.length}
                allSelected={selectedUsers?.length === filteredAndSortedUsers?.length && filteredAndSortedUsers?.length > 0}
              />

              {/* Users Table */}
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                {/* Desktop Table Header */}
                <div className="hidden lg:block">
                  <table className="w-full">
                    <thead className="bg-muted/50 border-b border-border">
                      <tr>
                        <th className="px-6 py-3 text-left">
                          <input
                            type="checkbox"
                            checked={selectedUsers?.length === filteredAndSortedUsers?.length && filteredAndSortedUsers?.length > 0}
                            onChange={(e) => e?.target?.checked ? handleSelectAll() : handleDeselectAll()}
                            className="w-4 h-4 text-primary bg-background border-border rounded civic-focus"
                          />
                        </th>
                        <th className="px-6 py-3 text-left">
                          <button
                            onClick={() => handleSort('name')}
                            className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary civic-hover"
                          >
                            <span>{currentText?.name}</span>
                            <Icon 
                              name={sortConfig?.key === 'name' && sortConfig?.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                              size={16} 
                            />
                          </button>
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                          {currentText?.role}
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                          {currentText?.department}
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                          {currentText?.status}
                        </th>
                        <th className="px-6 py-3 text-left">
                          <button
                            onClick={() => handleSort('lastLogin')}
                            className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary civic-hover"
                          >
                            <span>{currentText?.lastLogin}</span>
                            <Icon 
                              name={sortConfig?.key === 'lastLogin' && sortConfig?.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                              size={16} 
                            />
                          </button>
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                          {currentText?.performance}
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                          {currentText?.actions}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {paginatedUsers?.map((user) => (
                        <UserTableRow
                          key={user?.id}
                          user={user}
                          onEdit={handleEditUser}
                          onDelete={handleDeleteUser}
                          onToggleStatus={handleToggleUserStatus}
                          isSelected={selectedUsers?.includes(user?.id)}
                          onSelect={handleUserSelect}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden p-4 space-y-4">
                  {paginatedUsers?.map((user) => (
                    <UserTableRow
                      key={user?.id}
                      user={user}
                      onEdit={handleEditUser}
                      onDelete={handleDeleteUser}
                      onToggleStatus={handleToggleUserStatus}
                      isSelected={selectedUsers?.includes(user?.id)}
                      onSelect={handleUserSelect}
                    />
                  ))}
                </div>

                {/* Empty State */}
                {filteredAndSortedUsers?.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground font-heading mb-2">
                      {currentText?.noUsers}
                    </h3>
                    <p className="text-muted-foreground font-caption">
                      {currentText?.noUsersDesc}
                    </p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedUsers?.length)} of {filteredAndSortedUsers?.length} users
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="ChevronLeft"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    />
                    <span className="text-sm text-foreground">
                      {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="ChevronRight"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <DepartmentDistribution departments={departmentDistribution} />
            </div>
          </div>
        </div>
      </div>
      {/* Add User Modal */}
      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onSubmit={handleAddUser}
      />
    </div>
  );
};

export default UserManagement;