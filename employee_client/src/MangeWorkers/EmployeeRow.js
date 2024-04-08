import React from 'react';
import { TableRow, TableCell, IconButton } from '@material-ui/core';
import { Edit, Delete, MailOutline } from '@material-ui/icons'; // Import the MailOutline icon for the email button
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
const EmployeeRow = ({ employee, onEdit, onDelete, onSendEmail ,onDetails}) => { // Add the onSendEmail prop
    const rowStyle = employee.gender == 0 ? { backgroundColor: '#F0F0F0' ,height: '30px', } : { backgroundColor: 'white', height: '2px' };
    return (
        <TableRow style={rowStyle }  key={employee.id}>
     
            <TableCell >{employee.tz}</TableCell> {/* Decrease row height */}
            <TableCell >{employee.dateOfStart}</TableCell>
            <TableCell >{employee.firstName}</TableCell>
            <TableCell >{employee.lastName}</TableCell>
            <TableCell >{employee.gender === 1 ? 'זכר' : 'נקבה'}</TableCell>
            <TableCell >
                <IconButton onClick={() => onEdit(employee)}><Edit /></IconButton>
                <IconButton onClick={() => onDelete(employee.id)}><Delete /></IconButton>
                <IconButton onClick={() => onSendEmail(employee.email)}><MailOutline /></IconButton>
                <IconButton onClick={() => onDetails(employee)}><PersonOutlineIcon /></IconButton>
            </TableCell>
        </TableRow>
   
    );
};

export default EmployeeRow;
