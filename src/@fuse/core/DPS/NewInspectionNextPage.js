import { memo } from 'react';
import Button from '@mui/material/Button';
// import Select from '@mui/material/Select';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {useForm, Controller} from "react-hook-form";
import React, { useState, useEffect } from 'react';
import RegistrationService from './services/registration.service';
import { useSnackbar } from 'notistack';
import { handleAPIError } from './services/api.utility';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { useNavigate, useParams } from 'react-router-dom'
import { BackendAPI } from './services/api.utility';
const defaultValues = {
  Native     : "",
  TextField  : "",
  Select     : "",
  Autocomplete: [],
  Checkbox   : false,
  switch     : false,
  RadioGroup : ""
};




function NewInspectionNextPage() {
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




const [facilitystatuses, setFacilityStatuses] = useState([])
const [facilitytypes, setFacilityTypes] = useState([])
// const [oneregistration, setOneRegistration] = useState([])
const [KIV, setKIV] = useState("")
const [registrationNumber, setRegistrationNumber] = useState("")
const [facilityName, setFacilityName] = useState("");
const [facilityType, setFacilityType] = useState("");
const [facilityStatusID, setFacilityStatusID] = useState("");
const [facilityTypeID, setFacilityTypeID] = useState("");
const [processingStageID, setProcessingStageID] = useState("");
// const [retailCost, setRetailCost] = useState(0);
const [isLoading, setIsLoading] = useState(false)

const {enqueueSnackbar} = useSnackbar()

const CreateOneRegistration = async (e) => {
  e.preventDefault();
  try {
      setIsLoading(true)
      const formData = new FormData()
  const generatedNumber= Math.ceil(5 + Math.random() * 9999999)

  formData.append('eID', generatedNumber)
  formData.append('KIV', KIV)
  formData.append('registrationNumber', registrationNumber)
  formData.append('facilityName', facilityName)
  formData.append('facilityType', facilityType)
  formData.append('facilityStatusID', facilityStatusID)
  formData.append('facilityTypeID', facilityTypeID)
  formData.append('processingStageID', processingStageID)

  
  
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

const { eID } = useParams();
const [student, setStudent] = useState(null)
// const [settings, setSettings] = useState()

useEffect(()=>{
    fetchStudent(eID)
},[])

const fetchStudent = async () => {
  // await RegistrationService.getAllOneRegistration(formData)
  // await BackendAPI.get(`/registration/${id}`).then(({data})=>{  
  await BackendAPI.get(`/registration/5195383`).then(({data})=>{
        setStudent(data)
        console.log(data);
    })
}

  return (
<div className="mt-100 mb-16">
  <h3 style={{color:"green"}}>Currently Inspecting: {student?.data.facilityName} </h3>
<Typography className="mb-10 font-medium text-14">KIV</Typography>
<TextField 
 fullWidth
 value={KIV}
 placeholder="Enter KIV"
 onChange={(e) => setKIV(e.target.value)}
name="TextField" 
control={control}/>

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

export default memo(NewInspectionNextPage);
