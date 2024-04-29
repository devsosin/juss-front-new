import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaAngleDown } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";

import BaseButton from "../components/Button/BaseButton";
import SecondCard from "../components/Card/SecondCard";
import Balance from "../components/Card/Balance";

import Deposit from "../modals/Deposit";

import { won } from "../utils/currency";

import "./Account.css";

import axios from "axios";

const Account = () => {
  const navigate = useNavigate();
  const { accountId } = useParams();

  const [account, setAccount] = useState({});

  const [transactions, setTransactions] = useState([]);

  const [dateTransactions, setDateTransactions] = useState([]);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/api/v1/account/${accountId}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
      },
    }).then((res) => setAccount(res.data));

    axios({
      method: "get",
      url: `http://localhost:8080/api/v1/transaction/${accountId}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
      },
    }).then((res) => setTransactions(res.data.transactions));
  }, [accountId]);

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
        <div>관리</div>
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
          <BaseButton
            text={"채우기"}
            handleClick={() => {
              setShowModal(true);
            }}
          />
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

      {showModal ? <Deposit closeModal={() => setShowModal(false)} /> : null}
    </div>
  );
};

export default Account;
