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




export const InspectionType = () =>{

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
    { label: "Inspection Type ID", name: "inspectionTypeID" },
    { label: "Inspection Type", name: "inspectionType" },
  ];

  const [inspection_type, setInspectionType] = useState([])
  useEffect(() => {
    getInspectionType()
  }, [])
  const getInspectionType = async () => {
    await BackendAPI.get(`/inspection_type`).then(({ data }) => {
      setInspectionType(data)
      console.log(data);
    })
  }

  return (
<div className="mt-100 mb-16">

<MUIDataTable 
              columns={columns}
              data={inspection_type.map((inspectiontype, index) => [
                // index +1, 
                inspectiontype.createdAt,
                inspectiontype.inspectionTypeID,
                inspectiontype.inspectionType,
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
