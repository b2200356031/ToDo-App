import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';


Modal.setAppElement('#root');

function Todo() {
  const [actions, setActions] = useState([]);
  const [users, setUsers] = useState([]);
  const [userActions, setUserActions] = useState([]);
  const [newActionTitle, setNewActionTitle] = useState('');
  const [newActionDetails, setNewActionDetails] = useState('');
  const [newActionLevel, setNewActionLevel] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [status, setStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAction, setEditingAction] = useState(null);

  

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

  

  const handleAddAction = () => {
    const newAction = { title: newActionTitle, details: newActionDetails, level: parseInt(newActionLevel) };
    if (!newAction.title || !newAction.details || !newAction.level) {
      
      alert('Please fill out all fields.');

      return;
    }
    
    
    console.log(newAction);
    console.log("creating"+editingAction);
    axios.post('http://localhost:8080/actions/add', newAction,{ headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }})

      .then(response => {
        
        setActions([...actions, response.data]);
        setNewActionTitle('');
        setNewActionDetails('');
        setNewActionLevel('');
      })
      .catch(error => console.error('Error adding action:', error));
      
  };

  const handleAssignAction = () => {
    const newUserAction = { userId: parseInt(selectedUser), actionId: parseInt(selectedAction), status };
    if (!newUserAction.userId || !newUserAction.actionId || !newUserAction.status) {

      alert('Please fill out all fields.');
      return;
    }
    console.log(newUserAction);
    axios.post(`http://localhost:8080/${newUserAction.actionId}/assign-user`, newUserAction,{ headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }})
      .then(response => {
        setUserActions([...userActions, response.data]);
        setSelectedUser('');
        setSelectedAction('');
        setStatus('');
      })
      .catch(error => console.error('Error assigning action:', error));
  };

  const handleDeleteAction = (id) => {
    axios.delete(`http://localhost:8080/actions/delete/${id}`,{ headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }})
      .then(() => {
        setActions(actions.filter(action => action.id !== id));
      })
      .catch(error => console.error('Error deleting action:', error));
  };

  const handleEditAction = (action) => {
    setEditingAction(action);
    setIsModalOpen(true);
  };

  const handleUpdateAction = () => {
    console.log("editing"+editingAction);
    axios.put(`http://localhost:8080/actions/update/${editingAction.id}`, editingAction,{ headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }})
      .then(response => {
        setActions(actions.map(action => action.id === editingAction.id ? response.data : action));
        setIsModalOpen(false);
        setEditingAction(null);
      })
      .catch(error => console.error('Error updating action:', error));
  };

  return (
    <div className="todo-container">
      <h1>Todo Management</h1>
      <div className="add-action">
        <h2>Add Action</h2>
        <input
          required
          type="text"
          placeholder="Title"
          value={newActionTitle}
          onChange={(e) => setNewActionTitle(e.target.value)}
        />
        <input
          required
          type="text"
          placeholder="Details"
          value={newActionDetails}
          onChange={(e) => setNewActionDetails(e.target.value)}
        />
        <select
          value={newActionLevel}
          onChange={(e) => setNewActionLevel(e.target.value)}
        >
          <option value="" disabled>Importance</option>
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
        </select>
        <button onClick={handleAddAction}>Add Action</button>
      </div>
      <div className="assign-action">
        <h2>Assign Action</h2>
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="" disabled>Select User</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.nick}</option>
          ))}
        </select>
        <select value={selectedAction} onChange={(e) => setSelectedAction(e.target.value)}>
          <option value="" disabled>Select Action</option>
          {actions.map(action => (
            <option key={action.id} value={action.id}>{action.title}</option>
          ))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="" disabled>Select Status</option>
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button onClick={handleAssignAction}>Assign Action</button>
      </div>
      <div className="todo-list">
        <h2>Todo List</h2>
        <ul>
          {actions.map(action => {
            let temp = '';
            if (action.level === 1) temp = 'Low';
            else if (action.level === 2) temp = 'Medium';
            else if (action.level === 3) temp = 'High';

            return (
              <li key={action.id}>
                <div className="action-item">
                  <div className="action-details">
                    <strong>{action.title}</strong> - {action.details} - {temp}
                  </div>
                  <div className="action-buttons">
                    <button onClick={() => handleEditAction(action)}>Edit</button>
                    <button onClick={() => handleDeleteAction(action.id)}>Delete</button>
                  </div>
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
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Edit Action"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Edit Action</h2>
        <input
          type="text"
          placeholder="Title"
          value={editingAction?.title || ''}
          onChange={(e) => setEditingAction({ ...editingAction, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Details"
          value={editingAction?.details || ''}
          onChange={(e) => setEditingAction({ ...editingAction, details: e.target.value })}
        />
        <select
          value={editingAction?.level || ''}
          onChange={(e) => setEditingAction({ ...editingAction, level: parseInt(e.target.value) })}
        >
          <option value="" disabled>Importance</option>
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
        </select>
        <div className="modal-buttons">
          <button onClick={handleUpdateAction}>Save</button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </div>
      </Modal>
      <style jsx="true">{`
  .todo-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .tabs {
    display: flex;
    margin-bottom: 20px;
    border-bottom: 2px solid #ddd;
  }
  .tabs button {
    flex: 1;
    padding: 15px;
    cursor: pointer;
    background-color: #fff;
    border: none;
    border-bottom: 2px solid transparent;
    transition: background-color 0.3s, border-bottom 0.3s;
  }
  .tabs button:hover,
  .tabs button.active {
    background-color: #f1f1f1;
    border-bottom: 2px solid #007bff;
  }
  .add-action, .assign-action, .assignments-list {
    margin-bottom: 20px;
  }
  
  .action-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 10px;
    background-color: #fff;
  }
  .action-buttons button {
    margin-left: 10px;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .action-buttons button:hover {
    background-color: #e0e0e0;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    margin-bottom: 10px;
  }
  .modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 300px;
    padding: 20px;
    border: 3px solid #ddd;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
  .modal input, .modal select, .modal button {
    width: 90%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  .modal button {
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .modal button:hover {
    background-color: #0056b3;
  }
  .modal .modal-cancel {
    background-color: #6c757d;
  }
  .modal .modal-cancel:hover {
    background-color: #5a6268;
  }
`}</style>
    </div>
  );
}

export default Todo;
