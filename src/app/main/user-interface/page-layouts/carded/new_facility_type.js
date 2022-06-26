// import Form from '@fuse/core/DPS';
import { styled } from '@mui/material/styles';
import FusePageCarded from '@fuse/core/FusePageCarded';

import NewFacilityType from '@fuse/core/DPS/NewFacilityType';

const Root = styled(FusePageCarded)({
  '& .FusePageCarded-header': {},
  '& .FusePageCarded-toolbar': {},
  '& .FusePageCarded-content': {},
  '& .FusePageCarded-sidebarHeader': {},
  '& .FusePageCarded-sidebarContent': {},
});

function CardedFullWidthSample() {
  return (
    <Root
      header={
        <div className="py-24">
          <h3>New Facility Registration</h3>
        </div>
      }
      contentToolbar={
        <div className="px-24">
          <h4>Add New Facility Type</h4>
        </div>
      }
      content={
        <div className="p-24">
          
          <NewFacilityType />
        </div>
      }
    />
  );
}

export default CardedFullWidthSample;
