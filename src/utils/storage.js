const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/players';

export const getPlayers = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch players');
    return await response.json();
  } catch (error) {
    console.error('Error fetching players:', error);
    return [];
  }
};

export const addPlayer = async (player) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(player)
    });
    if (!response.ok) throw new Error('Failed to add player');
    return await response.json();
  } catch (error) {
    console.error('Error adding player:', error);
    throw error;
  }
};

export const getPlayerCount = async () => {
  try {
    const players = await getPlayers();
    return players.length;
  } catch (error) {
    return 0;
  }
};

export const updatePlayer = async (id, updatedData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    });
    if (!response.ok) throw new Error('Failed to update player');
    return await response.json();
  } catch (error) {
    console.error('Error updating player:', error);
    return null;
  }
};

export const deletePlayer = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete player');
    return true;
  } catch (error) {
    console.error('Error deleting player:', error);
    return false;
  }
};
