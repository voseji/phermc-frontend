import { lazy } from 'react';

const CompactInvoicePage = lazy(() => import('./RegistrationPrint'));

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
  ],
};

export default CompactInvoicePageConfig;
