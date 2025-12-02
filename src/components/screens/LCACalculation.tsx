import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, CheckCircle, Loader2, ChevronRight } from 'lucide-react';

export function LCACalculation() {
  const navigate = useNavigate();
  const [selectedBatch, setSelectedBatch] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);

  const batches = [
    { id: 'BATCH-2024-156', status: { feed: true, broiler: true, rpa: true } },
    { id: 'BATCH-2024-155', status: { feed: true, broiler: true, rpa: false } },
    { id: 'BATCH-2024-154', status: { feed: true, broiler: false, rpa: false } },
  ];

  const handleCalculate = () => {
    if (!selectedBatch) return;
    
    const batch = batches.find(b => b.id === selectedBatch);
    if (!batch || !batch.status.feed || !batch.status.broiler || !batch.status.rpa) {
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation
    setTimeout(() => {
      setIsCalculating(false);
      navigate('/lca-results');
    }, 2500);
  };

  const selectedBatchData = batches.find(b => b.id === selectedBatch);
  const canCalculate = selectedBatchData?.status.feed && 
                       selectedBatchData?.status.broiler && 
                       selectedBatchData?.status.rpa;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Perhitungan Jejak Karbon (LCA)</h1>
        <p className="text-gray-600">Calculate carbon footprint using Life Cycle Assessment methodology</p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Main Card */}
        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Calculator className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-center text-gray-900 mb-2">LCA Calculation Engine</h2>
          <p className="text-center text-gray-600 mb-8">
            Select a batch with complete data to calculate carbon footprint
          </p>

          {/* Batch Selector */}
          <div className="mb-8">
            <label className="block text-sm text-gray-700 mb-3">
              Select Batch ID
            </label>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-lg"
            >
              <option value="">-- Pilih Batch --</option>
              {batches.map(batch => (
                <option key={batch.id} value={batch.id}>
                  {batch.id}
                </option>
              ))}
            </select>
          </div>

          {/* Validation Status */}
          {selectedBatch && selectedBatchData && (
            <div className="mb-8 p-6 bg-gray-50 rounded-xl">
              <h3 className="text-gray-900 mb-4">Data Validation Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className={`w-5 h-5 ${selectedBatchData.status.feed ? 'text-emerald-600' : 'text-gray-300'}`} />
                    <span className="text-sm text-gray-700">Feed Production Data</span>
                  </div>
                  <span className={`text-sm ${selectedBatchData.status.feed ? 'text-emerald-600' : 'text-gray-500'}`}>
                    {selectedBatchData.status.feed ? 'Complete' : 'Missing'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className={`w-5 h-5 ${selectedBatchData.status.broiler ? 'text-emerald-600' : 'text-gray-300'}`} />
                    <span className="text-sm text-gray-700">Broiler Farming Data</span>
                  </div>
                  <span className={`text-sm ${selectedBatchData.status.broiler ? 'text-emerald-600' : 'text-gray-500'}`}>
                    {selectedBatchData.status.broiler ? 'Complete' : 'Missing'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className={`w-5 h-5 ${selectedBatchData.status.rpa ? 'text-emerald-600' : 'text-gray-300'}`} />
                    <span className="text-sm text-gray-700">Processing (RPA) Data</span>
                  </div>
                  <span className={`text-sm ${selectedBatchData.status.rpa ? 'text-emerald-600' : 'text-gray-500'}`}>
                    {selectedBatchData.status.rpa ? 'Complete' : 'Missing'}
                  </span>
                </div>
              </div>

              {!canCalculate && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-700">
                    ⚠️ All data sections must be complete before calculation
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            disabled={!canCalculate || isCalculating}
            className={`w-full flex items-center justify-center gap-3 py-4 rounded-lg transition-all ${
              canCalculate && !isCalculating
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/30'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isCalculating ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-lg">Menghitung emisi berdasarkan LCA...</span>
              </>
            ) : (
              <>
                <Calculator className="w-6 h-6" />
                <span className="text-lg">Hitung LCA</span>
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Info Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-gray-900 mb-4">LCA Methodology</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0" />
                <p>
                  <strong className="text-gray-700">System Boundary:</strong> Cradle-to-Gate (from raw material extraction to processing plant gate)
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0" />
                <p>
                  <strong className="text-gray-700">Scopes Included:</strong> Scope 1 (Direct emissions), Scope 2 (Indirect energy), Scope 3 (Upstream supply chain)
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0" />
                <p>
                  <strong className="text-gray-700">Functional Unit:</strong> kg CO₂e per kg frozen broiler carcass
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0" />
                <p>
                  <strong className="text-gray-700">Emission Factors:</strong> Based on IPCC 2021, Ecoinvent 3.8, and local grid emission factors
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-gray-900 mb-3">Calculation Process</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">1.</span>
                <span>Aggregate activity data from all subsystems</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">2.</span>
                <span>Apply emission factors to each activity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">3.</span>
                <span>Sum total emissions (kg CO₂e)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">4.</span>
                <span>Normalize by functional unit (output kg)</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
            <h3 className="text-gray-900 mb-3">Expected Outputs</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-1">•</span>
                <span>Total carbon footprint value</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-1">•</span>
                <span>Breakdown by subsystem (Feed/Broiler/RPA)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-1">•</span>
                <span>Comparison to baseline and target</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-1">•</span>
                <span>Status classification (LOW/MEDIUM/HIGH)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
