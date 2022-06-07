import { Button } from '@chakra-ui/react'
import React, { Fragment, useEffect, useState } from 'react'

import { Spinner } from '@chakra-ui/react';

import { useGetLoggedUserQuery,useGetAllEventsQuery} from "../../sevices/userAuthApi";

import {getToken} from "../../sevices/LocalStorageServices";



import Typography from "@material-ui/core/Typography";

import { Link } from "react-router-dom";

import LaunchIcon from "@material-ui/icons/Launch";

import { DataGrid } from "@material-ui/data-grid";


import "./home.css";

const Home = () => {

  const token = getToken('token');


  const [userData,setUserData] = useState({
    email:"",
    name:""
  })

  let events = [];

  const {data ,isFetching,isSuccess} = useGetLoggedUserQuery(token);

  const {data:data1,isSuccess:isSuccess1} = useGetAllEventsQuery(token);



  

  const columns=[
    {field:"id",headerName:"Events ID",minWidth:300,flex:1},
    {
        field:"event",
        headerName:"Event Name",
        minWidth:300,
        flex:0.5,
       
    },
    {
        field:"description",
        headerName:"Event Descriptions",
        minWidth:300,
        flex:0.3,
    },
    {
        field:"s_t",
        headerName:"Start time",
        type:"number",
        minWidth:300,
        flex:0.5,
    },

    {
      field:"d_o_w",
      headerName:"Day Of Week",
      minWidth:300,
      flex:0.3,
  },

    {
      field:"e_t",
      headerName:"End time",
      type:"number",
      minWidth:300,
      flex:0.5,
  },

  
    {
      field:"actions",
      flex:0.3,
      headerName:"Actions",
      type:"number",
      sortable:false,
      renderCell:(params)=>{
        return(
          <Link to={`/event_scheduled/${params.getValue(params.id,"id")}`}>

                <LaunchIcon/>

          </Link>
          
        );
      },
      
    },


];

let rows=[];


    
if(isSuccess1){
  events=Object.values(data1.events);

  events.forEach((item)=>{
    
    rows.push({
      event:item.event_name,
      id:item.id,
      description:item.description,
      e_t:item.end_time+" : "+"00",
      s_t:item.start_time+" : "+"00",
      d_o_w:item.day_of_the_week,
  
  
  });
  
  });

}

 


  useEffect(()=>{
    if(data && isSuccess){

      setUserData({
        email:data.user.email,
        name:data.user.name,

      })

    }

    if(data1 && isSuccess1){

      

      events=Object.values(data1.events);
      

      // events.forEach((item)=>{

      //   console.log(item);
      // })

    }
  },[data,isSuccess,isSuccess1,data1])

  
  return (

<Fragment>
  {isFetching ? (
    <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'
/>
  ):(

    <Fragment>

<div className="myOrdersPage">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
            />
  
            {data && <Typography id="myOrdersHeading">{data.user.name}'s Events</Typography>}
          </div>


       
    </Fragment>
    

  )}
</Fragment>




   
  )
}

export default Home