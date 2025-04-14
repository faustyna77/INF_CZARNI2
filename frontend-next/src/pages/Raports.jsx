// Raports.jsx
const Raports = () => {
  return (
    <div className="container mx-auto p-4 bg-gray-900 text-gray-100">
      <div className="bg-gray-800 p-4 rounded-lg shadow mb-4 flex justify-between">
        <button className="bg-gray-700 hover:bg-gray-600 text-gray-100 px-4 py-2 rounded transition-colors">Przeglądaj zlecenia</button>
        <button className="bg-gray-700 hover:bg-gray-600 text-gray-100 px-4 py-2 rounded transition-colors">Plan zadań</button>
        <button className="bg-red-700 hover:bg-red-600 text-gray-100 px-4 py-2 rounded transition-colors">Wyloguj</button>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow mb-4 flex justify-between text-gray-300">
        <span>Nazwa/Id/Termin zlecenia</span>
        <span>Data</span>
        <span>Godzina</span>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="bg-gray-800 p-4 rounded-lg shadow flex-1">
          {[
            { name: "Plik wyjściowy", progress: 100, checked: true },
            { name: "Archiwizuj", progress: 15, checked: false },
            { name: "Usuń", progress: 100, checked: true },
            { name: "Generuj", progress: 75, checked: true },
            { name: "Filtrowanie", progress: 90, checked: true },
          ].map((task, i) => (
            <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-2" key={i}>
              <div className="flex-1 mr-4">
                <span className="block mb-1">{task.name}</span>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${task.progress === 100 ? 'bg-green-500' : 'bg-purple-500'}`}
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
              </div>
              <input type="checkbox" className="h-5 w-5" defaultChecked={task.checked} />
            </div>
          ))}
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow flex-1">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Plik wyjściowy</span>
              <button className="bg-gray-700 hover:bg-gray-600 w-8 h-8 flex items-center justify-center rounded font-bold">+</button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded transition-colors text-sm">Archiwizuj</button>
              <button className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded transition-colors text-sm">Usuń</button>
              <button className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded transition-colors text-sm">Generuj</button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Filtrowanie</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-1 text-sm">Filtruj po nazwie</label>
                <input type="text" className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-gray-200" />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 text-sm">Sortuj</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-gray-200">
                  <option>Czas</option>
                  <option>Alfabetycznie</option>
                </select>
              </div>
            </div>
            <button className="mt-4 bg-purple-700 hover:bg-purple-600 text-white w-full py-2 rounded transition-colors">
              Zastosuj Filtr
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Raports;