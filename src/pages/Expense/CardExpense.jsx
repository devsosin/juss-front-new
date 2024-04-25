import React, { useEffect, useState } from "react";

import Card from "../../components/Card/Card";
import Badge from "../../components/Badge/Badge";

import "./CardExpense.css";

import { won } from "../../utils/currency";

const CardExpense = ({ title, cards }) => {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const totalExpense = cards?.reduce((acc, { amount }) => {
      acc = acc + amount;
      return acc;
    }, 0);
    setTotal(totalExpense);
  }, [cards]);

  return (
    <div className="CardExpense">
      <div>
        <span>{title}</span>
        <span className="total-expense">총 {won(total)}</span>
      </div>
      <div>
      {cards?.map(({ id, card_name, amount, min_usage }) => {
        let text = "실적 부족";
        let isActive = false;
        if (amount > min_usage) {
          text = "실적 충족";
          isActive = true;
        }

        return (
          <Card
            key={id}
            title={card_name}
            subTitle={
              <div className="performance">
                <span>{won(amount)}</span>
                {min_usage ? <Badge text={text} isActive={isActive} /> : ""}
              </div>
            }
          >
            </Card>
        );
      })}

      </div>
    </div>
  );
};

export default CardExpense;