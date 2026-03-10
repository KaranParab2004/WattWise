import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts'

const Results = ({ onBack, extractedData }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const billAmount = parseFloat(extractedData?.amount || 6450)
  const powerRequirement = (billAmount / 1500).toFixed(2)
  const monthlyUnits = Math.round(billAmount / 8.5)
  const annualCost = billAmount * 12
  const annualSavings = Math.round(annualCost * 0.85)

  // Calculation data
  const calculationData = {
    annualConsumption: 35928,
    solarCapacity: 24.39,
    pureTariffPerKwh: 6.44,
    solarTariffPerKwh: 3.00,
    annualGridCost: 5816667,
    annualSolarCost: 2711187,
    savings: 3105480,
    savingsPercent: 53.4,
    systemCost: 24.39 * 75000,
  }

  // Chart data
  const monthlyConsumptionData = [
    { month: 'Jan', units: 758, cost: 6450 },
    { month: 'Feb', units: 720, cost: 6120 },
    { month: 'Mar', units: 810, cost: 6885 },
    { month: 'Apr', units: 890, cost: 7565 },
    { month: 'May', units: 920, cost: 7820 },
    { month: 'Jun', units: 880, cost: 7480 },
    { month: 'Jul', units: 790, cost: 6715 },
    { month: 'Aug', units: 770, cost: 6545 },
    { month: 'Sep', units: 800, cost: 6800 },
    { month: 'Oct', units: 850, cost: 7225 },
    { month: 'Nov', units: 780, cost: 6630 },
    { month: 'Dec', units: 760, cost: 6460 },
  ]

  const costBreakdownData = [
    { name: 'Energy Charges', value: 65, color: '#06b6d4' },
    { name: 'Fixed Charges', value: 15, color: '#3b82f6' },
    { name: 'Taxes & Duties', value: 12, color: '#f59e0b' },
    { name: 'Other Charges', value: 8, color: '#ef4444' },
  ]

  const energyCharges = Math.round(billAmount * 0.65)
  const fixedCharges = Math.round(billAmount * 0.15)
  const taxesDuties = Math.round(billAmount * 0.12)
  const otherCharges = Math.round(billAmount * 0.08)
  const totalSavings = Math.round(billAmount * 0.85)

  const annualSavingsValue = calculationData.savings
  const systemCostValue = calculationData.systemCost
  const paybackYears = systemCostValue && annualSavingsValue ? Math.ceil(systemCostValue / annualSavingsValue) : null

  const roiChartData = Array.from({ length: 25 }, (_, i) => ({
    year: i + 1,
    cumulativeSavings: annualSavingsValue * (i + 1),
    systemCost: systemCostValue
  }))

  const comparisonData = [
    { category: 'Monthly', grid: billAmount, solar: Math.round(billAmount * 0.15) },
    { category: 'Annual', grid: annualCost, solar: Math.round(annualCost * 0.15) },
    { category: '5 Years', grid: annualCost * 5, solar: Math.round(annualCost * 0.15 * 5) },
  ]

  const tariffSlabs = [
    { slab: '0-100 units', rate: '₹3.50', usage: 100, amount: 350 },
    { slab: '101-300 units', rate: '₹7.50', usage: 200, amount: 1500 },
    { slab: '301-500 units', rate: '₹10.50', usage: 200, amount: 2100 },
    { slab: '500+ units', rate: '₹12.00', usage: 258, amount: 3096 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b-4 border-primary">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <button
              onClick={onBack}
              className="px-6 py-3 bg-gray-100 border-2 border-gray-300 rounded-xl hover:border-primary hover:shadow-lg transition-all font-semibold"
            >
              ← Back
            </button>
            <div className="text-center">
              <div className="flex items-center gap-3 justify-center mb-2">
                <span className="text-4xl">☀️</span>
                <h1 className="text-3xl font-black bg-gradient-primary bg-clip-text text-transparent">
                  Solar Energy Report
                </h1>
              </div>
              <p className="text-sm text-gray-600">Generated on {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <span className="inline-block mt-2 px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold text-sm">
                Step 3 of 3
              </span>
            </div>
            <button className="px-6 py-3 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-lg transition-all">
              📥 Download PDF
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Executive Summary */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-l-8 border-primary">
          <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white">📋</span>
            Executive Summary
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Key Recommendation */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200">
              <p className="text-sm font-semibold text-gray-600 mb-2">RECOMMENDED SOLAR CAPACITY</p>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-6xl font-black bg-gradient-primary bg-clip-text text-transparent">{powerRequirement}</span>
                <span className="text-3xl font-bold text-gray-600 mb-2">kW</span>
              </div>
              <p className="text-sm text-gray-700">Based on monthly consumption of {monthlyUnits} kWh</p>
            </div>

            {/* Financial Highlight */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300">
              <p className="text-sm font-semibold text-gray-600 mb-2">ANNUAL SAVINGS POTENTIAL</p>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-6xl font-black text-green-600">₹{(calculationData.savings / 100000).toFixed(2)}</span>
                <span className="text-3xl font-bold text-gray-600 mb-2">Lakhs</span>
              </div>
              <div className="inline-block px-4 py-2 bg-green-600 text-white rounded-full font-bold">
                {calculationData.savingsPercent}% Cost Reduction
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-4 mt-6">
            {[
              { label: 'System Cost', value: `₹${(systemCostValue / 100000).toFixed(2)}L`, icon: '💰', color: 'amber' },
              { label: 'Payback Period', value: `${paybackYears} Years`, icon: '📅', color: 'blue' },
              { label: 'Annual Consumption', value: `${calculationData.annualConsumption.toLocaleString()} kWh`, icon: '⚡', color: 'cyan' },
              { label: 'CO₂ Reduction', value: '3.8 tons/year', icon: '🌍', color: 'green' },
            ].map((stat, index) => (
              <div key={index} className={`bg-${stat.color}-50 border-2 border-${stat.color}-200 rounded-lg p-4 text-center`}>
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
                <p className="text-lg font-black text-gray-800">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 1: Energy Analysis */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-3 border-b-2 border-gray-200 pb-4">
            <span className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">1</span>
            Energy Consumption Analysis
          </h2>

          {/* Key Metrics Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="border-2 border-cyan-200 rounded-xl p-6 bg-gradient-to-br from-cyan-50 to-blue-50">
              <p className="text-sm font-semibold text-gray-600 mb-2">Annual Consumption</p>
              <p className="text-4xl font-black text-primary mb-1">{calculationData.annualConsumption.toLocaleString()}</p>
              <p className="text-sm text-gray-600">units/year</p>
            </div>
            <div className="border-2 border-orange-200 rounded-xl p-6 bg-gradient-to-br from-orange-50 to-amber-50">
              <p className="text-sm font-semibold text-gray-600 mb-2">Grid Tariff</p>
              <p className="text-4xl font-black text-orange-600 mb-1">₹{calculationData.pureTariffPerKwh}</p>
              <p className="text-sm text-gray-600">per kWh</p>
            </div>
            <div className="border-2 border-green-200 rounded-xl p-6 bg-gradient-to-br from-green-50 to-emerald-50">
              <p className="text-sm font-semibold text-gray-600 mb-2">Solar Tariff</p>
              <p className="text-4xl font-black text-green-600 mb-1">₹{calculationData.solarTariffPerKwh}</p>
              <p className="text-sm text-gray-600">per kWh</p>
            </div>
          </div>

          {/* Monthly Pattern Chart */}
          <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
            <h3 className="text-lg font-bold mb-4">Monthly Consumption Pattern</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyConsumptionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '2px solid #06b6d4', borderRadius: '8px', fontSize: '12px' }}
                  cursor={{ fill: 'rgba(6, 182, 212, 0.1)' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="units" fill="#06b6d4" name="Units (kWh)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Section 2: Cost Analysis */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-3 border-b-2 border-gray-200 pb-4">
            <span className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">2</span>
            Cost & Savings Analysis
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Current Costs */}
            <div className="border-2 border-red-200 rounded-xl p-6 bg-gradient-to-br from-red-50 to-pink-50">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>⚡</span> Current Grid Costs
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Monthly Bill:</span>
                  <span className="font-bold text-lg">₹{billAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Annual Cost:</span>
                  <span className="font-bold text-lg">₹{calculationData.annualGridCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">25-Year Cost:</span>
                  <span className="font-bold text-lg text-red-600">₹{(calculationData.annualGridCost * 25 / 10000000).toFixed(2)} Cr</span>
                </div>
              </div>
            </div>

            {/* Solar Costs */}
            <div className="border-2 border-green-300 rounded-xl p-6 bg-gradient-to-br from-green-50 to-emerald-50">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>☀️</span> With Solar Energy
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">New Monthly Bill:</span>
                  <span className="font-bold text-lg">₹{(billAmount - totalSavings).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Annual Savings:</span>
                  <span className="font-bold text-lg text-green-600">₹{calculationData.savings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">25-Year Savings:</span>
                  <span className="font-bold text-lg text-green-600">₹{(calculationData.savings * 25 / 10000000).toFixed(2)} Cr</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cost Comparison Chart */}
          <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
            <h3 className="text-lg font-bold mb-4">Grid vs Solar Cost Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '2px solid #06b6d4', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(value) => `₹${value.toLocaleString()}`}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="grid" fill="#ef4444" name="Grid Cost" radius={[8, 8, 0, 0]} />
                <Bar dataKey="solar" fill="#10b981" name="Solar Cost" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Section 3: ROI Analysis */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-3 border-b-2 border-gray-200 pb-4">
            <span className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white">3</span>
            Return on Investment (ROI)
          </h2>

          {/* ROI Metrics */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="border-2 border-blue-200 rounded-xl p-6 bg-gradient-to-br from-blue-50 to-cyan-50 text-center">
              <p className="text-sm font-semibold text-gray-600 mb-2">System Cost</p>
              <p className="text-4xl font-black text-blue-600">₹{(systemCostValue / 100000).toFixed(2)}L</p>
            </div>
            <div className="border-2 border-amber-200 rounded-xl p-6 bg-gradient-to-br from-amber-50 to-orange-50 text-center">
              <p className="text-sm font-semibold text-gray-600 mb-2">Payback Period</p>
              <p className="text-4xl font-black text-amber-600">{paybackYears} Years</p>
            </div>
            <div className="border-2 border-green-200 rounded-xl p-6 bg-gradient-to-br from-green-50 to-emerald-50 text-center">
              <p className="text-sm font-semibold text-gray-600 mb-2">ROI (25 Years)</p>
              <p className="text-4xl font-black text-green-600">{((calculationData.savings * 25 / systemCostValue) * 100).toFixed(0)}%</p>
            </div>
          </div>

          {/* ROI Timeline */}
          <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
            <h3 className="text-lg font-bold mb-4">25-Year ROI Timeline</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={roiChartData} margin={{ top: 20, right: 60, left: 60, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="year" 
                  label={{ value: 'Years', position: 'insideBottom', offset: -10, fontSize: 12 }}
                  tick={{ fontSize: 11 }}
                />
                <YAxis 
                  label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft', fontSize: 12 }}
                  tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                  tick={{ fontSize: 11 }}
                  width={80}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '2px solid #06b6d4', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(value) => `₹${value.toLocaleString()}`}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line 
                  type="monotone" 
                  dataKey="cumulativeSavings" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  name="Cumulative Savings"
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="systemCost" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  name="System Cost"
                  dot={false}
                  strokeDasharray="5 5"
                />
                {paybackYears && paybackYears <= 25 && (
                  <ReferenceLine 
                    x={paybackYears} 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    strokeDasharray="3 3"
                    label={{ value: `Payback: ${paybackYears}Y`, position: 'top', fontSize: 11 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Section 4: System Specifications */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-3 border-b-2 border-gray-200 pb-4">
            <span className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white">4</span>
            Solar System Specifications
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: 'System Capacity', value: `${powerRequirement} kW`, icon: '⚡', desc: 'Total solar power generation' },
              { label: 'Panel Count', value: '12-14 panels', icon: '📱', desc: 'Estimated number of panels' },
              { label: 'Roof Space Required', value: '180-200 sq ft', icon: '🏠', desc: 'Approximate area needed' },
              { label: 'Daily Generation', value: `${(powerRequirement * 4).toFixed(1)} kWh`, icon: '☀️', desc: 'Average daily output' },
              { label: 'System Efficiency', value: '85%', icon: '📊', desc: 'Overall system efficiency' },
              { label: 'Warranty Period', value: '25 years', icon: '✅', desc: 'Panel performance warranty' },
            ].map((item, index) => (
              <div key={index} className="border-2 border-gray-200 rounded-xl p-6 hover:border-primary transition-all bg-gradient-to-br from-gray-50 to-white">
                <div className="text-4xl mb-3">{item.icon}</div>
                <p className="text-sm font-semibold text-gray-600 mb-1">{item.label}</p>
                <p className="text-2xl font-black text-gray-800 mb-2">{item.value}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Environmental Impact */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-3 border-b-2 border-gray-200 pb-4">
            <span className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">5</span>
            Environmental Impact
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🌳', value: '78 trees', label: 'Equivalent trees planted annually', color: 'green' },
              { icon: '🚗', value: '3.8 tons', label: 'CO₂ emissions reduced per year', color: 'blue' },
              { icon: '⛽', value: '1,680 L', label: 'Petrol equivalent saved annually', color: 'amber' },
            ].map((impact, index) => (
              <div key={index} className={`border-2 border-${impact.color}-200 rounded-xl p-8 text-center bg-gradient-to-br from-${impact.color}-50 to-white`}>
                <div className="text-6xl mb-4">{impact.icon}</div>
                <p className="text-3xl font-black text-gray-800 mb-2">{impact.value}</p>
                <p className="text-sm text-gray-600">{impact.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6 text-center">
            <p className="text-lg font-bold text-gray-800">
              🌍 By switching to solar, you'll contribute to a cleaner environment and reduce your carbon footprint significantly
            </p>
          </div>
        </div>

        {/* Section 6: Tariff Details */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-3 border-b-2 border-gray-200 pb-4">
            <span className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white">6</span>
            Current Tariff Breakdown
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gradient-primary text-white">
                  <th className="px-6 py-4 text-left font-bold">Usage Slab</th>
                  <th className="px-6 py-4 text-center font-bold">Rate per Unit</th>
                  <th className="px-6 py-4 text-center font-bold">Units Used</th>
                  <th className="px-6 py-4 text-right font-bold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {tariffSlabs.map((slab, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-200 ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <td className="px-6 py-4 font-semibold">{slab.slab}</td>
                    <td className="px-6 py-4 text-center font-bold text-primary">{slab.rate}</td>
                    <td className="px-6 py-4 text-center">{slab.usage}</td>
                    <td className="px-6 py-4 text-right font-bold">₹{slab.amount.toLocaleString()}</td>
                  </tr>
                ))}
                <tr className="bg-gradient-to-r from-cyan-100 to-blue-100 font-bold">
                  <td className="px-6 py-4" colSpan="2">TOTAL</td>
                  <td className="px-6 py-4 text-center">{monthlyUnits}</td>
                  <td className="px-6 py-4 text-right text-xl">₹{billAmount.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer / Next Steps */}
        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-xl p-8 text-white text-center">
          <h2 className="text-3xl font-black mb-4">Ready to Go Solar?</h2>
          <p className="text-lg mb-6 text-white/90">
            Start saving money and help the environment with clean solar energy
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-4 bg-white text-primary rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all">
              Get Detailed Quote
            </button>
            <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white border-2 border-white rounded-xl font-bold text-lg hover:bg-white/30 transition-all">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Results
