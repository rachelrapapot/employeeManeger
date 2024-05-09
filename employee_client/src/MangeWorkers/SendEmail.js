import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';

const SendEmailDialog = ({ open, handleClose, employeeEmail }) => {

    const [emailData, setEmailData] = useState({
        to: employeeEmail,
        subject: '',
        body: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEmailData({ ...emailData, [name]: value });
    };

    const sendEmail = () => {
        console.log(emailData)

        axios.post('https://localhost:7103/api/SendMail', { to: employeeEmail, subject: emailData.subject, body: emailData.body })
            .then((response) => {
                alert("Email sent successfully")
                console.log('Email sent successfully:', response.data);
                // ניתן להוסיף הודעת הצלחה או לטעון מחדש את הרשימה של העובדים כאן
                window.location.reload()
            })
            .catch((error) => {
                console.error('Error sending email:', error);
                // ניתן להוסיף הודעת שגיאה כאן
            });
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>שליחת מייל</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="to"
                    label="אל"
                    type="email"
                    fullWidth
                    value={employeeEmail}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="subject"
                    label="נושא"
                    fullWidth
                    value={emailData.subject}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="body"
                    label="תוכן"
                    multiline
                    fullWidth
                    value={emailData.body}
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    ביטול
                </Button>
                <Button onClick={sendEmail} color="primary">
                    שליחה
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SendEmailDialog;
