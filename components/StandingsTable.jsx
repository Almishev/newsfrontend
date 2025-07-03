'use client'
import React, { useEffect, useState } from 'react';

const StandingsTable = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/football-standings');
        
        if (!response.ok) {
          throw new Error('Грешка при зареждане на класирането');
        }
        
        const data = await response.json();
        
        if (data.error) {
          setError(data.error);
        } else {
          setStandings(data.standings || []);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        <span className="ml-3 text-gray-600">Зареждане на класирането...</span>
      </div>
    );
  }

  if (error) {
    const getErrorMessage = (error) => {
      if (error.includes('API_LIMIT_EXCEEDED')) {
        return {
          title: 'Лимит на заявките',
          message: 'Безплатният план е изчерпан. Класирането ще бъде налично утре.',
          icon: '⏰'
        };
      }
      if (error.includes('API_KEY_INVALID')) {
        return {
          title: 'Проблем с достъпа',
          message: 'Проблем с API ключа. Свържете се с администратора.',
          icon: '🔑'
        };
      }
      return {
        title: 'Грешка',
        message: error,
        icon: '⚠️'
      };
    };

    const errorInfo = getErrorMessage(error);
    
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-4xl mb-3">{errorInfo.icon}</div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{errorInfo.title}</h3>
        <p className="text-gray-600">{errorInfo.message}</p>
      </div>
    );
  }

  if (!standings.length || !standings[0]?.table) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Няма налични данни за класирането.</p>
      </div>
    );
  }

  const table = standings[0].table;

  const getPositionColor = (position) => {
    if (position <= 4) return 'bg-green-100 text-green-800'; // Champions League
    if (position <= 6) return 'bg-blue-100 text-blue-800';   // Europa League
    if (position >= 18) return 'bg-red-100 text-red-800';    // Relegation
    return 'bg-gray-100 text-gray-800';                      // Mid-table
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Класиране - Серия А</h2>
        <p className="text-gray-600">Текущо класиране в италианската Серия А</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Поз.</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Отбор</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">М</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">П</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Р</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">З</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">ГР</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">ГА</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">ГР</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Т</th>
            </tr>
          </thead>
          <tbody>
            {table.map((team, index) => (
              <tr 
                key={team.team.id} 
                className={`border-b hover:bg-gray-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold ${getPositionColor(team.position)}`}>
                    {team.position}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    {team.team.crest && (
                      <img 
                        src={team.team.crest} 
                        alt={team.team.name}
                        className="w-6 h-6 mr-3"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                    <span className="font-medium text-gray-800">{team.team.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center text-sm text-gray-600">{team.playedGames}</td>
                <td className="px-4 py-3 text-center text-sm text-gray-600">{team.won}</td>
                <td className="px-4 py-3 text-center text-sm text-gray-600">{team.draw}</td>
                <td className="px-4 py-3 text-center text-sm text-gray-600">{team.lost}</td>
                <td className="px-4 py-3 text-center text-sm text-gray-600">{team.goalsFor}</td>
                <td className="px-4 py-3 text-center text-sm text-gray-600">{team.goalsAgainst}</td>
                <td className="px-4 py-3 text-center text-sm text-gray-600">{team.goalsFor - team.goalsAgainst}</td>
                <td className="px-4 py-3 text-center text-sm font-semibold text-gray-800">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span>Champions League</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span>Europa League</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
          <span>Средна класация</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span>Изпадане</span>
        </div>
      </div>
    </div>
  );
};

export default StandingsTable; 