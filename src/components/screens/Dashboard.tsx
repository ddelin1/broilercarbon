import { useState } from 'react';
import { TrendingDown, TrendingUp, AlertTriangle, Filter, Calendar } from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function Dashboard() {
  const [dateRange, setDateRange] = useState('30days');
  const [farm, setFarm] = useState('all');
  const [status, setStatus] = useState('all');

  // Mock data
  const emissionBreakdown = [
    { name: 'Feed Production', value: 2.21, color: '#10b981' },
    { name: 'Broiler Farming', value: 0.89, color: '#14b8a6' },
    { name: 'Processing (RPA)', value: 0.24, color: '#0ea5e9' },
  ];

  const totalEmission = emissionBreakdown.reduce((sum, item) => sum + item.value, 0);

  const trendData = [
    { month: 'Jan', emission: 3.8 },
    { month: 'Feb', emission: 3.6 },
    { month: 'Mar', emission: 3.5 },
    { month: 'Apr', emission: 3.4 },
    { month: 'May', emission: 3.3 },
    { month: 'Jun', emission: 3.34 },
  ];

  const topBatches = [
    { id: 'BATCH-2024-156', farm: 'Farm A', emission: 3.89, status: 'HIGH' },
    { id: 'BATCH-2024-142', farm: 'Farm B', emission: 3.67, status: 'MEDIUM' },
    { id: 'BATCH-2024-138', farm: 'Farm C', emission: 3.54, status: 'MEDIUM' },
    { id: 'BATCH-2024-129', farm: 'Farm A', emission: 3.48, status: 'MEDIUM' },
    { id: 'BATCH-2024-115', farm: 'Farm D', emission: 3.41, status: 'MEDIUM' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'LOW': return 'bg-emerald-100 text-emerald-700';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-700';
      case 'HIGH': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const currentStatus = totalEmission >= 4.35 ? 'HIGH' : totalEmission <= 3.3 ? 'LOW' : 'MEDIUM';
  const targetEmission = 3.3;
  const baseline = 4.35;
  const progressPercentage = Math.max(0, Math.min(100, ((baseline - totalEmission) / (baseline - targetEmission)) * 100));

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Dashboard Emisi</h1>
        <p className="text-gray-600">Real-time carbon footprint monitoring and analytics</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4 items-center flex-wrap">
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
          <Calendar className="w-4 h-4 text-gray-500" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border-none bg-transparent focus:outline-none text-sm"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="year">This Year</option>
          </select>
        </div>

        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={farm}
            onChange={(e) => setFarm(e.target.value)}
            className="border-none bg-transparent focus:outline-none text-sm"
          >
            <option value="all">All Farms</option>
            <option value="farm-a">Farm A</option>
            <option value="farm-b">Farm B</option>
            <option value="farm-c">Farm C</option>
            <option value="farm-d">Farm D</option>
          </select>
        </div>

        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border-none bg-transparent focus:outline-none text-sm"
          >
            <option value="all">All Status</option>
            <option value="low">LOW</option>
            <option value="medium">MEDIUM</option>
            <option value="high">HIGH</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Carbon Footprint */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Carbon Footprint</p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-gray-900">{totalEmission.toFixed(2)}</h2>
                <span className="text-gray-500">kg CO₂e/kg</span>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs ${getStatusColor(currentStatus)}`}>
              {currentStatus}
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            {totalEmission < baseline ? (
              <>
                <TrendingDown className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-600">
                  {((baseline - totalEmission) / baseline * 100).toFixed(1)}% below baseline
                </span>
              </>
            ) : (
              <>
                <TrendingUp className="w-4 h-4 text-red-600" />
                <span className="text-red-600">Above baseline</span>
              </>
            )}
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-600 mb-4">Current Status</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Baseline (High)</span>
              <span className="text-sm text-gray-900">≥ {baseline}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Medium Range</span>
              <span className="text-sm text-gray-900">3.3 - 3.7</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Target (Low)</span>
              <span className="text-sm text-emerald-600">≤ {targetEmission}</span>
            </div>
          </div>
        </div>

        {/* Target Progress */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-600 mb-4">Target Emission Progress</p>
          <div className="mb-4">
            <div className="flex items-baseline gap-2 mb-2">
              <h2 className="text-gray-900">{progressPercentage.toFixed(0)}%</h2>
              <span className="text-sm text-gray-500">to target</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Goal: <span className="text-emerald-600">{targetEmission} kg CO₂e/kg</span>
          </p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Emission Breakdown */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-gray-900 mb-6">Emission Breakdown by Source</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={emissionBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {emissionBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `${value.toFixed(2)} kg CO₂e/kg`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {emissionBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>
                <span className="text-sm text-gray-900">
                  {item.value.toFixed(2)} ({((item.value / totalEmission) * 100).toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Trend Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-gray-900 mb-6">Historical Emission Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                formatter={(value: number) => [`${value.toFixed(2)} kg CO₂e/kg`, 'Emission']}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="emission"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: '#10b981', r: 4 }}
                activeDot={{ r: 6 }}
                name="Carbon Footprint"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Batches Table */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          <h3 className="text-gray-900">Top 5 Highest Emission Batches</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm text-gray-600">Batch ID</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Farm</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Emission (kg CO₂e/kg)</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {topBatches.map((batch, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">{batch.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{batch.farm}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{batch.emission.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs ${getStatusColor(batch.status)}`}>
                      {batch.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-sm text-emerald-600 hover:text-emerald-700">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
