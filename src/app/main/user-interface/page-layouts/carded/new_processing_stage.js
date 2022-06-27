import NewProcessingStage from '@fuse/core/DPS/NewProcessingStage';
import { styled } from '@mui/material/styles';
import FusePageCarded from '@fuse/core/FusePageCarded';

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
          <h4>Register New Facility</h4>
        </div>
      }
      content={
        <div className="p-24">
          
          <NewProcessingStage />
        </div>
      }
    />
  );
}

export default CardedFullWidthSample;
