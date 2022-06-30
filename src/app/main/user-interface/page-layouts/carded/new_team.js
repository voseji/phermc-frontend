// import Form from '@fuse/core/DPS';
import { styled } from '@mui/material/styles';
import FusePageCarded from '@fuse/core/FusePageCarded';

import NewTeam from '@fuse/core/DPS/NewTeam';

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
          <h3>Facility Inspection Team</h3>
        </div>
      }
      contentToolbar={
        <div className="px-24">
          <h4>Add New Team</h4>
        </div>
      }
      content={
        <div className="p-24">
          
          <NewTeam />
        </div>
      }
    />
  );
}

export default CardedFullWidthSample;
