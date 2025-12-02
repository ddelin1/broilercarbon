import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Login } from './components/screens/Login';
import { Dashboard } from './components/screens/Dashboard';
import { InputFeed } from './components/screens/InputFeed';
import { InputBroiler } from './components/screens/InputBroiler';
import { InputProcessing } from './components/screens/InputProcessing';
import { LCACalculation } from './components/screens/LCACalculation';
import { LCAResults } from './components/screens/LCAResults';
import { HotspotAnalytics } from './components/screens/HotspotAnalytics';
import { MitigationPlanner } from './components/screens/MitigationPlanner';
import { ESGReport } from './components/screens/ESGReport';
import { RoleManagement } from './components/screens/RoleManagement';

export type UserRole = 'Feed Operator' | 'Broiler Operator' | 'RPA Operator' | 'Carbon Manager' | 'ESG Auditor' | null;

export interface User {
  email: string;
  role: UserRole;
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (email: string, role: UserRole) => {
    setUser({ email, role });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />
        } />
        <Route path="/*" element={
          user ? (
            <div className="flex h-screen bg-gray-50">
              <Sidebar user={user} onLogout={handleLogout} />
              <main className="flex-1 overflow-y-auto">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/input/feed" element={<InputFeed />} />
                  <Route path="/input/broiler" element={<InputBroiler />} />
                  <Route path="/input/processing" element={<InputProcessing />} />
                  <Route path="/lca-calculation" element={<LCACalculation />} />
                  <Route path="/lca-results" element={<LCAResults />} />
                  <Route path="/hotspot-analytics" element={<HotspotAnalytics />} />
                  <Route path="/mitigation-planner" element={<MitigationPlanner />} />
                  <Route path="/esg-report" element={<ESGReport />} />
                  <Route path="/role-management" element={<RoleManagement />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
              </main>
            </div>
          ) : (
            <Navigate to="/login" />
          )
        } />
      </Routes>
    </Router>
  );
}

export default App;
