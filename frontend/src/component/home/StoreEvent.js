import React, { useEffect, useState } from 'react'

import {Event,Description,People, RestoreRounded} from "@material-ui/icons"

import Calendar from 'react-calendar';

import { useStoreEventMutation } from '../../sevices/userAuthApi';

import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton,
    
  } from '@chakra-ui/react'

  import "./home.css";

  import TimePicker from 'react-time-picker';

  import Select from 'react-select'
import { useNavigate } from 'react-router-dom';



const StoreEvent = () => {

    const [error, setError] = useState({
        status: false,
        msg: "",
        type: "",
        desc:"",
      })

      const options = [
        { value: 'Sunday', label: 'sunday' },
        { value: 'Monday', label: 'monday' },
        { value: 'Tuseday', label: 'tuesday' },
        { value: 'Wednesday', label: 'wednesday' },
        { value: 'Thrusday', label: 'thrusday' },
        { value: 'Friday', label: 'friday' },
        { value: 'Saturday', label: 'saturday' }
      ]

      const weeksDay = {

        0:"sunday",
        1:"monday",
        2:"tuesday",
       3: "wednesday",
        4:"thrusday",
       5: "friday",
       6: "saturday",
       
       

    }
      


     

      const [value, onChange] = useState('10:00');

      const [value1, onChange1] = useState('1:00');

      const [value2, onChange2] = useState(new Date());

      const [StoreEvent]=useStoreEventMutation();

      const navigate = useNavigate();


      const [week , setWeek]= useState(options.label);


      const handleSubmit=async(e)=>{
        e.preventDefault() 

        const data = new FormData(e.currentTarget);

        let month = parseInt(String(value2.getMonth() + 1))
        let date = parseInt(String(value2.getDate()));
        let year = parseInt(String(value2.getFullYear()));
        let day1 = value2.getDay();

        let day = weeksDay[day1];



        if(!week){
            setError({ status: true, mg:"Required!!", desc:"Select Day of Week", type: 'error' })
        }else{

            const actualData ={
                event_name:data.get('event_name'),
                user_name:data.get('user_name'),
                description:data.get('event_description'),
                start_time:value,
                end_time:value1,
                day_of_the_week:week,
                day:day,
                date:date,
                year:year,
                month:month,
                email:"sauravsrivastava121@mail.com"
            }

            const user1 = JSON.parse(JSON.stringify(actualData))
            const res = await StoreEvent(user1);

            if(res.data.status === "success"){
                
                navigate('/')
           }

           if(RestoreRounded.data.status === "failed"){
               setError({ status: true, msg: res.message, desc:"!!!", type: 'error' })

           }

        console.log(res);
        console.log(user1);
    
            

        }

        

       
       



      }
      const handlChange=(e)=>{

        setWeek(e.label);
        

      }

      const onClose =()=>{

        let dp = document.getElementById("aop");
        dp.className += " d1";

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


  return (
   
    <>
    <div className='container'>
    {error.status ?
    <div>
           <Alert status={error.type} id="aop">
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
    <div className="login-content">

    
    <form onSubmit={handleSubmit} >
    
    <div className="input-div one">
        <div className='i'>
  
        <Event/>
       
  
        </div>
        
        <div className='div'>
             <h5>Event Name</h5>
             <input className='input' type="text" name="event_name" required />
  
        </div>
    </div>
    <div className="input-div one">
        <div className='i'>
  
        
        <Description/>
  
        </div>
        
        <div className='div'>
             <h5>Event Description</h5>
             <input className='input' type="text" name='event_description' required />
  
        </div>
    </div>
  
               <div className="input-div pass">
                        <div className="i"> 
                           <People/>
                        </div>
                        <div className="div">
                             <h5>Event Organizer Name</h5>
                             <input type="text" className="input" name='user_name' required/>
                     </div>
                  </div>

                  <div className="pass lola">

                  <h5>Select Day Of Weeks</h5>
                        
                  <Select options={options} onChange={handlChange}/>
                  

                  </div>

                  <div className="pass lola">
                        
                  <span><h5>Start Time</h5></span><TimePicker onChange={onChange} value={value} locale="sv-sv" />
                  </div>

                  <div className="pass lola">
                        
                  <span><h5>End Time</h5></span><TimePicker onChange={onChange1} value={value1} locale="sv-sv"/>
                  </div>

                  <div className="pass lola">
                        
                  <Calendar onChange={onChange2} value={value2} />
                  </div>

                 
  
                  
  
                 
                  <input type="submit" class="btn" value="Submit"/>
  
    
    </form>


  
  
    </div>
    
  
  
    </div>
    </>
  )
}

export default StoreEvent