import { useState } from 'react';
import { speechService } from '../../services/speechService';

export default function TestLanguage() {
  const [selectedLang, setSelectedLang] = useState('en-US');
  
  const languages = {
    'en-US': { name: 'English', text: 'Hello, how are you?' },
    'hi-IN': { name: 'Hindi', text: 'नमस्ते, आप कैसे हैं?' },
    'ta-IN': { name: 'Tamil', text: 'வணக்கம், நீங்கள் எப்படி இருக்கிறீர்கள்?' },
    'ml-IN': { name: 'Malayalam', text: 'നമസ്കാരം, നിങ്ങൾ എങ്ങനെയുണ്ട്?' }
  };

  const testSpeak = () => {
    speechService.setLanguage(selectedLang);
    speechService.speak(languages[selectedLang].text, true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Test Language Speech</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <select 
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          {Object.entries(languages).map(([code, lang]) => (
            <option key={code} value={code}>{lang.name}</option>
          ))}
        </select>
        
        <p className="mb-4 text-lg">{languages[selectedLang].text}</p>
        
        <button 
          onClick={testSpeak}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Test Speech
        </button>
      </div>
    </div>
  );
}