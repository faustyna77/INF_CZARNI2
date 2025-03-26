import "./TaskPlans.css"
import { useEffect } from "react";


const TaskPlans = () => {
  useEffect(() => {
    const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

    dropdownToggles.forEach((toggle) => {
      toggle.addEventListener("click", function () {
        this.parentElement.classList.toggle("active");
      });
    });

    document.addEventListener("click", function (e) {
      if (!e.target.closest(".custom-dropdown")) {
        document.querySelectorAll(".custom-dropdown").forEach((dropdown) => {
          dropdown.classList.remove("active");
        });
      }
    });
  }, []);

  return (
    <div className="container">
      
      <div className="header">
        <button>Przeglądaj zlecenia</button>
        <button>Generuj raport</button>
        <button>Wyloguj</button>
      </div>

      <div className="info-bar">
        <span>Nazwa/Id/Termin zlecenia</span>
        <span>Data</span>
        <span>Godzina</span>
      </div>

      <div className="task-creation">
        <div className="top-row">
          <div className="form-group">
            <label>Wprowadź nazwę zadania</label>
            <input type="text" className="form-input" />
          </div>

          <div className="form-group">
            <label>Termin wykonania</label>
            <input type="date" className="form-input" />
          </div>
        </div>

        <div className="bottom-row">
          <div className="form-group employee-select">
            <label>Wybierz pracowników</label>
            <div className="custom-dropdown">
              <button className="dropdown-toggle form-input">
                Lista pracowników <span className="arrow">\u25BC</span>
              </button>
              <div className="dropdown-menu">
                {[
                  "Jan Kowalski",
                  "Anna Nowak",
                  "Piotr Wiśniewski",
                  "Maria Lewandowska",
                  "Krzysztof Wójcik",
                ].map((name, index) => (
                  <label key={index} className="dropdown-item">
                    <input type="checkbox" /> {name}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button className="add-task-button">+</button>
        </div>
      </div>

      <div className="task-panel">
        {[30, 50].map((progress, index) => (
          <div className="task" key={index}>
            <div className="task-header">
              <div className="task-name">Nazwa Zadania</div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="task-content">
              <details className="employee-list">
                <summary>Lista przydzielonych pracowników</summary>
                <ul className="employee-dropdown">
                  <li>Pracownik 1</li>
                  <li>Pracownik 2</li>
                  <li>Pracownik 3</li>
                </ul>
              </details>

              <div className="task-buttons">
                <button>Edycja</button>
                <button>Usuń</button>
                <button>Wstrzymaj</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="buttons">
        <button>Dodaj zadanie</button>
        <button>Filtruj</button>
      </div>
    </div>
  );
};

export default TaskPlans;
