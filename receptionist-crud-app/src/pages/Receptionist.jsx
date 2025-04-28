const Receptionist = () => {
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

  const [orders, setOrders] = useState([]);
  const [editingOrderId, setEditingOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const fetchedOrders = await receptionistService.getOrders();
    setOrders(fetchedOrders);
  };

  const handleClientChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      client: {
        ...prevData.client,
        [name]: value
      }
    }));
  };

  const handleDeceasedChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      deceased: {
        ...prevData.deceased,
        [name]: value
      }
    }));
  };

  const handleServiceChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      services: {
        ...prevData.services,
        [name]: checked
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingOrderId) {
      await receptionistService.updateOrder(editingOrderId, formData);
    } else {
      await receptionistService.createOrder(formData);
    }
    resetForm();
    fetchOrders();
  };

  const resetForm = () => {
    setFormData({
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
    setEditingOrderId(null);
  };

  const handleEditOrder = (order) => {
    setFormData({
      client: {
        firstName: order.client.firstName,
        lastName: order.client.lastName,
        phoneNumber: order.client.phoneNumber,
        email: order.client.email,
        address: order.client.address
      },
      deceased: {
        firstName: order.deceased.firstName,
        lastName: order.deceased.lastName,
        birthDate: order.deceased.birthDate,
        deathDate: order.deceased.deathDate,
        deathCertificateNumber: order.deceased.deathCertificateNumber
      },
      services: order.services
    });
    setEditingOrderId(order.id);
  };

  const handleDeleteOrder = async (orderId) => {
    await receptionistService.deleteOrder(orderId);
    fetchOrders();
  };

  return (
    <div>
      <h1>New Order Form</h1>
      <form onSubmit={handleSubmit}>
        {/* Client Information Fields */}
        <h2>Client Information</h2>
        <input type="text" name="firstName" value={formData.client.firstName} onChange={handleClientChange} placeholder="First Name" required />
        <input type="text" name="lastName" value={formData.client.lastName} onChange={handleClientChange} placeholder="Last Name" required />
        <input type="text" name="phoneNumber" value={formData.client.phoneNumber} onChange={handleClientChange} placeholder="Phone Number" required />
        <input type="email" name="email" value={formData.client.email} onChange={handleClientChange} placeholder="Email" required />
        <input type="text" name="address" value={formData.client.address} onChange={handleClientChange} placeholder="Address" required />

        {/* Deceased Information Fields */}
        <h2>Deceased Information</h2>
        <input type="text" name="firstName" value={formData.deceased.firstName} onChange={handleDeceasedChange} placeholder="First Name" required />
        <input type="text" name="lastName" value={formData.deceased.lastName} onChange={handleDeceasedChange} placeholder="Last Name" required />
        <input type="date" name="birthDate" value={formData.deceased.birthDate} onChange={handleDeceasedChange} required />
        <input type="date" name="deathDate" value={formData.deceased.deathDate} onChange={handleDeceasedChange} required />
        <input type="text" name="deathCertificateNumber" value={formData.deceased.deathCertificateNumber} onChange={handleDeceasedChange} placeholder="Death Certificate Number" required />

        {/* Services Selection */}
        <h2>Services</h2>
        <label>
          <input type="checkbox" name="bodyCollection" checked={formData.services.bodyCollection} onChange={handleServiceChange} />
          Body Collection
        </label>
        <label>
          <input type="checkbox" name="coffinPurchase" checked={formData.services.coffinPurchase} onChange={handleServiceChange} />
          Coffin Purchase
        </label>
        <label>
          <input type="checkbox" name="funeralCeremony" checked={formData.services.funeralCeremony} onChange={handleServiceChange} />
          Funeral Ceremony
        </label>

        <button type="submit">{editingOrderId ? 'Update Order' : 'Create Order'}</button>
      </form>

      <h2>Existing Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            {order.client.firstName} {order.client.lastName} - {order.deceased.firstName} {order.deceased.lastName}
            <button onClick={() => handleEditOrder(order)}>Edit</button>
            <button onClick={() => handleDeleteOrder(order.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Receptionist;