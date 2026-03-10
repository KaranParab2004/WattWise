import { useState } from 'react'
import LandingPage from './components/LandingPage'
import Calculator from './components/Calculator'
import Login from './components/Login'
import AdminDashboard from './components/AdminDashboard'
import UserDashboard from './components/UserDashboard'

function App() {
  const [currentPage, setCurrentPage] = useState('landing') // 'landing', 'calculator', 'login', 'admin', 'user'
  const [user, setUser] = useState(null) // { isAuthenticated, role, email, name }

  const handleLogin = (userData) => {
    console.log('handleLogin called with:', userData)
    setUser(userData)
    // Redirect based on role
    if (userData.role === 'admin') {
      console.log('Redirecting to admin dashboard')
      setCurrentPage('admin')
    } else {
      console.log('Redirecting to user dashboard')
      setCurrentPage('user')
    }
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentPage('landing')
  }

  const handleStartCalculator = () => {
    setCurrentPage('calculator')
  }

  return (
    <div className="min-h-screen">
      {console.log('Current page:', currentPage, 'User:', user)}
      {currentPage === 'landing' && (
        <LandingPage 
          onGetStarted={handleStartCalculator}
          onLogin={() => setCurrentPage('login')}
        />
      )}
      {currentPage === 'calculator' && (
        <Calculator onBackToHome={() => user ? setCurrentPage(user.role === 'admin' ? 'admin' : 'user') : setCurrentPage('landing')} />
      )}
      {currentPage === 'login' && (
        <Login 
          onBack={() => setCurrentPage('landing')} 
          onLogin={handleLogin}
        />
      )}
      {currentPage === 'admin' && user && user.role === 'admin' && (
        <AdminDashboard 
          user={user}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'user' && user && user.role === 'user' && (
        <UserDashboard 
          user={user}
          onLogout={handleLogout}
          onStartCalculator={handleStartCalculator}
        />
      )}
    </div>
  )
}

export default App
