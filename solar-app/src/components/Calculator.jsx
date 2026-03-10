import { useState } from 'react'
import InstallationType from './calculator/InstallationType'
import BillUpload from './calculator/BillUpload'
import Results from './calculator/Results'

const Calculator = ({ onBackToHome }) => {
  const [currentScreen, setCurrentScreen] = useState(1)
  const [state, setState] = useState({
    installationType: null,
    extractedData: null,
    powerRequirement: 0,
  })

  const updateState = (updates) => {
    setState((prev) => ({ ...prev, ...updates }))
  }

  const goToScreen = (screenNumber) => {
    setCurrentScreen(screenNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-hero py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
        {currentScreen === 1 && (
          <InstallationType
            onBack={onBackToHome}
            onNext={(type) => {
              updateState({ installationType: type })
              goToScreen(2)
            }}
            selectedType={state.installationType}
          />
        )}

        {currentScreen === 2 && (
          <BillUpload
            onBack={() => goToScreen(1)}
            onNext={(extractedData) => {
              updateState({ extractedData })
              goToScreen(3)
            }}
          />
        )}

        {currentScreen === 3 && (
          <Results
            onBack={() => goToScreen(2)}
            extractedData={state.extractedData}
            updateState={updateState}
          />
        )}
      </div>
    </div>
  )
}

export default Calculator
