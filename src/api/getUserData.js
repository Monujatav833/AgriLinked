// const API_BASE_URL = 'http://localhost:3000/profile';

// export const getUserById = async (userId) => {
//   try {
//     const token = localStorage.getItem('authToken'); // Get the token from localStorage
//     const response = await fetch(`${API_BASE_URL}/${userId}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`, // Add the token to the Authorization header
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch user data");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     throw error;
//   }
// };


 const getUserById = async (userId) => {
  try {
    const response = await fetch('/src/component/farmer/dashboard/users.json'); 

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const users = await response.json();
    const user = users.find(u => u.id === userId); 

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};


export default getUserById;