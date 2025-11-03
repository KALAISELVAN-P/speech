import { useState, useRef } from 'react';

export default function VoiceToText() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState('');
  const recognitionRef = useRef(null);

  const startListening = async () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition not supported in this browser. Use Chrome.');
      return;
    }

    // Request microphone permission
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      setError('Microphone permission denied. Please allow microphone access.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';
    
    console.log('Starting speech recognition...');

    recognitionRef.current.onstart = () => {
      setIsListening(true);
      setError('');
    };

    recognitionRef.current.onresult = (event) => {
      let finalTranscript = '';
      let interim = '';
      
      for (let i = 0; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interim += transcript;
        }
      }
      
      if (finalTranscript) {
        setTranscript(prev => prev + finalTranscript);
      }
      
      setInterimTranscript(interim);
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setError('Error: ' + event.error + '. Try speaking louder or check microphone.');
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      console.log('Speech recognition ended');
      setIsListening(false);
    };

    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const clearText = () => {
    setTranscript('');
    setInterimTranscript('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Voice to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Text</span>
          </h1>
          <p className="text-xl text-gray-600">Convert your speech to text in real-time</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex justify-center space-x-4 mb-6">
            {!isListening ? (
              <button
                onClick={startListening}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg"
              >
                🎤 Start Recording
              </button>
            ) : (
              <button
                onClick={stopListening}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg"
              >
                ⏹️ Stop Recording
              </button>
            )}
            
            <button
              onClick={clearText}
              className="bg-gray-500 text-white px-6 py-4 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-300"
            >
              Clear
            </button>
          </div>

          {isListening && (
            <div className="text-center mb-6">
              <div className="inline-flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 font-medium">Listening...</span>
              </div>
            </div>
          )}

          <div className="bg-gray-50 rounded-xl p-6 min-h-[200px] border-2 border-dashed border-gray-300">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Real-time Transcript:</h3>
            <div className="text-lg leading-relaxed">
              {transcript && (
                <span className="text-gray-900">{transcript}</span>
              )}
              {interimTranscript && (
                <span className="text-blue-600 italic bg-blue-50 px-1 rounded">{interimTranscript}</span>
              )}
              {!transcript && !interimTranscript && (
                <span className="text-gray-500 italic">
                  Your speech will appear here in real-time...
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Instructions:</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Click "Start Recording" to begin voice recognition</li>
            <li>• Speak clearly into your microphone</li>
            <li>• <span className="text-blue-600 font-medium">Blue italic text</span> shows what you're currently saying</li>
            <li>• <span className="text-gray-900 font-medium">Black text</span> shows finalized speech</li>
            <li>• Click "Stop Recording" when finished</li>
            <li>• Use "Clear" to reset the transcript</li>
          </ul>
        </div>
      </div>
    </div>
  );
}