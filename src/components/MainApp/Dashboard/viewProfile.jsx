import { useState, useEffect } from 'react';
import Profile from './profile';
import { getUserById } from './getUserData';  
import jwt_decode from 'jwt-decode'; 
import './index.css';

function ViewProfile() {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      setError('No token found');
      setLoading(false);
      return;
    }

    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;

    setCurrentUserId(userId);

    const fetchUser = async () => {
      if (!userId) {
        setError('User ID not found in token');
        setLoading(false);
        return;
      }

      try {
        const userData = await getUserById(userId); 
        setViewingUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Profile currentUserId={currentUserId} viewingUser={viewingUser} />
    </div>
  );
}

export default ViewProfile;
