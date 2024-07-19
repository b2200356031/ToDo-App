import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Filter() {
  const [actions, setActions] = useState([]);
  const [users, setUsers] = useState([]);
  const [userActions, setUserActions] = useState([]);
  const [filterUser, setFilterUser] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [editingStatus, setEditingStatus] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/actions')
      .then(response => setActions(response.data))
      .catch(error => console.error('Error fetching actions:', error));

    axios.get('http://localhost:8080/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));

    axios.get('http://localhost:8080/useractions')
      .then(response => setUserActions(response.data))
      .catch(error => console.error('Error fetching user actions:', error));
  }, []);

  const getFilteredActions = () => {
    let filteredActions = userActions;

    if (filterUser) {
      filteredActions = filteredActions.filter(ua => ua.userId.id === parseInt(filterUser));
    }
    if (filterStatus) {
      filteredActions = filteredActions.filter(ua => ua.status === filterStatus);
    }

    return filteredActions;
  };

  const filteredActions = getFilteredActions();

  const handleStatusChange = (actionId, userId) => {
    
    
    if (!newStatus ) {
      alert('Please choose a status.');
      return;
    }
    const updatedAction = userActions.find(ua => ua.actionId === actionId && ua.userId === userId);
    updatedAction.status = newStatus;
    axios.put(`http://localhost:8080/useractions/update/${updatedAction.id}`, updatedAction,{ headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }})
      .then(response => {
        setUserActions(userActions.map(ua => (ua.id === updatedAction.id ? response.data : ua)));
        setEditingStatus(null);
      })
      .catch(error => console.error('Error updating status:', error));
  };

  const handleDelete = (actionId, userId) => {
    const actionToDelete = userActions.find(ua => ua.actionId === actionId && ua.userId === userId);

    axios.delete(`http://localhost:8080/useractions/delete/${actionToDelete.id}`)
      .then(() => {
        setUserActions(userActions.filter(ua => ua.id !== actionToDelete.id));
      })
      .catch(error => console.error('Error deleting action:', error));
  };

  const handleCancelEdit = () => {
    setEditingStatus();
    //window.location.reload();
    //console.log(actions.status );
    //setNewStatus(actions.status);
  };

  return (
    <div className="filter-container">
      <h2>Filter Actions</h2>
      <div className="filter-controls">
        <select value={filterUser} onChange={(e) => setFilterUser(e.target.value)}>
          <option value="">All Users</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.nick}</option>
          ))}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <div className="filtered-actions">
        <h3>Filtered Actions</h3>
        <ul>
          {filteredActions.map(action => {
            let levelText = '';
            if (action.actionId.level === 1) levelText = 'Low';
            else if (action.actionId.level === 2) levelText = 'Medium';
            else if (action.actionId.level === 3) levelText = 'High';

            return (
              <li key={action.id}>
                <div className="action-item">
                <strong>{action.userId.nick}</strong> - <strong>{action.actionId.title}</strong> - {action.actionId.details} - {levelText} - {action.status} - {users.find(user => user.id === action.userId)?.username}
                  <button onClick={() => setEditingStatus(action.id)}>Update Status</button>
                  <button onClick={() => handleDelete(action.actionId, action.userId)}>Delete</button>
                  {editingStatus === action.id && (
                    <div>
                      <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                      <option value="" disabled>Status</option>
                        <option value="To-Do">To-Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                      </select>
                      <button onClick={() => handleStatusChange(action.actionId, action.userId)}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </div>
                  )}
                </div>
                <ul>
                  {userActions.filter(ua => ua.actionId === action.id).map(ua => (
                    <li key={ua.id}>
                      {users.find(user => user.id === ua.userId)?.username} - {ua.status}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
      <style jsx="true">{`
        .filter-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 10px;
          background-color: #f9f9f9;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .filter-controls {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        .filtered-actions ul {
          list-style: none;
          padding: 0;
        }
        .filtered-actions li {
          margin-bottom: 10px;
        }
        .action-item {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          background-color: #fff;
          margin-bottom: 10px;
        }
        .action-item button {
          margin-left: 10px;
          padding: 5px 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .action-item button:hover {
          background-color: #e0e0e0;
        }
        .action-item div {
          margin-top: 10px;
        }
        .action-item select {
          padding: 5px;
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
}

export default Filter;
