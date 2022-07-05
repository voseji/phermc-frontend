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
import AreaCouncilsService from './services/area_councils.service';
import RegistrationTypeService from './services/registration_type.service';
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

const urbanization = [
  { value: 'RURAL', label: 'RURAL' },
  { value: 'SEMI-URBAN', label: 'SEMI-URBAN' },
  { value: 'URBAN', label: 'URBAN' },
];

// const [eID, setManufacturers] = useState([])
const [facilitystatuses, setFacilityStatuses] = useState([])
const [facilitytypes, setFacilityTypes] = useState([])
const [processingstages, setProcessingStages] = useState([])
// const [registrationtypes, setRegistrationTypes] = useState([])
const [KIV, setKIV] = useState("")
const [registrationNumber, setRegistrationNumber] = useState("")
const [facilityName, setFacilityName] = useState("");
const [facilityType, setFacilityType] = useState("");
const [facilityStatusID, setFacilityStatusID] = useState("");
const [facilityTypeID, setFacilityTypeID] = useState("");
const [processingStageID, setProcessingStageID] = useState("");
const [applicantName, setApplicantName] = useState("");
const [proprietorName, setProprietorName] = useState("");
const [facilityPhoneNumber, setFacilityPhoneNumber] = useState("");
const [facilityEmail, setFacilityEmail] = useState("");
const [facilityAddress, setAddress] = useState("");
const [association, setAssociation] = useState("");
const [coveringProfessional, setCoveringProfessional] = useState("");
const [beds, setBeds] = useState("");
const [urban, setUrbanization] = useState("");
const [staff, setStaff] = useState("");
const [docComplete, setDocComplete] = useState("");

const [value, setValue] = React.useState(new Date());
const [comp, setValue2] = React.useState(new Date());

const [isLoading, setIsLoading] = useState(false)

const {enqueueSnackbar} = useSnackbar()

