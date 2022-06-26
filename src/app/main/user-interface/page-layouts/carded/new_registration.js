import Form from '@fuse/core/DPS/RegistrationForm';
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
          
          <Form />
        </div>
      }
    />
  );
}

export default CardedFullWidthSample;
