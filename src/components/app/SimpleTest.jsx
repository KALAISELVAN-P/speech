export default function SimpleTest() {
  const testBasicSpeech = () => {
    const utterance = new SpeechSynthesisUtterance('Hello world');
    speechSynthesis.speak(utterance);
    console.log('Basic speech test');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Simple Speech Test</h1>
      
      <button 
        onClick={testBasicSpeech}
        className="bg-red-600 text-white px-6 py-3 rounded text-lg"
      >
        Test Basic Speech
      </button>
      
      <p className="mt-4 text-gray-600">
        Click the button. If you don't hear "Hello world", check:
        <br />• Volume is up
        <br />• Browser allows audio
        <br />• No headphone issues
      </p>
    </div>
  );
}