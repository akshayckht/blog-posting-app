import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useMemo, useState } from "react";
import { auth } from "../lib/firebase";
import { AuthContext } from "./AuthContext";

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      authLoading,
    }),
    [user, authLoading],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

