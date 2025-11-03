import { useState, useEffect } from 'react';
import { speechService } from '../../services/speechService';

export default function Settings() {
  const [settings, setSettings] = useState({
    voice: 'default',
    language: 'en-US',
    rate: 1,
    autoSpeak: true,
    fontSize: 'medium'
  });
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechService.getVoices();
      setVoices(availableVoices);
    };
    
    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    if (key === 'voice') {
      if (value !== 'default') {
        const voiceIndex = parseInt(value);
        speechService.setVoice(voiceIndex);
      }
    } else if (key === 'rate') {
      speechService.setRate(value);
    } else if (key === 'language') {
      speechService.setLanguage(value);
    }
  };

  const testVoice = () => {
    speechService.speak('Hello, this is a test of the selected voice', true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Configure your voice and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Voice Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Voice Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Voice</label>
              <select 
                value={settings.voice}
                onChange={(e) => handleChange('voice', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="default">Default Voice</option>
                {voices.map((voice, index) => (
                  <option key={index} value={index}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <select 
                value={settings.language}
                onChange={(e) => handleChange('language', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="en-US">English (US)</option>
                <option value="en-GB">English (UK)</option>
                <option value="es-ES">Spanish</option>
                <option value="fr-FR">French</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Speech Rate: {settings.rate}</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={settings.rate}
              onChange={(e) => handleChange('rate', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <button 
            onClick={testVoice}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Test Voice
          </button>
        </div>

        {/* App Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">App Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Auto-speak on detection</span>
              <input
                type="checkbox"
                checked={settings.autoSpeak}
                onChange={(e) => handleChange('autoSpeak', e.target.checked)}
                className="w-4 h-4"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Font Size</label>
              <select 
                value={settings.fontSize}
                onChange={(e) => handleChange('fontSize', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700">
          Save Settings
        </button>
      </div>
    </div>
  );
}