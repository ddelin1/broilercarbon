import { useState } from 'react';
import { FileText, Download, QrCode, CheckCircle, Send, Eye } from 'lucide-react';

export function ESGReport() {
  const [selectedBatch, setSelectedBatch] = useState('');

  const batches = [
    { id: 'BATCH-2024-156', emission: 3.34, score: 'A', auditStatus: 'Approved', auditor: 'ESG Auditor 1' },
    { id: 'BATCH-2024-155', emission: 3.52, score: 'B+', auditStatus: 'Pending Review', auditor: '—' },
    { id: 'BATCH-2024-154', emission: 3.67, score: 'B', auditStatus: 'Submitted', auditor: '—' },
    { id: 'BATCH-2024-153', emission: 3.28, score: 'A', auditStatus: 'Approved', auditor: 'ESG Auditor 2' },
    { id: 'BATCH-2024-152', emission: 3.89, score: 'C+', auditStatus: 'Rejected', auditor: 'ESG Auditor 1' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-emerald-100 text-emerald-700 border-emerald-300';
      case 'Pending Review': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Submitted': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'Rejected': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getScoreColor = (score: string) => {
    if (score.startsWith('A')) return 'text-emerald-600';
    if (score.startsWith('B')) return 'text-blue-600';
    return 'text-orange-600';
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Laporan & Label ESG</h1>
        <p className="text-gray-600">Generate ESG reports and carbon labels for certification</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Batch Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6">
            <h3 className="text-gray-900 mb-6">Batch Carbon Footprint Records</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Batch ID</th>
                    <th className="text-right py-3 px-4 text-sm text-gray-600">Emissions</th>
                    <th className="text-center py-3 px-4 text-sm text-gray-600">Score</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Audit Status</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Auditor</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {batches.map((batch, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                        selectedBatch === batch.id ? 'bg-emerald-50' : ''
                      }`}
                      onClick={() => setSelectedBatch(batch.id)}
                    >
                      <td className="py-3 px-4 text-sm text-gray-900">{batch.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right">
                        {batch.emission.toFixed(2)} kg CO₂e/kg
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`text-sm ${getScoreColor(batch.score)}`}>
                          {batch.score}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs border ${getStatusColor(batch.auditStatus)}`}>
                          {batch.auditStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{batch.auditor}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button className="text-emerald-600 hover:text-emerald-700 text-sm">
                            View
                          </button>
                          <span className="text-gray-300">|</span>
                          <button className="text-blue-600 hover:text-blue-700 text-sm">
                            Export
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Export Options */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-gray-900 mb-6">Generate Reports</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-emerald-600 hover:bg-emerald-50 transition-colors">
                <FileText className="w-6 h-6 text-emerald-600" />
                <div className="text-left">
                  <p className="text-sm text-gray-900">LCA Full Report</p>
                  <p className="text-xs text-gray-500">Detailed carbon footprint analysis</p>
                </div>
              </button>

              <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-emerald-600 hover:bg-emerald-50 transition-colors">
                <Download className="w-6 h-6 text-emerald-600" />
                <div className="text-left">
                  <p className="text-sm text-gray-900">ESG Summary</p>
                  <p className="text-xs text-gray-500">Executive summary for stakeholders</p>
                </div>
              </button>

              <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-emerald-600 hover:bg-emerald-50 transition-colors">
                <QrCode className="w-6 h-6 text-emerald-600" />
                <div className="text-left">
                  <p className="text-sm text-gray-900">Carbon Label QR</p>
                  <p className="text-xs text-gray-500">For product packaging</p>
                </div>
              </button>

              <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-emerald-600 hover:bg-emerald-50 transition-colors">
                <Send className="w-6 h-6 text-emerald-600" />
                <div className="text-left">
                  <p className="text-sm text-gray-900">Submit for Audit</p>
                  <p className="text-xs text-gray-500">Send to ESG auditor</p>
                </div>
              </button>
            </div>

            <div className="mt-6 flex gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/30">
                <Download className="w-5 h-5" />
                Export PDF
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <QrCode className="w-5 h-5" />
                Generate Label QR
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                <Send className="w-5 h-5" />
                Submit Audit Approval
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Carbon Label Preview */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm sticky top-8">
            <h3 className="text-gray-900 mb-6">Carbon Label Preview</h3>

            {selectedBatch ? (
              <div className="space-y-4">
                {/* Label Design */}
                <div className="border-2 border-emerald-600 rounded-xl p-6 bg-gradient-to-br from-white to-emerald-50">
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-full mb-3">
                      <span className="text-2xl text-white">🌿</span>
                    </div>
                    <h4 className="text-gray-900 mb-1">Carbon Footprint</h4>
                    <p className="text-xs text-gray-600">Certified Product Label</p>
                  </div>

                  <div className="bg-white rounded-lg p-4 mb-4 border border-emerald-200">
                    <div className="text-center mb-2">
                      <p className="text-3xl text-emerald-600">
                        {batches.find(b => b.id === selectedBatch)?.emission.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-600">kg CO₂e per kg product</p>
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className={`text-2xl ${getScoreColor(batches.find(b => b.id === selectedBatch)?.score || '')}`}>
                        {batches.find(b => b.id === selectedBatch)?.score}
                      </span>
                      <span className="text-xs text-gray-500">Rating</span>
                    </div>
                  </div>

                  {/* QR Code Placeholder */}
                  <div className="bg-white border-2 border-gray-300 rounded-lg p-4 flex items-center justify-center mb-4">
                    <div className="w-32 h-32 bg-gray-100 rounded flex items-center justify-center">
                      <QrCode className="w-16 h-16 text-gray-400" />
                    </div>
                  </div>

                  <div className="text-center text-xs text-gray-600">
                    <p className="mb-1">{selectedBatch}</p>
                    <p>Scan for detailed LCA report</p>
                  </div>
                </div>

                {/* Label Info */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="text-sm text-gray-900 mb-2">Label Information</h4>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p>• Cradle-to-Gate LCA</p>
                    <p>• ISO 14067:2018 compliant</p>
                    <p>• Verified by certified auditor</p>
                    <p>• Updated: Nov 30, 2025</p>
                  </div>
                </div>

                {/* Certification Status */}
                {batches.find(b => b.id === selectedBatch)?.auditStatus === 'Approved' && (
                  <div className="p-4 bg-emerald-50 rounded-lg border-2 border-emerald-600">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-emerald-700 mb-1">
                          <strong>Certified & Approved</strong>
                        </p>
                        <p className="text-xs text-gray-600">
                          Ready for commercial use
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Eye className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">Select a batch to preview label</p>
              </div>
            )}
          </div>

          {/* Info Card */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
            <h4 className="text-gray-900 mb-3">Carbon Label Benefits</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-1">✓</span>
                <span>Transparent carbon footprint disclosure</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-1">✓</span>
                <span>Build consumer trust and brand value</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-1">✓</span>
                <span>Meet regulatory requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-1">✓</span>
                <span>Support ESG reporting goals</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
