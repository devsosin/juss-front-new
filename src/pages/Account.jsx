import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaAngleDown } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";

import BaseButton from "../components/Button/BaseButton";
import SecondCard from "../components/Card/SecondCard";
import Balance from "../components/Card/Balance";

import { won } from "../utils/currency";

import "./Account.css";

const Account = () => {
  const navigate = useNavigate();
  const { accountId } = useParams();

  const [account, setAccount] = useState({
    id: 222,
    bank_name: "한국씨티은행",
    account_name: "씨티 글로벌통장",
    account_number: "554-64-79609",
    account_type: 0,
    balance: 3689416,
  });
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      memo: "외식비용",
      amount: 202584,
      is_fill: false,
      sender_id: 322,
      created_at: [2024, 3, 5, 8, 33, 0],
    },
    {
      id: 2,
      memo: "도서구매",
      amount: 74350,
      is_fill: false,
      sender_id: 322,
      created_at: [2024, 2, 21, 23, 9, 0],
    },
    {
      id: 3,
      memo: "온라인 구독료 결제",
      amount: 54543,
      is_fill: false,
      sender_id: 322,
      created_at: [2024, 2, 18, 9, 4, 0],
    },
    {
      id: 4,
      memo: "교통비 결제",
      amount: 20750,
      is_fill: false,
      sender_id: 322,
      created_at: [2024, 2, 8, 21, 32, 0],
    },
    {
      id: 5,
      memo: "휴대폰 요금 결제",
      amount: 275031,
      is_fill: true,
      sender_id: 322,
      created_at: [2024, 2, 7, 2, 9, 0],
    },
  ]);

  const [dateTransactions, setDateTransactions] = useState([]);

  useEffect(() => {
    let nowBalance = account.balance;
    const data = transactions.reduce((acc, v, i) => {
      const haveDate = acc.filter(
        ({ date }) =>
          date.slice(0, 3).join("") === v.created_at.slice(0, 3).join("")
      );
      if (i === 0) {
        nowBalance = account.balance;
      } else {
        nowBalance =
          v.sender_id === accountId
            ? nowBalance - v.amount
            : nowBalance + v.amount;
      }
      const tr = {
        ...v,
        is_send: v.sender_id === accountId,
        balance: nowBalance,
      };

      if (haveDate.length !== 0) {
        acc[acc.length - 1].trs.push(tr);
      } else {
        acc.push({ date: v.created_at, trs: [tr] });
      }
      return acc;
    }, []);

    setDateTransactions(data);
  }, [account, transactions]);

  return (
    <div className="Account">
      <div className="app-bar">
        <div className="left">
          <div onClick={() => navigate(-1)}>
            <FaArrowLeft size={24} />
          </div>
          <span>{account.account_name}</span>
        </div>
        <button>관리</button>
      </div>

      <div className="info">
        <div className="baseinfo">
          <div className="name">
            {account.bank_name} {account.account_number}
          </div>
          <div className="copy">
            <IoCopyOutline size={12} />
            복사
          </div>
        </div>

        <div className="balance">
          <span>{won(account.balance)}</span>
        </div>
      </div>

      {account.account_type === 0 ? (
        <div className="btns">
          <BaseButton text={"채우기"} handleClick={() => {}} />
          <BaseButton
            text={"보내기"}
            handleClick={() => navigate(`/withdraw/${account.id}`)}
          />
        </div>
      ) : null}

      <div className="transactions">
        <div className="state">
          <div>
            전체 <FaAngleDown size={12} />
          </div>
          <div>불러오는 중</div>
        </div>
        <div className="list">
          {dateTransactions.map(({ date, trs }) => {
            return (
              <>
                <div className="tr-date" key={date}>
                  {`${date[1]}월 ${date[2]}일`}
                </div>
                <div className="tr-list">
                  {trs.map(
                    ({ id, memo, amount, is_send, balance, created_at }) => {
                      return (
                        <SecondCard
                          title={memo}
                          subTitle={`${created_at[3]
                            .toString()
                            .padStart(2, "0")}:${created_at[4]
                            .toString()
                            .padStart(2, "0")}`}
                          key={id}
                        >
                          <Balance
                            amount={amount}
                            balance={balance}
                            isSend={is_send}
                          />
                        </SecondCard>
                      );
                    }
                  )}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Account;
