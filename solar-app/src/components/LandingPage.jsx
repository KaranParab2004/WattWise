import { useEffect } from 'react'

const LandingPage = ({ onGetStarted, onLogin }) => {
  useEffect(() => {
    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0')
            entry.target.classList.remove('opacity-0', 'translate-y-8')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    )

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-4xl">☀️</span>
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              WattWise
            </span>
          </div>
          <ul className="hidden md:flex gap-8">
            {['Home', 'Features', 'How It Works', 'Benefits'].map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className="text-gray-700 hover:text-primary font-medium transition-colors relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"></span>
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={onLogin}
            className="px-6 py-2.5 bg-gradient-primary text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen bg-gradient-hero flex items-center pt-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-6 animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              Calculate Your Solar Future
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Discover how much you can save with solar energy. Get personalized recommendations and cost estimates in minutes.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onGetStarted}
                className="px-8 py-4 bg-white text-primary rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Start Calculator
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/50 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300"
              >
                Learn More
              </button>
            </div>
            <div className="flex gap-12 pt-8">
              {[
                { value: '10,000+', label: 'Happy Customers' },
                { value: '₹50Cr+', label: 'Savings Generated' },
                { value: '5000+', label: 'Installations' },
              ].map((stat) => (
                <div key={stat.label}>
                  <h3 className="text-3xl md:text-4xl font-bold">{stat.value}</h3>
                  <p className="text-white/80 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-4 animate-float">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-40 h-40 bg-gradient-to-br from-blue-900 to-blue-600 rounded-2xl shadow-2xl relative overflow-hidden"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <div className="absolute inset-3 bg-gradient-to-br from-gray-900 to-blue-800 rounded-xl"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Why Choose WattWise?</h2>
            <p className="text-xl text-gray-600">Everything you need to make an informed decision about solar energy</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🔍', title: 'Accurate Calculations', desc: 'Get precise solar power requirements based on your actual electricity consumption.' },
              { icon: '💰', title: 'Cost Breakdown', desc: 'Detailed pricing with subsidy information, ROI calculations, and break-even analysis.' },
              { icon: '⚡', title: 'Multiple Options', desc: 'Compare different solar panel brands and inverters to find the perfect fit.' },
              { icon: '📊', title: 'Technical Comparison', desc: 'Side-by-side comparison of technical specifications to make informed decisions.' },
              { icon: '🏠', title: 'All Installation Types', desc: 'Support for residential, industrial, commercial, and ground-mounted installations.' },
              { icon: '✅', title: 'Easy Process', desc: 'Simple step-by-step process that takes just minutes to complete.' },
            ].map((feature, index) => (
              <div
                key={index}
                className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-200 p-8 bg-white rounded-2xl border-2 border-gray-100 hover:border-primary hover:shadow-xl hover:-translate-y-2"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-gradient-to-br from-cyan-50 to-blue-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get your solar estimate in 4 simple steps</p>
          </div>
          <div className="space-y-8">
            {[
              { num: 1, title: 'Choose Installation Type', desc: 'Select whether you need residential, industrial, commercial, or ground-mounted solar installation.' },
              { num: 2, title: 'Upload Your Bill', desc: 'Upload your electricity bill and our AI will extract all necessary information automatically.' },
              { num: 3, title: 'Compare Options', desc: 'Review recommended solar capacity and compare different panel manufacturers and inverters.' },
              { num: 4, title: 'Get Your Estimate', desc: 'Receive detailed cost breakdown with subsidy, ROI, and break-even period.' },
            ].map((step) => (
              <div key={step.num} className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 flex gap-6 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {step.num}
                </div>
                <div className="flex-1 bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={onGetStarted}
              className="px-10 py-4 bg-gradient-primary text-white rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Start Your Solar Journey
            </button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Benefits of Going Solar</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: '💡', title: 'Reduce Energy Bills', desc: 'Save up to 90% on your monthly electricity costs with solar power.' },
              { icon: '🌍', title: 'Environmental Impact', desc: 'Reduce your carbon footprint and contribute to a cleaner planet.' },
              { icon: '📈', title: 'Increase Property Value', desc: 'Solar installations can increase your property value by 3-4%.' },
              { icon: '🎯', title: 'Government Subsidies', desc: 'Take advantage of government incentives and subsidies for solar installations.' },
            ].map((benefit, index) => (
              <div
                key={index}
                className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 text-center p-8 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl hover:shadow-xl hover:-translate-y-2"
              >
                <div className="text-6xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-hero text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Ready to Switch to Solar?</h2>
          <p className="text-xl mb-8">Calculate your solar requirements and savings in just a few minutes</p>
          <button
            onClick={onGetStarted}
            className="px-10 py-4 bg-white text-primary rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Launch Calculator
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">☀️</span>
              <span className="text-xl font-bold">WattWise</span>
            </div>
            <p className="text-gray-400">Making solar energy accessible and affordable for everyone.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => scrollToSection('home')} className="hover:text-white">Home</button></li>
              <li><button onClick={() => scrollToSection('features')} className="hover:text-white">Features</button></li>
              <li><button onClick={() => scrollToSection('how-it-works')} className="hover:text-white">How It Works</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@wattwise.com</li>
              <li>Phone: +91 1234567890</li>
              <li>Address: Mumbai, India</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4 text-gray-400">
              <span className="hover:text-white cursor-pointer">Facebook</span>
              <span className="hover:text-white cursor-pointer">Twitter</span>
              <span className="hover:text-white cursor-pointer">LinkedIn</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2024 WattWise. All rights reserved. | Final Year Project</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
