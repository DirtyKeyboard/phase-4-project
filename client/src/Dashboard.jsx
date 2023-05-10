import React from 'react';

const Dashboard = () => {
  const handleSignOut = () => {
    // Logic for signing out
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-800">
        {/* Navbar */}
        <nav className="flex flex-col justify-start h-full py-4 px-8 text-white">
          <div className="flex items-center justify-end mb-8">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVe0cFaZ9e5Hm9X-tdWRLSvoZqg2bjemBABA&usqp=CAU"
              alt="User"
              className="w-12 h-12 rounded-full"
              onClick={handleSignOut}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <a href="/" className="text-xl font-semibold mb-4">
            Link 1
          </a>
          <a href="/" className="text-xl font-semibold mb-4">
            Link 2
          </a>
          <a href="/" className="text-xl font-semibold mb-4">
            Link 3
          </a>
        </nav>
      </div>
      <div className="w-3/4 bg-gray-200">
        <div className="flex justify-center h-screen items-center flex-col gap-6">
          <h1 className="text-white text-6xl">Welcome to the Song Picker</h1>
          <p className="text-lg text-gray-600 mb-8">Let's find a song</p>
          <div className="bg-white p-6 rounded shadow">
            <p className="text-xl mb-4">Blah</p>
            <ul className="flex gap-4">
              <li>link 1</li>
              <li>link 2</li>
              <li>link 3</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
