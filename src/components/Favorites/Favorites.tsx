import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { LocalContext } from "../../providers/LocalContext";
import CurrencyList from "../CurrencyList/CurrencyList";

import "./Favorites.scss";

const Favorites = () => {
  const { loggedIn, favorites } = useContext(LocalContext);

  if (!loggedIn) {
    return <Redirect to="/" />;
  }

  if (!favorites.length) {
    return (
      <div className="no-favs">
        There are currently no favorites added, please add an item to the
        favorites list.
      </div>
    );
  }

  return (
    <>
      <div className="favorites-wrapper">
        <span>Your Favorites</span>
        <CurrencyList currency={favorites} />
      </div>
    </>
  );
};

export default Favorites;
