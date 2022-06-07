import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { useLoginUserMutation } from '../../sevices/userAuthApi';

import { storeToken} from "../../sevices/LocalStorageServices"
import "./login.css";

import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton,
    useDisclosure,
  } from '@chakra-ui/react'



const Login = () => {

    const [error, setError] = useState({
        status: false,
        msg: "",
        type: ""
      })

      const {
        isOpen: isVisible,
        onClose,
        onOpen,
      } = useDisclosure({ defaultIsOpen: true })

      const navigate = useNavigate();

      const [loginUser] = useLoginUserMutation()

    const handleSubmit2 = async (e) => {

        e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
      password: data.get('password'),
    }

    if (actualData.email && actualData.password) {
        const res = await loginUser(actualData)
        console.log(res);
        if (res.data && res.data.status === "success") {
          // Store Token Code here
          storeToken(res.data.token)
          navigate('/Home')
        }
        if (res.error && res.error.data.status === "failed") {
          setError({ status: true, msg: res.error.data.message, type: 'error' })
        }
      } else {
        setError({ status: true, msg: "All Fields are Required", type: 'error' })
      }
    }
    




   useEffect(()=>{
    const inputs = document.querySelectorAll(".input");


    function addcl(){
        let parent = this.parentNode.parentNode;
        parent.classList.add("focus");
    }
    
    function remcl(){
        let parent = this.parentNode.parentNode;
        if(this.value === ""){
            parent.classList.remove("focus");
        }
    }
    
    
    inputs.forEach(input => {
        input.addEventListener("focus", addcl);
        input.addEventListener("blur", remcl);
    });
    
    
   })
   
   
  return <>

  <div className='container'>
  <div className="login-content">
  <form   onSubmit={handleSubmit2}>
  
  <div className="input-div one">
      <div className='i'>

      <i class="fas fa-user"></i>


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

                <a href="#">Forgot Password?</a>
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


  </>
  
}

export default Login