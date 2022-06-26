import Form from '@fuse/core/DPS';
import { styled } from '@mui/material/styles';
import FusePageCarded from '@fuse/core/FusePageCarded';

const Root = styled(FusePageCarded)({
  '& .FusePageCarded-header': {},
  '& .FusePageCarded-toolbar': {},
  '& .FusePageCarded-content': {},
  '& .FusePageCarded-sidebarHeader': {},
  '& .FusePageCarded-sidebarContent': {},
});

function CardedFullWidth2Sample() {
  return (
    <Root
      header={
        <div className="py-24">
          <h4>Header</h4>
        </div>
      }
      contentToolbar={
        <div className="px-24">
          <h4>Content Toolbar</h4>
        </div>
      }
      content={
        <div className="p-24">
          <h4>Content</h4>
          <br />
          <Form />
        </div>
      }
      innerScroll
    />
  );
}

export default CardedFullWidth2Sample;
