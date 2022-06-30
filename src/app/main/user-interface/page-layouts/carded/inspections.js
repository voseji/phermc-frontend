import { Inspections } from '@fuse/core/DPS/Inspections';
import { styled } from '@mui/material/styles';
import FusePageCarded from '@fuse/core/FusePageCarded';

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
          <h3>Facility Inspection</h3>
        </div>
      }
      contentToolbar={
        <div className="px-24">
          <h4>All Facilities</h4>
        </div>
      }
      content={
        <div className="p-24">
          
          <Inspections />
        </div>
      }
    />
  );
}

export default AllFacilitiesX;
