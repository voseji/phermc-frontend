import { memo } from 'react';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {useForm, Controller} from "react-hook-form";
import React, { useState, useEffect, useRef } from 'react';
// import RegistrationService from './services/registration.service';
import { useSnackbar } from 'notistack';
import { BackendAPI } from './services/api.utility';
import Swal from 'sweetalert2';

import MUIDataTable from "mui-datatables";
// import RegistrationService from './services/registration.service';
import moment from 'moment'
import { Link } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import Receipt from './Receipt/receipt';
import { useParams, useSearchParams } from 'react-router-dom';

export const TeamMembers = () =>{
  const ref = useRef(null);
  const { teamID } = useParams();
  const [searchParams, setSearchParams] =useSearchParams()
 const columns = [
    // { label: "SN", name: "serialNumber" },
    {
      label: "Date Captured", name: "created_at", options: {
        customBodyRender: (v) => {
          return <>{moment(v).format('YYYY-MM-DD')}</>
        }
      }
    },
    { label: "Team Name", name: "team" },
    { label: "Member Name", name: "member" },
    // { label: "Action", name: "", options: {customBodyRender: (eID) => {
    //   return <Link to={{pathname: `/dps/registration/print?eID=${eID}`, data:allregdetails}} >Print</Link>
    // }} },
  ];


  const [allregdetails, setAllRegDetails] = useState([])
  useEffect(()=>{
    fetchAllRegDetails(teamID)
	},[])
  const fetchAllRegDetails = async () => {
    await BackendAPI.get(`/teamusers/${searchParams.get('teamID')}`).then(({data})=>{
      // setFacilityType1(data?.data)
      setAllRegDetails(data.teams.team_members)
      console.log(data.teams);
    })
	}
  
  return (
<div className="mt-100 mb-16">

<MUIDataTable 
              columns={columns}
              data={allregdetails.map((registration, index) => [
                // index +1, 
                registration.createdAt,
                registration.teams.team,
                registration.memberID,
                // registration.eID,
           
              ])}

             />


</div>
  );
}

// export function Facilities();
