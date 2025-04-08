import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewOrderForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    client: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      address: ''
    },
    deceased: {
      firstName: '',
      lastName: '',
      birthDate: '',
      deathDate: '',
      deathCertificateNumber: ''
    },
    services: {
      bodyCollection: false,
      coffinPurchase: false,
      funeralCeremony: false
    }
  });

  const handleClientChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      client: {
        ...formData.client,
        [name]: value
      }
    });
  };

  const handleDeceasedChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      deceased: {
        ...formData.deceased,
        [name]: value
      }
    });
  };

  const handleServiceChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      services: {
        ...formData.services,
        [name]: checked
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    // After submission, you might want to navigate to another page
    // navigate('/orders');
  };

  return (
    <div style={styles.container}>
      <div style={styles.formHeader}>
        <h2>Realizacja nowego zlecenia przez recepcję</h2>
        <div style={styles.windowControls}>
          <button style={styles.minimizeButton}>—</button>
          <button style={styles.maximizeButton}>□</button>
          <button style={styles.closeButton}>✕</button>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formContent}>
          <div style={styles.formSection}>
            <div style={styles.sectionHeader}>Dane klienta</div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>imię</label>
              <input
                type="text"
                name="firstName"
                value={formData.client.firstName}
                onChange={handleClientChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>nazwisko</label>
              <input
                type="text"
                name="lastName"
                value={formData.client.lastName}
                onChange={handleClientChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>numer telefonu</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.client.phoneNumber}
                onChange={handleClientChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>adres e-mail</label>
              <input
                type="email"
                name="email"
                value={formData.client.email}
                onChange={handleClientChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>adres zamieszkania</label>
              <input
                type="text"
                name="address"
                value={formData.client.address}
                onChange={handleClientChange}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.formSection}>
            <div style={styles.sectionHeader}>Dane osoby zmarłej</div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>imię</label>
              <input
                type="text"
                name="firstName"
                value={formData.deceased.firstName}
                onChange={handleDeceasedChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>nazwisko</label>
              <input
                type="text"
                name="lastName"
                value={formData.deceased.lastName}
                onChange={handleDeceasedChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>data urodzenia</label>
              <input
                type="text"
                name="birthDate"
                value={formData.deceased.birthDate}
                onChange={handleDeceasedChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>data zgonu</label>
              <input
                type="text"
                name="deathDate"
                value={formData.deceased.deathDate}
                onChange={handleDeceasedChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>numer aktu zgonu</label>
              <input
                type="text"
                name="deathCertificateNumber"
                value={formData.deceased.deathCertificateNumber}
                onChange={handleDeceasedChange}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.formSection}>
            <div style={styles.sectionHeader}>Usługi</div>
            <div style={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="bodyCollection"
                name="bodyCollection"
                checked={formData.services.bodyCollection}
                onChange={handleServiceChange}
                style={styles.checkbox}
              />
              <label htmlFor="bodyCollection" style={styles.checkboxLabel}>
                odebranie ciała przez zakład
              </label>
            </div>
            <div style={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="coffinPurchase"
                name="coffinPurchase"
                checked={formData.services.coffinPurchase}
                onChange={handleServiceChange}
                style={styles.checkbox}
              />
              <label htmlFor="coffinPurchase" style={styles.checkboxLabel}>
                zakup trumny
              </label>
            </div>
            <div style={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="funeralCeremony"
                name="funeralCeremony"
                checked={formData.services.funeralCeremony}
                onChange={handleServiceChange}
                style={styles.checkbox}
              />
              <label htmlFor="funeralCeremony" style={styles.checkboxLabel}>
                ceremonia pochówku
              </label>
            </div>
          </div>
        </div>

        <div style={styles.formActions}>
          <button type="submit" style={styles.submitButton}>
            DODAJ
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '960px',
    margin: '0 auto',
    fontFamily: 'Georgia, serif',
    border: '1px solid #333',
    borderRadius: '3px',
    overflow: 'hidden',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.6)'
  },
  formHeader: {
    backgroundColor: '#1a1a1a',
    color: '#d4d4d4',
    padding: '10px 15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #444'
  },
  windowControls: {
    display: 'flex',
    gap: '5px'
  },
  minimizeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#d4d4d4',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '0 5px'
  },
  maximizeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#d4d4d4',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '0 5px'
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#d4d4d4',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '0 5px'
  },
  form: {
    padding: '20px',
    backgroundColor: '#2a2a2a'
  },
  formContent: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginBottom: '20px'
  },
  formSection: {
    flex: '1 1 300px',
    backgroundColor: '#333',
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)'
  },
  sectionHeader: {
    backgroundColor: '#111',
    color: '#d4d4d4',
    padding: '10px',
    textAlign: 'center',
    marginBottom: '15px',
    borderRadius: '3px',
    fontFamily: 'Times New Roman, serif',
    letterSpacing: '1px',
    borderBottom: '1px solid #777'
  },
  inputGroup: {
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    marginBottom: '5px',
    fontSize: '14px',
    color: '#bbb',
    fontStyle: 'italic'
  },
  input: {
    padding: '8px',
    backgroundColor: '#222',
    border: '1px solid #555',
    borderRadius: '3px',
    fontSize: '14px',
    color: '#ddd'
  },
  checkboxGroup: {
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center'
  },
  checkbox: {
    marginRight: '8px',
    accentColor: '#6b6b6b'
  },
  checkboxLabel: {
    fontSize: '14px',
    color: '#bbb'
  },
  formActions: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  submitButton: {
    backgroundColor: '#4a4a4a',
    color: '#d4d4d4',
    border: 'none',
    padding: '12px 30px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '3px',
    textTransform: 'uppercase',
    fontFamily: 'Times New Roman, serif',
    letterSpacing: '1px',
    transition: 'all 0.3s',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
    ':hover': {
      backgroundColor: '#3a3a3a'
    }
  }
};

export default NewOrderForm;