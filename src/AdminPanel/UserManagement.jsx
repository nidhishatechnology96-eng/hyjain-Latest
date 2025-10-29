import React, { useState, useMemo, useContext } from 'react';
import { AdminContext } from './AdminContext'; 
import { getRole } from '../context/AuthContext'; // Import the single source of truth
import 'bootstrap-icons/font/bootstrap-icons.css';

// Helper to get a Bootstrap class for the role badge
const getRoleBadgeClass = (role) => {
  switch (role) {
    case 'admin':
      return 'bg-primary';
    case 'staff':
      return 'bg-info text-dark';
    case 'delivery':
      return 'bg-warning text-dark';
    default:
      return 'bg-secondary';
  }
};

function UserManagement() {
  const { users, isLoading, deleteUser, promoteUser } = useContext(AdminContext); 
  const [query, setQuery] = useState('');

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      u => (u.fullName && u.fullName.toLowerCase().includes(q)) ||
           (u.email && u.email.toLowerCase().includes(q))
    );
  }, [users, query]);

  const handleDelete = (user) => {
    if (window.confirm(`Are you sure you want to delete the user ${user.email}? This action cannot be undone.`)) {
      // deleteUser(user.id);
      console.log("Delete user:", user.id); // Placeholder for now
    }
  };

  const handlePromote = (user) => {
    if (window.confirm(`Are you sure you want to promote ${user.email} to an Admin?`)) {
     // promoteUser(user.id);
     console.log("Promote user:", user.id); // Placeholder for now
    }
  };

  if (isLoading) {
    return <div className="text-center p-5"><div className="spinner-border text-primary"></div></div>;
  }

  return (
    <>
      <h1 className="h3 mb-4 text-gray-800">User Management</h1>

      <div className="card shadow-sm">
        <div className="card-header py-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search by name or email..." 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
          />
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className='table-dark'>
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map(user => {
                    const userRole = getRole(user); // Use the correct function here
                    return (
                      <tr key={user.id}>
                        <td>{user.id.slice(0, 8)}...</td>
                        <td className='fw-bold'>{user.fullName || user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`badge fs-6 ${getRoleBadgeClass(userRole)}`}>
                            {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                          </span>
                        </td>
                        <td className="text-center">
                          <button className="btn btn-sm btn-outline-primary me-2 mb-1" title="Edit" disabled>
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger me-2 mb-1" 
                            title="Delete" 
                            onClick={() => handleDelete(user)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                          {userRole !== 'admin' && (
                            <button 
                              className="btn btn-sm btn-outline-success mb-1" 
                              title="Promote to Admin" 
                              onClick={() => handlePromote(user)}
                            >
                              <i className="bi bi-arrow-up-circle"></i>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-4">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserManagement;