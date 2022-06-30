import { memo } from 'react';
import Button from '@mui/material/Button';
// import Select from '@mui/material/Select';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {useForm, Controller} from "react-hook-form";
import React, { useState, useEffect } from 'react';
import RegistrationService from './services/registration.service';
import FacilityStatusService from './services/facility_status.service';
import FacilityTypeService from './services/facility_type.service';
import ProcessingStageService from './services/processingstage.service';
import { useSnackbar } from 'notistack';
import { handleAPIError } from './services/api.utility';
import Swal from 'sweetalert2';
import Select from 'react-select';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

const defaultValues = {
  Native     : "",
  TextField  : "",
  Select     : "",
  Autocomplete: [],
  Checkbox   : false,
  switch     : false,
  RadioGroup : ""
};




function NewRegistration() {
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

const KIVoptions = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
];

// const [eID, setManufacturers] = useState([])
const [facilitystatuses, setFacilityStatuses] = useState([])
const [facilitytypes, setFacilityTypes] = useState([])
const [processingstages, setProcessingStages] = useState([])
const [KIV, setKIV] = useState("")
const [registrationNumber, setRegistrationNumber] = useState("")
const [facilityName, setFacilityName] = useState("");
const [facilityType, setFacilityType] = useState("");
const [facilityStatusID, setFacilityStatusID] = useState("");
const [facilityTypeID, setFacilityTypeID] = useState("");
const [processingStageID, setProcessingStageID] = useState("");
// const [processingStageDate, setProcessingStageDsate] = useState("");
// const [processingStageDate, setProcessingStageDate] = React.useState(new Date());
const [value, setValue] = React.useState(new Date());

const [isLoading, setIsLoading] = useState(false)

const {enqueueSnackbar} = useSnackbar()

const CreateOneRegistration = async (e) => {
  e.preventDefault();
  try {
      setIsLoading(true)
      const formData = new FormData()
  const generatedNumber= Math.ceil(5 + Math.random() * 9999999)
  const uniqueGen="FCT-" + generatedNumber;
  formData.append('eID', uniqueGen)
  formData.append('KIV', KIV)
  formData.append('registrationNumber', registrationNumber)
  formData.append('facilityName', facilityName)
  formData.append('facilityType', facilityType)
  formData.append('facilityStatusID', facilityStatusID)
  formData.append('facilityTypeID', facilityTypeID)
  formData.append('processingStageID', processingStageID)
  formData.append('processingStageDate', value)

  
  
  const res1 = await RegistrationService.createRegistration(formData)
  Swal.fire({
      title: 'Success',
      text: 'Thank you. This registration has been successfully captured',
      icon: 'success',
      confirmButtonText: '<a  href="/dps/registration/list">Ok</a>',
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
      const facility_statusRes = await FacilityStatusService.getAllFacilityStatus();
      setFacilityStatuses(facility_statusRes.data);
      console.log(facility_statusRes)
  } catch (error) {
      
  }finally{

  }
},[])

useEffect(async () => {
  try {
      const facility_typeRes = await FacilityTypeService.getAllFacilityType();
      setFacilityTypes(facility_typeRes.data);
      console.log(facility_typeRes)
  } catch (error) {
      
  }finally{

  }
},[])

useEffect(async () => {
  try {
      const processingstagesRes = await ProcessingStageService.getAllProcessingStage();
      setProcessingStages(processingstagesRes.data);
      console.log(processingstagesRes)
  } catch (error) {
      
  }finally{

  }
},[])

  return (
<div className="mt-100 mb-16">
{/* <Typography className="mb-10 font-medium text-14">KIV</Typography>
<TextField 
 fullWidth
 value={KIV}
 placeholder="Enter KIV"
 onChange={(e) => setKIV(e.target.value)}
name="TextField" 
control={control}/> */}


<br/><br/>
<Typography className="mb-10 font-medium text-14">KIV</Typography>
<Select 
                        fullWidth
                        options={KIVoptions}
                        placeholder="Select Facility Type"
                        onChange={(e) => setKIV(e.value)}
/>

<br/><br/>
<Typography className="mb-10 font-medium text-14">Registration Number</Typography>
<TextField 
 fullWidth
 value={registrationNumber}
 placeholder="Enter Registration Number"
 onChange={(e) => setRegistrationNumber(e.target.value)}
name="TextField" 
control={control}/>

<br/><br/>
<Typography className="mb-10 font-medium text-14">Facility Name</Typography>
<TextField 
 fullWidth
 value={facilityName}
 placeholder="Enter Facility Name"
 onChange={(e) => setFacilityName(e.target.value)}
name="TextField" 
control={control}/>

<br/><br/>
<Typography className="mb-10 font-medium text-14">Facility Type</Typography>
<Select 
                        fullWidth
                        options={facilitytypes.map((facilitytype, index) => ({
                            label: facilitytype.facilityType,
                            value: facilitytype.facilityTypeID,
                        }))}
                        placeholder="Select Facility Type "
                        onChange={(e) => setFacilityTypeID(e.value)}
/>

<br/><br/>
<Typography className="mb-10 font-medium text-14">Facility Status</Typography>
<Select 
                        fullWidth
                        options={facilitystatuses.map((facility_status, index) => ({
                            label: facility_status.facilityStatus,
                            value: facility_status.facilityStatusID,
                        }))}
                        placeholder="Select Facility Status "
                        onChange={(e) => setFacilityStatusID(e.value)}
                    />

<br/><br/>
<Typography className="mb-10 font-medium text-14">Processing Stage</Typography>
<Select 
                        fullWidth
                        options={processingstages.map((processing_stage, index) => ({
                            label: processing_stage.processingStage,
                            value: processing_stage.processingStageID,
                        }))}
                        placeholder="Select Facility Status "
                        onChange={(e) => setProcessingStageID(e.value)}
                    />
<br/><br/>
<Typography className="mb-10 font-medium text-14">Processing Stage Date</Typography>
{/* <DatePicker
// fullWidth
// disableFuture
label="Select Date"
openTo="year"
views={['year', 'month', 'day']}
value={processingStageDate}
onChange={(e) => setProcessingStageDate(e.value)}
renderInput={(params) => <TextField {...params} />}
        /> */}
                <DesktopDatePicker
          label="For desktop"
          value={value}
          minDate={new Date('2017-01-01')}
          views={['year', 'month', 'day']}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
<br/><br/>
<Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={CreateOneRegistration}
                        style={{marginTop: '1rem'}}
                        // fullWidth
                        disabled={isLoading}
                    >
                        {isLoading ? "Please wait..." : "Register Facility"}
                    </Button>  

</div>
  );
}

export default memo(NewRegistration);
