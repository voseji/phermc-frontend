import Form from '@fuse/core/DPS';
import { styled } from '@mui/material/styles';

const Root = styled('div')({
  padding: 24,
});

function BlankSample() {
  return (
    <Root>
      <Form />
    </Root>
  );
}

export default BlankSample;
