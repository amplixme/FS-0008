import { useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "./AuthContext";
import { getProfile } from "../services/user.service";

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("userData");
    // si existe se parsea sino se setea a null
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!token;

  const login = async (newToken, userData) => {
    // para no perder la informacion de userData (role en especial, sirve para mostrar opciones en Header)
    let fullUser = { ...userData };

    try {
      const profile = await getProfile(userData.id);
      if (profile) {
        fullUser = { ...fullUser, ...profile };
      }
    } catch (err) {
      // el login no debe bloquearse si falla la carga del perfil completo;
      // seguimos con los datos parciales que vinieron del login
      console.error("No se pudo cargar el perfil completo tras el login:", err);
    }

    setToken(newToken);
    setUser(fullUser);
    localStorage.setItem("token", newToken);
    localStorage.setItem("userData", JSON.stringify(fullUser));
  };

  const updateUser = (updatedData) => {
    setUser((currentUser) => {
      if (!currentUser) return currentUser;

      const updatedUser = {
        ...currentUser,
        ...updatedData,
      };

      localStorage.setItem("userData", JSON.stringify(updatedUser));

      return updatedUser;
    });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
