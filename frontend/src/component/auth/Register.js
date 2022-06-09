import React, { useState } from 'react'

import "./login.css";


import {useNavigate} from "react-router-dom";



import { useRegisterUserMutation } from '../../sevices/userAuthApi';
import { storeToken} from "../../sevices/LocalStorageServices"

import {
     Alert,
     AlertIcon,
     AlertTitle,
     AlertDescription,
     CloseButton,
     useDisclosure,
   } from '@chakra-ui/react'

const Register = () => {

     const [error, setError] = useState({
          status: false,
          msg: "",
          type: "",
          desc:"",
        })

       

        const {
          isOpen: isVisible,
          onClose,
        } = useDisclosure({ defaultIsOpen: true })

        const navigate = useNavigate();
        const [registerUser]=useRegisterUserMutation();

     const handleSubmit = async (e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          const actualData = {
               name: data.get('name'),
               email: data.get('email'),
               password: data.get('password'),
               password_confirmation: data.get('password_confirmation'),
               _token:"{{ csrf_token() }}",
             }

          if (actualData.name && actualData.email && actualData.password && actualData.password_confirmation && actualData.tc !== null) {

               if (actualData.password === actualData.password_confirmation) {
                    const user1 = JSON.parse(JSON.stringify(actualData))

                     const res = await registerUser(user1);

                     if(res.data.status === "success"){
                          //store token
                          storeToken(res.data.token);
                          navigate('/Home')
                     }

                     if(res.data.status === "failed"){
                         setError({ status: true, msg: res.data.message, desc:"Email Already taken", type: 'error' })

                     }

                   
                    
               }
               
               else {
                    setError({ status: true, msg: "Password and Confirm Password Doesn't Match", type: 'error' })
                  }

          }else {
               setError({ status: true, msg: "All Fields are Required", type: 'error' })
             }

     }

   
    return <>

    <div className='container'>
    <div className="login-content">
    <form onSubmit={handleSubmit} >
    
    <div className="input-div one">
        <div className='i'>
  
        
        <i class="fas fa-user"></i>
  
        </div>
        
        <div className='div'>
             <h5>Name</h5>
             <input className='input' type="text" name="name"  />
  
        </div>
    </div>
    <div className="input-div one">
        <div className='i'>
  
        
        <i class="fa fa-envelope"></i>
  
  
        </div>
        
        <div className='div'>
             <h5>Email</h5>
             <input className='input' type="email" name='email' />
  
        </div>
    </div>
  
               <div className="input-div pass">
                        <div className="i"> 
                             <i className="fas fa-lock"></i>
                        </div>
                        <div className="div">
                             <h5>Password</h5>
                             <input type="password" className="input" name='password'/>
                     </div>
                  </div>

                  <div className="input-div pass">
                        <div className="i"> 
                             <i className="fas fa-lock"></i>
                        </div>
                        <div className="div">
                             <h5>Confirm Password</h5>
                             <input type="password" className="input" name='password_confirmation'/>
                     </div>
                  </div>
  
  
                 
                  <input type="submit" class="btn" value="Login"/>
  
    
    </form>


  
  
    </div>
    {error.status ?
    <div>
           <Alert status={error.type}>
  <AlertIcon />
  <AlertTitle>{error.msg}</AlertTitle>
  <AlertDescription>{error.desc}</AlertDescription>
  <CloseButton
        alignSelf='flex-start'
        position='relative'
        right={-1}
        top={-1}
        onClick={onClose}
      />
</Alert>
    </div>
    : ''}
  
  
    </div>
  
  
  
      </>;
}



export default Register