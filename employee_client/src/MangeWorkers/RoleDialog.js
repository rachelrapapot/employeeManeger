import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';

const RoleDialog = ({ open, onClose }) => {
  const [name, setName] = useState('');
  const [isManager, setIsManager] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleIsManagerChange = (event) => {
    setIsManager(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('https://localhost:7103/api/Role', { name, isManager });
      // Handle success
      console.log('Role added successfully');
      onClose(); // Close the dialog after successful submission
    } catch (error) {
      // Handle error
      console.error('Error adding role:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Role</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Role Name"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
            fullWidth
            margin="normal"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isManager}
                onChange={handleIsManagerChange}
                color="primary"
              />
            }
            label="Is Manager"
          />
          <DialogActions>
            <Button type="submit" variant="contained" color="primary">
              Add Role
            </Button>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RoleDialog;
