import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
const AddEditEmployee = ({ open, handleClose, onAdd, employee, onUpdate }) => {
    const [newEmployee, setNewEmployee] = useState(employee ? employee : {});
    const [roles, setRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);
    useEffect(() => {

        if (employee) {
            console.log("----------", employee)
            setNewEmployee(employee);
            console.log("----------", newEmployee)
            setSelectedRoles(employee.roles.map(role1 => role1));
            setNewEmployee(employee);
            console.log("----------", newEmployee)
        } else {
            setNewEmployee({})
            setSelectedRoles([])
        }
    }, [employee]);

    useEffect(() => {

        axios.get("https://localhost:7103/api/Role")
            .then((x) => {
                setRoles(x.data);

            })
            .catch(err => console.log(err));
        // Fetch roles from API
        if (employee)
            setNewEmployee(employee);
        console.log(selectedRoles)

    }, []);
    const handleRoleChange = (e, index) => {
        const updatedRoles = [...selectedRoles];
        updatedRoles[index].idRole = e.target.value;
        setSelectedRoles(updatedRoles);
    };

    const handleStartDateChange = (e, index) => {
        const updatedRoles = [...selectedRoles];
        updatedRoles[index].dateOfStart = e.target.value;
        setSelectedRoles(updatedRoles);
    };

    const handleAddRole = () => {
        setSelectedRoles([...selectedRoles, { idRole: '', dateOfStart: '' }]);
    };

    const handleRemoveRole = (index) => {
        const updatedRoles = [...selectedRoles];
        updatedRoles.splice(index, 1);
        setSelectedRoles(updatedRoles);
    };

    const handleAdd = () => {
        console.log(newEmployee)
        if (!newEmployee.tz || !newEmployee.dateOfStart || !newEmployee.firstName || !newEmployee.lastName || (newEmployee.gender != 0 && newEmployee.gender != 1) || !newEmployee.dateOfBirth || (newEmployee.status != 0 && newEmployee.status != 1)) {
            alert("יש למלא את כל השדות החובה");
            return;
        }

        // בדיקה האם תאריך הכניסה לתפקיד או תאריך התחילת עבודה אינם תקינים
        if (selectedRoles.some(role => new Date(role.dateOfStart) < new Date(newEmployee.dateOfStart))) {
            alert("תאריך הכניסה לתפקיד חייב להיות שווה או מאוחר לתאריך תחילת העבודה");
            return;
        }
        console.log("============================")
        const rolesToAdd = selectedRoles.map(role => ({ idRole: role.role?.id ? role.role?.id : role.idRole, dateOfStart: role.dateOfStart }));
        const employeeToAdd = { ...newEmployee, roles: rolesToAdd };
        console.log(employeeToAdd)
        onAdd(employeeToAdd);
        handleClose();
    };

    const handleUpdate = () => {

        if (!newEmployee.tz || !newEmployee.dateOfStart || !newEmployee.firstName || !newEmployee.lastName || (newEmployee.gender != 0 && newEmployee.gender != 1) || !newEmployee.dateOfBirth || (newEmployee.status != 0 && newEmployee.status != 1)) {
            alert("יש למלא את כל השדות החובה");
            return;
        }

        // בדיקה האם תאריך הכניסה לתפקיד או תאריך התחילת עבודה אינם תקינים
        if (selectedRoles.some(role => new Date(role.dateOfStart) < new Date(newEmployee.dateOfStart))) {
            alert("תאריך הכניסה לתפקיד חייב להיות שווה או מאוחר לתאריך תחילת העבודה");
            return;
        }
        console.log("============================", selectedRoles)
        const rolesToUpdate = selectedRoles.map(role => ({ idRole: role.role?.id ? role.role?.id : role.idRole, dateOfStart: role.dateOfStart }));
        const employeeToUpdate = { ...newEmployee, roles: rolesToUpdate };
        console.log(employeeToUpdate)

        onUpdate(employeeToUpdate);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{employee ? 'עריכת עובד' : 'הוספת עובד חדש'}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            label="תז"
                            value={newEmployee.tz}
                            onChange={(e) => setNewEmployee({ ...newEmployee, tz: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="תאריך תחילת עבודה"
                            type="date"
                            value={newEmployee.dateOfStart}
                            onChange={(e) => setNewEmployee({ ...newEmployee, dateOfStart: e.target.value })}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="שם פרטי"
                            value={newEmployee.firstName}
                            onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="שם משפחה"
                            value={newEmployee.lastName}
                            onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl>
                            <InputLabel>מין</InputLabel>
                            <Select
                                value={employee?.gender}
                                onChange={(e) => setNewEmployee({ ...newEmployee, gender: e.target.value })}
                            >
                                <MenuItem value={1}>זכר</MenuItem>
                                <MenuItem value={0}>נקבה</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="סיסמה"
                            type="password"
                            value={newEmployee.password}
                            onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="תאריך לידה"
                            type="date"
                            value={newEmployee.dateOfBirth}
                            onChange={(e) => setNewEmployee({ ...newEmployee, dateOfBirth: e.target.value })}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            label="אימייל"
                            value={newEmployee.email}
                            onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            label="כתובת"
                            value={newEmployee.address}
                            onChange={(e) => setNewEmployee({ ...newEmployee, address: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl>
                            <InputLabel>סטטוס</InputLabel>
                            <Select
                                value={employee?.gender}
                                onChange={(e) => setNewEmployee({ ...newEmployee, status: e.target.value })}
                            >
                                <MenuItem value={0}>פעיל</MenuItem>
                                <MenuItem value={1}>לא פעיל</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        {selectedRoles.map((rolea, index) => (
                            <Grid container spacing={2} key={index}>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>תפקיד</InputLabel>
                                        <Select
                                            value={rolea?.role?.id}
                                            onChange={(e) => handleRoleChange(e, index)}
                                        >
                                            {roles.map((roleOption) => (
                                                <MenuItem key={roleOption.id} value={roleOption.id}>
                                                    {roleOption.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        label="תאריך תחילת עבודה"
                                        type="date"
                                        value={rolea.dateOfStart}
                                        onChange={(e) => handleStartDateChange(e, index)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <IconButton onClick={() => handleRemoveRole(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        ))}
                        <Button variant="outlined" color="primary" onClick={handleAddRole}>
                            הוסף תפקיד
                        </Button>
                    </Grid>
                </Grid>


                <Button variant="contained" color="primary" onClick={employee ? handleUpdate : handleAdd}>{employee ? 'שמור שינויים' : 'הוסף'}</Button>
            </DialogContent>
        </Dialog>
    );
};

export default AddEditEmployee;
