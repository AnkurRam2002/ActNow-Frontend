import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = JSON.parse(atob(storedToken.split(".")[1]));
        return decoded.userId;
      } catch (e) {
        console.error("Token decoding error", e);
        return null;
      }
    }
    return null;
  });
  const [username, setUsername] = useState(
    localStorage.getItem("username") || "User"
  );
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("userEmail") || "Email"
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || "role"
  );

  // useEffect(() => {
  //   if (token) {
  //     const decoded = JSON.parse(atob(token.split(".")[1]));
  //     setUserId(decoded.userId);
  //   }
  // }, [token]);

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUserId(null);
    setUsername("");
    setUserEmail("");
    setUserRole("");
  };

  return (
    <UserContext.Provider
      value={{
        token,
        userId,
        username,
        userEmail,
        userRole,
        logout,
        setUsername,
        setUserEmail,
        setToken,
        setUserRole,
        setUserId
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
