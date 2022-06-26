import { FacilityType } from '@fuse/core/DPS/FacilityType';
import { styled } from '@mui/material/styles';
import FusePageCarded from '@fuse/core/FusePageCarded';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Root = styled(FusePageCarded)({
  '& .FusePageCarded-header': {},
  '& .FusePageCarded-toolbar': {},
  '& .FusePageCarded-content': {},
  '& .FusePageCarded-sidebarHeader': {},
  '& .FusePageCarded-sidebarContent': {},
});

function AllFacilitiesX() {
  return (
    <Root
      header={
        <div className="py-24">
          <h3>Facility Registration</h3>
        </div>
      }
      contentToolbar={
        <div className="px-24">
              
      <Button href="dps/settings/new_facility_type" variant="contained">Add New Facility Type</Button>
{/* <h4 style={{textAlign:"center"}}>Facility Status</h4> */}
        </div>
      }
      content={
        <div className="p-24">
      
          <FacilityType />
        </div>
      }
    />
  );
}

export default AllFacilitiesX;
