import { useState, useEffect } from "react";
const App = ({ token, setToken }) => {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen font-serif">
      <main className="p-12 text-center">
        <h1 className="text-4xl mb-2 font-light">
          Aplikacja zakładu pogrzebowego — Wieczny Spokój
        </h1>
        {token ? (
          <p className="text-xl text-gray-300">Zalogowano ✅</p>
        ) : (
          <p className="text-xl text-gray-300">
            Nie jesteś zalogowany. Przejdź do logowania.
          </p>
        )}
      </main>
    </div>
  );
};

export default App;