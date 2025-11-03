import { useState, useEffect } from 'react';

export default function History() {
  const [historyData, setHistoryData] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // Load history from localStorage
    const saved = localStorage.getItem('gestureHistory');
    if (saved) {
      setHistoryData(JSON.parse(saved));
    } else {
      // Default data
      const defaultData = [
        { phrase: "Hello", time: new Date().toLocaleTimeString(), confidence: "95%", date: new Date().toLocaleDateString() },
        { phrase: "Thank you", time: new Date(Date.now() - 120000).toLocaleTimeString(), confidence: "87%", date: new Date().toLocaleDateString() },
        { phrase: "I need water", time: new Date(Date.now() - 300000).toLocaleTimeString(), confidence: "92%", date: new Date().toLocaleDateString() }
      ];
      setHistoryData(defaultData);
      localStorage.setItem('gestureHistory', JSON.stringify(defaultData));
    }
  }, []);

  const addNewEntry = () => {
    const newEntry = {
      phrase: "New gesture detected",
      time: new Date().toLocaleTimeString(),
      confidence: "88%",
      date: new Date().toLocaleDateString()
    };
    const updated = [newEntry, ...historyData];
    setHistoryData(updated);
    localStorage.setItem('gestureHistory', JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistoryData([]);
    localStorage.removeItem('gestureHistory');
  };

  const exportCSV = () => {
    const csv = 'Phrase,Time,Date,Confidence\n' + 
      historyData.map(item => `${item.phrase},${item.time},${item.date},${item.confidence}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gesture-history.csv';
    a.click();
  };

  const filteredData = historyData.filter(item => 
    item.phrase.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Recognition History</h1>
        <p className="text-gray-600">View your gesture recognition activity</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <div className="flex space-x-2">
            <button 
              onClick={addNewEntry}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Add Entry
            </button>
            <button 
              onClick={exportCSV}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Export CSV
            </button>
            <button 
              onClick={clearHistory}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Clear All
            </button>
          </div>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Filter by phrase..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Phrase</th>
                <th className="text-left py-3">Time</th>
                <th className="text-left py-3">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 font-medium">{item.phrase}</td>
                  <td className="py-3 text-gray-600">{item.time}</td>
                  <td className="py-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                      {item.confidence}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500">Showing {filteredData.length} recognitions</p>
        </div>
      </div>
    </div>
  );
}