import { useState } from 'react';
import { Save, AlertCircle, TrendingUp } from 'lucide-react';

export function InputFeed() {
  const [formData, setFormData] = useState({
    batchId: '',
    date: '',
    feedMill: '',
    corn: '',
    soybeanMeal: '',
    wheatBran: '',
    riceBran: '',
    fishMeal: '',
    electricity: '',
    naturalGas: '',
    diesel: '',
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

  // Calculate estimated emission
  const soybeanMealKg = parseFloat(formData.soybeanMeal) || 0;
  const totalFeedKg = (
    (parseFloat(formData.corn) || 0) +
    soybeanMealKg +
    (parseFloat(formData.wheatBran) || 0) +
    (parseFloat(formData.riceBran) || 0) +
    (parseFloat(formData.fishMeal) || 0)
  );

  const estimatedEmission = totalFeedKg > 0 ? (soybeanMealKg / totalFeedKg * 100).toFixed(1) : '0';

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Input Feed Production</h1>
        <p className="text-gray-600">Enter feed composition and energy consumption data</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            {/* Basic Info */}
            <div className="mb-6">
              <h3 className="text-gray-900 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Batch ID
                  </label>
                  <input
                    type="text"
                    value={formData.batchId}
                    onChange={(e) => handleChange('batchId', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="BATCH-2024-XXX"
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
                    Feed Mill
                  </label>
                  <select
                    value={formData.feedMill}
                    onChange={(e) => handleChange('feedMill', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    required
                  >
                    <option value="">Select Mill</option>
                    <option value="Mill A">Mill A</option>
                    <option value="Mill B">Mill B</option>
                    <option value="Mill C">Mill C</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Feed Composition */}
            <div className="mb-6">
              <h3 className="text-gray-900 mb-4">Feed Composition (kg)</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Ingredient</th>
                      <th className="text-right py-3 px-4 text-sm text-gray-600">Amount (kg)</th>
                      <th className="text-right py-3 px-4 text-sm text-gray-600">Est. Contribution</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-700">Corn</td>
                      <td className="py-3 px-4">
                        <input
                          type="number"
                          value={formData.corn}
                          onChange={(e) => handleChange('corn', e.target.value)}
                          className="w-full text-right px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="0"
                          min="0"
                          step="0.01"
                        />
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500 text-right">~15%</td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-yellow-50">
                      <td className="py-3 px-4 text-sm text-gray-700">Soybean Meal</td>
                      <td className="py-3 px-4">
                        <input
                          type="number"
                          value={formData.soybeanMeal}
                          onChange={(e) => handleChange('soybeanMeal', e.target.value)}
                          className="w-full text-right px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="0"
                          min="0"
                          step="0.01"
                        />
                      </td>
                      <td className="py-3 px-4 text-sm text-yellow-700 text-right">~51% ⚠️</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-700">Wheat Bran</td>
                      <td className="py-3 px-4">
                        <input
                          type="number"
                          value={formData.wheatBran}
                          onChange={(e) => handleChange('wheatBran', e.target.value)}
                          className="w-full text-right px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="0"
                          min="0"
                          step="0.01"
                        />
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500 text-right">~8%</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-700">Rice Bran</td>
                      <td className="py-3 px-4">
                        <input
                          type="number"
                          value={formData.riceBran}
                          onChange={(e) => handleChange('riceBran', e.target.value)}
                          className="w-full text-right px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="0"
                          min="0"
                          step="0.01"
                        />
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500 text-right">~12%</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-700">Fish Meal</td>
                      <td className="py-3 px-4">
                        <input
                          type="number"
                          value={formData.fishMeal}
                          onChange={(e) => handleChange('fishMeal', e.target.value)}
                          className="w-full text-right px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="0"
                          min="0"
                          step="0.01"
                        />
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500 text-right">~14%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Energy & Transport */}
            <div className="mb-6">
              <h3 className="text-gray-900 mb-4">Energy & Transport</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Natural Gas (m³)
                  </label>
                  <input
                    type="number"
                    value={formData.naturalGas}
                    onChange={(e) => handleChange('naturalGas', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="0"
                    min="0"
                    step="0.01"
                  />
                </div>
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
                Simpan & Validasi
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
          {/* Emission Preview */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
            <div className="flex items-start gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-gray-900 mb-1">Emission Preview</h3>
                <p className="text-sm text-gray-600">Based on current inputs</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Soybean Meal Contribution</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl text-gray-900">{estimatedEmission}%</span>
                <span className="text-sm text-gray-500">of total feed</span>
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg border border-yellow-300">
              <p className="text-sm text-gray-700">
                <strong className="text-yellow-700">⚠️ High Contributor:</strong> Soybean meal is the highest emission contributor in feed production (~51% of total feed emissions)
              </p>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-gray-900 mb-3">Data Guidelines</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Enter actual measured quantities from production records</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>All feed ingredients should sum to total batch production</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Energy data includes all sources used in feed milling</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
