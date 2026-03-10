import { useState } from 'react'

const PanelSelection = ({ onBack, state, updateState }) => {
  const [selectedBrand, setSelectedBrand] = useState(state.selectedBrand)

  const brands = [
    { id: 'brand1', name: 'WAAREE', price: '₹1.79 Crore' },
    { id: 'brand2', name: 'NAVITAS', price: '₹1.79 Crore' },
    { id: 'brand3', name: 'PAHAL', price: '₹1.79 Crore' },
    { id: 'brand4', name: 'GOLDI', price: '₹1.79 Crore' },
    { id: 'brand5', name: 'ADANI', price: '₹1.79 Crore' },
    { id: 'brand6', name: 'RAYZON', price: '₹1.79 Crore' },
  ]

  return (
    <div className="p-8 md:p-12">
      <header className="flex justify-between items-center mb-8">
        <button
          onClick={onBack}
          className="px-6 py-3 border-2 border-gray-300 rounded-xl hover:border-primary transition-all font-semibold"
        >
          ← Back
        </button>
      </header>

      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-black">Solar Panel Manufacturer</h2>
          <button className="px-4 py-2 border-2 border-gray-300 rounded-xl hover:border-primary transition-all">
            ⇅ Sort
          </button>
        </div>

        <div className="flex gap-4 mb-8">
          <button className="px-6 py-3 bg-secondary text-white rounded-full font-semibold">
            With subsidy
          </button>
          <button className="px-6 py-3 border-2 border-gray-300 rounded-full font-semibold hover:border-secondary transition-all">
            Without subsidy
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {brands.map((brand) => (
            <div
              key={brand.id}
              onClick={() => {
                setSelectedBrand(brand.id)
                updateState({ selectedBrand: brand.id })
              }}
              className={`p-6 rounded-2xl border-4 cursor-pointer transition-all hover:scale-105 ${
                selectedBrand === brand.id
                  ? 'border-primary shadow-xl'
                  : 'border-gray-200'
              }`}
            >
              <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center text-white text-3xl font-bold mb-4 mx-auto">
                {brand.name.charAt(0)}
              </div>
              <h3 className="text-xl font-bold text-center mb-2">{brand.name}</h3>
              <p className="text-gray-600 text-center">{brand.price}</p>
              {selectedBrand === brand.id && (
                <div className="mt-4 text-center text-primary font-bold">✓ Selected</div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="text-primary font-bold text-lg hover:underline mb-12">
            Compare Brands →
          </button>
        </div>

        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 border-2 border-primary/30">
          <h3 className="text-2xl font-black mb-4">Selected: ADANI Solar</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Tentative amount</span>
              <span className="font-bold">₹1,99,029</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Subsidy amount</span>
              <span className="font-bold text-green-600">₹78,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Effective amount</span>
              <span className="font-bold">₹1,21,029</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ROI</span>
              <span className="font-bold">57.05%</span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex gap-4 justify-center">
          <button className="px-12 py-4 bg-gradient-primary text-white rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all">
            Continue & Next
          </button>
          <button className="px-12 py-4 border-2 border-primary text-primary rounded-full font-bold text-lg hover:bg-cyan-50 transition-all">
            Customize
          </button>
        </div>
      </div>
    </div>
  )
}

export default PanelSelection
