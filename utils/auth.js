import React, { useState, useEffect, useContext, createContext } from "react";
import { auth } from "./firebase";
import Router from "next/router";

const authContext = createContext();
export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
export const useAuth = () => {
  return useContext(authContext);
};
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      setLoading(false);
      setUser(user);
      return user;
    } else {
      setLoading(false);
      setUser(false);
      return false;
    }
  };

  const signup = (email, password) => {
    setLoading(true);
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        handleUser(auth.user);
        Router.push("/");
      })
      .catch((e) => {
        setLoading(false);
        alert(e.message);
      });
  };

  const signin = (email, password) => {
    setLoading(true);
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        handleUser(auth.user);
        Router.push("/");
      })
      .catch((e) => {
        setLoading(false);
        alert(e.message);
      });
  };

  const signout = () => {
    return auth.signOut().then(() => handleUser(false));
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(handleUser);
    return () => unsubscribe();
  }, []);
  return {
    user,
    loading,
    signin,
    signup,
    signout,
  };
}
const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
  };
};
