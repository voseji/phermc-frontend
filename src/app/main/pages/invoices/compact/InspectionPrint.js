import Card from '@mui/material/Card';
import { styled, darken } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { BackendAPI } from './services/api.utility';
// import moment from 'moment';
import Moment from 'react-moment';

const current = new Date();
const date = `${current.getDate()}-${current.getMonth()+1}-${current.getFullYear()}`;

const Root = styled('div')(({ theme }) => ({
  background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${
    theme.palette.primary.dark
  } 80%)`,

  '& .CompactInvoicePage-divider': {
    backgroundColor: theme.palette.getContrastText(theme.palette.primary.dark),
  },

  '& .CompactInvoicePage-seller': {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
    marginRight: -88,
    paddingRight: 66,
    width: 480,
  },
}));

function InspectionPrint(separator='') {
  const [invoice, setInvoice] = useState(null);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  const { inspectionID } = useParams();
	const [inspection, setInspection] = useState(null)
  const [facilitytype1, setFacilityType1] = useState(null)
  // const [facilitystatus1, setFacilityStatus1] = useState(null)
  const [processingstage1, setProcessingStage1] = useState(null)
	const [stagedate, setDate] = useState()
  // const dateToFormat = {stagedate};
  const [docCompleteDate, setDocDate] = useState()
  // const dateToFormat2 = {docCompleteDate};

	// useEffect(()=>{
  //   fetchInspection(inspectionID)
	// },[])
  
  const [searchParams, setSearchParams] =useSearchParams()
	// const fetchInspection = async () => {
  //   await BackendAPI.get(`/inspectionall/${searchParams.get('inspectionID')}`)
  //   .then(({data})=>{
  //     // (data) => response.json()
  //     setInspection(data.teams)
  //     // setDate(data?.data.processingStageDate)
  //     // setDocDate(data?.data.docCompleteDate)
  //     // getData2(data.eID)
  //     // getData2(image)
  //     console.log(data.inspection_type);
  //   })
	// }

  // useEffect(()=>{
  //   fetchFacilityType(eID)
	// },[])
  // const fetchFacilityType = async () => {
  //   await BackendAPI.get(`/facility_reg_type/${searchParams.get('eID')}`).then(({data})=>{
  //     // setFacilityType1(data?.data)
  //     setFacilityType1(data.facility_type)
  //     console.log(data.facility_type);
  //   })
	// }
  const [facilitystatus1, setFacilityStatus1] = useState(null)
  // const [facilitystatus2, setFacilityStatus2] = useState(null)
  // const [areacouncil, setAreaCouncil] = useState(null)
  useEffect(()=>{
    fetchFacilityStatus(inspectionID)
	},[])
  const fetchFacilityStatus = async () => {
    await BackendAPI.get(`/inspection_all/${searchParams.get('inspectionID')}`).then(({data})=>{
      // setFacilityType1(data?.data)
      setFacilityStatus1(data)
      // setFacilityStatus2(data.districts)
      // setAreaCouncil(data.districts.area_council)

      console.log(data);
    })
	}


  // useEffect(()=>{
  //   fetchProcessingStage(eID)
	// },[])
  // const fetchProcessingStage = async () => {
  //   await BackendAPI.get(`/proc_stage/${searchParams.get('eID')}`).then(({data})=>{
  //     // setFacilityType1(data?.data)
  //     setProcessingStage1(data.processing_stage)
  //     console.log(data.processing_stage);
  //   })
  // }
  
  
  useEffect(() => {
    axios
      .get('/api/invoices/get-invoice', {
        params: { id: '5725a6802d' },
      })
      .then((res) => {
        setInvoice(res.data);
      });
  }, []);


  return (
    <Root className="grow shrink-0 p-0 sm:p-10 print:p-0 overflow-auto">
      {invoice && (
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ bounceDamping: 0 }}
        >
          <Card className="mx-auto w-xl print:w-full print:p-8 print:shadow-none rounded-none sm:rounded-10">
            <CardContent className="p-88 print:p-0">
              
              <img src='assets/images/logos/fcta.jpg' style={{  display: "block",  marginLeft: "auto", marginRight: "auto", width: "25%"}}/>
<h1 style={{textAlign:"center"}}>FCT Health and Human Services Secretariat</h1>
<h2 style={{textAlign:"center"}}>Department of Pharmaceutical Services</h2>
<h3 style={{textAlign:"center"}}>Facility Registration Slip</h3>
              <div className="flex justify-between">
           

              </div>

              <div className="mt-64">
              <h2 style={{textAlign:"center"}}>{facilitystatus1?.facilityName}</h2>
                <Table  style={{borderWidth:"1px", borderColor:"black"}}>
                <tr>
                    <td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>Facility eID</h3></td><td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>{facilitystatus1?.eID}</h3></td>
                  </tr>

                  <tr>
                    <td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>Registration Number</h3></td><td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>{facilitystatus1?.registrationNumber}</h3></td>
                  </tr>

                  <tr>
                    <td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>Facility Name</h3></td><td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>{facilitystatus1?.facilityName}</h3></td>
                  </tr>

                  <tr>
                    <td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>Facility Type</h3></td><td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>{facilitystatus1?.facility_type.facilityType}</h3></td>
                  </tr>

                  <tr>
                    <td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>Registration Type</h3></td><td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>{facilitystatus1?.registration_type.registrationType}</h3></td>
                  </tr>

                  <tr>
                    <td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>Facility Status</h3></td><td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>{facilitystatus1?.facility_status.facilityStatus}</h3></td>
                  </tr>

                  <tr>
                    <td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>Processing Stage</h3></td><td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>{facilitystatus1?.processing_stage.processingStage}</h3></td>
                  </tr>

                  <tr>
                    <td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>Processing Stage Date</h3></td><td><h3><Moment format="YYYY-MM-DD">{stagedate}</Moment></h3></td>
                  </tr>
                  <tr>
                    <td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>Applicant Name</h3></td><td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>{facilitystatus1?.applicantName}</h3></td>
                  </tr>

                  <tr>
                    <td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>Proprietor Name</h3></td><td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>{facilitystatus1?.proprietorName}</h3></td>
                  </tr>

                  <tr>
                    <td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>Covering Professional</h3></td><td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>{facilitystatus1?.coveringProfessional}</h3></td>
                  </tr>

                  <tr>
                    <td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>association</h3></td><td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>{facilitystatus1?.association}</h3></td>
                  </tr>

                  <tr>
                    <td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>Number of Beds</h3></td><td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>{facilitystatus1?.beds}</h3></td>
                  </tr>

                  <tr>
                    <td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>Number of Staff</h3></td><td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>{facilitystatus1?.staff}</h3></td>
                  </tr>

                  <tr>
                    <td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>Urbanization</h3></td><td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>{facilitystatus1?.urbanization}</h3></td>
                  </tr>

                  <tr>
                    <td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>Staff Document Complete?</h3></td><td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>{facilitystatus1?.staffDocComplete}</h3></td>
                  </tr>

                  <tr>
                    <td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>Staff Document Completed On:</h3></td><td><h3><Moment format="YYYY-MM-DD">{docCompleteDate}</Moment></h3></td>
                  </tr>

                  <tr>
                    <td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>Facility Address</h3></td><td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>{facilitystatus1?.facilityAddress}</h3></td>
                  </tr>

                  <tr>
                    <td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>District</h3></td><td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>{facilitystatus2?.district}</h3></td>
                  </tr>

                  <tr>
                    <td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>Area Council</h3></td><td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>{areacouncil?.areaCouncil}</h3></td>
                  </tr>

                  <tr>
                    <td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>Facility Phone Number</h3></td><td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>{facilitystatus1?.facilityPhoneNumber}</h3></td>
                  </tr>

                  <tr>
                    <td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>Facility Email</h3></td><td style={{borderWidth:"1px", borderColor:"black", width:"30%"}}><h3>{facilitystatus1?.facilityEmail}</h3></td>
                  </tr>
                  
                </Table>
              </div>

              <div className="mt-96">
                <Typography className="mb-24 print:mb-12" variant="body1">
                <b>Date printed: {date}.</b> For official use only. Not transferrable
                </Typography>

                <div className="flex">
                  

                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </Root>
  );
}

export default InspectionPrint;

/**

 Use the following elements to add breaks to your pages. This will make sure that the section in between
 these elements will be printed on a new page. The following two elements must be used before and after the
 page content that you want to show as a new page. So, you have to wrap your content with them.

 Elements:
 ---------
 <div className="page-break-after"></div>
 <div className="page-break-before"></div>


 Example:
 --------

 Initial page content!

 <div className="page-break-after"></div>
 <div className="page-break-before"></div>

 This is the second page!

 <div className="page-break-after"></div>
 <div className="page-break-before"></div>

 This is the third page!

 <div className="page-break-after"></div>
 <div className="page-break-before"></div>
 * */
