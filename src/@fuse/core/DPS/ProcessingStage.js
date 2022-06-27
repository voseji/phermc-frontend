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




export const ProcessingStage = () =>{

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
    { label: "Processing Stage ID", name: "processingStageID" },
    { label: "Processing Stage", name: "processingStage" },
  ];

  const [processing_stage, setProcessingStage] = useState([])
  useEffect(() => {
    getProcessingStage()
  }, [])
  const getProcessingStage = async () => {
    await BackendAPI.get(`/processing_stage`).then(({ data }) => {
      setProcessingStage(data)
      console.log(data);
    })
  }

  return (
<div className="mt-100 mb-16">

<MUIDataTable 
              columns={columns}
              data={processing_stage.map((processingstage, index) => [
                // index +1, 
                processingstage.createdAt,
                processingstage.processingStageID,
                processingstage.processingStage,
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
