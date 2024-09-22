import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';

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
    if (!gameInfo) return;
    const interval = setInterval(fetchGameInfo, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, [gameInfo]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-blue-400 flex items-center justify-center">
      <Head>
        <title>Roblox Game Visitor Count</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto p-4 max-w-xl">
        <Header />
        <div className="bg-white shadow-xl rounded-lg p-8 mb-6">
          <PlaceIdInput placeId={placeId} setPlaceId={setPlaceId} />
          <FetchButton loading={loading} fetchGameInfo={fetchGameInfo} />
          {error && <ErrorMessage message={error} />}
          {gameInfo && <GameInfoDisplay gameInfo={gameInfo} />}
        </div>
      </main>
    </div>
  );
}

const Header = () => (
  <h1 className="text-5xl font-extrabold text-center mb-8 text-white drop-shadow-lg">
    Roblox Game Visitor Count
  </h1>
);

const PlaceIdInput = ({ placeId, setPlaceId }) => (
  <div className="mb-4">
    <input
      type="text"
      value={placeId}
      onChange={(e) => setPlaceId(e.target.value)}
      placeholder="Enter Place ID"
      className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 shadow-sm"
    />
  </div>
);

const FetchButton = ({ loading, fetchGameInfo }) => (
  <button
    onClick={fetchGameInfo}
    className={`w-full p-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
      loading
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-indigo-600 hover:to-blue-600'
    }`}
    disabled={loading}
  >
    {loading ? 'Loading...' : 'Get Info'}
  </button>
);

const ErrorMessage = ({ message }) => (
  <p className="mt-4 text-red-600 font-semibold">{message}</p>
);

const GameInfoDisplay = ({ gameInfo }) => (
  <div className="mt-6">
    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">{gameInfo.name}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <StatCard label="Live Player Count" value={gameInfo.playing} color="blue" />
      <StatCard label="Total Visits" value={gameInfo.visits.toLocaleString()} color="green" />
      <StatCard label="Favorites" value={gameInfo.favoritedCount.toLocaleString()} color="yellow" />
    </div>
  </div>
);

const StatCard = ({ label, value, color }) => (
  <div className={`bg-${color}-100 p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105`}>
    <p className="text-lg font-semibold text-gray-700">{label}</p>
    <p className={`text-4xl font-extrabold text-${color}-600`}>{value}</p>
  </div>
);
