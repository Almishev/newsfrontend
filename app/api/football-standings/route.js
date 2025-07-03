export async function GET() {
  try {
    const response = await fetch('https://api.football-data.org/v4/competitions/SA/standings', {
      headers: { 
        'X-Auth-Token': '33372ecabddd4e35a39682d6af3cef7e',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      // Проверяваме за специфични грешки
      if (response.status === 429) {
        return Response.json(
          { 
            error: 'API_LIMIT_EXCEEDED',
            message: 'Достигнат е лимитът на заявките. Моля, опитайте по-късно или се свържете с администратора.'
          },
          { status: 429 }
        );
      }
      
      if (response.status === 403) {
        return Response.json(
          { 
            error: 'API_KEY_INVALID',
            message: 'Проблем с API ключа. Моля, се свържете с администратора.'
          },
          { status: 403 }
        );
      }

      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return Response.json({ standings: data.standings || [] });
  } catch (error) {
    console.error('Error fetching football standings:', error);
    return Response.json(
      { 
        error: 'NETWORK_ERROR',
        message: 'Грешка при зареждане на класирането. Моля, проверете интернет връзката.'
      },
      { status: 500 }
    );
  }
} 