const CreateOneRegistration = async (e) => {
  // console.log(e)
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
  formData.append('areaCouncilID', areaCouncilID)
  formData.append('districtID', districtID)
  formData.append('applicantName', applicantName)
  formData.append('proprietorName', proprietorName)
  formData.append('facilityPhoneNumber', facilityPhoneNumber)
  formData.append('facilityEmail', facilityEmail)
  formData.append('registrationTypeID', registrationTypeID)
  formData.append('facilityAddress', facilityAddress)
  formData.append('association', association)
  formData.append('coveringProfessional', coveringProfessional)
  formData.append('beds', beds)
  formData.append('urbanization', urban)
  formData.append('staff', staff)
  formData.append('docCompleteDate', comp)
  formData.append('staffDocComplete', docComplete)
  
  
  const res1 = await RegistrationService.createRegistration(formData)
  Swal.fire({
      title: 'Success',
      text: 'Thank you. This registration has been successfully captured',
      icon: 'success',
      confirmButtonText: '<a  href="/dps/registration/list">Ok</a>',
   });
  } catch (error) {
    // console.log(error)
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

const [areacouncils, setAreaCouncils] = useState([])
const [areaCouncilID, setAreaCouncilID] = useState("")
useEffect(async () => {
  try {
      const areacouncilsRes = await AreaCouncilsService.getAllAreaCouncils();
      setAreaCouncils(areacouncilsRes.data);
      console.log(areacouncilsRes)
  } catch (error) {
      
  }finally{

  }
},[])


const [districts, setDistricts] = useState([])
const [districtID, setDistrictID] = useState("")
useEffect(async () => {
  try {
      const districtsRes = await AreaCouncilsService.getAllDistricts();
      setDistricts(districtsRes.data);
      console.log(districtsRes)
  } catch (error) {
      
  }finally{

  }
},[])

const [registrationtypes, setRegistrationTypes] = useState([])
const [registrationTypeID, setRegistrationTypeID] = useState("")
useEffect(async () => {
  try {
      const registrationtypeRes = await RegistrationTypeService.getAllRegistrationType();
      setRegistrationTypes(registrationtypeRes.data);
      console.log(registrationtypeRes)
  } catch (error) {
      console.log(error)
  }finally{

  }
},[])

  return (
<div className="mt-100 mb-16">

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
<Typography className="mb-10 font-medium text-14">Area Council</Typography>
<Select 
                        fullWidth
                        options={areacouncils.map((areacouncils1, index) => ({
                            label: areacouncils1.areaCouncil,
                            value: areacouncils1.areaCouncilID,
                        }))}
                        placeholder="Select Area Council "
                        onChange={(e) => setAreaCouncilID(e.value)}
                    />

<br/><br/>
<Typography className="mb-10 font-medium text-14">District</Typography>
<Select 
                        fullWidth
                        options={districts.map((districts1, index) => ({
                            label: districts1.district,
                            value: districts1.districtID,
                        }))}
                        placeholder="Select District"
                        onChange={(e) => setDistrictID(e.value)}
/>

<br/><br/>
<Typography className="mb-10 font-medium text-14">Applicant Name</Typography>
<TextField 
 fullWidth
 value={applicantName}
 placeholder="Enter Applicant Name"
 onChange={(e) => setApplicantName(e.target.value)}
name="TextField" 
control={control}/>

<br/><br/>
<Typography className="mb-10 font-medium text-14">Proprietor Name</Typography>
<TextField 
 fullWidth
 value={proprietorName}
 placeholder="Enter Proprietor Name"
 onChange={(e) => setProprietorName(e.target.value)}
name="TextField" 
control={control}/>

<br/><br/>
<Typography className="mb-10 font-medium text-14">Facility Phone Number</Typography>
<TextField 
 fullWidth
 value={facilityPhoneNumber}
 placeholder="Enter Facility Phone Number"
 onChange={(e) => setFacilityPhoneNumber(e.target.value)}
name="TextField" 
control={control}/>

<br/><br/>
<Typography className="mb-10 font-medium text-14">Facility Email</Typography>
<TextField 
 fullWidth
 value={facilityEmail}
 placeholder="Enter Facility Email"
 onChange={(e) => setFacilityEmail(e.target.value)}
name="TextField" 
control={control}/>

<br/><br/>
<Typography className="mb-10 font-medium text-14">Registration Type</Typography>
<Select 
                        fullWidth
                        options={registrationtypes.map((registrationtype1, index) => ({
                            label: registrationtype1.registrationType,
                            value: registrationtype1.registrationTypeID,
                        }))}
                        placeholder="Select Registration Type"
                        onChange={(e) => setRegistrationTypeID(e.value)}
/>

<br/><br/>

<Typography className="mb-10 font-medium text-14">Facility Address</Typography>
<TextField 
 fullWidth
 value={facilityAddress}
onChange={(e) => setAddress(e.target.value)}
name="address" 
control={control}
id="outlined-textarea"
label="Enter Facility Address"
// placeholder="Placeholder"
multiline
rows={3}
/>

<br/><br/>
<Typography className="mb-10 font-medium text-14">Association</Typography>
<TextField 
 fullWidth
 value={association}
 placeholder="Enter Association"
 onChange={(e) => setAssociation(e.target.value)}
name="TextField" 
control={control}/>

<br/><br/>
<Typography className="mb-10 font-medium text-14">Covering Professional</Typography>
<TextField 
 fullWidth
 value={coveringProfessional}
 placeholder="Enter Covering Professional"
 onChange={(e) => setCoveringProfessional(e.target.value)}
name="TextField" 
control={control}/>

<br/><br/>
<Typography className="mb-10 font-medium text-14">Beds</Typography>
<TextField 
 fullWidth
 value={beds}
 placeholder="Enter Bed Spaces Available"
 onChange={(e) => setBeds(e.target.value)}
name="TextField" 
control={control}/>

<br/><br/>
<Typography className="mb-10 font-medium text-14">Staff Strength</Typography>
<TextField 
 fullWidth
 value={staff}
 placeholder="Enter Staff Count"
 onChange={(e) => setStaff(e.target.value)}
name="TextField" 
control={control}/>

<br/><br/>
<Typography className="mb-10 font-medium text-14">Urbanization</Typography>
<Select 
                        fullWidth
                        options={urbanization}
                        placeholder="Select Urbanization Type"
                        onChange={(e) => setUrbanization(e.value)}
/>

<br/><br/>
<Typography className="mb-10 font-medium text-14">Staff Doc Complete</Typography>
<Select 
                        fullWidth
                        options={KIVoptions}
                        placeholder="Select Document Completion Status"
                        onChange={(e) => setDocComplete(e.value)}
/>


<br/><br/>
<Typography className="mb-10 font-medium text-14">Document Completion Date</Typography>
<DesktopDatePicker
          label="For desktop"
          value={comp}
          minDate={new Date('2017-01-01')}
          views={['year', 'month', 'day']}
          onChange={(newValue) => {
            setValue2(newValue);
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
