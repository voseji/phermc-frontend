import { memo } from 'react';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {useForm, Controller} from "react-hook-form";
import React, { useState, useEffect } from 'react';
import TeamsService from './services/teams.service';
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




function NewTeamMember() {
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




const [teams, setTeams] = useState([])
const [teamID, setTeamID] = useState("")
const [email, setEmail] = useState("")
const [name, setName] = useState("")
const [phoneNumber, setPhoneNumber] = useState("")

const [isLoading, setIsLoading] = useState(false)

const {enqueueSnackbar} = useSnackbar()

const CreateOneTeamMember = async (e) => {
  e.preventDefault();
  try {
      setIsLoading(true)
      const formData = new FormData()
  const generatedNumber= Math.ceil(5 + Math.random() * 99999)
  const uniqueGen = "TMM-" + generatedNumber;
  // formData.append('eID', generatedNumber)
  // formData.append('KIV', KIV)
  formData.append('memberID', uniqueGen)
  formData.append('teamID', teamID)
  formData.append('email', email)
  formData.append('name', name)
  formData.append('phoneNumber', phoneNumber)

  
  
  const res1 = await TeamsService.createOneTeamMember(formData)
  Swal.fire({
      title: 'Success',
      text: 'Thank you. This Team has been successfully captured',
      icon: 'success',
      confirmButtonText: '<a  href="dps/settings/teams">Ok</a>',
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
        const teammembersRes = await TeamsService.getAllTeams();
        setTeams(teammembersRes.data);
        console.log(teammembersRes)
    } catch (error) {
        
    }finally{
  
    }
  },[])

  return (
<div className="mt-100 mb-16">

<Typography className="mb-10 font-medium text-14">Team Member Name</Typography>
<TextField 
 fullWidth
 value={name}
 placeholder="Enter Team Member Name"
 onChange={(e) => setName(e.target.value)}
name="TextField" 
control={control}/>

<br/><br/>
<Typography className="mb-10 font-medium text-14">Email</Typography>
<TextField 
 fullWidth
 value={email}
 placeholder="Enter Email"
 onChange={(e) => setEmail(e.target.value)}
name="TextField" 
control={control}/>

<br/><br/>
<Typography className="mb-10 font-medium text-14">Phone Number</Typography>
<TextField 
 fullWidth
 value={phoneNumber}
 placeholder="Enter Phone Number"
 onChange={(e) => setPhoneNumber(e.target.value)}
name="TextField" 
control={control}/>

<br/><br/>
<Typography className="mb-10 font-medium text-14">Assign Team</Typography>
<Select 
                        fullWidth
                        options={teams.map((team1, index) => ({
                            label: team1.team,
                            value: team1.teamID,
                        }))}
                        placeholder="Select Team"
                        onChange={(e) => setTeamID(e.value)}
/>
<Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={CreateOneTeamMember}
                        style={{marginTop: '1rem'}}
                        // fullWidth
                        disabled={isLoading}
                    >
                        {isLoading ? "Please wait..." : "Add Team Member"}
                    </Button>  

</div>
  );
}

export default memo(NewTeamMember);
