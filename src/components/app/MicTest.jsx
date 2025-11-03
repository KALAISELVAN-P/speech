import { useState } from 'react';

export default function MicTest() {
  const [micStatus, setMicStatus] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const testMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicStatus('✅ Microphone access granted');
      
      // Stop the stream
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      setMicStatus('❌ Microphone access denied: ' + error.message);
    }
  };

  const testSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      setMicStatus('❌ Speech Recognition not supported. Use Chrome browser.');
      return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsRecording(true);
      setMicStatus('🎤 Listening... Say something!');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMicStatus('✅ Heard: "' + transcript + '"');
      setIsRecording(false);
    };

    recognition.onerror = (event) => {
      setMicStatus('❌ Error: ' + event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Microphone Test</h1>
      
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <button 
          onClick={testMicrophone}
          className="bg-blue-600 text-white px-6 py-3 rounded mr-4"
        >
          Test Microphone Permission
        </button>
        
        <button 
          onClick={testSpeechRecognition}
          disabled={isRecording}
          className="bg-green-600 text-white px-6 py-3 rounded disabled:opacity-50"
        >
          {isRecording ? 'Listening...' : 'Test Speech Recognition'}
        </button>
        
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <strong>Status:</strong> {micStatus || 'Click a button to test'}
        </div>
        
        <div className="text-sm text-gray-600">
          <p><strong>Troubleshooting:</strong></p>
          <ul className="list-disc ml-5">
            <li>Make sure you're using Chrome browser</li>
            <li>Check if microphone is connected and working</li>
            <li>Allow microphone permission when prompted</li>
            <li>Speak clearly and loudly</li>
            <li>Check system volume/microphone settings</li>
          </ul>
        </div>
      </div>
    </div>
  );
}