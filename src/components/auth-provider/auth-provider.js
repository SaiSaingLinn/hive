import React from "react";

const redirectKey = "sign_in_redirect";

export const AuthContext = React.createContext(undefined);

AuthContext.displayName = "AuthContext";

const setRedirect = (redirect) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(redirectKey, redirect);
  }
}

const getRedirect = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(redirectKey);
  }
}

const clearRedirect = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage.removeItem(redirectKey);
  }
}

export const useAuth = () => {
  const auth = React.useContext(AuthContext)

  if(!auth) {
    throw new Error("useAuth must be used within AuthProvider")
  }

  return auth
}

export const AuthProvider = ({ children }) => {
  const value = {
    setRedirect,
    getRedirect,
    clearRedirect,
  };
  return React.createElement(AuthContext.Provider, { value: value }, children);
}