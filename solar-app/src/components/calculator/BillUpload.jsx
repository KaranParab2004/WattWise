import { useState } from 'react'

const BillUpload = ({ onBack, onNext }) => {
  const [file, setFile] = useState(null)
  const [filePreview, setFilePreview] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isExtracting, setIsExtracting] = useState(false)
  const [extractionStage, setExtractionStage] = useState(0)
  const [extractedData, setExtractedData] = useState(null)
  const [expandedSections, setExpandedSections] = useState({
    consumer: true,
    consumption: true,
    solar: true,
    cost: true,
    power: true,
  })

  // Report data with dummy values - replace with API response later
  const [reportData, setReportData] = useState(null)

  // Configuration state
  const [config, setConfig] = useState({
    solarIrradiance: 1650, // kWh/m²/year - solar energy received
    lossPercentage: 15, // System losses
    solarTariff: 3.00, // ₹/kWh - rate for solar electricity (excluding taxes)
    state: 'Maharashtra', // Selected state
  })

  const availableStates = ['Maharashtra', 'Rajasthan', 'Himachal Pradesh', 'Gujarat']

  // Extraction stages for progress animation
  const extractionStages = [
    { id: 0, label: 'Reading file...', icon: '📄', duration: 800 },
    { id: 1, label: 'Extracting text...', icon: '🔍', duration: 1000 },
    { id: 2, label: 'Analyzing data...', icon: '🧠', duration: 1200 },
    { id: 3, label: 'Validating information...', icon: '✓', duration: 800 },
    { id: 4, label: 'Complete!', icon: '🎉', duration: 500 },
  ]

  const handleConfigChange = (field, value) => {
    setConfig({ ...config, [field]: value })
  }

  const toggleSection = (section) => {
    setExpandedSections({ ...expandedSections, [section]: !expandedSections[section] })
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      handleFileUpload(droppedFile)
    }
  }

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      handleFileUpload(selectedFile)
    }
  }

  const handleFileUpload = (uploadedFile) => {
    // Validate file type
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
    if (!validTypes.includes(uploadedFile.type)) {
      alert('Please upload a PDF, JPG, or PNG file')
      return
    }

    // Validate file size (max 10MB)
    if (uploadedFile.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB')
      return
    }

    setFile(uploadedFile)
    
    // Create preview for images
    if (uploadedFile.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => setFilePreview(e.target.result)
      reader.readAsDataURL(uploadedFile)
    } else {
      setFilePreview(null)
    }

    // Start extraction with stages
    setIsExtracting(true)
    setExtractionStage(0)

    // Simulate AI extraction with stages
    let currentStage = 0
    const runStages = () => {
      if (currentStage < extractionStages.length - 1) {
        setTimeout(() => {
          currentStage++
          setExtractionStage(currentStage)
          runStages()
        }, extractionStages[currentStage].duration)
      } else {
        // Final stage - set extracted data
        setTimeout(() => {
          setExtractedData({
            provider: 'BEST Mumbai',
            pincode: '400078',
            period: 'January 2024',
            amount: '6450',
            units: '758',
            date: '2024-01-15'
          })
          
          // Set dummy report data - replace with API response later
          setReportData({
            consumerInfo: {
              name: 'Rajveer Singh',
              accountNumber: 'ACC123456789',
              address: '123, Marine Drive, Mumbai, Maharashtra 400078'
            },
            consumptionAnalysis: {
              annualConsumption: 9096, // kWh
              currentMonthUnits: 758, // kWh
              todZones: {
                A: 180, // Peak hours
                B: 250, // Standard hours
                C: 200, // Off-peak hours
                D: 128  // Night hours
              }
            },
            solarRequirements: {
              requiredCapacity: 4.3, // kW
              solarFactor: 1.15,
              state: 'Maharashtra'
            },
            costComparison: {
              pureTariffPerKwh: 8.50, // ₹
              solarTariffPerKwh: 3.00, // ₹
              annualGridCost: 77400, // ₹
              annualSolarCost: 27288, // ₹
              annualSavings: 50112, // ₹
              savingsPercentage: 64.7 // %
            },
            powerFactor: {
              value: 0.92,
              status: 'good' // good or bad
            }
          })
          
          setIsExtracting(false)
          setExtractionStage(0)
        }, extractionStages[currentStage].duration)
      }
    }
    
    runStages()
  }

  const handleReupload = () => {
    setFile(null)
    setFilePreview(null)
    setExtractedData(null)
    setReportData(null)
    setIsExtracting(false)
    setExtractionStage(0)
  }

  const handleContinue = () => {
    if (extractedData) {
      onNext({ ...extractedData, config })
    }
  }

  return (
    <div className="p-8 md:p-12">
      <header className="flex justify-between items-center mb-8">
        <button
          onClick={onBack}
          className="px-6 py-3 border-2 border-gray-300 rounded-xl hover:border-primary transition-all font-semibold"
        >
          ← Back
        </button>
        <span className="px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold">
          Step 2 of 3
        </span>
      </header>

      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black mb-4">Upload Your Electricity Bill</h2>
        <p className="text-gray-600 mb-8">
          Upload your electricity bill and configure calculation parameters.
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left side - Bill Upload */}
          <div className="lg:col-span-2">
            {!file && (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-4 border-dashed rounded-2xl p-16 text-center transition-all cursor-pointer h-full flex flex-col items-center justify-center min-h-[600px] ${
                  isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'
                }`}
                onClick={() => document.getElementById('fileInput').click()}
              >
                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-2xl font-bold mb-2">Drag & Drop your bill here</h3>
                <p className="text-gray-600 mb-4">or click to browse</p>
                <p className="text-sm text-gray-500">Supported formats: PDF, JPG, PNG (Max 10MB)</p>
                <input
                  id="fileInput"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </div>
            )}

            {isExtracting && (
              <div className="h-full flex flex-col items-center justify-center min-h-[600px] bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 rounded-2xl border-2 border-primary/30 relative overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-64 h-64 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                  <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  {/* Progress Circle */}
                  <div className="relative mb-8">
                    {/* Outer rotating ring */}
                    <div className="absolute inset-0 w-32 h-32 border-4 border-primary/20 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
                    {/* Middle rotating ring */}
                    <div className="absolute inset-3 w-26 h-26 border-4 border-primary/40 rounded-full animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
                    {/* Inner spinning circle */}
                    <div className="w-32 h-32 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    {/* Center icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl animate-pulse">{extractionStages[extractionStage].icon}</span>
                    </div>
                  </div>

                  {/* Stage Label */}
                  <h3 className="text-2xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
                    {extractionStages[extractionStage].label}
                  </h3>
                  <p className="text-gray-600 text-center max-w-md mb-6">
                    Our AI is analyzing your electricity bill
                  </p>

                  {/* Progress Bar */}
                  <div className="w-80 bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
                    <div 
                      className="bg-gradient-primary h-full rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${((extractionStage + 1) / extractionStages.length) * 100}%` }}
                    ></div>
                  </div>

                  {/* Stage Indicators */}
                  <div className="flex gap-3 mb-6">
                    {extractionStages.map((stage, index) => (
                      <div
                        key={stage.id}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index <= extractionStage ? 'bg-primary scale-125' : 'bg-gray-300'
                        }`}
                      ></div>
                    ))}
                  </div>

                  {/* Bouncing Dots */}
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            {extractedData && !isExtracting && (
              <div className="space-y-6">
                {/* File Preview Card */}
                <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Uploaded File</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">
                          {file.type === 'application/pdf' ? '📄' : '🖼️'}
                        </span>
                        <div>
                          <p className="font-semibold text-gray-800">{file.name}</p>
                          <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleReupload}
                      className="px-4 py-2 bg-red-50 text-red-600 border-2 border-red-200 rounded-lg font-semibold hover:bg-red-100 transition-all"
                    >
                      🔄 Re-upload
                    </button>
                  </div>

                  {/* Image Preview */}
                  {filePreview && (
                    <div className="mt-4 border-2 border-gray-200 rounded-xl overflow-hidden">
                      <img 
                        src={filePreview} 
                        alt="Bill preview" 
                        className="w-full h-64 object-contain bg-gray-50"
                      />
                    </div>
                  )}

                  {/* Success Badge */}
                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full border-2 border-green-200">
                    <span className="text-xl">✓</span>
                    <span className="font-semibold">Successfully extracted</span>
                  </div>
                </div>

                {/* Basic Extracted Information */}
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-primary/30">
                  <h3 className="text-xl font-bold mb-4">Basic Information</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { label: 'Provider', field: 'provider' },
                      { label: 'Pincode', field: 'pincode' },
                      { label: 'Billing Period', field: 'period' },
                      { label: 'Bill Amount (₹)', field: 'amount' },
                      { label: 'Units Consumed (kWh)', field: 'units' },
                      { label: 'Bill Date', field: 'date' },
                    ].map((item) => (
                      <div key={item.field} className="bg-white p-4 rounded-xl">
                        <label className="text-sm text-gray-600 font-semibold mb-2 block">
                          {item.label}
                        </label>
                        <p className="text-lg font-bold">{extractedData[item.field]}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Report Sections */}
                {reportData && (
                  <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 space-y-4">
                    <h3 className="text-xl font-bold mb-4">Detailed Analysis Report</h3>

                    {/* Consumer Info Section */}
                    <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleSection('consumer')}
                        className="w-full px-6 py-4 bg-gradient-to-r from-cyan-50 to-blue-50 flex justify-between items-center hover:from-cyan-100 hover:to-blue-100 transition-all"
                      >
                        <span className="font-bold text-lg">👤 Consumer Information</span>
                        <span className="text-2xl">{expandedSections.consumer ? '−' : '+'}</span>
                      </button>
                      {expandedSections.consumer && (
                        <div className="p-6 space-y-3">
                          <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <span className="text-gray-600">Name:</span>
                            <span className="font-bold">{reportData.consumerInfo.name}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <span className="text-gray-600">Account Number:</span>
                            <span className="font-bold">{reportData.consumerInfo.accountNumber}</span>
                          </div>
                          <div className="py-2">
                            <span className="text-gray-600 block mb-2">Address:</span>
                            <span className="font-bold">{reportData.consumerInfo.address}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Consumption Analysis Section */}
                    <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleSection('consumption')}
                        className="w-full px-6 py-4 bg-gradient-to-r from-cyan-50 to-blue-50 flex justify-between items-center hover:from-cyan-100 hover:to-blue-100 transition-all"
                      >
                        <span className="font-bold text-lg">⚡ Consumption Analysis</span>
                        <span className="text-2xl">{expandedSections.consumption ? '−' : '+'}</span>
                      </button>
                      {expandedSections.consumption && (
                        <div className="p-6 space-y-3">
                          <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <span className="text-gray-600">Annual Consumption:</span>
                            <span className="font-bold">{reportData.consumptionAnalysis.annualConsumption} kWh</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <span className="text-gray-600">Current Month Units:</span>
                            <span className="font-bold">{reportData.consumptionAnalysis.currentMonthUnits} kWh</span>
                          </div>
                          <div className="py-2">
                            <span className="text-gray-600 block mb-3 font-semibold">TOD Zones:</span>
                            <div className="grid grid-cols-2 gap-3">
                              {Object.entries(reportData.consumptionAnalysis.todZones).map(([zone, units]) => (
                                <div key={zone} className="bg-gray-50 p-3 rounded-lg">
                                  <span className="text-sm text-gray-600">Zone {zone}:</span>
                                  <span className="font-bold ml-2">{units} kWh</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Solar Requirements Section */}
                    <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleSection('solar')}
                        className="w-full px-6 py-4 bg-gradient-to-r from-cyan-50 to-blue-50 flex justify-between items-center hover:from-cyan-100 hover:to-blue-100 transition-all"
                      >
                        <span className="font-bold text-lg">☀️ Solar Requirements</span>
                        <span className="text-2xl">{expandedSections.solar ? '−' : '+'}</span>
                      </button>
                      {expandedSections.solar && (
                        <div className="p-6 space-y-3">
                          <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <span className="text-gray-600">Required Capacity:</span>
                            <span className="font-bold text-primary text-xl">{reportData.solarRequirements.requiredCapacity} kW</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <span className="text-gray-600">Solar Factor:</span>
                            <span className="font-bold">{reportData.solarRequirements.solarFactor}</span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-gray-600">State:</span>
                            <span className="font-bold">{reportData.solarRequirements.state}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Cost Comparison Section */}
                    <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleSection('cost')}
                        className="w-full px-6 py-4 bg-gradient-to-r from-cyan-50 to-blue-50 flex justify-between items-center hover:from-cyan-100 hover:to-blue-100 transition-all"
                      >
                        <span className="font-bold text-lg">💰 Cost Comparison</span>
                        <span className="text-2xl">{expandedSections.cost ? '−' : '+'}</span>
                      </button>
                      {expandedSections.cost && (
                        <div className="p-6 space-y-3">
                          <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <span className="text-gray-600">Pure Tariff per kWh:</span>
                            <span className="font-bold">₹{reportData.costComparison.pureTariffPerKwh}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <span className="text-gray-600">Solar Tariff per kWh:</span>
                            <span className="font-bold text-green-600">₹{reportData.costComparison.solarTariffPerKwh}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <span className="text-gray-600">Annual Grid Cost:</span>
                            <span className="font-bold">₹{reportData.costComparison.annualGridCost.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <span className="text-gray-600">Annual Solar Cost:</span>
                            <span className="font-bold text-green-600">₹{reportData.costComparison.annualSolarCost.toLocaleString()}</span>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg mt-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-700 font-semibold">Annual Savings:</span>
                              <span className="font-black text-2xl text-green-600">₹{reportData.costComparison.annualSavings.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700 font-semibold">Savings Percentage:</span>
                              <span className="font-black text-xl text-green-600">{reportData.costComparison.savingsPercentage}%</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Power Factor Section */}
                    <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleSection('power')}
                        className="w-full px-6 py-4 bg-gradient-to-r from-cyan-50 to-blue-50 flex justify-between items-center hover:from-cyan-100 hover:to-blue-100 transition-all"
                      >
                        <span className="font-bold text-lg">⚙️ Power Factor</span>
                        <span className="text-2xl">{expandedSections.power ? '−' : '+'}</span>
                      </button>
                      {expandedSections.power && (
                        <div className="p-6">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Power Factor Value:</span>
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-xl">{reportData.powerFactor.value}</span>
                              <span className={`px-4 py-2 rounded-full font-bold ${
                                reportData.powerFactor.status === 'good' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {reportData.powerFactor.status === 'good' ? '✓ Good' : '✗ Bad'}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <button
                    onClick={handleContinue}
                    className="px-12 py-4 bg-gradient-primary text-white rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all"
                  >
                    Continue & Next
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right side - Configuration Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 sticky top-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                ⚙️ Configuration
              </h3>

              {/* Solar Irradiance */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Solar Irradiance (kWh/m²/year)
                </label>
                <input
                  type="number"
                  value={config.solarIrradiance}
                  onChange={(e) => handleConfigChange('solarIrradiance', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none font-semibold text-lg"
                  min="0"
                  max="2500"
                  step="10"
                />
                <p className="text-xs text-gray-500 mt-1">Annual solar energy received per m² (India: 1500-2000 kWh/m²/year)</p>
              </div>

              {/* Loss Percentage */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  System Loss (%)
                </label>
                <input
                  type="number"
                  value={config.lossPercentage}
                  onChange={(e) => handleConfigChange('lossPercentage', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none font-semibold text-lg"
                  min="0"
                  max="50"
                  step="1"
                />
                <p className="text-xs text-gray-500 mt-1">System efficiency losses (typically 10-20%)</p>
              </div>

              {/* Solar Tariff */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Solar Tariff (₹/kWh)
                </label>
                <input
                  type="number"
                  value={config.solarTariff}
                  onChange={(e) => handleConfigChange('solarTariff', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none font-semibold text-lg"
                  min="0"
                  max="10"
                  step="0.10"
                />
                <p className="text-xs text-gray-500 mt-1">Cost of solar electricity excluding taxes (typically ₹3-5/kWh)</p>
              </div>

              {/* State Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  State
                </label>
                <div className="relative">
                  <select
                    value={config.state}
                    onChange={(e) => handleConfigChange('state', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none font-semibold text-lg bg-white cursor-pointer appearance-none"
                  >
                    {availableStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Select your state for accurate calculations</p>
              </div>

              {/* Summary */}
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-lg border-2 border-primary/30">
                <h4 className="text-sm font-bold text-gray-700 mb-2">Current Settings</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">State:</span>
                    <span className="font-bold">{config.state}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Irradiance:</span>
                    <span className="font-bold">{config.solarIrradiance} kWh/m²/yr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Daily Avg:</span>
                    <span className="font-bold">{(config.solarIrradiance / 365).toFixed(2)} kWh/m²/day</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">System Loss:</span>
                    <span className="font-bold">{config.lossPercentage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Efficiency:</span>
                    <span className="font-bold text-green-600">{100 - config.lossPercentage}%</span>
                  </div>
                  <div className="pt-2 border-t border-cyan-200 mt-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Solar Rate:</span>
                      <span className="font-bold text-green-600">₹{config.solarTariff}/kWh</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BillUpload
