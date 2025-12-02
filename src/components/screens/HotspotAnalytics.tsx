import { useNavigate } from 'react-router-dom';
import { TrendingUp, AlertTriangle, Target, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export function HotspotAnalytics() {
  const navigate = useNavigate();

  const hotspots = [
    { source: 'Soybean Meal Production', emission: 1.10, percentage: 32.9, category: 'Feed', priority: 'Critical' },
    { source: 'Manure CH₄ Emissions (Storage)', emission: 0.70, percentage: 21.0, category: 'Broiler', priority: 'High' },
    { source: 'Corn Production', emission: 0.24, percentage: 7.2, category: 'Feed', priority: 'Medium' },
    { source: 'Feed Mill Electricity', emission: 0.13, percentage: 3.9, category: 'Feed', priority: 'Low' },
    { source: 'RPA Cooling Energy', emission: 0.10, percentage: 3.0, category: 'Processing', priority: 'Low' },
    { source: 'Natural Gas (Feed Mill)', emission: 0.10, percentage: 3.0, category: 'Feed', priority: 'Low' },
    { source: 'Farm Electricity', emission: 0.07, percentage: 2.1, category: 'Broiler', priority: 'Low' },
    { source: 'Manure N₂O Emissions', emission: 0.07, percentage: 2.1, category: 'Broiler', priority: 'Low' },
  ];

  const getBarColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return '#ef4444';
      case 'High': return '#f59e0b';
      case 'Medium': return '#3b82f6';
      default: return '#10b981';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-700 border-red-300';
      case 'High': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'Medium': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-emerald-100 text-emerald-700 border-emerald-300';
    }
  };

  const top3Hotspots = hotspots.slice(0, 3);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Analitik Hotspot</h1>
        <p className="text-gray-600">Identify and prioritize emission hotspots for targeted mitigation</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Top Hotspot</p>
              <h3 className="text-gray-900">Soybean Meal</h3>
            </div>
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl text-gray-900">32.9%</span>
            <span className="text-sm text-gray-600">of total</span>
          </div>
          <p className="text-sm text-red-700 mt-2">Critical priority for mitigation</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">2nd Hotspot</p>
              <h3 className="text-gray-900">Manure Storage</h3>
            </div>
            <TrendingUp className="w-6 h-6 text-orange-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl text-gray-900">21.0%</span>
            <span className="text-sm text-gray-600">of total</span>
          </div>
          <p className="text-sm text-orange-700 mt-2">High priority - CH₄ reduction</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Mitigation Potential</p>
              <h3 className="text-gray-900">~40-50%</h3>
            </div>
            <Target className="w-6 h-6 text-emerald-600" />
          </div>
          <p className="text-sm text-gray-700 mt-2">Combined reduction potential</p>
          <p className="text-xs text-emerald-600 mt-1">Top 2 hotspots addressable</p>
        </div>
      </div>

      {/* Hotspot Chart */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-8">
        <h3 className="text-gray-900 mb-6">Emission Contributions by Hotspot Source</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={hotspots} layout="vertical" margin={{ left: 150 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis type="number" stroke="#6b7280" label={{ value: 'kg CO₂e/kg', position: 'bottom' }} />
            <YAxis type="category" dataKey="source" stroke="#6b7280" width={140} />
            <Tooltip
              formatter={(value: number) => [`${value.toFixed(2)} kg CO₂e/kg`, 'Emission']}
              contentStyle={{ borderRadius: '8px' }}
            />
            <Bar dataKey="emission" radius={[0, 8, 8, 0]}>
              {hotspots.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.priority)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top 3 Hotspots Detail */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-8">
        <div className="flex items-center gap-2 mb-6">
          <AlertTriangle className="w-6 h-6 text-red-600" />
          <h3 className="text-gray-900">Top 3 Hotspots - Detailed Analysis</h3>
        </div>

        <div className="space-y-4">
          {top3Hotspots.map((hotspot, index) => (
            <div key={index} className="p-5 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg text-gray-900">#{index + 1} {hotspot.source}</span>
                    <span className={`px-3 py-1 rounded-full text-xs border ${getPriorityColor(hotspot.priority)}`}>
                      {hotspot.priority} Priority
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Category: {hotspot.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl text-gray-900">{hotspot.emission.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">kg CO₂e/kg</p>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                  <span>Contribution</span>
                  <span>{hotspot.percentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${hotspot.percentage}%`,
                      backgroundColor: getBarColor(hotspot.priority),
                    }}
                  />
                </div>
              </div>

              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700">
                  {index === 0 && (
                    <>
                      <strong className="text-red-700">⚠️ Critical Impact:</strong> Soybean meal production dominates feed emissions due to land use change, fertilizer use, and long supply chains. Consider alternative protein sources like insect meal, algae, or locally-sourced proteins.
                    </>
                  )}
                  {index === 1 && (
                    <>
                      <strong className="text-orange-700">🔥 High Impact:</strong> Traditional manure storage produces significant CH₄ emissions through anaerobic decomposition. Converting to biogas or composting can reduce emissions by 60-70%.
                    </>
                  )}
                  {index === 2 && (
                    <>
                      <strong className="text-blue-700">📊 Medium Impact:</strong> Corn production emissions stem from fertilizer application and machinery use. Optimizing feed formulations and sourcing from sustainable farms can help.
                    </>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Hotspot Table */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-8">
        <h3 className="text-gray-900 mb-6">All Hotspots - Prioritized List</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 text-sm text-gray-600">Rank</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Emission Source</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Category</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Emission (kg CO₂e/kg)</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">% of Total</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Priority</th>
              </tr>
            </thead>
            <tbody>
              {hotspots.map((hotspot, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">#{index + 1}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{hotspot.source}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{hotspot.category}</td>
                  <td className="py-3 px-4 text-sm text-gray-900 text-right">{hotspot.emission.toFixed(2)}</td>
                  <td className="py-3 px-4 text-sm text-gray-900 text-right">{hotspot.percentage.toFixed(1)}%</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs border ${getPriorityColor(hotspot.priority)}`}>
                      {hotspot.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => navigate('/mitigation-planner')}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/30"
      >
        <Target className="w-5 h-5" />
        Lanjutkan ke Mitigasi
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
