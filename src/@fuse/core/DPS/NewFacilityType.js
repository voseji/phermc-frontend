import { memo } from 'react';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {useForm, Controller} from "react-hook-form";
import React, { useState, useEffect } from 'react';
import FacilityTypeService from './services/facility_type.service';
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




function NewFacilityType() {
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
const [facilityType, setFacilityType] = useState("")

const [isLoading, setIsLoading] = useState(false)

const {enqueueSnackbar} = useSnackbar()

const CreateOneFacilityType = async (e) => {
  e.preventDefault();
  try {
      setIsLoading(true)
      const formData = new FormData()
  const generatedNumber= Math.ceil(5 + Math.random() * 99999)

  // formData.append('eID', generatedNumber)
  // formData.append('KIV', KIV)
  formData.append('facilityTypeID', generatedNumber)
  formData.append('facilityType', facilityType)

  
  
  const res1 = await FacilityTypeService.createFacilityType(formData)
  Swal.fire({
      title: 'Success',
      text: 'Thank you. This facility type has been successfully captured',
      icon: 'success',
      confirmButtonText: '<a  href="dps/settings/facility_type">Ok</a>',
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

<Typography className="mb-10 font-medium text-14">Facility Type</Typography>

<TextField 
 fullWidth
 value={facilityType}
 placeholder="Enter Facility Type"
 onChange={(e) => setFacilityType(e.target.value)}
name="TextField" 
control={control}/>


<Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={CreateOneFacilityType}
                        style={{marginTop: '1rem'}}
                        // fullWidth
                        disabled={isLoading}
                    >
                        {isLoading ? "Please wait..." : "Add Facility Type"}
                    </Button>  

</div>
  );
}

export default memo(NewFacilityType);
