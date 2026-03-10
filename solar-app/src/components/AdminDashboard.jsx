import { useState } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [showStateReports, setShowStateReports] = useState(false)
  const [selectedState, setSelectedState] = useState('Maharashtra')
  
  // Search and filter states
  const [userSearch, setUserSearch] = useState('')
  const [calcSearch, setCalcSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')

  // Dummy data for admin dashboard
  const stats = {
    totalUsers: 1247,
    activeCalculations: 89,
    completedInstallations: 456,
    totalRevenue: '₹2.4Cr',
    monthlyGrowth: '+12.5%',
    pendingQueries: 23,
    trends: {
      users: '+8.2%',
      calculations: '+15.3%',
      installations: '+12.5%',
      revenue: '+18.7%'
    }
  }

  // Activity data for charts
  const activityData = [
    { month: 'Jan', users: 98, calculations: 245, revenue: 18.5 },
    { month: 'Feb', users: 112, calculations: 289, revenue: 21.2 },
    { month: 'Mar', users: 124, calculations: 312, revenue: 24.8 },
    { month: 'Apr', users: 145, calculations: 356, revenue: 28.3 },
    { month: 'May', users: 167, calculations: 398, revenue: 32.1 },
    { month: 'Jun', users: 189, calculations: 445, revenue: 36.7 },
  ]

  // State-wise energy data (ready for backend integration)
  const stateEnergyData = {
    Maharashtra: {
      billsAnalyzed: 342,
      lastUpdated: '2024-03-07',
      traditional: {
        avgCost: '₹6.85',
        avgConsumption: '850 kWh/month',
        tariffSlabs: [
          { range: '0-100 units', rate: '₹3.50/kWh', avgUsers: 45 },
          { range: '101-300 units', rate: '₹7.50/kWh', avgUsers: 128 },
          { range: '301-500 units', rate: '₹10.50/kWh', avgUsers: 98 },
          { range: '500+ units', rate: '₹12.00/kWh', avgUsers: 71 },
        ],
        avgMonthlyBill: '₹5,822',
        avgAnnualCost: '₹69,864',
        peakDemandCharge: '₹250/kW',
        fixedCharges: '₹150/month',
        taxes: '12%',
      },
      solar: {
        avgSolarTariff: '₹3.20/kWh',
        avgSystemSize: '6.8 kW',
        avgInstallationCost: '₹5,10,000',
        avgAnnualSavings: '₹52,400',
        avgPaybackPeriod: '9.7 years',
        solarIrradiance: '1650 kWh/m²/year',
        subsidyAvailable: '₹78,000',
        avgROI: '10.3%',
      },
      policies: {
        netMetering: 'Available',
        netMeteringDetails: 'Up to 1 MW capacity for all consumer categories',
        subsidyScheme: 'PM-KUSUM & State Subsidy',
        residentialSubsidy: '₹14,588/kW (up to 3 kW), ₹7,294/kW (3-10 kW)',
        commercialIncentive: '30% capital subsidy for commercial buildings',
        taxBenefits: '80% exemption on electricity duty for 10 years',
        netMeteringValidity: '25 years',
        gridConnectivity: 'Simplified single-window clearance',
        additionalIncentives: [
          'Accelerated depreciation benefit',
          'Banking facility for excess generation',
          'Priority grid connectivity'
        ]
      },
      seasonal: {
        peakMonths: ['March', 'April', 'May'],
        lowMonths: ['July', 'August', 'September'],
        monthlyData: [
          { month: 'Jan', generation: 4.2, consumption: 820, savings: '₹4,180' },
          { month: 'Feb', generation: 4.8, consumption: 790, savings: '₹4,520' },
          { month: 'Mar', generation: 5.5, consumption: 850, savings: '₹5,240' },
          { month: 'Apr', generation: 5.8, consumption: 920, savings: '₹5,680' },
          { month: 'May', generation: 5.6, consumption: 980, savings: '₹5,520' },
          { month: 'Jun', generation: 4.5, consumption: 890, savings: '₹4,280' },
          { month: 'Jul', generation: 3.8, consumption: 860, savings: '₹3,620' },
          { month: 'Aug', generation: 3.5, consumption: 840, savings: '₹3,340' },
          { month: 'Sep', generation: 4.0, consumption: 820, savings: '₹3,820' },
          { month: 'Oct', generation: 4.6, consumption: 850, savings: '₹4,380' },
          { month: 'Nov', generation: 4.4, consumption: 810, savings: '₹4,200' },
          { month: 'Dec', generation: 4.1, consumption: 800, savings: '₹3,920' },
        ],
        bestInstallationMonths: ['October', 'November', 'December'],
        monsoonImpact: 'Moderate - 25-30% reduction during monsoon months'
      }
    },
    Rajasthan: {
      billsAnalyzed: 289,
      lastUpdated: '2024-03-07',
      traditional: {
        avgCost: '₹5.95',
        avgConsumption: '920 kWh/month',
        tariffSlabs: [
          { range: '0-100 units', rate: '₹3.00/kWh', avgUsers: 52 },
          { range: '101-300 units', rate: '₹6.50/kWh', avgUsers: 115 },
          { range: '301-500 units', rate: '₹9.00/kWh', avgUsers: 82 },
          { range: '500+ units', rate: '₹10.50/kWh', avgUsers: 40 },
        ],
        avgMonthlyBill: '₹5,474',
        avgAnnualCost: '₹65,688',
        peakDemandCharge: '₹220/kW',
        fixedCharges: '₹120/month',
        taxes: '10%',
      },
      solar: {
        avgSolarTariff: '₹2.80/kWh',
        avgSystemSize: '7.2 kW',
        avgInstallationCost: '₹5,40,000',
        avgAnnualSavings: '₹58,200',
        avgPaybackPeriod: '9.3 years',
        solarIrradiance: '1850 kWh/m²/year',
        subsidyAvailable: '₹82,000',
        avgROI: '10.8%',
      },
      policies: {
        netMetering: 'Available',
        netMeteringDetails: 'Up to 500 kW for residential, unlimited for commercial',
        subsidyScheme: 'Rajasthan Solar Energy Policy 2023',
        residentialSubsidy: '₹15,000/kW (up to 3 kW), ₹7,500/kW (3-10 kW)',
        commercialIncentive: '25% capital subsidy + 5-year tax holiday',
        taxBenefits: '100% exemption on electricity duty for 12 years',
        netMeteringValidity: '25 years',
        gridConnectivity: 'Fast-track approval within 15 days',
        additionalIncentives: [
          'Land allocation at concessional rates',
          'Wheeling and banking charges waived',
          'Stamp duty exemption on land purchase'
        ]
      },
      seasonal: {
        peakMonths: ['April', 'May', 'June'],
        lowMonths: ['December', 'January', 'February'],
        monthlyData: [
          { month: 'Jan', generation: 4.5, consumption: 880, savings: '₹4,280' },
          { month: 'Feb', generation: 5.2, consumption: 900, savings: '₹4,960' },
          { month: 'Mar', generation: 6.0, consumption: 940, savings: '₹5,740' },
          { month: 'Apr', generation: 6.5, consumption: 1020, savings: '₹6,240' },
          { month: 'May', generation: 6.8, consumption: 1100, savings: '₹6,540' },
          { month: 'Jun', generation: 6.2, consumption: 980, savings: '₹5,960' },
          { month: 'Jul', generation: 5.5, consumption: 920, savings: '₹5,280' },
          { month: 'Aug', generation: 5.2, consumption: 900, savings: '₹4,990' },
          { month: 'Sep', generation: 5.6, consumption: 890, savings: '₹5,370' },
          { month: 'Oct', generation: 5.8, consumption: 910, savings: '₹5,560' },
          { month: 'Nov', generation: 5.0, consumption: 870, savings: '₹4,800' },
          { month: 'Dec', generation: 4.4, consumption: 850, savings: '₹4,220' },
        ],
        bestInstallationMonths: ['September', 'October', 'November'],
        monsoonImpact: 'Low - 15-20% reduction, excellent year-round generation'
      }
    },
    'Himachal Pradesh': {
      billsAnalyzed: 156,
      lastUpdated: '2024-03-06',
      traditional: {
        avgCost: '₹4.85',
        avgConsumption: '680 kWh/month',
        tariffSlabs: [
          { range: '0-100 units', rate: '₹2.50/kWh', avgUsers: 68 },
          { range: '101-300 units', rate: '₹5.50/kWh', avgUsers: 54 },
          { range: '301-500 units', rate: '₹7.50/kWh', avgUsers: 24 },
          { range: '500+ units', rate: '₹9.00/kWh', avgUsers: 10 },
        ],
        avgMonthlyBill: '₹3,298',
        avgAnnualCost: '₹39,576',
        peakDemandCharge: '₹180/kW',
        fixedCharges: '₹100/month',
        taxes: '8%',
      },
      solar: {
        avgSolarTariff: '₹3.50/kWh',
        avgSystemSize: '5.4 kW',
        avgInstallationCost: '₹4,05,000',
        avgAnnualSavings: '₹28,400',
        avgPaybackPeriod: '14.3 years',
        solarIrradiance: '1550 kWh/m²/year',
        subsidyAvailable: '₹65,000',
        avgROI: '7.0%',
      },
      policies: {
        netMetering: 'Available',
        netMeteringDetails: 'Up to 1 MW for all categories',
        subsidyScheme: 'HP Solar Power Policy 2022',
        residentialSubsidy: '₹18,000/kW (up to 3 kW), ₹9,000/kW (3-10 kW)',
        commercialIncentive: '20% capital subsidy for hill areas',
        taxBenefits: '90% exemption on electricity duty for 15 years',
        netMeteringValidity: '25 years',
        gridConnectivity: 'Priority connectivity in remote areas',
        additionalIncentives: [
          'Additional 10% subsidy for hill districts',
          'Free technical consultation',
          'Soft loans at 5% interest rate'
        ]
      },
      seasonal: {
        peakMonths: ['May', 'June', 'July'],
        lowMonths: ['November', 'December', 'January'],
        monthlyData: [
          { month: 'Jan', generation: 3.2, consumption: 620, savings: '₹2,050' },
          { month: 'Feb', generation: 3.8, consumption: 640, savings: '₹2,440' },
          { month: 'Mar', generation: 4.5, consumption: 680, savings: '₹2,890' },
          { month: 'Apr', generation: 5.0, consumption: 720, savings: '₹3,210' },
          { month: 'May', generation: 5.4, consumption: 760, savings: '₹3,470' },
          { month: 'Jun', generation: 5.2, consumption: 740, savings: '₹3,340' },
          { month: 'Jul', generation: 4.8, consumption: 710, savings: '₹3,080' },
          { month: 'Aug', generation: 4.5, consumption: 690, savings: '₹2,890' },
          { month: 'Sep', generation: 4.2, consumption: 670, savings: '₹2,700' },
          { month: 'Oct', generation: 3.9, consumption: 650, savings: '₹2,500' },
          { month: 'Nov', generation: 3.4, consumption: 630, savings: '₹2,180' },
          { month: 'Dec', generation: 3.0, consumption: 610, savings: '₹1,920' },
        ],
        bestInstallationMonths: ['March', 'April', 'September'],
        monsoonImpact: 'Moderate - 20-25% reduction, snow impact in winter'
      }
    },
    Gujarat: {
      billsAnalyzed: 412,
      lastUpdated: '2024-03-07',
      traditional: {
        avgCost: '₹6.25',
        avgConsumption: '890 kWh/month',
        tariffSlabs: [
          { range: '0-100 units', rate: '₹3.20/kWh', avgUsers: 58 },
          { range: '101-300 units', rate: '₹7.00/kWh', avgUsers: 142 },
          { range: '301-500 units', rate: '₹9.50/kWh', avgUsers: 128 },
          { range: '500+ units', rate: '₹11.00/kWh', avgUsers: 84 },
        ],
        avgMonthlyBill: '₹5,562',
        avgAnnualCost: '₹66,750',
        peakDemandCharge: '₹240/kW',
        fixedCharges: '₹140/month',
        taxes: '11%',
      },
      solar: {
        avgSolarTariff: '₹2.90/kWh',
        avgSystemSize: '7.0 kW',
        avgInstallationCost: '₹5,25,000',
        avgAnnualSavings: '₹56,800',
        avgPaybackPeriod: '9.2 years',
        solarIrradiance: '1800 kWh/m²/year',
        subsidyAvailable: '₹80,000',
        avgROI: '10.8%',
      },
      policies: {
        netMetering: 'Available',
        netMeteringDetails: 'Up to 5 MW for all consumer categories',
        subsidyScheme: 'Gujarat Solar Power Policy 2021',
        residentialSubsidy: '₹16,000/kW (up to 3 kW), ₹8,000/kW (3-10 kW)',
        commercialIncentive: '35% capital subsidy + SGST reimbursement',
        taxBenefits: '100% exemption on electricity duty for 10 years',
        netMeteringValidity: '25 years',
        gridConnectivity: 'Online single-window clearance within 7 days',
        additionalIncentives: [
          'Virtual net metering for group housing',
          'Gross metering option available',
          'Dedicated solar parks with infrastructure'
        ]
      },
      seasonal: {
        peakMonths: ['March', 'April', 'May'],
        lowMonths: ['July', 'August'],
        monthlyData: [
          { month: 'Jan', generation: 4.8, consumption: 860, savings: '₹4,420' },
          { month: 'Feb', generation: 5.4, consumption: 880, savings: '₹4,970' },
          { month: 'Mar', generation: 6.2, consumption: 920, savings: '₹5,710' },
          { month: 'Apr', generation: 6.6, consumption: 980, savings: '₹6,090' },
          { month: 'May', generation: 6.4, consumption: 1020, savings: '₹5,900' },
          { month: 'Jun', generation: 5.8, consumption: 940, savings: '₹5,340' },
          { month: 'Jul', generation: 5.0, consumption: 900, savings: '₹4,610' },
          { month: 'Aug', generation: 4.8, consumption: 880, savings: '₹4,420' },
          { month: 'Sep', generation: 5.2, consumption: 870, savings: '₹4,790' },
          { month: 'Oct', generation: 5.6, consumption: 890, savings: '₹5,160' },
          { month: 'Nov', generation: 5.2, consumption: 850, savings: '₹4,790' },
          { month: 'Dec', generation: 4.6, consumption: 830, savings: '₹4,240' },
        ],
        bestInstallationMonths: ['October', 'November', 'December'],
        monsoonImpact: 'Low - 18-22% reduction, excellent solar potential'
      }
    }
  }

  const currentStateData = stateEnergyData[selectedState]

  const recentUsers = [
    { id: 1, name: 'Amit Sharma', email: 'amit@example.com', date: '2024-03-07', status: 'Active' },
    { id: 2, name: 'Priya Patel', email: 'priya@example.com', date: '2024-03-06', status: 'Active' },
    { id: 3, name: 'Rahul Kumar', email: 'rahul@example.com', date: '2024-03-06', status: 'Pending' },
    { id: 4, name: 'Sneha Reddy', email: 'sneha@example.com', date: '2024-03-05', status: 'Active' },
    { id: 5, name: 'Vikram Singh', email: 'vikram@example.com', date: '2024-03-05', status: 'Completed' },
  ]

  const recentCalculations = [
    { id: 1, user: 'Amit Sharma', capacity: '5.2 kW', savings: '₹65,400', date: '2024-03-07', status: 'Completed' },
    { id: 2, user: 'Priya Patel', capacity: '8.5 kW', savings: '₹1,12,000', date: '2024-03-06', status: 'In Progress' },
    { id: 3, user: 'Rahul Kumar', capacity: '24.39 kW', savings: '₹3,10,548', date: '2024-03-06', status: 'Completed' },
    { id: 4, user: 'Sneha Reddy', capacity: '3.8 kW', savings: '₹48,200', date: '2024-03-05', status: 'Completed' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-4xl">☀️</span>
            <div>
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                WattWise Admin
              </span>
              <p className="text-xs text-gray-500">Administrator Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-700">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-black mb-2">Welcome back, {user.name}! 👋</h1>
          <p className="text-gray-600">Here's what's happening with your solar platform today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            { icon: '👥', label: 'Total Users', value: stats.totalUsers, color: 'cyan', trend: stats.trends.users, isPositive: true },
            { icon: '⚡', label: 'Active Calculations', value: stats.activeCalculations, color: 'blue', trend: stats.trends.calculations, isPositive: true },
            { icon: '✅', label: 'Completed Installations', value: stats.completedInstallations, color: 'green', trend: stats.trends.installations, isPositive: true },
            { icon: '💰', label: 'Total Revenue', value: stats.totalRevenue, color: 'amber', trend: stats.trends.revenue, isPositive: true },
            { icon: '📊', label: 'Monthly Growth', value: stats.monthlyGrowth, color: 'purple', trend: 'vs last month', isPositive: true },
            { icon: '❓', label: 'Pending Queries', value: stats.pendingQueries, color: 'red', trend: '-5 from yesterday', isPositive: true },
          ].map((stat, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 border-2 border-${stat.color}-200 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="text-4xl">{stat.icon}</div>
                <span className={`text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1 ${
                  stat.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {stat.isPositive ? '↗' : '↘'} {stat.trend}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex border-b border-gray-200">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'users', label: 'Users', icon: '👥' },
              { id: 'calculations', label: 'Calculations', icon: '⚡' },
              { id: 'settings', label: 'Settings', icon: '⚙️' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-primary text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Activity Charts */}
                <div>
                  <h3 className="text-2xl font-black mb-4">📈 Activity Trends</h3>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* User Growth Chart */}
                    <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                      <h4 className="font-bold text-gray-700 mb-4">User Growth (6 Months)</h4>
                      <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={activityData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                          <YAxis tick={{ fontSize: 12 }} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#fff', border: '2px solid #06b6d4', borderRadius: '8px', fontSize: '12px' }}
                          />
                          <Line type="monotone" dataKey="users" stroke="#06b6d4" strokeWidth={3} dot={{ fill: '#06b6d4', r: 5 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Revenue Chart */}
                    <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                      <h4 className="font-bold text-gray-700 mb-4">Revenue Trend (Lakhs)</h4>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={activityData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                          <YAxis tick={{ fontSize: 12 }} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#fff', border: '2px solid #10b981', borderRadius: '8px', fontSize: '12px' }}
                            formatter={(value) => `₹${value}L`}
                          />
                          <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-black mb-4">📊 Platform Analytics</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl border-2 border-cyan-200">
                      <h4 className="font-bold text-gray-700 mb-3">User Growth</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">This Month:</span>
                          <span className="font-bold">+124 users</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Last Month:</span>
                          <span className="font-bold">+98 users</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Growth Rate:</span>
                          <span className="font-bold text-green-600">+26.5%</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                      <h4 className="font-bold text-gray-700 mb-3">Revenue Insights</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">This Month:</span>
                          <span className="font-bold">₹24.5L</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Last Month:</span>
                          <span className="font-bold">₹21.8L</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Growth:</span>
                          <span className="font-bold text-green-600">+12.4%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-black mb-4">🎯 Quick Actions</h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    {[
                      { icon: '➕', label: 'Add User', color: 'cyan', action: () => {} },
                      { icon: '📊', label: 'State Reports', color: 'blue', action: () => setShowStateReports(true) },
                      { icon: '📈', label: 'Generate Report', color: 'green', action: () => {} },
                      { icon: '⚙️', label: 'System Settings', color: 'amber', action: () => {} },
                    ].map((action, index) => (
                      <button
                        key={index}
                        onClick={action.action}
                        className={`p-4 bg-${action.color}-50 border-2 border-${action.color}-200 rounded-xl hover:shadow-lg transition-all hover:-translate-y-1`}
                      >
                        <div className="text-3xl mb-2">{action.icon}</div>
                        <p className="font-semibold text-gray-700">{action.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-black">👥 Recent Users</h3>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                      📥 Export CSV
                    </button>
                    <button className="px-4 py-2 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                      + Add New User
                    </button>
                  </div>
                </div>

                {/* Search and Filters */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by name or email..."
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      className="w-full px-4 py-3 pl-10 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none font-semibold"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none font-semibold"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>

                <div className="overflow-x-auto bg-white rounded-xl border-2 border-gray-200">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-primary text-white">
                        <th className="px-6 py-4 text-left rounded-tl-xl">Name</th>
                        <th className="px-6 py-4 text-left">Email</th>
                        <th className="px-6 py-4 text-center">Join Date</th>
                        <th className="px-6 py-4 text-center">Status</th>
                        <th className="px-6 py-4 text-center rounded-tr-xl">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers
                        .filter(user => 
                          (userSearch === '' || 
                           user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
                           user.email.toLowerCase().includes(userSearch.toLowerCase())) &&
                          (statusFilter === 'all' || user.status.toLowerCase() === statusFilter)
                        )
                        .map((user, index) => (
                        <tr
                          key={user.id}
                          className={`border-b border-gray-200 ${
                            index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                          } hover:bg-cyan-50 transition-colors`}
                        >
                          <td className="px-6 py-4 font-semibold">{user.name}</td>
                          <td className="px-6 py-4 text-gray-600">{user.email}</td>
                          <td className="px-6 py-4 text-center text-sm">{user.date}</td>
                          <td className="px-6 py-4 text-center">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                user.status === 'Active'
                                  ? 'bg-green-100 text-green-700'
                                  : user.status === 'Pending'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-blue-100 text-blue-700'
                              }`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button className="text-primary hover:underline font-semibold mr-3">
                              View
                            </button>
                            <button className="text-red-500 hover:underline font-semibold">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Calculations Tab */}
            {activeTab === 'calculations' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-black">⚡ Recent Calculations</h3>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                    📥 Export Data
                  </button>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by user name..."
                      value={calcSearch}
                      onChange={(e) => setCalcSearch(e.target.value)}
                      className="w-full px-4 py-3 pl-10 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                  </div>
                </div>

                <div className="overflow-x-auto bg-white rounded-xl border-2 border-gray-200">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-primary text-white">
                        <th className="px-6 py-4 text-left rounded-tl-xl">User</th>
                        <th className="px-6 py-4 text-center">Capacity</th>
                        <th className="px-6 py-4 text-center">Annual Savings</th>
                        <th className="px-6 py-4 text-center">Date</th>
                        <th className="px-6 py-4 text-center">Status</th>
                        <th className="px-6 py-4 text-center rounded-tr-xl">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentCalculations
                        .filter(calc => 
                          calcSearch === '' || 
                          calc.user.toLowerCase().includes(calcSearch.toLowerCase())
                        )
                        .map((calc, index) => (
                        <tr
                          key={calc.id}
                          className={`border-b border-gray-200 ${
                            index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                          } hover:bg-cyan-50 transition-colors`}
                        >
                          <td className="px-6 py-4 font-semibold">{calc.user}</td>
                          <td className="px-6 py-4 text-center font-bold text-primary">{calc.capacity}</td>
                          <td className="px-6 py-4 text-center font-bold text-green-600">{calc.savings}</td>
                          <td className="px-6 py-4 text-center text-sm">{calc.date}</td>
                          <td className="px-6 py-4 text-center">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                calc.status === 'Completed'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}
                            >
                              {calc.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button className="text-primary hover:underline font-semibold mr-3">
                              View Details
                            </button>
                            <button className="text-blue-500 hover:underline font-semibold">
                              Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-black mb-4">⚙️ System Settings</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl border-2 border-cyan-200">
                    <h4 className="font-bold text-gray-700 mb-4">Default Configuration</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Solar Irradiance (kWh/m²/year)
                        </label>
                        <input
                          type="number"
                          defaultValue="1650"
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Solar Tariff (₹/kWh)
                        </label>
                        <input
                          type="number"
                          defaultValue="3.00"
                          step="0.01"
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Transmission Loss (%)
                        </label>
                        <input
                          type="number"
                          defaultValue="12"
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                    <h4 className="font-bold text-gray-700 mb-4">Email Notifications</h4>
                    <div className="space-y-3">
                      {[
                        'New user registrations',
                        'Calculation completions',
                        'System alerts',
                        'Weekly reports',
                      ].map((option, index) => (
                        <label key={index} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="w-5 h-5 text-primary rounded focus:ring-primary"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <button className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:border-primary transition-all">
                    Reset to Default
                  </button>
                  <button className="px-6 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* State Reports Modal */}
      {showStateReports && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header - Report Style */}
            <div className="sticky top-0 bg-white border-b-4 border-primary shadow-md z-10">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-5xl">☀️</span>
                      <div>
                        <h2 className="text-3xl font-black bg-gradient-primary bg-clip-text text-transparent">
                          State Energy Analysis Report
                        </h2>
                        <p className="text-sm text-gray-600">Comprehensive Energy Data by State</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowStateReports(false)}
                    className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* State Selector & Report Info */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="relative">
                    <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">
                      Select State
                    </label>
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-all appearance-none bg-white font-semibold text-gray-800 cursor-pointer"
                    >
                      {Object.keys(stateEnergyData).map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-10 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-lg border-2 border-cyan-200">
                    <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Bills Analyzed</p>
                    <p className="text-3xl font-black text-primary">{currentStateData.billsAnalyzed}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border-2 border-purple-200">
                    <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Last Updated</p>
                    <p className="text-lg font-bold text-gray-800">{currentStateData.lastUpdated}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Report Date */}
              <div className="text-right text-sm text-gray-500 mb-6">
                Report Generated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>

              {/* Section 1: Traditional Energy Analysis */}
              <div className="mb-8 bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4">
                  <h3 className="text-2xl font-black flex items-center gap-2">
                    <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">1</span>
                    Traditional Energy Supplier Analysis
                  </h3>
                </div>
                
                <div className="p-6">
                  {/* Key Metrics */}
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
                      <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Avg Cost per kWh</p>
                      <p className="text-3xl font-black text-red-600">{currentStateData.traditional.avgCost}</p>
                    </div>
                    <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg">
                      <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Avg Monthly Bill</p>
                      <p className="text-3xl font-black text-orange-600">{currentStateData.traditional.avgMonthlyBill}</p>
                    </div>
                    <div className="border-l-4 border-amber-500 bg-amber-50 p-4 rounded-r-lg">
                      <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Avg Annual Cost</p>
                      <p className="text-3xl font-black text-amber-600">{currentStateData.traditional.avgAnnualCost}</p>
                    </div>
                  </div>

                  {/* Tariff Slabs Table */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-3">Tariff Structure</h4>
                    <div className="overflow-hidden rounded-lg border-2 border-gray-200">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Usage Range</th>
                            <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Rate</th>
                            <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Avg Users</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentStateData.traditional.tariffSlabs.map((slab, index) => (
                            <tr key={index} className={`border-t ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                              <td className="px-4 py-3 font-semibold text-gray-800">{slab.range}</td>
                              <td className="px-4 py-3 text-center font-bold text-red-600">{slab.rate}</td>
                              <td className="px-4 py-3 text-center text-gray-700">{slab.avgUsers} users</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Additional Metrics */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Avg Consumption</p>
                      <p className="text-xl font-black text-gray-800">{currentStateData.traditional.avgConsumption}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Peak Demand Charge</p>
                      <p className="text-xl font-black text-gray-800">{currentStateData.traditional.peakDemandCharge}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Fixed Charges</p>
                      <p className="text-xl font-black text-gray-800">{currentStateData.traditional.fixedCharges}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Solar Energy Analysis */}
              <div className="mb-8 bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4">
                  <h3 className="text-2xl font-black flex items-center gap-2">
                    <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">2</span>
                    Solar Energy Analysis
                  </h3>
                </div>
                
                <div className="p-6">
                  {/* Key Metrics */}
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
                      <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Avg Solar Tariff</p>
                      <p className="text-3xl font-black text-green-600">{currentStateData.solar.avgSolarTariff}</p>
                    </div>
                    <div className="border-l-4 border-emerald-500 bg-emerald-50 p-4 rounded-r-lg">
                      <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Avg System Size</p>
                      <p className="text-3xl font-black text-emerald-600">{currentStateData.solar.avgSystemSize}</p>
                    </div>
                    <div className="border-l-4 border-teal-500 bg-teal-50 p-4 rounded-r-lg">
                      <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Avg Installation Cost</p>
                      <p className="text-3xl font-black text-teal-600">{currentStateData.solar.avgInstallationCost}</p>
                    </div>
                  </div>

                  {/* Detailed Metrics */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-3">Financial Performance</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-semibold text-gray-700">Annual Savings:</span>
                          <span className="font-black text-green-600 text-xl">{currentStateData.solar.avgAnnualSavings}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-semibold text-gray-700">Payback Period:</span>
                          <span className="font-black text-amber-600 text-xl">{currentStateData.solar.avgPaybackPeriod}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-semibold text-gray-700">Average ROI:</span>
                          <span className="font-black text-green-600 text-xl">{currentStateData.solar.avgROI}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-semibold text-gray-700">Subsidy Available:</span>
                          <span className="font-black text-blue-600 text-xl">{currentStateData.solar.subsidyAvailable}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-3">Technical Specifications</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-semibold text-gray-700">Solar Irradiance:</span>
                          <span className="font-black text-amber-600 text-xl">{currentStateData.solar.solarIrradiance}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-semibold text-gray-700">System Size:</span>
                          <span className="font-black text-primary text-xl">{currentStateData.solar.avgSystemSize}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-semibold text-gray-700">Tariff Rate:</span>
                          <span className="font-black text-green-600 text-xl">{currentStateData.solar.avgSolarTariff}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Comparative Analysis */}
              <div className="mb-8 bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4">
                  <h3 className="text-2xl font-black flex items-center gap-2">
                    <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">3</span>
                    Cost Comparison & Savings Analysis
                  </h3>
                </div>
                
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border-2 border-red-200">
                      <p className="text-sm font-semibold text-gray-600 uppercase mb-2">Traditional Energy</p>
                      <p className="text-5xl font-black text-red-600 mb-2">{currentStateData.traditional.avgAnnualCost}</p>
                      <p className="text-sm text-gray-600">Annual Cost</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                      <p className="text-sm font-semibold text-gray-600 uppercase mb-2">Solar Energy</p>
                      <p className="text-5xl font-black text-green-600 mb-2">{currentStateData.solar.avgAnnualSavings}</p>
                      <p className="text-sm text-gray-600">Annual Savings</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-xl border-2 border-green-300 text-center">
                    <p className="text-sm font-semibold text-gray-700 uppercase mb-2">Average Savings Percentage</p>
                    <p className="text-6xl font-black text-green-600 mb-2">
                      {((parseFloat(currentStateData.solar.avgAnnualSavings.replace(/[₹,]/g, '')) / parseFloat(currentStateData.traditional.avgAnnualCost.replace(/[₹,]/g, ''))) * 100).toFixed(1)}%
                    </p>
                    <p className="text-lg font-bold text-gray-700">Cost reduction with solar energy</p>
                  </div>
                </div>
              </div>

              {/* Section 4: Government Policies & Incentives */}
              <div className="mb-8 bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4">
                  <h3 className="text-2xl font-black flex items-center gap-2">
                    <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">4</span>
                    Government Policies & Incentives
                  </h3>
                </div>
                
                <div className="p-6">
                  {/* Net Metering & Subsidy Scheme */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="border-l-4 border-indigo-500 bg-indigo-50 p-5 rounded-r-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">🔌</span>
                        <h4 className="text-lg font-bold text-gray-800">Net Metering</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-green-600 font-bold">✓</span>
                          <span className="text-sm font-semibold text-gray-700">Status: {currentStateData.policies.netMetering}</span>
                        </div>
                        <p className="text-sm text-gray-600 pl-6">{currentStateData.policies.netMeteringDetails}</p>
                        <div className="flex items-center gap-2 mt-3">
                          <span className="text-xs font-semibold text-gray-600 uppercase">Validity:</span>
                          <span className="text-sm font-bold text-indigo-600">{currentStateData.policies.netMeteringValidity}</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-purple-500 bg-purple-50 p-5 rounded-r-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">💰</span>
                        <h4 className="text-lg font-bold text-gray-800">Subsidy Scheme</h4>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-bold text-purple-600">{currentStateData.policies.subsidyScheme}</p>
                        <div className="bg-white p-3 rounded-lg mt-2">
                          <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Residential</p>
                          <p className="text-sm font-bold text-gray-800">{currentStateData.policies.residentialSubsidy}</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Commercial</p>
                          <p className="text-sm font-bold text-gray-800">{currentStateData.policies.commercialIncentive}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tax Benefits & Grid Connectivity */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-xl border-2 border-amber-200">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">📊</span>
                        <h4 className="text-lg font-bold text-gray-800">Tax Benefits</h4>
                      </div>
                      <p className="text-xl font-black text-amber-600">{currentStateData.policies.taxBenefits}</p>
                    </div>

                    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-5 rounded-xl border-2 border-cyan-200">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">⚡</span>
                        <h4 className="text-lg font-bold text-gray-800">Grid Connectivity</h4>
                      </div>
                      <p className="text-sm font-bold text-cyan-600">{currentStateData.policies.gridConnectivity}</p>
                    </div>
                  </div>

                  {/* Additional Incentives */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border-2 border-green-200">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl">🎁</span>
                      <h4 className="text-lg font-bold text-gray-800">Additional Incentives</h4>
                    </div>
                    <div className="grid md:grid-cols-3 gap-3">
                      {currentStateData.policies.additionalIncentives.map((incentive, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg border border-green-300 flex items-start gap-2">
                          <span className="text-green-600 font-bold text-lg">✓</span>
                          <p className="text-sm font-semibold text-gray-700">{incentive}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 5: Seasonal Analysis */}
              <div className="mb-8 bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4">
                  <h3 className="text-2xl font-black flex items-center gap-2">
                    <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">5</span>
                    Seasonal Performance Analysis
                  </h3>
                </div>
                
                <div className="p-6">
                  {/* Peak & Low Months */}
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="border-l-4 border-green-500 bg-green-50 p-5 rounded-r-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">☀️</span>
                        <h4 className="text-lg font-bold text-gray-800">Peak Months</h4>
                      </div>
                      <div className="space-y-2">
                        {currentStateData.seasonal.peakMonths.map((month, index) => (
                          <div key={index} className="bg-white px-3 py-2 rounded-lg font-semibold text-green-600">
                            {month}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-l-4 border-blue-500 bg-blue-50 p-5 rounded-r-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">🌙</span>
                        <h4 className="text-lg font-bold text-gray-800">Low Months</h4>
                      </div>
                      <div className="space-y-2">
                        {currentStateData.seasonal.lowMonths.map((month, index) => (
                          <div key={index} className="bg-white px-3 py-2 rounded-lg font-semibold text-blue-600">
                            {month}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-l-4 border-purple-500 bg-purple-50 p-5 rounded-r-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">🔧</span>
                        <h4 className="text-lg font-bold text-gray-800">Best Installation</h4>
                      </div>
                      <div className="space-y-2">
                        {currentStateData.seasonal.bestInstallationMonths.map((month, index) => (
                          <div key={index} className="bg-white px-3 py-2 rounded-lg font-semibold text-purple-600">
                            {month}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Monthly Performance Chart */}
                  <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200 mb-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-4">Monthly Generation & Savings Pattern</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={currentStateData.seasonal.monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                        <YAxis 
                          yAxisId="left"
                          tick={{ fontSize: 11 }} 
                          label={{ value: 'Generation (kWh/kW/day)', angle: -90, position: 'insideLeft', fontSize: 10 }}
                        />
                        <YAxis 
                          yAxisId="right"
                          orientation="right"
                          tick={{ fontSize: 11 }}
                          label={{ value: 'Consumption (kWh)', angle: 90, position: 'insideRight', fontSize: 10 }}
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#fff', border: '2px solid #f59e0b', borderRadius: '8px', fontSize: '12px' }}
                        />
                        <Line 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="generation" 
                          stroke="#f59e0b" 
                          strokeWidth={3}
                          name="Solar Generation (kWh/kW/day)"
                          dot={{ fill: '#f59e0b', r: 4 }}
                        />
                        <Line 
                          yAxisId="right"
                          type="monotone" 
                          dataKey="consumption" 
                          stroke="#06b6d4" 
                          strokeWidth={3}
                          name="Consumption (kWh)"
                          dot={{ fill: '#06b6d4', r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Monthly Savings Table */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-3">Monthly Savings Breakdown</h4>
                    <div className="overflow-hidden rounded-lg border-2 border-gray-200">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                            <th className="px-4 py-3 text-left text-xs font-bold uppercase">Month</th>
                            <th className="px-4 py-3 text-center text-xs font-bold uppercase">Generation (kWh/kW/day)</th>
                            <th className="px-4 py-3 text-center text-xs font-bold uppercase">Consumption (kWh)</th>
                            <th className="px-4 py-3 text-right text-xs font-bold uppercase">Savings</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentStateData.seasonal.monthlyData.map((data, index) => (
                            <tr key={index} className={`border-t ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                              <td className="px-4 py-3 font-semibold text-gray-800">{data.month}</td>
                              <td className="px-4 py-3 text-center font-bold text-amber-600">{data.generation}</td>
                              <td className="px-4 py-3 text-center text-gray-700">{data.consumption}</td>
                              <td className="px-4 py-3 text-right font-bold text-green-600">{data.savings}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Monsoon Impact */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border-2 border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🌧️</span>
                      <h4 className="text-lg font-bold text-gray-800">Monsoon Impact</h4>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">{currentStateData.seasonal.monsoonImpact}</p>
                  </div>
                </div>
              </div>

              {/* Export Button */}
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() => setShowStateReports(false)}
                  className="px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:border-primary transition-all"
                >
                  Close
                </button>
                <button className="px-6 py-3 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                  Export Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
