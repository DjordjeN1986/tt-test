import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CurrencyItem.scss";

interface Props {
  currency: string;
}

const CurrencyItem = ({ currency }: Props) => {
  const [lastPrice, setLastPrice] = useState<number>();
  const [dailyChangePerc, setDailyChangePerc] = useState<number>();
  const [dailyChange, setDailyChange] = useState<number>();
  const [dailyHigh, setDailyHigh] = useState<number>();
  const [dailyLow, setDailyLow] = useState<number>();

  useEffect(() => {
    const ws = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
    ws.onopen = (evt) => {
      ws.send(
        JSON.stringify({
          event: "subscribe",
          channel: "ticker",
          symbol: currency.toUpperCase(),
        })
      );
    };

    ws.onmessage = function (event) {
      let data = JSON.parse(event.data);
      console.log("Test");
      try {
        if (Array.isArray(data[1])) {
          const values = data[1];
          setDailyChange(values[4]);
          setDailyChangePerc(values[5]);
          setLastPrice(values[6]);
          setDailyHigh(values[8]);
          setDailyLow(values[9]);
        }
      } catch (err) {
        console.warn(err);
      }
    };

    return () => ws.close();
    // eslint-disable-next-line
  }, []);

  return (
    <tbody>
      <tr>
        <td>
          <Link to={`/details/${currency}`}>{currency}</Link>
        </td>
        <td>{lastPrice}</td>
        <td>{dailyChange}</td>
        <td>{dailyChangePerc}</td>
        <td>{dailyHigh}</td>
        <td>{dailyLow}</td>
      </tr>
    </tbody>
  );
};

export default CurrencyItem;
