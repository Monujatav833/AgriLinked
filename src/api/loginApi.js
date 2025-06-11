export const loginUser = async (loginData) => {
    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Login failed.");
      }
  
      localStorage.setItem('authToken', data.token); 
  
      return { success: true, message: "Login successful" };
    } catch (error) {
      return { success: false, message: error.message || "Error connecting to server." };
    }
  };
  