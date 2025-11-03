import { Link } from 'react-router-dom';

export default function Landing() {
  const features = [
    {
      icon: '👋',
      title: 'Real-time Gesture Recognition',
      description: 'Convert hand gestures to speech instantly using your webcam and advanced AI'
    },
    {
      icon: '🗣️',
      title: 'Text-to-Speech',
      description: 'High-quality voice synthesis with multiple language and voice options'
    },
    {
      icon: '🎯',
      title: 'Custom Training',
      description: 'Train your own gestures and create personalized sign language vocabulary'
    },
    {
      icon: '📱',
      title: 'Progressive Web App',
      description: 'Works offline and can be installed on any device for easy access'
    },
    {
      icon: '🔒',
      title: 'Privacy First',
      description: 'All processing happens in your browser - your gestures never leave your device'
    },
    {
      icon: '♿',
      title: 'Accessibility Focused',
      description: 'Designed to break communication barriers and enhance accessibility'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="text-center">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-6">
              🚀 AI-Powered Communication
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 leading-tight">
            Sign Language to
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Speech</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Break communication barriers with cutting-edge AI technology. 
            Convert your hand gestures to natural speech instantly with our advanced recognition system.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link
              to="/login"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Free Trial
            </Link>
            <button className="border-2 border-gray-300 text-gray-700 px-10 py-4 rounded-xl text-lg font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-300">
              Watch Demo
            </button>
          </div>

          {/* Demo Preview */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-5xl mx-auto border border-gray-100">
            <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center mb-6 border border-gray-200">
              <div className="text-center">
                <div className="text-7xl mb-6 animate-pulse">🎥</div>
                <p className="text-gray-700 text-xl font-semibold mb-2">Live Demo Preview</p>
                <p className="text-gray-500 text-base">Real-time gesture recognition with AI overlay</p>
              </div>
            </div>
            <div className="flex justify-center items-center space-x-8 text-sm">
              <div className="flex items-center space-x-3 bg-green-50 px-4 py-2 rounded-full">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium text-green-700">Real-time Detection</span>
              </div>
              <div className="flex items-center space-x-3 bg-blue-50 px-4 py-2 rounded-full">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="font-medium text-blue-700">Instant Speech</span>
              </div>
              <div className="flex items-center space-x-3 bg-purple-50 px-4 py-2 rounded-full">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="font-medium text-purple-700">Privacy Protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to communicate effectively through sign language
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">Simple steps to start communicating</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1️⃣</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sign Up & Login</h3>
              <p className="text-gray-600">Create your account and access the gesture detection platform</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2️⃣</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Start Detection</h3>
              <p className="text-gray-600">Allow camera access and begin making gestures in front of your webcam</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3️⃣</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Hear Your Voice</h3>
              <p className="text-gray-600">Your gestures are instantly converted to speech with natural-sounding voices</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Break Communication Barriers?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who are already communicating more effectively with SignSpeak
          </p>
          <Link
            to="/live"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Try Live Detection Now
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 SignSpeak. Built with ❤️ for accessibility and inclusion.
          </p>
        </div>
      </footer>
    </div>
  );
}