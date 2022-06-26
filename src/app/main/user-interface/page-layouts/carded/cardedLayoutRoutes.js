// import Facilities from '@fuse/core/DPS/Facilities';
import { lazy } from 'react';

const NewRegistration = lazy(() => import('./new_registration'));
const AllFacilities = lazy(() => import('./facilities'));
const FacilityStatus = lazy(() => import('./facility_status'));
// const AllRegistrations = lazy(() => import('./facilities'));
const NewFacilityStatus = lazy(() => import('./new_facility_status'));
const NewFacilityType = lazy(() => import('./new_facility_type'));
const FacilityType = lazy(() => import('./facility_type'));
const LeftSidebar2 = lazy(() => import('./left-sidebar-2'));
const LeftSidebarTabbed = lazy(() => import('./left-sidebar-tabbed'));
const LeftSidebar2Tabbed = lazy(() => import('./left-sidebar-2-tabbed'));
const RightSidebar = lazy(() => import('./right-sidebar'));
const RightSidebar2 = lazy(() => import('./right-sidebar-2'));
const RightSidebarTabbed = lazy(() => import('./right-sidebar-tabbed'));
const RightSidebar2Tabbed = lazy(() => import('./right-sidebar-2-tabbed'));

const cardedLayoutRoutes = [
  {
    path: 'dps/registration/new_registration',
    element: <NewRegistration />,
  },
  {
    path: 'dps/registration/list',
    element: <AllFacilities />,
  },
  {
    path: 'dps/settings/facility_status',
    element: <FacilityStatus />,
  },
  {
    path: 'dps/settings/facility_type',
    element: <FacilityType />,
  },
  {
    path: 'dps/settings/new_facility_status',
    element: <NewFacilityStatus />,
  },
  {
    path: 'dps/settings/facility_types',
    element: <FacilityType />,
  },
  {
    path: 'dps/settings/new_facility_type',
    element: <NewFacilityType />,
  },
  {
    path: 'ui/page-layouts/carded/left-sidebar-2',
    element: <LeftSidebar2 />,
  },
  {
    path: 'ui/page-layouts/carded/left-sidebar-2-tabbed',
    element: <LeftSidebar2Tabbed />,
  },
  {
    path: 'ui/page-layouts/carded/right-sidebar',
    element: <RightSidebar />,
  },
  {
    path: 'ui/page-layouts/carded/right-sidebar-tabbed',
    element: <RightSidebarTabbed />,
  },
  {
    path: 'ui/page-layouts/carded/right-sidebar-2',
    element: <RightSidebar2 />,
  },
  {
    path: 'ui/page-layouts/carded/right-sidebar-2-tabbed',
    element: <RightSidebar2Tabbed />,
  },
];

export default cardedLayoutRoutes;
