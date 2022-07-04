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
import moment from 'moment';
import { Link } from 'react-router-dom';




export const Inspections = () =>{

  // const { columns: pColumns, rows: pRows } = projectsTableData();

  const ref = useRef(null);
  const columns = [
    // { label: "SN", name: "serialNumber" },
    {
      label: "Date Inspected", name: "created_at", options: {
        customBodyRender: (v) => {
          return <>{moment(v).format('YYYY-MM-DD')}</>
        }
      }
    },
    { label: "eID", name: "eID" },
    { label: "Inspection Type", name: "inspectionTypeID" },
    { label: "Team", name: "teamID" },
    // { label: "Facility Name", name: "facilityName" },
    { label: "Action", name: "", options: {customBodyRender: (inspectionId) => {
      return <Link to={{pathname: `/dps/inspection/print?inspectionId=${inspectionId}`, data:allinspdetails}} >Print</Link>
    }} },
    // { label: "Team", name: "teamID" },
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

  const [inspection, setInspection] = useState([])
  useEffect(() => {
    getInspection()
  }, [])
  const getInspection = async () => {
    await BackendAPI.get(`/inspection`).then(({ data }) => {
      setInspection(data)
      console.log(data);
    })
  }

  const [allinspdetails, setAllInspDetails] = useState([])
  useEffect(()=>{
    fetchAllInspDetails()
	},[])
  const fetchAllInspDetails = async () => {
    await BackendAPI.get(`/inspection_all`).then(({data})=>{
      // setFacilityType1(data?.data)
      setAllInspDetails(data)
      console.log(data);
    })
	}

  return (
<div className="mt-100 mb-16">

<MUIDataTable 
              columns={columns}
              data={allinspdetails.map((inspection, index) => [
                // index +1, 
                inspection.createdAt,
                inspection.eID,
                inspection.inspection_type.inspectionType,
                inspection.teams.team,
                // inspection.facilityName,
                inspection.inspectionId,
           
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
