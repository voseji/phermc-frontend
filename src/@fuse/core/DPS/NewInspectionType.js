import { memo } from 'react';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {useForm, Controller} from "react-hook-form";
import React, { useState, useEffect } from 'react';
import InspectionTypeService from './services/inspection_type.service';
import { useSnackbar } from 'notistack';
import { handleAPIError } from './services/api.utility';
import Swal from 'sweetalert2';

const defaultValues = {
  Native     : "",
  TextField  : "",
  Select     : "",
  Autocomplete: [],
  Checkbox   : false,
  switch     : false,
  RadioGroup : ""
};




function NewInspectionType() {
  const {
    handleSubmit,
    register,
    reset,
    control,
    watch
} = useForm({
    defaultValues,
    mode: "onChange"
});




// const [facilityStatusID, setFacilityStatusID] = useState("")
const [inspectionType, setInspectionType] = useState("")

const [isLoading, setIsLoading] = useState(false)

const {enqueueSnackbar} = useSnackbar()

const CreateOneInspectionType = async (e) => {
  e.preventDefault();
  try {
      setIsLoading(true)
      const formData = new FormData()
  const generatedNumber= Math.ceil(5 + Math.random() * 99999)

  // formData.append('eID', generatedNumber)
  // formData.append('KIV', KIV)
  formData.append('inspectionTypeID', generatedNumber)
  formData.append('inspectionType', inspectionType)

  
  
  const res1 = await InspectionTypeService.createOneInspectionType(formData)
  Swal.fire({
      title: 'Success',
      text: 'Thank you. This inspection type has been successfully captured',
      icon: 'success',
      confirmButtonText: '<a  href="dps/settings/inspection_type">Ok</a>',
   });
  } catch (error) {
      return enqueueSnackbar(handleAPIError(error),{
          variant: 'error',
          anchorOrigin: {
              horizontal: 'center',
              vertical: 'bottom',
          }
      })
  }finally{
      setIsLoading(false)
  }
  
}

  return (
<div className="mt-100 mb-16">

<Typography className="mb-10 font-medium text-14">Inspection Type</Typography>

<TextField 
 fullWidth
 value={inspectionType}
 placeholder="Enter Inspection Type"
 onChange={(e) => setInspectionType(e.target.value)}
name="TextField" 
control={control}/>


<Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={CreateOneInspectionType}
                        style={{marginTop: '1rem'}}
                        // fullWidth
                        disabled={isLoading}
                    >
                        {isLoading ? "Please wait..." : "Add Inspection Type"}
                    </Button>  

</div>
  );
}

export default memo(NewInspectionType);
