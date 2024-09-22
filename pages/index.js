import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { FaUsers, FaEye, FaHeart, FaSearch, FaSun, FaMoon, FaPlus } from 'react-icons/fa';
import CountUp from 'react-countup';

export default function Home() {
  const [placeId, setPlaceId] = useState('');
  const [gameInfo, setGameInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

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
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'} transition-colors duration-300`}>
      <Head>
        <title>Roblox Game Visitor Stats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="backdrop-filter backdrop-blur-lg bg-white bg-opacity-30 rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Roblox Game Stats
            </h1>
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors duration-300"
            >
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
            </button>
          </div>

          <div className="flex justify-center mb-8">
            <img src="/roblox-illustration.svg" alt="Roblox Game Stats" className="w-64 h-64" />
          </div>

          <div className="relative mb-6">
            <input
              type="text"
              value={placeId}
              onChange={(e) => setPlaceId(e.target.value)}
              placeholder="Enter Place ID"
              className="w-full p-4 rounded-2xl bg-gray-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white transition-colors duration-300"
            />
            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <button
            onClick={fetchGameInfo}
            className="w-full py-4 px-6 bg-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Get Info'}
          </button>

          {error && (
            <p className="mt-4 text-red-500 text-center font-medium">{error}</p>
          )}

          {loading ? (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl h-32"></div>
              ))}
            </div>
          ) : gameInfo && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: 'Live Player Count', value: gameInfo.playing, icon: <FaUsers className="text-blue-500" /> },
                { label: 'Total Visits', value: gameInfo.visits, icon: <FaEye className="text-green-500" /> },
                { label: 'Favorites', value: gameInfo.favoritedCount, icon: <FaHeart className="text-pink-500" /> },
              ].map(({ label, value, icon }, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl flex items-center justify-between shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 transform">
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">{label}</p>
                    <CountUp start={0} end={value} duration={1.5} delay={0} className="text-4xl font-bold text-gray-800 dark:text-white" />
                  </div>
                  <div className="text-5xl">{icon}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="text-center text-gray-500 dark:text-gray-400 mt-8 pb-8">
        <p>&copy; {new Date().getFullYear()} Roblox Stats. All rights reserved.</p>
        <p className="mt-2">Built with ❤️ for Roblox fans.</p>
      </footer>

      <button className="fixed bottom-8 right-8 p-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-300">
        <FaPlus />
      </button>
    </div>
  );
}
