import { memo } from 'react';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {useForm, Controller} from "react-hook-form";
import React, { useState, useEffect } from 'react';
// import RegistrationService from './services/registration.service';
import { useSnackbar } from 'notistack';
import { BackendAPI } from './services/api.utility';
import Swal from 'sweetalert2';

import MUIDataTable from "mui-datatables";
// import RegistrationService from './services/registration.service';
import moment from 'moment'




export const Facilities = () =>{

  // const { columns: pColumns, rows: pRows } = projectsTableData();


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
    // { label: "Manufacturer", name: "manufacturerId" },
    // { label: "Landed Cost", name: "landedCost", options: {customBodyRender: (value) => {
    //   return `N${numeral(value).format('0,0.00')}`
    // }} },
    // { label: "Mark Up", name: "markUp", options: {customBodyRender: (value) => {
    //   return `N${numeral(value).format('0,0.00')}`
    // }} },
    // { label: "Retail Cost", name: "retailCost", options: {customBodyRender: (value) => {
    //   return `N${numeral(value).format('0,0.00')}`
    // }} },
    // { label: "Discount", name: "discount", options: {customBodyRender: (value) => {
    //   return `N${numeral(value).format('0,0.00')}`
    // }} },
  ];

  const [registration, setRegistration] = useState([])
  useEffect(() => {
    getRegistration()
  }, [])
  const getRegistration = async () => {
    await BackendAPI.get(`/registration`).then(({ data }) => {
      setRegistration(data)
      console.log(data);
    })
  }

  return (
<div className="mt-100 mb-16">

<MUIDataTable 
              columns={columns}
              data={registration.map((registration, index) => [
                // index +1, 
                registration.createdAt,
                registration.eID,
                registration.KIV,
                registration.registrationNumber,
                registration.facilityName,
           
              ])}
              options={{
                selectableRows: 'none',
                elevation: false,
              }}
             />

</div>
  );
}

// export function Facilities();
