import { useState, useEffect } from 'react';

export default function VoiceTest() {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
      console.log('Available voices:', availableVoices);
    };
    
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const testSpeak = (text, lang) => {
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (selectedVoice) {
      const voice = voices.find(v => v.name === selectedVoice);
      if (voice) utterance.voice = voice;
    }
    
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Voice Test</h1>
      
      <div className="bg-white p-6 rounded-lg shadow mb-4">
        <h2 className="text-lg font-semibold mb-2">Available Voices</h2>
        <select 
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="">Default Voice</option>
          {voices.map((voice, index) => (
            <option key={index} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold">English</h3>
          <button 
            onClick={() => testSpeak('Hello, how are you?', 'en-US')}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
          >
            Test English
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold">Hindi</h3>
          <button 
            onClick={() => testSpeak('नमस्ते', 'hi-IN')}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
          >
            Test Hindi
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold">Tamil</h3>
          <button 
            onClick={() => testSpeak('வணக்கம்', 'ta-IN')}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
          >
            Test Tamil
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold">Malayalam</h3>
          <button 
            onClick={() => testSpeak('നമസ്കാരം', 'ml-IN')}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
          >
            Test Malayalam
          </button>
        </div>
      </div>
    </div>
  );
}