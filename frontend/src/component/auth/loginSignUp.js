import React, { Fragment } from 'react';

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

import Login from "./Login";

import Register from "./Register";

import "./loginSignup.css";


const LoginSignup = () => {
  return (
    <Fragment>
      <div className="LoginSignUpContainer">

     
     <Tabs isFitted variant='enclosed'>
  <TabList mb='1em'>
    <Tab>Login</Tab>
    <Tab>REGISTER</Tab>
    
  </TabList>

  <TabPanels>
    <TabPanel>
      <Login/>
    </TabPanel>
    <TabPanel>
      <Register/>
    </TabPanel>
   
  </TabPanels>
</Tabs>

     

      </div>
    </Fragment>
  )
}

export default LoginSignup