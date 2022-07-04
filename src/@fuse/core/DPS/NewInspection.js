import { memo } from 'react';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {useForm, Controller} from "react-hook-form";
import React, { useState, useEffect } from 'react';
import InspectionService from './services/inspection.service';
import TeamsService from './services/teams.service';
import InspectionTypeService from './services/inspection_type.service';
import RegistrationService from './services/registration.service';
import { useSnackbar } from 'notistack';
import { handleAPIError } from './services/api.utility';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { Navigate } from "react-router-dom";

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


  


const [teams, setTeams] = useState([]);
const [registrations, setRegistrations] = useState([]);
const [inspectiontypes, setInspectionTypes] = useState([]);
const [eID, setEID] = useState("");
const [remarks, setRemarks] = useState("");
const [registrationNumber, setRegistrationNumber] = useState("");
// const [team, setTeam] = useState("");
const [teamLeader, setTeamLeader] = useState("");
const [inspectionTypeID, setInspectionTypeID] = useState("");
const [teamID, setTeamID] = useState("");

const [isLoading, setIsLoading] = useState(false);
const [showSearch, setShowSearch] = useState(true);
const [activeRegistration, setActiveRegistration] = useState(null);
// const [activeRegistrationData, setActiveRegistrationData] = useState(null)

const {enqueueSnackbar} = useSnackbar()

const SearchRegistrationData = async (e) => {
  e.preventDefault();
  try {
      setIsLoading(true)
    const formData = new FormData()
    const res1 = await RegistrationService.getAllOneRegistration(eID,formData)
  console.log(res1)
  setActiveRegistration (res1.data.data)
  return setShowSearch(false)
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



//Process inspection submitted via form
const CreateOneInspection = async (e) => {
    e.preventDefault();
  
    try {
    setIsLoading(true)
    const formData = new FormData()
    const generatedNumber= Math.ceil(5 + Math.random() * 9999999)
    const uniqueGen="INT-" + generatedNumber;
    formData.append('inspectionID', uniqueGen)
    formData.append('eID', activeRegistration?.eID)
    formData.append('registrationNumber', activeRegistration?.registrationNumber)
    formData.append('remarks', remarks)
    formData.append('teamID', teamID)
    // formData.append('teamLeader', teamLeader)
    formData.append('inspectionTypeID', inspectionTypeID)
    

    
    
    const res1 = await InspectionService.createInspection(formData)
    console.log(res1)
    Swal.fire({
        title: 'Success',
        text: 'Thank you. This inspection has been successfully captured',
        icon: 'success',
        confirmButtonText: '<a  href="/dps/inspection/list">Ok</a>',
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
  

useEffect(async () => {
  try {
      const registrationsRes = await RegistrationService.getAllRegistrations();
      setRegistrations(registrationsRes.data);
      console.log(registrationsRes)
  } catch (error) {
      
  }finally{

  }
},[])

useEffect(async () => {
    try {
        const inspectionTypeRes = await InspectionTypeService.getAllInspectionType();
        setInspectionTypes(inspectionTypeRes.data);
        console.log(inspectionTypeRes)
    } catch (error) {
        
    }finally{
  
    }
  },[])

  useEffect(async () => {
    try {
        const teamRes = await TeamsService.getAllTeams();
        setTeams(teamRes.data);
        console.log(teamRes)
    } catch (error) {
        
    }finally{
  
    }
  },[])

  return (
showSearch && <div className="mt-100 mb-16">

    <Typography className="mb-10 font-medium text-14">Start Typing To Search Facility To Inspect</Typography>
    <Select 
        fullWidth
        // options="S"
        options={registrations.map((registrationdata, index) => ({
            label: `${registrationdata.eID} - ${registrationdata.facilityName}`,
            value: registrationdata.eID,
        }))}
        placeholder="Select Facility To Inspect "
        onChange={(e) => setEID(e.value)}
        required
    />


    <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={SearchRegistrationData}
        style={{marginTop: '1rem'}}
        // fullWidth
        disabled={isLoading}
    >
        {isLoading ? "Please wait..." : "Start Inspection"}
    </Button>  

</div> 
||
<div className="mt-100 mb-16">
<h2 style={{color:"green"}}>Facility Name: {activeRegistration.facilityName}</h2><br/><br/>
<Typography className="mb-10 font-medium text-14">eID</Typography>
<TextField 
 fullWidth
 value={activeRegistration.eID}
//  placeholder="Enter KIV"
disabled={true}
onChange={(e) => setEID(e.target.value)}
name="TextField" 
control={control}/>

<br/><br/>
<Typography className="mb-10 font-medium text-14">Registration Number</Typography>
<TextField 
 fullWidth
 value={activeRegistration.registrationNumber}
//  placeholder="Enter KIV"
disabled={true}
onChange={(e) => setRegistrationNumber(e.target.value)}
name="TextField" 
control={control}/>

<br/><br/>
<Typography className="mb-10 font-medium text-14">Inspection Type</Typography>
<Select 
fullWidth
options={inspectiontypes.map((inspectiont, index) => ({
label: inspectiont.inspectionType,
value: inspectiont.inspectionTypeID,
}))}
 placeholder="Select Inspection Type "
 onChange={(e) => setInspectionTypeID(e.value)}
                    />

<br/><br/>
<Typography className="mb-10 font-medium text-14">Inspection Team</Typography>
<Select 
fullWidth
options={teams.map((teamt, index) => ({
label: teamt.team,
value: teamt.teamID,
}))}
 placeholder="Select Inspection Team "
 onChange={(e) => setTeamID(e.value)}
                    />

<br/><br/>

<Typography className="mb-10 font-medium text-14">Remarks</Typography>
<TextField 
 fullWidth
 value={remarks}
//  placeholder="Enter KIV"

onChange={(e) => setRemarks(e.target.value)}
name="remarks" 
control={control}
id="outlined-textarea"
label="Add some remarks"
// placeholder="Placeholder"
multiline
rows={4}
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
        {isLoading ? "Please wait..." : "Submit Inspection"}
    </Button> 

</div>

  );
}

export default memo(NewInspection);
