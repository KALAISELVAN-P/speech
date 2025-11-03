import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Dashboard({ user }) {
  const [stats, setStats] = useState({
    totalSessions: 0,
    gesturesRecognized: 0,
    customGestures: 0,
    lastActivity: null
  });

  useEffect(() => {
    // Load user stats from localStorage or Firestore
    const savedStats = localStorage.getItem(`userStats_${user?.uid}`);
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, [user]);

  const quickActions = [
    {
      title: 'Start Live Detection',
      description: 'Begin real-time gesture recognition',
      icon: '🎥',
      link: '/live',
      color: 'bg-blue-500'
    },
    {
      title: 'Train Custom Gestures',
      description: 'Create and train your own gestures',
      icon: '🎯',
      link: '/train',
      color: 'bg-green-500'
    },
    {
      title: 'View History',
      description: 'See your recognition history',
      icon: '📊',
      link: '/history',
      color: 'bg-purple-500'
    },
    {
      title: 'Settings',
      description: 'Configure voice and preferences',
      icon: '⚙️',
      link: '/settings',
      color: 'bg-gray-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{user?.name || user?.email || 'User'}</span>!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to convert your gestures to speech? Choose an action below to get started.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
              <div className="text-3xl mr-4 p-3 bg-blue-100 rounded-xl">📈</div>
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Sessions</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalSessions}</p>
              </div>
            </div>
          </div>
        
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
              <div className="text-3xl mr-4 p-3 bg-green-100 rounded-xl">👋</div>
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Gestures Recognized</p>
                <p className="text-3xl font-bold text-gray-900">{stats.gesturesRecognized}</p>
              </div>
            </div>
          </div>
        
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
              <div className="text-3xl mr-4 p-3 bg-purple-100 rounded-xl">🎯</div>
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Custom Gestures</p>
                <p className="text-3xl font-bold text-gray-900">{stats.customGestures}</p>
              </div>
            </div>
          </div>
        
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
              <div className="text-3xl mr-4 p-3 bg-orange-100 rounded-xl">⏰</div>
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Last Activity</p>
                <p className="text-lg font-bold text-gray-900">
                  {stats.lastActivity ? new Date(stats.lastActivity).toLocaleDateString() : 'Never'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group"
              >
                <div className={`w-16 h-16 ${action.color} rounded-2xl flex items-center justify-center text-white text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {action.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{action.title}</h3>
                <p className="text-gray-600">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm">👋</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Gesture "Hello" recognized</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">🎯</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">New custom gesture trained</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
          </div>
          
          <div className="text-center py-4">
            <p className="text-gray-500 text-sm">No more recent activity</p>
            <Link to="/app/live" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Start detecting gestures →
            </Link>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}