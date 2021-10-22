import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router";

import "./CurrDetails.scss";
import { LocalContext } from "../../providers/LocalContext";

interface DetailParams {
  currency: string;
}

const CurrDetails = () => {
  const { favorites, toggleFav, loggedIn } = useContext(LocalContext);

  const { currency } = useParams<DetailParams>();
  const [lastPrice, setLastPrice] = useState<string>("");
  const [dailyHigh, setDailyHigh] = useState<string>("");
  const [dailyLow, setDailyLow] = useState<string>("");
  const isFavorite = favorites.includes(currency);

  const fetchDetails = async (): Promise<any> => {
    try {
      const response: any = await axios.get(
        `https://api.bitfinex.com/v1/pubticker/${currency}`
      );
      const data = response.data;
      setLastPrice(data.last_price);
      setDailyHigh(data.high);
      setDailyLow(data.low);
      console.log(data);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    fetchDetails();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="curr-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Price</th>
              <th>Daily High</th>
              <th>Daily Low</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{currency}</td>
              <td>{lastPrice}</td>
              <td>{dailyHigh}</td>
              <td>{dailyLow}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {loggedIn ? (
        <button className="fav-add" onClick={() => toggleFav(currency)}>
          {!isFavorite ? "Add to favorites" : "Remove from favorites"}
        </button>
      ) : (
        ""
      )}
    </>
  );
};

export default CurrDetails;
