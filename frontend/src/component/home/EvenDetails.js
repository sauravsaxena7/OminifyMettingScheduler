import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


import { useGetSingleEventsQuery} from "../../sevices/userAuthApi";


import { Spinner } from '@chakra-ui/react';

import Calendar from 'react-calendar';
import moment from 'moment';

import 'react-calendar/dist/Calendar.css';






const EvenDetails = () => {

    const {id} = useParams();



    const {data ,isFetching,isSuccess,isError} = useGetSingleEventsQuery(id);

    // program to check leap year
function checkLeapYear(year) {

  //three conditions to find out the leap yearss
  if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
     return 1;
  } else {
      return 0;
  }
}






   

    const mark = []

    const weeksDay = {

        "sunday":0,
        "monday":1,
        "tuesday":2,
        "wednesday":3,
        "thrusday":4,
        "friday":5,
        "saturday":6,
       
       

    }

    //console.log(day['sunday']);

    const months={
        1:31,
        2:28,
        3:31,
        4:30,
        5:31,
        6:30,
        7:31,
        8:31,
        9:30,
        10:31,
        11:30,
        12:31,
    }
    const [value, onChange] = useState(new Date());

    if(isSuccess){

      let date = data.events.date;
      let year = data.events.year;
      let month = data.events.month;


      

      let schduled_day = data.events.day;
      

     
      
      
      //let date1 = new Date('01-04-2021');
      //const day = date1.getDay();

      //console.log('date1->',date1,'day->',day ,'schduledday->',schduled_day);


      let count=0;

      while(count<91){

        let str1='';
        if(month<10){
          str1 =  '0'+String(month)+'-';

        }else{
          str1 =  String(month)+'-';
        }

        if(date<10){
          str1 =  str1+'0'+String(date)+'-';

        }else{
          str1 =  str1+String(date)+'-';
        }

        str1=str1+String(year);

        

        let date1 = new Date(str1);

        const day = date1.getDay();
        //console.log('date1->',date1,'day->',day ,'schduledday->',schduled_day);

        if(day === weeksDay[schduled_day]){

          let str='';
          if(date<10){
            str =  '0'+String(date)+'-';

          }else{
            str =  String(date)+'-';
          }

          if(month<10){
            str =  str+'0'+String(month)+'-';

          }else{
            str =  str+String(month)+'-';
          }

          str=str+String(year);

          mark.push(str);
        }

        let monthly = month;

         if(month === 2 && checkLeapYear(year) === 1){

          monthly =29;


         }else{

          monthly =months[month];

         }


        if(date ===  monthly){

          
        if(date === 28 || date === 30 || date === 31 || date === 29){
          date =1;
          if(month === 12){
            month=1;
            year=year+1;    
          }else{
            month++;
          }

        }

        }else {
          date=date+1;
        }

       count=count+1;
      }

      
     }

    useEffect(()=>{

        if(isSuccess){

          // onChange(new Date(12,12,2021));
    
        }

    },[data,isSuccess])

   

    console.log(mark);

    
    

  return (
    <Fragment>
        {isFetching ?
         (
            <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
         ):
        (<Fragment>

      <div className='calander-container'>
      <Calendar 


style={{ height: 500 }}
    onChange={onChange}
    value={value}
    tileClassName={({ date, view }) => {
      if(mark.find(x=>x===moment(date).format("DD-MM-YYYY"))){
       return  'highlight'
      }
    }}


    tileDisabled={({ date }) => date.getDay() === 0}

    /*maxDate={new Date(2020, 1, 0)}</div>*/
     minDate={
      new Date(3,2,2020)
    }

    
      
       >

       </Calendar>
      </div>


        </Fragment>)}
    </Fragment>
  )
}

export default EvenDetai