import { lazy } from 'react';

const NewRegistration = lazy(() => import('./new_registration'));
const AllFacilities = lazy(() => import('./facilities'));
const FacilityStatus = lazy(() => import('./facility_status'));
// const AllRegistrations = lazy(() => import('./facilities'));
const NewFacilityStatus = lazy(() => import('./new_facility_status'));
const NewFacilityType = lazy(() => import('./new_facility_type'));
const FacilityType = lazy(() => import('./facility_type'));
const NewProcessingStage = lazy(() => import('./new_processing_stage'));
const ProcessingStage = lazy(() => import('./processing_stage'));
const NewInspection = lazy(() => import('./new_inspection'));
const NewInspectionNextpage = lazy(() => import('./new_inspection_next_page'));
const Inspections = lazy(() => import('./inspections'));
const InspectionType = lazy(() => import('./inspection_type'));
const NewInspectionType = lazy(() => import('./new_inspection_type'));
const NewTeam = lazy(() => import('./new_team'));
const ListTeam = lazy(() => import('./list_teams'));

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
    path: 'dps/settings/new_processing_stage',
    element: <NewProcessingStage />,
  },
  {
    path: 'dps/settings/processing_stage',
    element: <ProcessingStage />,
  },
  {
    path: 'dps/inspection/new_inspection',
    element: <NewInspection />,
  },
  {
    path: 'dps/inspection/new_inspection_next_page',
    element: <NewInspectionNextpage />,
  },
  {
    path: 'dps/inspection/list',
    element: <Inspections />,
  },
  {
    path: 'dps/settings/inspection_type',
    element: <InspectionType />,
  },
  {
    path: 'dps/settings/new_inspection_type',
    element: <NewInspectionType />,
  },
  {
    path: 'dps/settings/teams',
    element: <NewTeam />,
  },
  {
    path: 'dps/settings/list_teams',
    element: <ListTeam />,
  },
];

export default cardedLayoutRoutes;
