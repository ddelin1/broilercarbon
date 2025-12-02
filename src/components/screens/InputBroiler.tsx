import { useState } from 'react';
import { Save, AlertCircle, Activity } from 'lucide-react';

export function InputBroiler() {
  const [formData, setFormData] = useState({
    farmId: '',
    flockPeriod: '',
    liveWeight: '',
    water: '',
    electricity: '',
    lpg: '',
    litter: '',
    wastetreatment: '',
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

  // Calculate biowaste impact
  const litterKg = parseFloat(formData.litter) || 0;
  const biowasteImpact = formData.wastetreatment === 'Biogas' ? 'Low' :
                         formData.wastetreatment === 'Compost' ? 'Medium' :
                         formData.wastetreatment === 'Stored' ? 'High' : 'Unknown';

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Input Broiler Farming</h1>
        <p className="text-gray-600">Enter farm operation and resource consumption data</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            {/* Basic Info */}
            <div className="mb-6">
              <h3 className="text-gray-900 mb-4">Farm Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Farm ID
                  </label>
                  <input
                    type="text"
                    value={formData.farmId}
                    onChange={(e) => handleChange('farmId', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="FARM-XXX"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Flock Period (days)
                  </label>
                  <input
                    type="number"
                    value={formData.flockPeriod}
                    onChange={(e) => handleChange('flockPeriod', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="35-42"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Live Weight Harvested (kg)
                  </label>
                  <input
                    type="number"
                    value={formData.liveWeight}
                    onChange={(e) => handleChange('liveWeight', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="0"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Resource Consumption */}
            <div className="mb-6">
              <h3 className="text-gray-900 mb-4">Resource Consumption</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Water (m³)
                  </label>
                  <input
                    type="number"
                    value={formData.water}
                    onChange={(e) => handleChange('water', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="0"
                    min="0"
                    step="0.01"
                  />
                  <p className="text-xs text-gray-500 mt-1">Total water used</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Electricity (kWh)
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
                  <p className="text-xs text-gray-500 mt-1">Lighting & ventilation</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    LPG (kg)
                  </label>
                  <input
                    type="number"
                    value={formData.lpg}
                    onChange={(e) => handleChange('lpg', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="0"
                    min="0"
                    step="0.01"
                  />
                  <p className="text-xs text-gray-500 mt-1">Heating fuel</p>
                </div>
              </div>
            </div>

            {/* Waste Management */}
            <div className="mb-6">
              <h3 className="text-gray-900 mb-4">Waste Management</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Litter/Manure (kg)
                  </label>
                  <input
                    type="number"
                    value={formData.litter}
                    onChange={(e) => handleChange('litter', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="0"
                    min="0"
                    step="0.01"
                  />
                  <p className="text-xs text-gray-500 mt-1">Total litter produced</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Waste Treatment Method
                  </label>
                  <select
                    value={formData.wastetreatment}
                    onChange={(e) => handleChange('wastetreatment', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="">Select Method</option>
                    <option value="Stored">Stored (Traditional)</option>
                    <option value="Compost">Composting</option>
                    <option value="Biogas">Biogas Conversion</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Primary treatment method</p>
                </div>
              </div>

              {/* Treatment Impact Indicator */}
              {formData.wastetreatment && (
                <div className={`mt-4 p-4 rounded-lg border ${
                  biowasteImpact === 'Low' ? 'bg-emerald-50 border-emerald-200' :
                  biowasteImpact === 'Medium' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-start gap-3">
                    <Activity className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      biowasteImpact === 'Low' ? 'text-emerald-600' :
                      biowasteImpact === 'Medium' ? 'text-yellow-600' :
                      'text-red-600'
                    }`} />
                    <div>
                      <p className={`text-sm ${
                        biowasteImpact === 'Low' ? 'text-emerald-700' :
                        biowasteImpact === 'Medium' ? 'text-yellow-700' :
                        'text-red-700'
                      }`}>
                        <strong>Emission Impact: {biowasteImpact}</strong>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {formData.wastetreatment === 'Biogas' && 'Biogas conversion significantly reduces CH₄ emissions and can generate renewable energy.'}
                        {formData.wastetreatment === 'Compost' && 'Composting reduces CH₄ emissions compared to storage, but still produces some N₂O.'}
                        {formData.wastetreatment === 'Stored' && 'Traditional storage produces high CH₄ and N₂O emissions from anaerobic decomposition.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Metrics */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-gray-900 mb-3">Calculated Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 mb-1">Water per kg live weight</p>
                  <p className="text-gray-900">
                    {formData.water && formData.liveWeight 
                      ? (parseFloat(formData.water) / parseFloat(formData.liveWeight)).toFixed(3)
                      : '—'} m³/kg
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Energy per kg live weight</p>
                  <p className="text-gray-900">
                    {formData.electricity && formData.liveWeight 
                      ? (parseFloat(formData.electricity) / parseFloat(formData.liveWeight)).toFixed(3)
                      : '—'} kWh/kg
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Litter per kg live weight</p>
                  <p className="text-gray-900">
                    {formData.litter && formData.liveWeight 
                      ? (parseFloat(formData.litter) / parseFloat(formData.liveWeight)).toFixed(3)
                      : '—'} kg/kg
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
          {/* Biowaste Impact Card */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
            <div className="flex items-start gap-3 mb-4">
              <Activity className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-gray-900 mb-1">Biowaste Impact</h3>
                <p className="text-sm text-gray-600">Treatment method comparison</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span className="text-sm text-gray-700">Biogas</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-emerald-200 rounded-full overflow-hidden">
                    <div className="w-1/4 h-full bg-emerald-600" />
                  </div>
                  <span className="text-xs text-emerald-600">Low</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span className="text-sm text-gray-700">Compost</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-yellow-200 rounded-full overflow-hidden">
                    <div className="w-2/4 h-full bg-yellow-600" />
                  </div>
                  <span className="text-xs text-yellow-600">Med</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span className="text-sm text-gray-700">Stored</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-red-200 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-red-600" />
                  </div>
                  <span className="text-xs text-red-600">High</span>
                </div>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-gray-900 mb-3">Data Guidelines</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Record all resources used during the entire flock period</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Live weight should be total harvested weight at end of cycle</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Choose waste treatment method that best represents your operation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Biogas treatment can reduce emissions by up to 70%</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
