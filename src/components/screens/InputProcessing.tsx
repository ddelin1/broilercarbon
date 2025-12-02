import { useState } from 'react';
import { Save, AlertCircle, Zap } from 'lucide-react';

export function InputProcessing() {
  const [formData, setFormData] = useState({
    rpaId: '',
    date: '',
    shift: '',
    frozenOutput: '',
    electricity: '',
    coolingPercent: '',
    diesel: '',
    nh3Leak: '',
    ldpe: '',
    pp: '',
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Calculate cooling energy
  const totalElectricity = parseFloat(formData.electricity) || 0;
  const coolingPercent = parseFloat(formData.coolingPercent) || 0;
  const coolingEnergy = totalElectricity * (coolingPercent / 100);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Input Processing (RPA)</h1>
        <p className="text-gray-600">Enter processing plant operation and resource data</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            {/* Basic Info */}
            <div className="mb-6">
              <h3 className="text-gray-900 mb-4">Processing Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    RPA ID
                  </label>
                  <input
                    type="text"
                    value={formData.rpaId}
                    onChange={(e) => handleChange('rpaId', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="RPA-XXX"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Shift
                  </label>
                  <select
                    value={formData.shift}
                    onChange={(e) => handleChange('shift', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Shift 1">Shift 1</option>
                    <option value="Shift 2">Shift 2</option>
                    <option value="Shift 3">Shift 3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Frozen Carcass Output (kg)
                  </label>
                  <input
                    type="number"
                    value={formData.frozenOutput}
                    onChange={(e) => handleChange('frozenOutput', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="0"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Energy Consumption */}
            <div className="mb-6">
              <h3 className="text-gray-900 mb-4">Energy Consumption</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Total Electricity (kWh)
                  </label>
                  <input
                    type="number"
                    value={formData.electricity}
                    onChange={(e) => handleChange('electricity', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="0"
                    min="0"
                    step="0.01"
                  />
                  <p className="text-xs text-gray-500 mt-1">All electrical consumption</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Cooling/Refrigeration (%)
                  </label>
                  <input
                    type="number"
                    value={formData.coolingPercent}
                    onChange={(e) => handleChange('coolingPercent', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="0-100"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Percentage for cooling systems</p>
                </div>
              </div>

              {/* Cooling Energy Display */}
              {coolingEnergy > 0 && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Cooling Energy Usage</p>
                      <p className="text-lg text-gray-900">{coolingEnergy.toFixed(2)} kWh</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">% of Total</p>
                      <p className="text-lg text-blue-600">{coolingPercent.toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Fuel & Refrigerant */}
            <div className="mb-6">
              <h3 className="text-gray-900 mb-4">Fuel & Refrigerant</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Diesel (L)
                  </label>
                  <input
                    type="number"
                    value={formData.diesel}
                    onChange={(e) => handleChange('diesel', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="0"
                    min="0"
                    step="0.01"
                  />
                  <p className="text-xs text-gray-500 mt-1">Generators & vehicles</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    NH₃ Refrigerant Leak (kg)
                  </label>
                  <input
                    type="number"
                    value={formData.nh3Leak}
                    onChange={(e) => handleChange('nh3Leak', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="0"
                    min="0"
                    step="0.001"
                  />
                  <p className="text-xs text-gray-500 mt-1">Estimated leakage rate</p>
                </div>
              </div>
            </div>

            {/* Packaging Materials */}
            <div className="mb-6">
              <h3 className="text-gray-900 mb-4">Packaging Materials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    LDPE Plastic (kg)
                  </label>
                  <input
                    type="number"
                    value={formData.ldpe}
                    onChange={(e) => handleChange('ldpe', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="0"
                    min="0"
                    step="0.01"
                  />
                  <p className="text-xs text-gray-500 mt-1">Low-density polyethylene</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    PP Plastic (kg)
                  </label>
                  <input
                    type="number"
                    value={formData.pp}
                    onChange={(e) => handleChange('pp', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="0"
                    min="0"
                    step="0.01"
                  />
                  <p className="text-xs text-gray-500 mt-1">Polypropylene</p>
                </div>
              </div>
            </div>

            {/* Calculated Metrics */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-gray-900 mb-3">Calculated Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 mb-1">Energy per kg output</p>
                  <p className="text-gray-900">
                    {formData.electricity && formData.frozenOutput 
                      ? (parseFloat(formData.electricity) / parseFloat(formData.frozenOutput)).toFixed(3)
                      : '—'} kWh/kg
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Packaging per kg output</p>
                  <p className="text-gray-900">
                    {formData.ldpe && formData.pp && formData.frozenOutput 
                      ? ((parseFloat(formData.ldpe) + parseFloat(formData.pp)) / parseFloat(formData.frozenOutput)).toFixed(3)
                      : '—'} kg/kg
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Cooling dominance</p>
                  <p className="text-gray-900">
                    {coolingPercent > 0 ? `${coolingPercent.toFixed(1)}%` : '—'}
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/30"
              >
                <Save className="w-5 h-5" />
                Simpan
              </button>
              {saved && (
                <div className="flex items-center gap-2 text-emerald-600">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">Data saved successfully!</span>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Energy Breakdown */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-start gap-3 mb-4">
              <Zap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-gray-900 mb-1">Energy Dominance</h3>
                <p className="text-sm text-gray-600">Processing operations</p>
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg border border-blue-300 mb-4">
              <p className="text-sm text-blue-700">
                <strong>⚡ Cooling energy dominates</strong> RPA emissions (~87.97% of total processing energy)
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-700">Cooling & Freezing</span>
                <span className="text-blue-600">~88%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Processing Equipment</span>
                <span className="text-gray-600">~8%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Lighting & Others</span>
                <span className="text-gray-600">~4%</span>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
            <h3 className="text-gray-900 mb-3">Mitigation Opportunities</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 mt-1">•</span>
                <span>Optimize cooling system efficiency (e.g., better insulation)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 mt-1">•</span>
                <span>Reduce refrigerant leakage through maintenance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 mt-1">•</span>
                <span>Use renewable energy for grid electricity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 mt-1">•</span>
                <span>Minimize packaging materials or use recycled alternatives</span>
              </li>
            </ul>
          </div>

          {/* Guidelines */}
          <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
            <h3 className="text-gray-900 mb-3">Data Guidelines</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-1">•</span>
                <span>Include all energy used during processing shift</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-1">•</span>
                <span>Cooling % should be estimated from facility data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-1">•</span>
                <span>Record actual packaging materials used</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}