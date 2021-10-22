import React, { createContext, useState } from "react";
import { addLocalStorage, getLocalStorage } from "../utils/storage.utils";

interface ContextProps {
  loggedIn: boolean;
  handleLogin: () => void;
  toggleFav: (currency: string) => void;
  favorites: string[];
}

const loggedInDefaultValue = getLocalStorage("loggedIn") || false;
const favoritesDefaultValue = getLocalStorage("favorite") || [];

interface Props {
  children: React.ReactNode;
}

export const LocalContext = createContext<ContextProps>({
  loggedIn: loggedInDefaultValue as boolean,
  handleLogin: () => {},
  toggleFav: (currency: string) => {},
  favorites: favoritesDefaultValue,
});

export const LocalProvider = ({ children }: Props) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(loggedInDefaultValue);
  const [favorites, setFavorites] = useState<string[]>(favoritesDefaultValue);

  const handleLogin = () => {
    setLoggedIn(true);
    addLocalStorage("loggedIn", true);
  };

  const toggleFav = (currency: string) => {
    let updatedFavorites = [...favorites];
    updatedFavorites.includes(currency)
      ? (updatedFavorites = updatedFavorites.filter(
          (f: string) => f !== currency
        ))
      : updatedFavorites.push(currency);
    setFavorites(updatedFavorites);
    addLocalStorage("favorite", updatedFavorites);
  };

  return (
    <LocalContext.Provider
      value={{ loggedIn, handleLogin, toggleFav, favorites }}
    >
      {children}
    </LocalContext.Provider>
  );
};
