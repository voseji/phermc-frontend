
import { styled } from '@mui/material/styles';
import FusePageCarded from '@fuse/core/FusePageCarded';
// import NewInspection from '@fuse/core/DPS/NewInspection';
import NewTeamMember from '@fuse/core/DPS/NewTeamMember';

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
          <h3>Team Members</h3>
        </div>
      }
      contentToolbar={
        <div className="px-24">
          <h4>Add Team Member</h4>
        </div>
      }
      content={
        <div className="p-24">
          
          <NewTeamMember />
        </div>
      }
    />
  );
}

export default CardedFullWidthSample;
