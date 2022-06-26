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




export const FacilityStatus = () =>{

  // const { columns: pColumns, rows: pRows } = projectsTableData();


  const columns = [
    // { label: "SN", name: "serialNumber" },
    {
      label: "Date Created", name: "created_at", options: {
        customBodyRender: (v) => {
          return <>{moment(v).format('YYYY-MM-DD')}</>
        }
      }
    },
    { label: "Facility Status ID", name: "facilityStatusID" },
    { label: "Facility Status", name: "facilityStatus" },
  ];

  const [facility_status, setFacilityStatus] = useState([])
  useEffect(() => {
    getFacilityStatus()
  }, [])
  const getFacilityStatus = async () => {
    await BackendAPI.get(`/facility_status`).then(({ data }) => {
      setFacilityStatus(data)
      console.log(data);
    })
  }

  return (
<div className="mt-100 mb-16">

<MUIDataTable 
              columns={columns}
              data={facility_status.map((facility_status, index) => [
                // index +1, 
                facility_status.createdAt,
                facility_status.facilityStatusID,
                facility_status.facilityStatus,
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
