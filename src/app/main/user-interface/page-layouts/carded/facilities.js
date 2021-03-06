import { Facilities } from '@fuse/core/DPS/Facilities';
import { styled } from '@mui/material/styles';
import FusePageCarded from '@fuse/core/FusePageCarded';
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
     <h4>Registered Facilities</h4>
        </div>
      }
      contentToolbar={
        <div className="px-24">
          <Button href="dps/registration/new_registration" variant="contained">Register New facility</Button>
          
        </div>
      }
      content={
        <div className="p-24">
          
          <Facilities />
        </div>
      }
    />
  );
}

export default AllFacilitiesX;
