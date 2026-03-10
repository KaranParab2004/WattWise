import { useState } from 'react'

const UserDashboard = ({ user, onLogout, onStartCalculator }) => {
  const [activeTab, setActiveTab] = useState('dashboard')

  // Dummy user data
  const userStats = {
    calculationsCompleted: 3,
    totalSavings: '₹4,85,200',
    recommendedCapacity: '24.39 kW',
    lastCalculation: '2024-03-05'
  }

  const savedCalculations = [
    { id: 1, name: 'Home Solar Setup', capacity: '5.2 kW', savings: '₹65,400', date: '2024-03-05', status: 'Completed' },
    { id: 2, name: 'Office Building', capacity: '24.39 kW', savings: '₹3,10,548', date: '2024-03-01', status: 'Completed' },
    { id: 3, name: 'Factory Installation', capacity: '8.5 kW', savings: '₹1,09,252', date: '2024-02-28', status: 'Draft' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-4xl">☀️</span>
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              WattWise
            </span>
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
          <p className="text-gray-600">Track your solar journey and manage your calculations.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: '⚡', label: 'Calculations', value: userStats.calculationsCompleted, color: 'cyan' },
            { icon: '💰', label: 'Potential Savings', value: userStats.totalSavings, color: 'green' },
            { icon: '☀️', label: 'Recommended Capacity', value: userStats.recommendedCapacity, color: 'amber' },
            { icon: '📅', label: 'Last Activity', value: userStats.lastCalculation, color: 'blue' },
          ].map((stat, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 border-2 border-${stat.color}-200 hover:shadow-xl transition-all hover:-translate-y-1`}
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 mb-8 border-2 border-cyan-200">
          <h3 className="text-2xl font-black mb-4">🚀 Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={onStartCalculator}
              className="p-6 bg-white rounded-xl border-2 border-cyan-300 hover:shadow-lg transition-all hover:-translate-y-1 text-left"
            >
              <div className="text-4xl mb-3">➕</div>
              <h4 className="font-bold text-gray-800 mb-2">New Calculation</h4>
              <p className="text-sm text-gray-600">Start a new solar capacity calculation</p>
            </button>
            <button className="p-6 bg-white rounded-xl border-2 border-blue-300 hover:shadow-lg transition-all hover:-translate-y-1 text-left">
              <div className="text-4xl mb-3">📊</div>
              <h4 className="font-bold text-gray-800 mb-2">View Reports</h4>
              <p className="text-sm text-gray-600">Access your detailed solar reports</p>
            </button>
            <button className="p-6 bg-white rounded-xl border-2 border-green-300 hover:shadow-lg transition-all hover:-translate-y-1 text-left">
              <div className="text-4xl mb-3">💬</div>
              <h4 className="font-bold text-gray-800 mb-2">Get Support</h4>
              <p className="text-sm text-gray-600">Contact our solar experts</p>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex border-b border-gray-200">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'calculations', label: 'My Calculations', icon: '⚡' },
              { id: 'profile', label: 'Profile', icon: '👤' },
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
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black mb-4">📈 Your Solar Journey</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                      <h4 className="font-bold text-gray-700 mb-3">💚 Environmental Impact</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">CO₂ Reduction:</span>
                          <span className="font-bold text-green-600">3.8 tons/year</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Trees Equivalent:</span>
                          <span className="font-bold text-green-600">78 trees/year</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Petrol Saved:</span>
                          <span className="font-bold text-green-600">1,680 L/year</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border-2 border-amber-200">
                      <h4 className="font-bold text-gray-700 mb-3">💰 Financial Benefits</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Annual Savings:</span>
                          <span className="font-bold text-amber-600">₹3,10,548</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Payback Period:</span>
                          <span className="font-bold text-amber-600">6 years</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">25-Year Savings:</span>
                          <span className="font-bold text-amber-600">₹77.6L</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-black mb-4">📚 Learning Resources</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { icon: '📖', title: 'Solar Basics', desc: 'Learn how solar energy works' },
                      { icon: '💡', title: 'Installation Guide', desc: 'Step-by-step installation process' },
                      { icon: '🎓', title: 'Maintenance Tips', desc: 'Keep your panels efficient' },
                    ].map((resource, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border-2 border-cyan-200 hover:shadow-lg transition-all cursor-pointer"
                      >
                        <div className="text-3xl mb-2">{resource.icon}</div>
                        <h4 className="font-bold text-gray-800 mb-1">{resource.title}</h4>
                        <p className="text-sm text-gray-600">{resource.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Calculations Tab */}
            {activeTab === 'calculations' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-black">⚡ Saved Calculations</h3>
                  <button
                    onClick={onStartCalculator}
                    className="px-4 py-2 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    + New Calculation
                  </button>
                </div>
                <div className="space-y-4">
                  {savedCalculations.map((calc) => (
                    <div
                      key={calc.id}
                      className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl border-2 border-cyan-200 hover:shadow-lg transition-all"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-gray-800 mb-1">{calc.name}</h4>
                          <p className="text-sm text-gray-600">Created on {calc.date}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            calc.status === 'Completed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {calc.status}
                        </span>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-white p-4 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">Solar Capacity</p>
                          <p className="text-xl font-black text-primary">{calc.capacity}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">Annual Savings</p>
                          <p className="text-xl font-black text-green-600">{calc.savings}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">Status</p>
                          <p className="text-xl font-black text-gray-800">{calc.status}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button className="flex-1 px-4 py-2 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                          View Details
                        </button>
                        <button className="px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold hover:border-primary transition-all">
                          Download PDF
                        </button>
                        <button className="px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold hover:border-red-500 hover:text-red-500 transition-all">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-black mb-4">👤 Profile Settings</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl border-2 border-cyan-200">
                    <h4 className="font-bold text-gray-700 mb-4">Personal Information</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          defaultValue={user.name}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          defaultValue={user.email}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 1234567890"
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                    <h4 className="font-bold text-gray-700 mb-4">Preferences</h4>
                    <div className="space-y-3">
                      {[
                        'Email notifications for new features',
                        'Monthly solar tips newsletter',
                        'Calculation reminders',
                        'Marketing communications',
                      ].map((option, index) => (
                        <label key={index} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked={index < 2}
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
                    Cancel
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
    </div>
  )
}

export default UserDashboard
