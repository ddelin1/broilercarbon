import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Database, Calculator, CheckCircle, TrendingUp, Target, FileText, Users, Settings, LogOut, ChevronRight, Leaf } from 'lucide-react';
import { User } from '../App';

interface SidebarProps {
  user: User;
  onLogout: () => void;
}

export function Sidebar({ user, onLogout }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-emerald-700">CarbonBroiler</h1>
            <p className="text-xs text-gray-500">Insight</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <Link
          to="/dashboard"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
            isActive('/dashboard')
              ? 'bg-emerald-50 text-emerald-700'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>

        {/* Input Data Section */}
        <div className="mt-4 mb-2">
          <div className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500">
            <Database className="w-4 h-4" />
            <span>Input Data</span>
          </div>
          <Link
            to="/input/feed"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg mb-1 ml-4 text-sm transition-colors ${
              isActive('/input/feed')
                ? 'bg-emerald-50 text-emerald-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
            <span>Feed Production</span>
          </Link>
          <Link
            to="/input/broiler"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg mb-1 ml-4 text-sm transition-colors ${
              isActive('/input/broiler')
                ? 'bg-emerald-50 text-emerald-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
            <span>Broiler Farming</span>
          </Link>
          <Link
            to="/input/processing"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg mb-1 ml-4 text-sm transition-colors ${
              isActive('/input/processing')
                ? 'bg-emerald-50 text-emerald-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
            <span>Processing (RPA)</span>
          </Link>
        </div>

        <Link
          to="/lca-calculation"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
            isActive('/lca-calculation')
              ? 'bg-emerald-50 text-emerald-700'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Calculator className="w-5 h-5" />
          <span>Perhitungan Emisi</span>
        </Link>

        <Link
          to="/lca-results"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
            isActive('/lca-results')
              ? 'bg-emerald-50 text-emerald-700'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <CheckCircle className="w-5 h-5" />
          <span>Hasil & Validasi LCA</span>
        </Link>

        <Link
          to="/hotspot-analytics"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
            isActive('/hotspot-analytics')
              ? 'bg-emerald-50 text-emerald-700'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <TrendingUp className="w-5 h-5" />
          <span>Analitik Hotspot</span>
        </Link>

        <Link
          to="/mitigation-planner"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
            isActive('/mitigation-planner')
              ? 'bg-emerald-50 text-emerald-700'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Target className="w-5 h-5" />
          <span>Mitigation Planner</span>
        </Link>

        <Link
          to="/esg-report"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
            isActive('/esg-report')
              ? 'bg-emerald-50 text-emerald-700'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span>Laporan & Label ESG</span>
        </Link>

        <Link
          to="/role-management"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
            isActive('/role-management')
              ? 'bg-emerald-50 text-emerald-700'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Users className="w-5 h-5" />
          <span>Role Management</span>
        </Link>

        <div className="flex items-center gap-3 px-4 py-3 rounded-lg mb-1 text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
          <Settings className="w-5 h-5" />
          <span>Pengaturan & Profil</span>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white">
            {user.email[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm truncate">{user.email}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
