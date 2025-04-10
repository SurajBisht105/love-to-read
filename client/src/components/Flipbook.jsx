import React, { useState, useEffect } from "react";
import axios from "axios";
import WordPanel from "./WordPanel";
import SentencePanel from "./SentencePanel";

function FlipBook() {
  // pairIndex is set to the starting page of the pair (assume 1 or 3, etc.)
  const [pairIndex, setPairIndex] = useState(1);
  const [wordPage, setWordPage] = useState(null);
  const [sentencePage, setSentencePage] = useState(null);

  useEffect(() => {
    const leftPageNumber = pairIndex; // Word page (odd number)
    const rightPageNumber = pairIndex + 1; // Sentence page (even number)
    fetchPairPages(leftPageNumber, rightPageNumber);
  }, [pairIndex]);

  const fetchPairPages = async (leftPage, rightPage) => {
    try {
      const baseUrl = import.meta.env.REACT_APP_API_URL;
      const [wordRes, sentenceRes] = await Promise.all([
        axios.get(`${baseUrl}/api/pages/${leftPage}`),
        axios.get(`${baseUrl}/api/pages/${rightPage}`),
      ]);
      setWordPage(wordRes.data);
      setSentencePage(sentenceRes.data);
    } catch (error) {
      console.error("Error fetching page data:", error);
      setWordPage(null);
      setSentencePage(null);
    }
  };

  const nextPair = () => {
    // For this demo: if pairIndex is 1, next becomes 3; if it is 3, cycle back to 1.
    setPairIndex((prev) => (prev === 1 ? 3 : 1));
  };

  const prevPair = () => {
    setPairIndex((prev) => (prev === 1 ? 3 : 1));
  };

  if (!wordPage || !sentencePage) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-md p-6">
      {/* Navigation Controls */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevPair}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Previous
        </button>
        <div className="text-lg font-bold">
          Pages {wordPage.pageNumber} &amp; {sentencePage.pageNumber}
        </div>
        <button
          onClick={nextPair}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
      {/* Two‑section Layout */}
      <div className="flex flex-col md:flex-row">
        {/* Left section: Word Panel */}
        <div className="md:w-1/2 border-r border-gray-200 pr-4">
          <WordPanel words={wordPage.words} />
        </div>
        {/* Right section: Sentence Panel */}
        <div className="md:w-1/2 pl-4">
          <SentencePanel
            sentence={sentencePage.sentence}
            sentenceAudioFile={sentencePage.sentenceAudioFile}
          />
        </div>
      </div>
    </div>
  );
}

export default FlipBook;
