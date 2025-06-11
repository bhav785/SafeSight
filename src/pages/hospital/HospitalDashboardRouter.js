import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import HospitalDashboard from './HospitalDashboard';

const HOSPITAL_DATA = {
  miot: {
    name: "Dr. Meera Singh",
    organizationName: "MIOT International - 4/112, Mount Poonamallee Road, Manapakkam",
    recentIncidents: 3,
    commonIncident: "Asthma Attack",
    criticalCases: 1
  },
  mgm: {
    name: "Dr. Karthik Subramanian",
    organizationName: "MGM Healthcare, Malar - 52, 1st Main Road, Adyar",
    recentIncidents: 5,
    commonIncident: "Heart Attack",
    criticalCases: 2
  }
};

const HospitalDashboardRouter = () => {
  const { hospitalId } = useAuth();
  const data = HOSPITAL_DATA[hospitalId];

  return data ? <HospitalDashboard {...data} /> : <div>Invalid Hospital</div>;
};

export default HospitalDashboardRouter;