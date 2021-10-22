import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Homepage.scss";
import CurrencyList from "../CurrencyList/CurrencyList";

const Homepage = () => {
  const [currency, setCurrency] = useState<string[]>([]);

  const fetchData = async (url?: string): Promise<any> => {
    try {
      const response: any = await axios.get(
        `https://api.bitfinex.com/v1/symbols`
      );
      const data = response.data.slice(0, 5);
      console.log(data);
      setCurrency(data);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="home-wrapper">
      <CurrencyList currency={currency} />
    </div>
  );
};

export default Homepage;
