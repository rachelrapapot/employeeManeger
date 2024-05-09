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
            {/* <Route path="/All" element={isLoggedIn() ? <EmployeeList /> : <Navigate to="/" />} /> */}בעיקרוןזה:אבל בגלל שצריך שיכנסו  בלי ביסמה  אז עשיתי ככה
           <Route path="/All" element={<EmployeeList />}/>
            <Route path="/menu" element={<Menu/>} />



          </Routes>
        </>
      </Router>
    </div>
  );
}

export default App;
