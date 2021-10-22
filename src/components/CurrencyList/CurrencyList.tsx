import React from "react";
import CurrencyItem from "../CurrencyItem";
import "./CurrencyList.scss";

interface Props {
  currency: string[];
}

const CurrencyList = ({ currency }: Props) => {
  return (
    <div className="list-wrapper">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Price</th>
            <th>Daily Change</th>
            <th>Daily Change Percent</th>
            <th>Daily High</th>
            <th>Daily Low</th>
          </tr>
        </thead>
        {currency.map((c: string) => {
          return <CurrencyItem currency={c.toUpperCase()} key={c} />;
        })}
      </table>
    </div>
  );
};

export default CurrencyList;
