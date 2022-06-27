import { memo } from 'react';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {useForm, Controller} from "react-hook-form";
import React, { useState, useEffect } from 'react';
import InspectionService from './services/inspection.service';
import RegistrationService from './services/registration.service';
import { useSnackbar } from 'notistack';
import { handleAPIError } from './services/api.utility';
import Swal from 'sweetalert2';
import Select from 'react-select';

const defaultValues = {
  Native     : "",
  TextField  : "",
  Select     : "",
  Autocomplete: [],
  Checkbox   : false,
  switch     : false,
  RadioGroup : ""
};




function NewInspection() {
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




const [registrations, setRegistrations] = useState([])
const [eID, setEID] = useState("");

const [isLoading, setIsLoading] = useState(false)

const {enqueueSnackbar} = useSnackbar()

const CreateOneInspection = async (e) => {
  e.preventDefault();
  try {
      setIsLoading(true)
      const formData = new FormData()
  const generatedNumber= Math.ceil(5 + Math.random() * 99999)

  // formData.append('eID', generatedNumber)
  // formData.append('KIV', KIV)
  formData.append('eID', eID)
  // formData.append('processingStage', processingStage)

  
  
  const res1 = await ProcessingStageService.createProcessingStage(formData)
  Swal.fire({
      title: 'Success',
      text: 'Thank you. This processing stage has been successfully captured',
      icon: 'success',
      confirmButtonText: '<a  href="dps/settings/processing_stage">Ok</a>',
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

useEffect(async () => {
  try {
      const registrationsRes = await RegistrationService.getAllRegistrations();
      setRegistrations(registrationsRes.data);
      console.log(registrationsRes)
  } catch (error) {
      
  }finally{

  }
},[])

  return (
<div className="mt-100 mb-16">

<Typography className="mb-10 font-medium text-14">Facility Type</Typography>

<Select 
                        fullWidth
                        options={registrations.map((registrationdata, index) => ({
                            label: `${registrationdata.eID} - ${registrationdata.facilityName}`,
                            value: registrationdata.eID,
                        }))}
                        placeholder="Select Facility To Inspect "
                        onChange={(e) => setEID(e.value)}
                    />


<Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={CreateOneInspection}
                        style={{marginTop: '1rem'}}
                        // fullWidth
                        disabled={isLoading}
                    >
                        {isLoading ? "Please wait..." : "Add Processing Stage"}
                    </Button>  

</div>
  );
}

export default memo(NewInspection);
