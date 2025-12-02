import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, TrendingDown, FileText, Target, ChevronDown, ChevronUp } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function LCAResults() {
  const navigate = useNavigate();
  const [methodologyExpanded, setMethodologyExpanded] = useState(false);

  // Mock LCA calculation results
  const totalCF = 3.34; // kg CO₂e/kg
  const baseline = 4.35;
  const target = 3.3;
  const status = totalCF >= baseline ? 'HIGH' : totalCF <= target ? 'LOW' : 'MEDIUM';

  const emissionBreakdown = [
    { name: 'Feed Production', value: 2.21, percentage: 66.2, color: '#10b981' },
    { name: 'Broiler Farming', value: 0.89, percentage: 26.6, color: '#14b8a6' },
    { name: 'Processing (RPA)', value: 0.24, percentage: 7.2, color: '#0ea5e9' },
  ];

  const detailedBreakdown = [
    {
      subsystem: 'Feed Production',
      activities: [
        { activity: 'Soybean Meal', data: '500 kg', ef: '2.2 kg CO₂e/kg', emission: 1.10, percent: 32.9 },
        { activity: 'Corn', data: '300 kg', ef: '0.8 kg CO₂e/kg', emission: 0.24, percent: 7.2 },
        { activity: 'Wheat Bran', data: '100 kg', ef: '0.6 kg CO₂e/kg', emission: 0.06, percent: 1.8 },
        { activity: 'Rice Bran', data: '80 kg', ef: '0.5 kg CO₂e/kg', emission: 0.04, percent: 1.2 },
        { activity: 'Fish Meal', data: '20 kg', ef: '3.5 kg CO₂e/kg', emission: 0.07, percent: 2.1 },
        { activity: 'Electricity (Feed Mill)', data: '150 kWh', ef: '0.85 kg CO₂e/kWh', emission: 0.13, percent: 3.9 },
        { activity: 'Natural Gas', data: '50 m³', ef: '2.0 kg CO₂e/m³', emission: 0.10, percent: 3.0 },
        { activity: 'Diesel Transport', data: '20 L', ef: '2.68 kg CO₂e/L', emission: 0.05, percent: 1.5 },
      ],
    },
    {
      subsystem: 'Broiler Farming',
      activities: [
        { activity: 'Feed Consumption', data: '1800 kg', ef: '—', emission: 0.00, percent: 0.0 },
        { activity: 'Electricity (Farm)', data: '80 kWh', ef: '0.85 kg CO₂e/kWh', emission: 0.07, percent: 2.1 },
        { activity: 'LPG Heating', data: '15 kg', ef: '3.0 kg CO₂e/kg', emission: 0.05, percent: 1.5 },
        { activity: 'Manure CH₄ (Stored)', data: '200 kg litter', ef: '3.5 kg CO₂e/kg', emission: 0.70, percent: 21.0 },
        { activity: 'Manure N₂O', data: '200 kg litter', ef: '0.35 kg CO₂e/kg', emission: 0.07, percent: 2.1 },
      ],
    },
    {
      subsystem: 'Processing (RPA)',
      activities: [
        { activity: 'Electricity (Cooling)', data: '120 kWh', ef: '0.85 kg CO₂e/kWh', emission: 0.10, percent: 3.0 },
        { activity: 'Electricity (Other)', data: '30 kWh', ef: '0.85 kg CO₂e/kWh', emission: 0.03, percent: 0.9 },
        { activity: 'Diesel (Generator)', data: '10 L', ef: '2.68 kg CO₂e/L', emission: 0.03, percent: 0.9 },
        { activity: 'NH₃ Leakage', data: '0.5 kg', ef: '0.0 kg CO₂e/kg', emission: 0.00, percent: 0.0 },
        { activity: 'LDPE Packaging', data: '5 kg', ef: '2.0 kg CO₂e/kg', emission: 0.01, percent: 0.3 },
        { activity: 'PP Packaging', data: '8 kg', ef: '1.8 kg CO₂e/kg', emission: 0.01, percent: 0.3 },
      ],
    },
  ];

  const comparisonData = [
    { name: 'Baseline', value: baseline, color: '#ef4444' },
    { name: 'Current', value: totalCF, color: status === 'LOW' ? '#10b981' : status === 'MEDIUM' ? '#f59e0b' : '#ef4444' },
    { name: 'Target', value: target, color: '#10b981' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'LOW': return 'bg-emerald-100 text-emerald-700 border-emerald-300';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'HIGH': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Hasil Perhitungan & Validasi LCA</h1>
          <p className="text-gray-600">Carbon footprint calculation results for BATCH-2024-156</p>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-emerald-600" />
          <span className="text-sm text-emerald-600">Calculation Complete</span>
        </div>
      </div>

      {/* Main KPI Card */}
      <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-gray-900 mb-4">Carbon Footprint Result</h2>
            <div className="flex items-baseline gap-3 mb-4">
              <h1 className="text-5xl text-gray-900">{totalCF.toFixed(2)}</h1>
              <span className="text-xl text-gray-600">kg CO₂e / kg carcass</span>
            </div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${getStatusColor(status)}`}>
              <span className="text-lg">Status: {status}</span>
            </div>
            <div className="mt-6 flex items-center gap-3 text-sm">
              <TrendingDown className="w-5 h-5 text-emerald-600" />
              <span className="text-emerald-600">
                {((baseline - totalCF) / baseline * 100).toFixed(1)}% reduction from baseline ({baseline} kg CO₂e/kg)
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Distance to target: {totalCF > target ? `${(totalCF - target).toFixed(2)} kg CO₂e/kg above` : 'Target achieved!'}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
              <p className="text-sm text-gray-600 mb-2">Functional Unit</p>
              <p className="text-gray-900 mb-4">1 kg frozen broiler carcass</p>
              <p className="text-sm text-gray-600 mb-2">System Boundary</p>
              <p className="text-gray-900 mb-4">Cradle-to-Gate</p>
              <p className="text-sm text-gray-600 mb-2">Scopes</p>
              <p className="text-gray-900">1, 2, 3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Donut Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-gray-900 mb-6">Emission Breakdown by Subsystem</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={emissionBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={2}
                dataKey="value"
              >
                {emissionBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value.toFixed(2)} kg CO₂e/kg`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {emissionBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>
                <span className="text-sm text-gray-900">
                  {item.value.toFixed(2)} ({item.percentage.toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-gray-900 mb-6">Comparison: Baseline vs Current vs Target</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" domain={[0, 5]} />
              <YAxis type="category" dataKey="name" stroke="#6b7280" />
              <Tooltip formatter={(value: number) => `${value.toFixed(2)} kg CO₂e/kg`} />
              <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                {comparisonData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
            <p className="text-sm text-emerald-700">
              ✓ Current emission is {((baseline - totalCF) / baseline * 100).toFixed(1)}% below baseline
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown Tables */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6">
        <h3 className="text-gray-900 mb-6">Detailed Activity Breakdown</h3>
        {detailedBreakdown.map((section, idx) => (
          <div key={idx} className="mb-6 last:mb-0">
            <h4 className="text-gray-900 mb-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-600" />
              {section.subsystem}
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Activity</th>
                    <th className="text-right py-3 px-4 text-sm text-gray-600">Activity Data</th>
                    <th className="text-right py-3 px-4 text-sm text-gray-600">Emission Factor</th>
                    <th className="text-right py-3 px-4 text-sm text-gray-600">CO₂e (kg)</th>
                    <th className="text-right py-3 px-4 text-sm text-gray-600">% of Total</th>
                  </tr>
                </thead>
                <tbody>
                  {section.activities.map((activity, actIdx) => (
                    <tr key={actIdx} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-700">{activity.activity}</td>
                      <td className="py-3 px-4 text-sm text-gray-600 text-right">{activity.data}</td>
                      <td className="py-3 px-4 text-sm text-gray-600 text-right">{activity.ef}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right">{activity.emission.toFixed(2)}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right">{activity.percent.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Methodology Panel */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6">
        <button
          onClick={() => setMethodologyExpanded(!methodologyExpanded)}
          className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
        >
          <h3 className="text-gray-900">LCA Methodology & Formulas</h3>
          {methodologyExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>
        {methodologyExpanded && (
          <div className="px-6 pb-6 space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700 mb-2"><strong>LCA Formula:</strong></p>
              <code className="text-sm text-blue-700">
                Total Emissions = Σ (Activity Data × Emission Factor)
              </code>
            </div>
            <div className="p-4 bg-emerald-50 rounded-lg">
              <p className="text-sm text-gray-700 mb-2"><strong>Normalization:</strong></p>
              <code className="text-sm text-emerald-700">
                Carbon Footprint = Total Emissions (kg CO₂e) / Output (kg carcass)
              </code>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700 mb-2"><strong>System Boundary:</strong></p>
                <p className="text-sm text-gray-600">Cradle-to-Gate: From raw material extraction (feed ingredients) through broiler farming to processing plant gate. Excludes distribution and consumption.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700 mb-2"><strong>Scopes Included:</strong></p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Scope 1: Direct emissions (fuel combustion, manure)</li>
                  <li>• Scope 2: Indirect energy (electricity grid)</li>
                  <li>• Scope 3: Upstream supply chain (feed ingredients)</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/30">
          <CheckCircle className="w-5 h-5" />
          Simpan Hasil
        </button>
        <button
          onClick={() => navigate('/mitigation-planner')}
          className="flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 border-2 border-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
        >
          <Target className="w-5 h-5" />
          Lihat Rekomendasi Mitigasi
        </button>
        <button
          onClick={() => navigate('/esg-report')}
          className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <FileText className="w-5 h-5" />
          Generate Laporan & Label
        </button>
      </div>
    </div>
  );
}
