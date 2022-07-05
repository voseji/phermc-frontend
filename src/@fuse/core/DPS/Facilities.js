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
import Icon from '@mui/material/Icon';

export const Facilities = () =>{
  const ref = useRef(null);
  const [transactionToPrint, setTransactionToPrint] = useState(null);
  // const { columns: pColumns, rows: pRows } = projectsTableData();

  // const getTotal = (params) => params.getValue(params.id, 'maths')  + params.getValue(params.eID)
  const columns = [
    // { label: "SN", name: "serialNumber" },
    {
      label: "Date Captured", name: "created_at", options: {
        customBodyRender: (v) => {
          return <>{moment(v).format('YYYY-MM-DD')}</>
        }
      }
    },
    { label: "eID", name: "eID" },
    { label: "KIV", name: "KIV" },
    { label: "Rgistration Number", name: "registrationNumber" },
    { label: "Facility Name", name: "facilityName" },
    { label: "Facility Type", name: "facilityType" },
    { label: "Action", name: "", options: {customBodyRender: (eID) => {
      return <Icon color="primary"
      component={Link}
      to={{pathname: `/dps/registration/print?eID=${eID}`, data:allregdetails}}
      >print</Icon>
 }} },
 
    // { label: "Action", name: "", options: {customBodyRender: (eID) => {
    //   return <Link to={{pathname: `/dps/registration/print?eID=${eID}`, data:allregdetails}} >Print</Link>
    // }} },
  ];

  // const [registration, setRegistration] = useState([])
  // useEffect(() => {
  //   getRegistration()
  // }, [])
  // const getRegistration = async () => {
  //   await BackendAPI.get(`/registration`).then(({ data }) => {
  //     setRegistration(data)
  //     console.log(data);
  //   })
  // }

  const [allregdetails, setAllRegDetails] = useState([])
  useEffect(()=>{
    fetchAllRegDetails()
	},[])
  const fetchAllRegDetails = async () => {
    await BackendAPI.get(`/facility_type_all`).then(({data})=>{
      // setFacilityType1(data?.data)
      setAllRegDetails(data)
      console.log(data);
    })
	}
  
  return (
<div className="mt-100 mb-16">

<MUIDataTable 
              columns={columns}
              data={allregdetails.map((registration, index) => [
                // index +1, 
                registration.createdAt,
                registration.eID,
                registration.KIV,
                registration.registrationNumber,
                registration.facilityName,
                registration?.facility_type.facilityType,
                registration.eID,
           
              ])}
             />
  {/* <Receipt 
                  printerRef={ref}
                  eID={eID}
                  transaction={transactionToPrint}
                /> */}

</div>
  );
}

// export function Facilities();
