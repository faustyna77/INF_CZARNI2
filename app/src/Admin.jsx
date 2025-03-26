import Navigation from "./Navigation";

const Admin = ({ token, handleLogout }) => {
  return (
    <div>
      <Navigation token={token} handleLogout={handleLogout} />
      {/* reszta panelu admina */}
    </div>
  );
};

export default Admin;
