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




export const ListRegistrationTypes = () =>{

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
    { label: "Registration Type ID", name: "registrationTypeID" },
    { label: "Registration Type", name: "registrationType" },

  ];

  const [registration_type, setRegistrationType] = useState([])
  useEffect(() => {
    getRegistrationType()
  }, [])
  const getRegistrationType = async () => {
    await BackendAPI.get(`/registration_type`).then(({ data }) => {
      setRegistrationType(data)
      console.log(data);
    })
  }

  return (
<div className="mt-100 mb-16">

<MUIDataTable 
              columns={columns}
              data={registration_type.map((registration_type, index) => [
                // index +1, 
                registration_type.createdAt,
                registration_type.registrationTypeID,
                registration_type.registrationTypeID,
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
