

import { BrowserRouter as  Router, Route, Routes } from 'react-router-dom';
import React from 'react';

import Header from "./component/header/header";
import LoginSignUp from "./component/auth/loginSignUp";

import Home from "./component/home/home"

import Eventdetails from "./component/home/EvenDetails";

function App() {
  return (

    <Router>
      <Header/>

      <Routes>
         <Route path="/" element={<Home />}></Route>
         <Route path="/Home" element={<Home />}></Route>
        <Route path="/loginSignUp" element={<LoginSignUp/>}></Route>
        <Route path='/event_scheduled/:id' element={<Eventdetails/>}/>

      </Routes>


    </Router>
   
  );
}

export default App;
