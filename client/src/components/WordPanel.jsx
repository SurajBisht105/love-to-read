import React, { useState ,useRef} from "react";

function WordPanel({ words }) {
    const [playbackRate, setPlaybackRate] = useState(1);
    const sentenceAudioRef = useRef(null);
  

  // Function to play the base64-encoded audio with playback rate
  const playAudio = (audioBase64) => {
    const audioSrc = `data:audio/mp3;base64,${audioBase64}`;
    const audio = new Audio(audioSrc);
    audio.playbackRate = playbackRate;
    audio.play();
  };

  const handlePlaybackChange = (e) => {
    const rate = parseFloat(e.target.value);
    setPlaybackRate(rate);
    if (sentenceAudioRef.current) {
      sentenceAudioRef.current.playbackRate = rate;
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-800">Word Review</h2>
      <div className="space-y-3">
        {words && words.length > 0 ? (
          words.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 p-2 rounded space-x-2"
            >
              <span className="text-gray-700">{item.word}</span>
              <button
                onClick={() => playAudio(item.audioFile)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                🔉
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No words available.</p>
        )}
      </div>
      <div className="flex items-center space-x-2">
          <label className="text-gray-700">Speed:</label>
          <select
            value={playbackRate}
            onChange={handlePlaybackChange}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value={0.5}>🐌</option>
            <option value={1}>🚶🏻‍♂️</option>
            <option value={1.5}>🏃🏻‍♀️</option>
          </select>
        </div>
    </div>
  );
}

export default WordPanel;