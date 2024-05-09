
import SearchAppBar from './Menu';
import AddEditEmployee from './AddWorker';
import React, { useState, useEffect } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} 
from '@mui/material'
// import { TextField } from '@material-ui/core';
import { CloudDownload } from '@mui/icons-material';


import EmployeeRow from './EmployeeRow';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
//import AddEditEmployee from './AddEditEmployee';
// import { makeStyles } from '@mui/material/styles';

// import XLSX from 'xlsx';
import { CFB, SSF, parse_xlscfb, parse_zip, read, readFile, readFileSync, set_cptable, set_fs, stream, utils, version, write, writeFile, writeFileAsync, writeFileSync, writeFileXLSX, writeXLSX } from 'xlsx';
import { json } from 'react-router-dom';
import SendEmailDialog from './SendEmail';
import RoleDialog from './RoleDialog';
import EmployeeDetailsDialog from './DetailsEmployee';
// const useStyles = makeStyles((theme) => ({
//   tableContainer: {
//     margin: '20px auto',
//     width: '90%',
//   },
//   tableCell: {
//     padding: theme.spacing(1.5), // ריחוף של תאי הטבלה
//     textAlign: 'center', // מיקום תוכן במרכז התא
//     border: `1px solid ${theme.palette.divider}`, // הוספת גבול לתאים
//     height: '20px', // גובה השורה
//   },
// }));


const EmployeeList = () => {

  const dispatch = useDispatch();
  const employees = useSelector(state => state?.employeeList);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [OpenSendEmailDialog, setOpenSendEmailDialog] = useState(false);
  const [employeeEmail, SetNameEmail] = useState("")

  // const classes = useStyles(); // Get styles from makeStyles
  const [GetFind, SetGetFind] = useState();
  const [openRoleDialog, setOpenRoleDialog] = useState(false); // 
  const [openDetail, setOpenDetails] = useState(false); // 
  const [employeeDetails, setemployeeDetails] = useState(false); // 
  const token = sessionStorage.getItem('token');
  useEffect(() => {

    axios.get("https://localhost:7103/api/Employ", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((x) => {
        console.log(x.data);
        dispatch({ type: "SET_WORKERS", payload: x.data });
      })
      .catch(err => console.log(err));
  }, []);
  function hasDuplicateRoles(employee) {
    console.log(employee.roles)
    const roleSet = new Set(); // Set to store unique roles

    // Iterate over employee roles
    for (const role of employee.roles) {
      // Add role name to set
      roleSet.add(role.idRole ? role.idRole : role.id);
    }
    console.log(roleSet)
    // Return true if set size is less than number of roles
    // This indicates there are duplicate roles
    return roleSet.size < employee.roles.length;
  }

  const onEdit = (employee) => {
    setOpen(true);
    setEmployeeToEdit(employee);
  };

  const onDelete = (id) => {
    axios.delete(`https://localhost:7103/api/Employ/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log("Employee deleted successfully:", response.data);
        dispatch({ type: "DELETE_EMPLOYEE", payload: id });
        window.location.reload()
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  const handleAdd = (AddEmployee) => {
    if (hasDuplicateRoles(AddEmployee)) {
      // הצג הודעת שגיאה
      alert("קיימים שני תפקידים זהים עבור עובד זה!");

    }
    axios.post(`https://localhost:7103/api/Employ`, AddEmployee, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log("Employee updated successfully:", response.data);
        dispatch({ type: "UPDATE_EMPLOYEE", payload: response.data });
        window.location.reload()
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
      });
    setEmployeeToEdit(null);
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const onUpdate = (updatedEmployee) => {
    if (hasDuplicateRoles(updatedEmployee)) {

      // הצג הודעת שגיאה
      alert("קיימים שני תפקידים זהים עבור עובד זה!");

    }
    else {
      console.log(token)
      axios.put(`https://localhost:7103/api/Employ/${updatedEmployee.id}`, updatedEmployee, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => {
          console.log("Employee updated successfully:", response.data);
          dispatch({ type: "UPDATE_EMPLOYEE", payload: response.data });
          window.location.reload()
        })
        .catch((error) => {
          console.error("Error updating employee:", error);
        });
      setEmployeeToEdit(null);
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEmployeeToEdit(null);
  };
  const exportToExcel = () => {
    const fileName = 'employees.xlsx';
    const data = employees.filter(employee => employee.status === 0);
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Employees');
    writeFile(workbook, fileName);
  };
  const containsWord = (object, word) => {
    // בדיקת המפתחות של האובייקט
    for (const key in object) {
      if (key.toLowerCase().includes(word.toLowerCase())) {
        return true;
      }
    }

    // בדיקת הערכים של האובייקט
    for (const key in object) {
      if (typeof object[key] === 'string' && object[key].toLowerCase().includes(word.toLowerCase())) {
        return true;
      }
    }
    if (object.roles) {
      console.log(object)
      for (const role of object.roles) {
        console.log(role.role.name)
        if (role.role.name.toLowerCase().includes(word.toLowerCase())) {
          return true;
        }
      }
    }

    return false;
  };



  const handleOpenSendEmailDialog = (employeeEmail) => {
    console.log(employeeEmail)
    SetNameEmail(employeeEmail)
    console.log(employeeEmail)
    setOpenSendEmailDialog(true);
  };

  const handleCloseSendEmailDialog = () => {
    setOpenSendEmailDialog(false);
  };
  const handleOpenRoleDialog = () => {
    setOpenRoleDialog(true);
  };

  const handleCloseRoleDialog = () => {
    setOpenRoleDialog(false);
  };
  const handleOpenDetails = (employee) => {
    setemployeeDetails(employee)
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleSearch = (value) => {
    SetGetFind(value);
  };

  return (
    <>
      <SearchAppBar onSearch={handleSearch} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>


      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.filter((employee) => ((employee.status === 0) && (GetFind ? containsWord(employee, GetFind) : true))).map((employee) => (
              <EmployeeRow
                key={employee.id}
                employee={employee}
                onEdit={onEdit}
                onDelete={onDelete}
                onSendEmail={handleOpenSendEmailDialog}
                onDetails={handleOpenDetails}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddEditEmployee open={open} handleClose={handleClose} onAdd={handleAdd} employee={employeeToEdit} onUpdate={onUpdate} />
      <SendEmailDialog open={OpenSendEmailDialog} handleClose={handleCloseSendEmailDialog} employeeEmail={employeeEmail} />
      <RoleDialog open={openRoleDialog} onClose={handleCloseRoleDialog} /> {/* קומפוננטה המציגה את דיאלוג ההוספה של התפקיד */}
      <EmployeeDetailsDialog open={openDetail} onClose={handleCloseDetails} employee={employeeDetails} /> {/* קומפוננטה המציגה את דיאלוג ההוספה של התפקיד */}
      <Button variant="contained" color="primary" onClick={handleOpenRoleDialog}>Add Role</Button>


      <Button variant="contained" color="primary" onClick={handleOpen} sx={{ marginRight: '10px', margin: '10vh' }}>
        Add Employee
      </Button>
      <Button variant="contained" color="secondary" onClick={exportToExcel}>
        <CloudDownload sx={{ marginRight: '5px' }} />
        Download Excel
      </Button>


    </>


  );
};

export default EmployeeList;