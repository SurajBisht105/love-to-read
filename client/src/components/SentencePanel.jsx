import React, { useState } from "react";

function SentencePanel({ sentence, sentenceAudioFile }) {
  const [playbackRate, setPlaybackRate] = useState(1);

  const playAudio = () => {
    const audioSrc = `data:audio/mp3;base64,${sentenceAudioFile}`;
    const audio = new Audio(audioSrc);
    audio.playbackRate = playbackRate;
    audio.play();
  };

  const handlePlaybackChange = (e) => {
    const rate = parseFloat(e.target.value);
    setPlaybackRate(rate);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-800">Sentence Review</h2>
      <p className="mb-4 text-gray-700">{sentence}</p>
      <div className="flex items-center space-x-2">
        <button
          onClick={playAudio}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          🔉
        </button>
      </div>
      <div className="flex flex-col mt-4">
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

export default SentencePanel;
