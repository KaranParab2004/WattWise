import { useState } from 'react'

const InstallationType = ({ onBack, onNext, selectedType }) => {
  const [selected, setSelected] = useState(selectedType)

  const types = [
    {
      id: 'residential',
      name: 'Residential',
      icon: '🏠',
      description: 'Perfect for homes and apartments',
      features: ['Rooftop installation', 'Net metering', 'Subsidy available'],
      gradient: 'from-blue-500 to-cyan-500',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400',
    },
    {
      id: 'industrial',
      name: 'Industrial',
      icon: '🏭',
      description: 'Large-scale power generation',
      features: ['High capacity', 'Cost effective', 'Quick ROI'],
      gradient: 'from-orange-500 to-red-500',
      image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=400',
    },
    {
      id: 'commercial',
      name: 'Commercial',
      icon: '🏢',
      description: 'Ideal for offices and businesses',
      features: ['Tax benefits', 'Brand value', 'Energy savings'],
      gradient: 'from-green-500 to-emerald-500',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
    },
    {
      id: 'ground',
      name: 'Ground Mounted',
      icon: '⚡',
      description: 'Maximum efficiency setup',
      features: ['Optimal angle', 'Easy maintenance', 'Scalable'],
      gradient: 'from-purple-500 to-pink-500',
      image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400',
    },
  ]

  const handleNext = () => {
    if (selected) {
      onNext(selected)
    } else {
      alert('Please select an installation type')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 p-8 md:p-12">
      <header className="flex justify-between items-center mb-8">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-white border-2 border-gray-300 rounded-xl hover:border-primary hover:shadow-lg transition-all font-semibold flex items-center gap-2"
        >
          ← Back to Home
        </button>
        <span className="px-4 py-2 bg-white rounded-full font-semibold text-gray-600 shadow-md">
          Step 1 of 3
        </span>
      </header>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="text-6xl">☀️</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Select Installation Type
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the type of solar installation that best fits your needs
          </p>
        </div>

        {/* Installation Type Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {types.map((type) => (
            <div
              key={type.id}
              onClick={() => setSelected(type.id)}
              className={`group relative cursor-pointer rounded-3xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                selected === type.id
                  ? 'shadow-2xl scale-105'
                  : 'shadow-lg hover:shadow-2xl'
              }`}
            >
              {/* Image Background */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={type.image}
                  alt={type.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${type.gradient} opacity-60 group-hover:opacity-70 transition-opacity`}></div>
                
                {/* Icon */}
                <div className="absolute top-4 left-4 text-5xl drop-shadow-lg">
                  {type.icon}
                </div>

                {/* Selected Checkmark */}
                {selected === type.id && (
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-green-600 text-2xl font-bold shadow-lg animate-slide-up">
                    ✓
                  </div>
                )}

                {/* Title on Image */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-2xl font-black text-white mb-1">{type.name}</h3>
                  <p className="text-white/90 text-sm">{type.description}</p>
                </div>
              </div>

              {/* Features Section */}
              <div className={`bg-white p-6 border-4 transition-colors ${
                selected === type.id ? 'border-primary' : 'border-transparent'
              }`}>
                <ul className="space-y-2">
                  {type.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-green-500 font-bold">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hover Effect Border */}
              <div className={`absolute inset-0 rounded-3xl border-4 pointer-events-none transition-colors ${
                selected === type.id
                  ? 'border-primary'
                  : 'border-transparent group-hover:border-cyan-300'
              }`}></div>
            </div>
          ))}
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-cyan-100">
            <div className="text-4xl mb-3">💡</div>
            <h4 className="font-bold text-gray-800 mb-2">Expert Guidance</h4>
            <p className="text-sm text-gray-600">Get personalized recommendations based on your selection</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-100">
            <div className="text-4xl mb-3">📊</div>
            <h4 className="font-bold text-gray-800 mb-2">Accurate Estimates</h4>
            <p className="text-sm text-gray-600">Receive detailed cost and savings calculations</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100">
            <div className="text-4xl mb-3">🎯</div>
            <h4 className="font-bold text-gray-800 mb-2">Best Solutions</h4>
            <p className="text-sm text-gray-600">Compare top solar panel options for your needs</p>
          </div>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={handleNext}
            className={`px-16 py-5 rounded-full font-bold text-xl transition-all duration-300 ${
              selected
                ? 'bg-gradient-primary text-white shadow-xl hover:shadow-2xl hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!selected}
          >
            {selected ? 'Continue to Next Step →' : 'Select an Installation Type'}
          </button>
          {selected && (
            <p className="mt-4 text-sm text-gray-600 animate-slide-up">
              You selected: <span className="font-bold text-primary">{types.find(t => t.id === selected)?.name}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default InstallationType
