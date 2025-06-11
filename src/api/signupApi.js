export const signupUser = async (formData) => {
    try {
      const response = await fetch("http://localhost:3000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Signup failed.");
      }
  
      return { success: true, message: "Signup successful! Please log in." };
    } catch (error) {
      return { success: false, message: error.message || "Error connecting to server." };
    }
  };
  