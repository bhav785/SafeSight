import React, { useState } from 'react';
import { AlertTriangle, Bell, Settings, MapPin, Clock, AlertCircle, Check, X, ChevronRight } from 'lucide-react';

// Helper function to format date
const formatDate = (dateString) => {
  const options = {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const SeverityBadge = ({ severity }) => {
    const getSeverityColor = (level) => {
      switch (level.toLowerCase()) {
        case 'critical': return 'bg-red-100 text-red-800';
        case 'high': return 'bg-orange-100 text-orange-800';
        case 'medium': return 'bg-yellow-100 text-yellow-800';
        case 'low': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };
  
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(severity)}`}>
        {severity}
      </span>
    );
  };
  

// Modal Component to show incident details
const IncidentDetailModal = ({ incident, onClose }) => {
  if (!incident) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Accident Report #{incident.id}</h2>
        <p className="text-sm text-gray-600 mb-2"><MapPin className="inline h-4 w-4 mr-1" /> {incident.location}</p>
        <p className="text-sm text-gray-600 mb-2"><Clock className="inline h-4 w-4 mr-1" /> {formatDate(incident.timestamp)}</p>
        <SeverityBadge severity={incident.severity} />
        {incident.image && (
          <img src={incident.image} alt="Accident scene" className="mt-4 rounded shadow" />
        )}
        <p className="mt-4 text-sm text-gray-700">{incident.description}</p>
        <p className="mt-4 text-sm text-gray-700">Status: <strong>{incident.status}</strong></p>
      </div>
    </div>
  );
};

// Empty State Component
const EmptyState = () => (
  <div className="text-center py-16">
    <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
    <h3 className="mt-2 text-sm font-medium text-gray-900">No incidents</h3>
    <p className="mt-1 text-sm text-gray-500">There are no active incidents to display at this time.</p>
  </div>
);

// Hardcoded User
const currentUser = {
  name: 'Dr. Meera Singh',
  organizationName: 'MIOT International'
};

// Main Dashboard Component
const HospitalDashboardMIOT = () => {
  const [incidents, setIncidents] = useState([
    {
      id: 1,
      location: 'No. 12, Anna Salai, Teynampet, Chennai',
      timestamp: '2025-05-01T10:00:00Z',
      severity: 'Moderate',
      status: 'pending',
      image: "C:\\Users\\bhav0\\safesight\\1.mp4",
      isRead: false,
      description: 'Car and motorcycle collided in a moderate accident.',
      coordinates: { lat: 13.0418, lng: 80.2341 },
      detectedBy: 'CCTV Camera #205'
    },
    {
      id: 3,
      location: 'Near Marina Beach, Triplicane, Chennai',
      timestamp: '2025-04-30T22:15:00Z',
      severity: 'Critical',
      status: 'accepted',
      image: 'https://via.placeholder.com/400x200.png?text=Emergency',
      isRead: false,
      description: 'A tourist van overturned with multiple passengers injured. Urgent response required.'
    },
    {
      id: 4,
      location: '16, G.N. Chetty Road, Nungambakkam, Chennai',
      timestamp: '2025-05-01T08:30:00Z',
      severity: 'Low',
      status: 'accepted',
      image: null,
      isRead: true,
      description: 'Minor road mishap involving a delivery scooter and a pedestrian. No major injuries.'
    },
    {
      id: 5,
      location: '85, Jawaharlal Nehru Salai, Koyambedu, Chennai',
      timestamp: '2025-04-30T18:45:00Z',
      severity: 'High',
      status: 'accepted',
      image: 'https://via.placeholder.com/400x200.png?text=High+Impact',
      isRead: false,
      description: 'High-speed collision between a truck and an auto-rickshaw. Multiple casualties suspected.'
    },
  ]);

  const [selectedIncident, setSelectedIncident] = useState(null);

  const handleAcceptIncident = (incidentId) => {
    setIncidents(prev => prev.map(i =>
      i.id === incidentId ? { ...i, status: 'accepted', respondingHospital: currentUser.organizationName } : i
    ));
  };

  const handleRejectIncident = (incidentId) => {
    setIncidents(prev => prev.filter(i => i.id !== incidentId));
  };

  const pendingIncidents = incidents.filter(i => i.status === 'pending');
  const acceptedIncidents = incidents.filter(i => i.status === 'accepted');

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">SafeSight</span>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="h-6 w-6 text-gray-400" />
            <Settings className="h-6 w-6 text-gray-400" />
            <div className="text-right">
              <div className="text-base font-medium text-gray-800">{currentUser.name}</div>
              <div className="text-sm text-gray-500">{currentUser.organizationName}</div>
            </div>
            <button className="px-3 py-1 border text-sm bg-white rounded-md hover:bg-gray-50">Logout</button>
          </div>
        </div>
      </nav>

      <div className="py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">MIOT International Dashboard</h1>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Pending Incidents</h2>
          {pendingIncidents.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pendingIncidents.map(incident => (
                <div key={incident.id} className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                  <div className="px-4 py-5 sm:px-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">Accident Report #{incident.id}</h3>
                      <SeverityBadge severity={incident.severity} />
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <MapPin className="mr-1.5 h-4 w-4 text-gray-400" />
                      <p>{incident.location}</p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <Clock className="mr-1.5 h-4 w-4 text-gray-400" />
                      <p>{formatDate(incident.timestamp)}</p>
                    </div>
                  </div>
                  <div className="px-4 py-4 sm:px-6">
                    {incident.image && (
                      <img src={incident.image} alt="Accident" className="w-full h-48 object-cover rounded mb-4" />
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      <button onClick={() => handleAcceptIncident(incident.id)} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">
                        <Check className="mr-2 h-4 w-4 inline" /> Accept
                      </button>
                      <button onClick={() => handleRejectIncident(incident.id)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-md border">
                        <X className="mr-2 h-4 w-4 inline" /> Reject
                      </button>
                    </div>
                    <button
                      onClick={() => setSelectedIncident(incident)}
                      className="mt-3 flex items-center justify-center px-4 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md border mt-4"
                    >
                      View Details <ChevronRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : <EmptyState />}

        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Accepted Incidents</h2>
          {acceptedIncidents.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {acceptedIncidents.map(incident => (
                <div key={incident.id} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        Accident Report #{incident.id}
                      </h3>
                      <span className="px-2.5 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">Accepted</span>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <MapPin className="mr-1.5 h-4 w-4 text-gray-400" />
                      <p>{incident.location}</p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <Clock className="mr-1.5 h-4 w-4 text-gray-400" />
                      <p>{formatDate(incident.timestamp)}</p>
                    </div>
                  </div>
                  <div className="px-4 py-4 sm:px-6">
                    <button
                      onClick={() => setSelectedIncident(incident)}
                      className="flex items-center justify-center px-4 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md border"
                    >
                      View Details <ChevronRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">No accepted incidents to display</div>
          )}
        </section>
      </div>

      {selectedIncident && (
        <IncidentDetailModal
          incident={selectedIncident}
          onClose={() => setSelectedIncident(null)}
        />
      )}
    </div>
  );
};

export default HospitalDashboardMIOT;