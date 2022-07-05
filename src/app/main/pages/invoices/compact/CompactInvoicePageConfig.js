import { lazy } from 'react';

const CompactInvoicePage = lazy(() => import('./RegistrationPrint'));
const InspectionPrint = lazy(() => import('./InspectionPrint'));

const CompactInvoicePageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'dps/registration/print',
      element: <CompactInvoicePage />,
    },
    {
      path: 'dps/inspection/print',
      element: <InspectionPrint />,
    },
  ],
};

export default CompactInvoicePageConfig;
