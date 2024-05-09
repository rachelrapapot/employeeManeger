import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WcIcon from '@mui/icons-material/Wc';
import ScheduleIcon from '@mui/icons-material/Schedule';
import WorkIcon from '@mui/icons-material/Work';

const EmployeeDetailsDialog = ({ open, onClose, employee }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>פרטי העובד</DialogTitle>
            <DialogContent>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={`תעודת זהות: ${employee.tz}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary={`שם פרטי: ${employee.firstName}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary={`שם משפחה: ${employee.lastName}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <LockIcon />
                        </ListItemIcon>
                        <ListItemText primary={`סיסמה: ${employee.password}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <EmailIcon />
                        </ListItemIcon>
                        <ListItemText primary={`אימייל: ${employee.email}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <LocationOnIcon />
                        </ListItemIcon>
                        <ListItemText primary={`כתובת: ${employee.address}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <WorkIcon />
                        </ListItemIcon>
                        <ListItemText primary={`סטטוס: ${employee.status}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <WcIcon />
                        </ListItemIcon>
                        <ListItemText primary={`מין: ${employee.gender}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <ScheduleIcon />
                        </ListItemIcon>
                        <ListItemText primary={`תאריך התחלת עבודה: ${employee.dateOfStart}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <DateRangeIcon />
                        </ListItemIcon>
                        <ListItemText primary={`תאריך לידה: ${employee.dateOfBirth}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="תפקידים:" />
                    </ListItem>
                    {employee.roles?.map((role, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={role.roleName} />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default EmployeeDetailsDialog;
