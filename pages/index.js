import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { FaUsers, FaEye, FaHeart, FaSearch } from 'react-icons/fa';
import CountUp from 'react-countup';

export default function Home() {
  const [placeId, setPlaceId] = useState('');
  const [gameInfo, setGameInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGameInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/gameInfo?placeId=${placeId}`);
      setGameInfo(response.data);
    } catch (error) {
      console.error('Error fetching game info:', error);
      setError('Failed to fetch game information. Please check the Place ID and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval;
    if (gameInfo) {
      interval = setInterval(() => {
        fetchGameInfo();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [gameInfo]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex flex-col items-center justify-center py-10 px-4">
      <Head>
        <title>Roblox Game Visitor Stats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gray-800 shadow-2xl rounded-3xl p-8 max-w-xl w-full mx-auto backdrop-filter backdrop-blur-lg bg-opacity-90 transform transition-all duration-300 hover:scale-105">
        <h1 className="text-5xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Roblox Game Stats
        </h1>
        
        <p className="text-center text-lg text-gray-300 mb-6">
          Enter the Place ID to view live statistics of your favorite Roblox game!
        </p>
        
        <div className="relative mb-6">
          <input
            type="text"
            value={placeId}
            onChange={(e) => setPlaceId(e.target.value)}
            placeholder="Enter Place ID"
            className="w-full border-2 border-gray-600 p-4 pl-12 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-md text-lg placeholder-gray-400 transition duration-300"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <button
          onClick={fetchGameInfo}
          className={`w-full bg-gradient-to-r from-purple-600 to-indigo-500 text-white p-4 rounded-full font-bold text-lg hover:from-purple-500 hover:to-indigo-400 focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-300 ease-in-out shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Get Info'}
        </button>

        {error && (
          <p className="mt-4 text-red-400 text-center font-medium">{error}</p>
        )}

        {gameInfo && (
          <div className="mt-8 grid grid-cols-1 gap-6">
            {[
              { label: 'Live Player Count', value: gameInfo.playing, icon: <FaUsers className="text-blue-400" /> },
              { label: 'Total Visits', value: gameInfo.visits, icon: <FaEye className="text-green-400" /> },
              { label: 'Favorites', value: gameInfo.favoritedCount, icon: <FaHeart className="text-pink-400" /> },
            ].map(({ label, value, icon }, index) => (
              <div key={index} className="bg-gray-900 p-6 rounded-2xl flex items-center justify-between shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-600">
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-400 mb-1">{label}</p>
                  <CountUp start={0} end={value} duration={1.5} className="text-4xl font-bold text-gray-200" />
                </div>
                <div className="text-5xl">{icon}</div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="mt-8 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Roblox Stats. All rights reserved.</p>
        <p className="mt-2">Built with ❤️ for Roblox fans.</p>
      </footer>
    </div>
  );
}
