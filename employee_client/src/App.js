import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import {useSelector}from 'react-redux'
import EmployeeList from './MangeWorkers/AllWorkers';
import Login from './Login/Login'
import Menu from '../src/MangeWorkers/Menu'
function App() {
  const user = useSelector(state => state?.user)
  useEffect(()=>{
    localStorage.setItem("user",JSON.stringify(user));
  },user)
  // פונקציה שבודקת האם המשתמש מחובר
  const isLoggedIn = () => {
  return  localStorage.getItem('user')!=null
   // כאן יש לך לקבוע את התנאי בהתאם לדרך שבה אתה בודק האם המשתמש מחובר
  };
  return (
    <div className="App">
      
        <Router>
        <>
          <Routes>
          <Route path="/" element={ <Login />} />
            <Route path="/All" element={isLoggedIn() ? <EmployeeList /> : <Navigate to="/" />} />
           { /*<Route path="/HomePage" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/recipies" element={user&&<Recipies />} />
            <Route path="/contact" element={user&&<Contact />} />
            <Route path="/ShoppingList" element={user&&<ShoppingList userId={user?.Id} />} /> */}
            <Route path="/menu" element={<Menu/>} />



          </Routes>
        </>
      </Router>
    </div>
  );
}

export default App;
