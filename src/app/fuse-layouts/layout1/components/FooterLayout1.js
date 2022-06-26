import AppBar from '@mui/material/AppBar';
import { ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import PoweredByLinks from 'app/fuse-layouts/shared-components/PoweredByLinks';
// import PurchaseButton from 'app/fuse-layouts/shared-components/PurchaseButton';
// import DocumentationButton from 'app/fuse-layouts/shared-components/DocumentationButton';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectFooterTheme } from 'app/store/fuse/settingsSlice';
import clsx from 'clsx';

function FooterLayout1(props) {
  const footerTheme = useSelector(selectFooterTheme);

  return (
    <ThemeProvider theme={footerTheme}>

    </ThemeProvider>
  );
}

export default memo(FooterLayout1);
