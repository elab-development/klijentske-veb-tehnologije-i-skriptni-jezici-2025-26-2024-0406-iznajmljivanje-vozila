"use client";

import useLocalStorage from "./useLocalStorage";

export default function useAuth() {
  const [userId, setUserId, removeUserId] = useLocalStorage<number | null>(
    "auth_userId",
    null,
  );
  const [username, setUsername, removeUsername] = useLocalStorage<
    string | null
  >("auth_username", null);

  const login = (id: number, name: string) => {
    setUserId(id);
    setUsername(name);
  };

  const logout = () => {
    removeUserId();
    removeUsername();
  };

  return {
    userId,
    username,
    isLoggedIn: userId !== null,
    login,
    logout,
  };
}
