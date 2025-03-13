 import { createContext, useContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("token") || "");
//   const [user, setUser] = useState(null);

//   const saveTokenInLocalStr= (serverToken) => {
//     setToken(serverToken);
//     localStorage.setItem("token", serverToken);
//   };

//   const LogoutUser = () => {
//     setToken("");
//     localStorage.removeItem("token");
//     setUser(null); // Clear user data on logout
//   };
//   const getServices = async () => {
//     try {
//       const response = await fetch("http://localhost:5001/api/form/services", {
//         method: "GET",
//       });

//       if (response.ok) {
//         const data = await response.json();
//         // setUser(data);
//         console.log(data);
//       } else {
//         console.error("Error fetching user data:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error.message);
//     }
//   };
//   const userAuthentication = async () => {
//     try {
//       const response = await fetch("http://localhost:5001/api/auth/user", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setUser(data.userData);
//       } else {
//         console.error("Error fetching user data:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error.message);
//     }
//   };
     

//   useEffect(() => {
//     if (token) {
//       getServices();

//       userAuthentication();
//     }
//   }, [token]);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated: !!token, saveTokenInLocalStr, LogoutUser, user, }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const authContextValue = useContext(AuthContext);
//   if (!authContextValue) {
//     throw new Error("useAuth used outside of the Provider");
//   }
//   return authContextValue;
// };
// Imports and createContext, useContext, useState, useEffect

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState(null);
  const authorization=`Bearer ${token}`;
  const saveTokenInLocalStr = (serverToken) => {
    setToken(serverToken);
   return localStorage.setItem("token", serverToken);
  };
  let isLoggedIn = !!token;
  console.log("token", token);
  console.log("isLoggedin ", isLoggedIn);

  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
    setUser(null); // Clear user data on logout
  };

  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/form/services", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.msg);
        setServices(data.msg);
      } else {
        console.error("Error fetching services:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching services:", error.message);
    }
  };

  const  userAuthentication= async () => {

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5001/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: authorization,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
        setIsLoading(false);
      } else {
        console.error("Error fetching user data:", response.statusText);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };
     

  useEffect(() => {
    if (token) {
      getServices();
      userAuthentication();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token, saveTokenInLocalStr, LogoutUser, user,authorization,isLoading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
