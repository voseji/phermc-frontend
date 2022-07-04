import { memo } from 'react';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {useForm, Controller} from "react-hook-form";
import React, { useState, useEffect } from 'react';
import RegistrationTypeService from './services/registration_type.service';
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




function NewRegistrationType() {
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
const [registrationType, setRegistrationType] = useState("")

const [isLoading, setIsLoading] = useState(false)

const {enqueueSnackbar} = useSnackbar()

const CreateOneRegistrationType = async (e) => {
  e.preventDefault();
  try {
      setIsLoading(true)
      const formData = new FormData()
  const generatedNumber= Math.ceil(5 + Math.random() * 99999)
const uniqueGen = "NRT-" + generatedNumber;
  // formData.append('eID', generatedNumber)
  // formData.append('KIV', KIV)
  formData.append('registrationTypeID', uniqueGen)
  formData.append('registrationType', registrationType)

  
  
  const res1 = await RegistrationTypeService.createOneRegistrationType(formData)
  Swal.fire({
      title: 'Success',
      text: 'Thank you. This registration type has been successfully captured',
      icon: 'success',
      confirmButtonText: '<a  href="dps/settings/list_registration_types">Ok</a>',
   });
  } catch (error) {
    console.log(error)
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

<Typography className="mb-10 font-medium text-14">Registration Type</Typography>

<TextField 
 fullWidth
 value={registrationType}
 placeholder="Enter Registration Type"
 onChange={(e) => setRegistrationType(e.target.value)}
name="TextField" 
control={control}/>


<Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={CreateOneRegistrationType}
                        style={{marginTop: '1rem'}}
                        // fullWidth
                        disabled={isLoading}
                    >
                        {isLoading ? "Please wait..." : "Add Registration Type"}
                    </Button>  

</div>
  );
}

export default memo(NewRegistrationType);
