'use client'
import React, { useEffect, useState } from 'react';
import StandingsTable from '../../components/StandingsTable';

const Results = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        // Използваме нашия Next.js API route
        const response = await fetch('/api/football-results');
        
        if (!response.ok) {
          throw new Error('Грешка при зареждане на резултатите');
        }
        
        const data = await response.json();
        
        if (data.error) {
          setError(data.error);
        } else {
          setMatches(data.matches || []);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Зареждане на резултатите...</p>
        </div>
      </div>
    );
  }

  if (error) {
    const getErrorMessage = (error) => {
      if (error.includes('API_LIMIT_EXCEEDED')) {
        return {
          title: 'Достигнат лимит на заявките',
          message: 'Безплатният план на football-data.org е изчерпан за деня. Моля, опитайте утре или се свържете с администратора за обновяване на плана.',
          icon: '⏰',
          action: 'Опитайте утре'
        };
      }
      if (error.includes('API_KEY_INVALID')) {
        return {
          title: 'Проблем с достъпа',
          message: 'Има проблем с API ключа за football-data.org. Моля, се свържете с администратора.',
          icon: '🔑',
          action: 'Свържете се с администратора'
        };
      }
      return {
        title: 'Грешка при зареждане',
        message: error,
        icon: '⚠️',
        action: 'Опитайте отново'
      };
    };

    const errorInfo = getErrorMessage(error);
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">{errorInfo.icon}</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">{errorInfo.title}</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">{errorInfo.message}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            {errorInfo.action}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Серия А - Резултати</h1>
          <p className="text-gray-600">Последни резултати от италианската Серия А</p>
        </div>

        {matches.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-600">Няма налични резултати в момента.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {matches.slice(0, 20).map(match => (
              <div key={match.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-right">
                    <h3 className="font-semibold text-gray-800">{match.homeTeam.name}</h3>
                  </div>
                  
                  <div className="mx-6 text-center">
                    <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
                      {match.score?.fullTime?.home !== null ? match.score.fullTime.home : '-'} : {match.score?.fullTime?.away !== null ? match.score.fullTime.away : '-'}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {match.status === 'FINISHED' ? 'Завършен' : 
                       match.status === 'SCHEDULED' ? 'Предстои' : 
                       match.status === 'LIVE' ? 'На живо' : match.status}
                    </div>
                  </div>
                  
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-gray-800">{match.awayTeam.name}</h3>
                  </div>
                </div>
                
                {match.utcDate && (
                  <div className="text-center mt-3 text-sm text-gray-500">
                    {new Date(match.utcDate).toLocaleDateString('bg-BG', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Класиране */}
      <div className="mt-12">
        <StandingsTable />
      </div>
    </div>
  );
};

export default Results;