import React from "react";
import Home from "./pages/Home";

function App() {
  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="p-4 bg-blue-600 text-white text-center font-bold text-2xl">
        Love to Read
      </header>
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <Home />
      </main>
    </div>
  );
}

export default App;