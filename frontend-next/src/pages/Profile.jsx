// Profile.jsx
const Profile = () => {
  const username = "admin"; // Możesz też pobrać z propsów lub contextu

  return (
    <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 max-w-md w-full shadow-lg text-center">
        <h1 className="text-2xl mb-4">Witaj, {username}!</h1>
        <p className="text-gray-300 mb-6">To jest Twoja strona profilu użytkownika.</p>

        <div className="border-t border-gray-600 pt-4 text-gray-400 text-sm">
          <p>
            Rola: <span className="text-white font-bold">Administrator</span>
          </p>
          <p>
            Status: <span className="text-green-500 font-bold">Aktywny</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;