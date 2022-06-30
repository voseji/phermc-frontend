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
    // { label: "Action", name:'action', options: {
    //   filter: false,
    //   customBodyRender: (value) => {
    //     return <ReactToPrint 
    //               trigger={() => <a href="#">Print</a>}
    //               content={() => ref.current}
    //               onBeforeGetContent={async () =>{
    //                 await setTransactionToPrint(sales.find(sale => sale.id === value))
    //                 ref.current.classList.add('show')
    //               }}
    //               onAfterPrint={() => {
    //                 ref.current.classList.remove('show')
    //               }}
    //             />
    //   }
    // } },
{ label: "Action", name: "", options: {customBodyRender: (eID) => {
      return <Link to={{pathname: `/dps/registration/print?eID=${eID}`, data:registration}} >Print</Link>
    }} },
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
                registration.eID,
           
              ])}
              options={{
                selectableRows: 'none',
                elevation: false,
              }}
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
