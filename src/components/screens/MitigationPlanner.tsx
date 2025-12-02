import { useState } from 'react';
import { Target, TrendingDown, Save, BarChart3 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export function MitigationPlanner() {
  const [soybeanSubstitution, setSoybeanSubstitution] = useState(0);
  const [litterBiogas, setLitterBiogas] = useState(0);
  const [coolingReduction, setCoolingReduction] = useState(0);

  // Baseline emissions
  const baselineSoybean = 1.10;
  const baselineManure = 0.70;
  const baselineCooling = 0.10;
  const baselineOther = 3.34 - baselineSoybean - baselineManure - baselineCooling;

  // Calculate reductions
  const soybeanReduction = baselineSoybean * (soybeanSubstitution / 100) * 0.6; // 60% reduction per % substitution
  const manureReduction = baselineManure * (litterBiogas / 100) * 0.7; // 70% reduction with biogas
  const coolingReductionAmount = baselineCooling * (coolingReduction / 100);

  // New emissions
  const newSoybean = baselineSoybean - soybeanReduction;
  const newManure = baselineManure - manureReduction;
  const newCooling = baselineCooling - coolingReductionAmount;

  const baselineTotal = 3.34;
  const newTotal = newSoybean + newManure + newCooling + baselineOther;
  const totalReduction = baselineTotal - newTotal;
  const reductionPercentage = (totalReduction / baselineTotal) * 100;

  const baselineData = [
    { name: 'Soybean Meal', value: baselineSoybean, color: '#10b981' },
    { name: 'Manure', value: baselineManure, color: '#14b8a6' },
    { name: 'Cooling', value: baselineCooling, color: '#0ea5e9' },
    { name: 'Other', value: baselineOther, color: '#6b7280' },
  ];

  const projectedData = [
    { name: 'Soybean Meal', value: newSoybean, color: '#10b981' },
    { name: 'Manure', value: newManure, color: '#14b8a6' },
    { name: 'Cooling', value: newCooling, color: '#0ea5e9' },
    { name: 'Other', value: baselineOther, color: '#6b7280' },
  ];

  const targetEmission = 3.3;
  const targetAchieved = newTotal <= targetEmission;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Mitigation Planner</h1>
        <p className="text-gray-600">Simulate emission reduction scenarios and plan mitigation strategies</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Soybean Substitution */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-gray-900 mb-1">Soybean Meal Substitution</h3>
                <p className="text-sm text-gray-600">Replace with alternative protein sources</p>
              </div>
              <div className="text-right">
                <p className="text-2xl text-emerald-600">{soybeanSubstitution}%</p>
                <p className="text-xs text-gray-500">substitution</p>
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={soybeanSubstitution}
              onChange={(e) => setSoybeanSubstitution(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />

            <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
              <span>0% (Current)</span>
              <span>100% (Full replacement)</span>
            </div>

            <div className="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">Current Emission:</span>
                <span className="text-sm text-gray-900">{baselineSoybean.toFixed(2)} kg CO₂e/kg</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">Projected Emission:</span>
                <span className="text-sm text-emerald-600">{newSoybean.toFixed(2)} kg CO₂e/kg</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Reduction:</span>
                <span className="text-sm text-emerald-600">-{soybeanReduction.toFixed(2)} kg CO₂e/kg</span>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <p><strong>Alternatives:</strong> Insect meal, algae protein, black soldier fly larvae, local protein sources</p>
            </div>
          </div>

          {/* Litter to Biogas */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-gray-900 mb-1">Litter Biogas Conversion</h3>
                <p className="text-sm text-gray-600">Convert manure to biogas instead of storage</p>
              </div>
              <div className="text-right">
                <p className="text-2xl text-emerald-600">{litterBiogas}%</p>
                <p className="text-xs text-gray-500">converted</p>
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              step="10"
              value={litterBiogas}
              onChange={(e) => setLitterBiogas(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />

            <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
              <span>0% (Storage)</span>
              <span>100% (Full biogas)</span>
            </div>

            <div className="mt-4 p-4 bg-teal-50 rounded-lg border border-teal-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">Current Emission:</span>
                <span className="text-sm text-gray-900">{baselineManure.toFixed(2)} kg CO₂e/kg</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">Projected Emission:</span>
                <span className="text-sm text-teal-600">{newManure.toFixed(2)} kg CO₂e/kg</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Reduction:</span>
                <span className="text-sm text-teal-600">-{manureReduction.toFixed(2)} kg CO₂e/kg</span>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <p><strong>Benefits:</strong> Reduces CH₄ by ~70%, generates renewable energy, produces fertilizer co-product</p>
            </div>
          </div>

          {/* Cooling Efficiency */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-gray-900 mb-1">Cooling Electricity Reduction</h3>
                <p className="text-sm text-gray-600">Improve cooling efficiency and insulation</p>
              </div>
              <div className="text-right">
                <p className="text-2xl text-emerald-600">{coolingReduction}%</p>
                <p className="text-xs text-gray-500">reduction</p>
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={coolingReduction}
              onChange={(e) => setCoolingReduction(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />

            <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
              <span>0% (Current)</span>
              <span>50% (Max feasible)</span>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">Current Emission:</span>
                <span className="text-sm text-gray-900">{baselineCooling.toFixed(2)} kg CO₂e/kg</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">Projected Emission:</span>
                <span className="text-sm text-blue-600">{newCooling.toFixed(2)} kg CO₂e/kg</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Reduction:</span>
                <span className="text-sm text-blue-600">-{coolingReductionAmount.toFixed(2)} kg CO₂e/kg</span>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <p><strong>Strategies:</strong> Better insulation, variable speed compressors, renewable energy, preventive maintenance</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/30">
              <Save className="w-5 h-5" />
              Simpan Skenario
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <BarChart3 className="w-5 h-5" />
              Bandingkan dengan Baseline
            </button>
          </div>
        </div>

        {/* Right Panel - Results */}
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200 sticky top-8">
            <div className="flex items-start gap-3 mb-4">
              <Target className="w-6 h-6 text-emerald-600 flex-shrink-0" />
              <div>
                <h3 className="text-gray-900 mb-1">Projected Results</h3>
                <p className="text-sm text-gray-600">With current settings</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <h2 className="text-3xl text-gray-900">{newTotal.toFixed(2)}</h2>
                <span className="text-gray-600">kg CO₂e/kg</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingDown className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-600">
                  -{totalReduction.toFixed(2)} kg CO₂e/kg ({reductionPercentage.toFixed(1)}% reduction)
                </span>
              </div>
            </div>

            {targetAchieved ? (
              <div className="p-4 bg-emerald-100 rounded-lg border-2 border-emerald-600 mb-4">
                <p className="text-sm text-emerald-700">
                  ✓ <strong>Target Achieved!</strong> Below {targetEmission} kg CO₂e/kg
                </p>
              </div>
            ) : (
              <div className="p-4 bg-yellow-100 rounded-lg border-2 border-yellow-600 mb-4">
                <p className="text-sm text-yellow-700">
                  ⚠️ <strong>Gap to target:</strong> {(newTotal - targetEmission).toFixed(2)} kg CO₂e/kg
                </p>
              </div>
            )}

            <div className="space-y-3 mb-6">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Baseline</span>
                  <span className="text-gray-900">{baselineTotal.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Projected</span>
                  <span className="text-emerald-600">{newTotal.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: `${(newTotal / baselineTotal) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Target</span>
                  <span className="text-gray-900">{targetEmission.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${(targetEmission / baselineTotal) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Mini Charts */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-600 mb-2 text-center">Baseline</p>
                <ResponsiveContainer width="100%" height={100}>
                  <PieChart>
                    <Pie
                      data={baselineData}
                      cx="50%"
                      cy="50%"
                      innerRadius={20}
                      outerRadius={35}
                      dataKey="value"
                    >
                      {baselineData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value.toFixed(2)}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white rounded-lg p-3 border border-emerald-200">
                <p className="text-xs text-gray-600 mb-2 text-center">Projected</p>
                <ResponsiveContainer width="100%" height={100}>
                  <PieChart>
                    <Pie
                      data={projectedData}
                      cx="50%"
                      cy="50%"
                      innerRadius={20}
                      outerRadius={35}
                      dataKey="value"
                    >
                      {projectedData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value.toFixed(2)}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
