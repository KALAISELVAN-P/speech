import { useState, useRef, useEffect } from 'react';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { HAND_CONNECTIONS } from '@mediapipe/hands';
import { mediaService } from '../../services/mediaService';
import { gestureService } from '../../services/gestureService';
import { speechService } from '../../services/speechService';

export default function LiveDetection() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [detectedGesture, setDetectedGesture] = useState('');
  const [sessionHistory, setSessionHistory] = useState([]);
  const [error, setError] = useState('');
  const [cameraPermission, setCameraPermission] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');

  const languages = {
    'en-US': { name: 'English', phrases: {
      'pointing': 'I need water',
      'open_palm': 'Hello',
      'fist': 'Thank you',
      'thumbs_up': 'Good',
      'peace': 'Peace'
    }},
    'hi-IN': { name: 'Hindi', phrases: {
      'pointing': 'मुझे पानी चाहिए',
      'open_palm': 'नमस्ते',
      'fist': 'धन्यवाद',
      'thumbs_up': 'अच्छा',
      'peace': 'शांति'
    }},
    'ta-IN': { name: 'Tamil', phrases: {
      'pointing': 'எனக்கு தண்ணீர் வேண்டும்',
      'open_palm': 'வணக்கம்',
      'fist': 'நன்றி',
      'thumbs_up': 'நல்லது',
      'peace': 'அமைதி'
    }},
    'ml-IN': { name: 'Malayalam', phrases: {
      'pointing': 'എനിക്ക് വെള്ളം വേണം',
      'open_palm': 'നമസ്കാരം',
      'fist': 'നന്ദി',
      'thumbs_up': 'നല്ലത്',
      'peace': 'സമാധാനം'
    }}
  };

  useEffect(() => {
    speechService.setLanguage(selectedLanguage);
  }, [selectedLanguage]);

  useEffect(() => {
    return () => {
      if (mediaService) {
        mediaService.destroy();
      }
    };
  }, []);

  const onResults = (results) => {
    const canvasCtx = canvasRef.current?.getContext('2d');
    if (!canvasCtx) return;

    // Clear canvas
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // Draw video frame
    canvasCtx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);

    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        // Draw hand landmarks and connections
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
          color: '#00FF00',
          lineWidth: 2
        });
        drawLandmarks(canvasCtx, landmarks, {
          color: '#FF0000',
          lineWidth: 1,
          radius: 3
        });

        // Recognize gesture
        const recognition = gestureService.recognizeGesture(landmarks);
        if (recognition && recognition.gesture !== 'unknown') {
          const localizedPhrase = languages[selectedLanguage].phrases[recognition.gesture] || recognition.phrase;
          
          setDetectedGesture(recognition.gesture);
          setCurrentPhrase(localizedPhrase);
          
          // Speak the phrase
          speechService.speak(localizedPhrase);
          
          // Add to session history
          const historyItem = {
            phrase: localizedPhrase,
            gesture: recognition.gesture,
            timestamp: new Date().toLocaleTimeString(),
            confidence: recognition.confidence
          };
          
          setSessionHistory(prev => {
            const newHistory = [historyItem, ...prev];
            return newHistory.slice(0, 10); // Keep last 10 items
          });
        }
      }
    } else {
      setDetectedGesture('');
      setCurrentPhrase('No hand detected');
    }

    canvasCtx.restore();
  };

  const startDetection = async () => {
    try {
      setError('');
      
      // Check camera permission
      const hasPermission = await mediaService.requestCameraPermission();
      if (!hasPermission) {
        setError('Camera permission is required for gesture detection');
        return;
      }
      setCameraPermission(true);

      // Initialize MediaPipe
      await mediaService.initialize(videoRef.current, canvasRef.current, onResults);
      
      // Start camera
      await mediaService.startCamera();
      setIsActive(true);
      
    } catch (error) {
      console.error('Failed to start detection:', error);
      setError('Failed to start camera: ' + error.message);
    }
  };

  const stopDetection = () => {
    mediaService.stopCamera();
    setIsActive(false);
    setCurrentPhrase('');
    setDetectedGesture('');
  };

  const clearHistory = () => {
    setSessionHistory([]);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Gesture Detection</h1>
        <p className="text-gray-600">Use your webcam to detect hand gestures and convert them to speech</p>
      </div>

      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Feed */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="relative">
              <video
                ref={videoRef}
                className="hidden"
                width="640"
                height="480"
                autoPlay
                playsInline
              />
              <canvas
                ref={canvasRef}
                width="640"
                height="480"
                className="w-full h-auto border rounded-lg bg-gray-100"
              />
              
              {!isActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📹</div>
                    <p className="text-gray-600 mb-4">Camera feed will appear here</p>
                    <button
                      onClick={startDetection}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Start Detection
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div className="flex space-x-4">
                {isActive ? (
                  <button
                    onClick={stopDetection}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Stop Detection
                  </button>
                ) : (
                  <button
                    onClick={startDetection}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Start Detection
                  </button>
                )}
                
                <select
                  value={selectedLanguage}
                  onChange={(e) => {
                    const newLang = e.target.value;
                    setSelectedLanguage(newLang);
                    speechService.setLanguage(newLang);
                  }}
                  className="px-3 py-2 border rounded-lg"
                >
                  {Object.entries(languages).map(([code, lang]) => (
                    <option key={code} value={code}>{lang.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <span className="text-sm text-gray-600">
                  {isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detection Results */}
        <div className="space-y-6">
          {/* Current Detection */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-3">Current Detection</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Gesture:</label>
                <p className="text-lg font-medium text-blue-600">
                  {detectedGesture || 'None'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Phrase:</label>
                <p className="text-xl font-bold text-gray-900 min-h-[2rem]">
                  {currentPhrase || 'Waiting for gesture...'}
                </p>
              </div>
              {speechService.isSpeaking() && (
                <div className="flex items-center space-x-2 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">Speaking...</span>
                </div>
              )}
            </div>
          </div>

          {/* Session History */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Session History</h3>
              {sessionHistory.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Clear
                </button>
              )}
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {sessionHistory.length === 0 ? (
                <p className="text-gray-500 text-sm">No gestures detected yet</p>
              ) : (
                sessionHistory.map((item, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-3 py-2">
                    <p className="font-medium text-gray-900">{item.phrase}</p>
                    <p className="text-xs text-gray-500">
                      {item.timestamp} • {item.gesture}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Available Gestures */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-3">Available Gestures ({languages[selectedLanguage].name})</h3>
            <div className="space-y-2">
              {Object.entries(languages[selectedLanguage].phrases).map(([gesture, phrase]) => (
                <div key={gesture} className="flex justify-between text-sm">
                  <span className="font-medium">{gesture.replace('_', ' ')}</span>
                  <span className="text-gray-600">"{phrase}"</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}