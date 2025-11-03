import { useState } from 'react';

export default function Train() {
  const [phrase, setPhrase] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [customGestures, setCustomGestures] = useState([
    { name: 'Wave Hello', samples: 5 },
    { name: 'Goodbye', samples: 3 }
  ]);

  const startRecording = () => {
    if (!phrase.trim()) {
      alert('Please enter a phrase first');
      return;
    }
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setCustomGestures(prev => [...prev, { name: phrase, samples: 1 }]);
      setPhrase('');
      alert('Gesture recorded successfully!');
    }, 3000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Train Custom Gestures</h1>
        <p className="text-gray-600">Create and train your own gesture vocabulary</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Record New Gesture</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter phrase for this gesture"
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">{isRecording ? '🔴' : '📹'}</div>
                <p className="text-gray-600">
                  {isRecording ? 'Recording gesture...' : 'Camera feed for training'}
                </p>
              </div>
            </div>
            <button 
              onClick={startRecording}
              disabled={isRecording}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isRecording ? 'Recording...' : 'Start Recording'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Your Custom Gestures</h2>
          <div className="space-y-3">
            {customGestures.map((gesture, index) => (
              <div key={index} className="border-l-4 border-green-500 pl-3 py-2">
                <p className="font-medium">{gesture.name}</p>
                <p className="text-sm text-gray-500">{gesture.samples} samples recorded</p>
              </div>
            ))}
            <p className="text-gray-500 text-sm mt-4">Record more gestures to improve accuracy</p>
          </div>
        </div>
      </div>
    </div>
  );
}