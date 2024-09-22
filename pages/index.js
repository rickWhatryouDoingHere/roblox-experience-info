import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import CountUp from 'react-countup'; // for smooth number animation

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
    <div className="min-h-screen flex items-center justify-center bg-[url('/gaming-bg.jpg')] bg-cover bg-center">
      <Head>
        <title>Roblox Game Visitor Count</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto p-8 max-w-lg">
        <Header />
        <div className="bg-gray-900 bg-opacity-75 shadow-2xl rounded-lg p-10 space-y-6">
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
  <h1 className="text-6xl font-extrabold text-center text-white mb-12 drop-shadow-md tracking-widest">
    Roblox Stats
  </h1>
);

const PlaceIdInput = ({ placeId, setPlaceId }) => (
  <div className="mb-4">
    <input
      type="text"
      value={placeId}
      onChange={(e) => setPlaceId(e.target.value)}
      placeholder="Enter Place ID"
      className="w-full p-4 rounded-lg bg-gray-800 text-white focus:ring-4 ring-blue-500 focus:outline-none transition-all duration-200"
    />
  </div>
);

const FetchButton = ({ loading, fetchGameInfo }) => (
  <button
    onClick={fetchGameInfo}
    className={`w-full py-4 rounded-lg font-semibold text-xl tracking-wider transition-all duration-300 ${
      loading
        ? 'bg-gray-500 cursor-not-allowed'
        : 'bg-gradient-to-r from-pink-500 to-red-500 text-white hover:scale-105 hover:shadow-lg'
    }`}
    disabled={loading}
  >
    {loading ? 'Fetching...' : 'Get Info'}
  </button>
);

const ErrorMessage = ({ message }) => (
  <p className="mt-4 text-red-500 font-semibold">{message}</p>
);

const GameInfoDisplay = ({ gameInfo }) => (
  <div className="mt-6">
    <h2 className="text-3xl font-bold mb-6 text-center text-white">{gameInfo.name}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <StatCard label="Live Players" value={gameInfo.playing} color="blue" />
      <StatCard label="Total Visits" value={gameInfo.visits.toLocaleString()} color="green" />
      <StatCard label="Favorites" value={gameInfo.favoritedCount.toLocaleString()} color="yellow" />
    </div>
  </div>
);

const StatCard = ({ label, value, color }) => (
  <div className={`p-6 rounded-lg bg-${color}-900 bg-opacity-50 shadow-lg`}>
    <p className="text-lg font-semibold text-gray-300">{label}</p>
    <p className={`text-5xl font-bold text-${color}-400`}>
      <CountUp end={value} duration={1.5} separator="," />
    </p>
  </div>
);
