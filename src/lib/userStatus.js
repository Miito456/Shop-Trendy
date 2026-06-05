const API_BASE_URL = 'http://localhost:3001/api';

export const fetchUserProfile = async (userId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/users/${userId}`);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'No se pudo obtener el perfil del usuario');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const isInactiveUser = (profile) => {
  // Verifica si el usuario está inactivo en la base de datos
  return profile?.status === 'Inactivo';
};

export const updateUserStatus = async (userId, status) => {
  try {
    const res = await fetch(`${API_BASE_URL}/users/${userId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status })
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'No se pudo actualizar el estado del usuario');
    }

    return res.json();
  } catch (error) {
    console.error('Error updating user status:', error);
    throw error;
  }
};
