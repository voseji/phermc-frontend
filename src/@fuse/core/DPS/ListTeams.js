import { memo } from 'react';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {useForm, Controller} from "react-hook-form";
import React, { useState, useEffect, useRef } from 'react';
import TeamsService from './services/teams.service';
import { useSnackbar } from 'notistack';
import { BackendAPI } from './services/api.utility';
import Swal from 'sweetalert2';

import MUIDataTable from "mui-datatables";
// import RegistrationService from './services/registration.service';
import moment from 'moment'
import { Link } from 'react-router-dom';
import { useParams, useSearchParams } from 'react-router-dom';



export const ListTeam = () =>{
  const ref = useRef(null);
  // const { columns: pColumns, rows: pRows } = projectsTableData();


  const columns = [
    // { label: "SN", name: "serialNumber" },
    {
      label: "Date Created", name: "created_at", options: {
        customBodyRender: (v) => {
          return <>{moment(v).format('YYYY-MM-DD')}</>
        }
      }
    },
    { label: "Team ID", name: "teamID" },
    { label: "Team Name", name: "team" },
    { label: "Members", name: "", options: {customBodyRender: (teamID) => {
      return <Icon color="primary"
      component={Link}
      to={{pathname: `/dps/settings/team_members?teamID=${teamID}`, data:teamdetails}}
      >launch</Icon>
 }} },


  ];
  const [searchParams, setSearchParams] =useSearchParams()
  const [team, setTeam] = useState([])
  useEffect(() => {
    getTeam()
  }, [])
  const getTeam = async () => {
    await BackendAPI.get(`/teams`).then(({ data }) => {
      setTeam(data)
      console.log(data);
    })
  }

  const [teamdetails, setAllTeamDetails] = useState([])
 useEffect(()=>{
    fetchAllTeamDetails()
	},[])
  const fetchAllTeamDetails = async () => {
    await BackendAPI.get(`/teamsall1`).then(({data})=>{
      // setFacilityType1(data?.data)
      setAllTeamDetails(data)
      console.log(data);
    })
	}

  // const [facilitystatus1, setFacilityStatus1] = useState(null)
  // useEffect(()=>{
  //   fetchAllTeamDetails(teamID)
	// },[])
  // const fetchAllTeamDetails = async () => {
  //   await BackendAPI.get(`/teams1/TID-41477`).then(({data})=>{
  //     // setFacilityType1(data?.data)
  //     setAllTeamDetails(data)
  //     console.log(data);
  //   })
	// }
  return (
<div className="mt-100 mb-16">

<MUIDataTable 
              columns={columns}
              data={team.map((team, index) => [
                // index +1, 
                team.createdAt,
                team.teamID,
                team.team,
                team.teamID,

           
              ])}
              options={{
                selectableRows: 'none',
                elevation: false,
              }}
             />

</div>
  );
}

// export function Facilities();
