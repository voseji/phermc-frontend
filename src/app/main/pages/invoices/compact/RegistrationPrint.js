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

const current = new Date();
const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

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

function CompactInvoicePage(separator='') {
  const [invoice, setInvoice] = useState(null);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  const { eID } = useParams();
	const [student, setStudent] = useState(null)
	// const [settings, setSettings] = useState()

	useEffect(()=>{
    fetchStudent(eID)
	},[])
  
  const [searchParams, setSearchParams] =useSearchParams()
	const fetchStudent = async () => {
    await BackendAPI.get(`/registration/${searchParams.get('eID')}`).then(({data})=>{
      setStudent(data?.data)
      // getData2(data.eID)
      // getData2(image)
      console.log(data);
    })
	}
  
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
              <Typography color="textSecondary" className="mb-32">
                Date printed: {date}
              </Typography>
<h1 style={{textAlign:"center"}}>FCT Health and Human Services Secretariat</h1>
<h2 style={{textAlign:"center"}}>Department of Pharmaceutical Services</h2>
<h3 style={{textAlign:"center"}}>Facility Registration Slip</h3>
              <div className="flex justify-between">
           

              </div>

              <div className="mt-64">
                <Table  style={{borderWidth:"1px", borderColor:"black"}}>
                  <tr>
                    <td style={{borderWidth:"1px", borderColor:"black"}}>Facility Name</td><td>{student?.facilityName}</td>
                  </tr>
                </Table>
              </div>

              <div className="mt-96">
                <Typography className="mb-24 print:mb-12" variant="body1">
                  Please pay within 15 days. Thank you for your business.
                </Typography>

                <div className="flex">
                  <div className="shrink-0">
                    <img className="w-32" src="assets/images/logos/fuse.svg" alt="logo" />
                  </div>

                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </Root>
  );
}

export default CompactInvoicePage;

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
