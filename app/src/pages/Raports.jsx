
import '../Raports.css';

const Raports = () => {
    return (
      
          <div className="container">
          
        <div className="header">
          <button>Przeglądaj zlecenia</button>
          <button>Plan zadań</button>
          <button>Wyloguj</button>
        </div>
  
        <div className="info-bar">
          <span>Nazwa/Id/Termin zlecenia</span>
          <span>Data</span>
          <span>Godzina</span>
        </div>
  
        <div className="main-content">
          <div className="report-panel">
            {[
              { name: "Plik wyjściowy", progress: 100, checked: true },
              { name: "Archiwizuj", progress: 15, checked: false },
              { name: "Usuń", progress: 100, checked: true },
              { name: "Generuj", progress: 75, checked: true },
              { name: "Filtrowanie", progress: 90, checked: true },
            ].map((task, i) => (
              <div className="task-item" key={i}>
                <div className="task-content">
                  <span className="task-name">{task.name}</span>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                </div>
                <input type="checkbox" className="task-checkbox" defaultChecked={task.checked} />
              </div>
            ))}
          </div>
  
          <div className="settings-panel">
            <div className="settings-group">
              <div className="file-action">
                <span className="action-label">Plik wyjściowy</span>
                <button className="square-button">+</button>
              </div>
              <div className="action-buttons">
                <button className="square-button">Archiwizuj</button>
                <button className="square-button">Usuń</button>
                <button className="square-button">Generuj</button>
              </div>
            </div>
  
            <div className="settings-group">
              <h3>Filtrowanie</h3>
              <div className="filter-controls">
                <div className="filter-input">
                  <label>Filtruj po nazwie</label>
                  <input type="text" className="form-input" />
                </div>
                <div className="sort-select">
                  <label>Sortuj</label>
                  <select className="form-input">
                    <option>Czas</option>
                    <option>Alfabetycznie</option>
                  </select>
                </div>
              </div>
              <button className="apply-button">Zastosuj Filtr</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Raports;