
import { styled } from '@mui/material/styles';
import FusePageCarded from '@fuse/core/FusePageCarded';
// import NewInspection from '@fuse/core/DPS/NewInspection';
import NewInspectionNextPage from '@fuse/core/DPS/NewInspectionNextPage';

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
          <h3>Facility Inspection</h3>
        </div>
      }
      contentToolbar={
        <div className="px-24">
          <h4>Inspect Facility</h4>
        </div>
      }
      content={
        <div className="p-24">
          
          <NewInspectionNextPage />
        </div>
      }
    />
  );
}

export default CardedFullWidthSample;
