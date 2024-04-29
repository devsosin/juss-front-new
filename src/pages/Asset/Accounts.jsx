import React, { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import "./Accounts.css";

import BaseButton from "../../components/Button/BaseButton";
import SubButton from "../../components/Button/SubButton";
import Card from "../../components/Card/Card";

import { won } from "../../utils/currency";

import { getAccounts } from "../../api/account";

const Accounts = () => {
  const [accountTotal, setAccountTotal] = useState(0);
  const [accounts, setAccounts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    getAccounts({ token }).then((data) => setAccounts(data));
  }, []);

  useMemo(() => {
    setAccountTotal(accounts.reduce((acc, v) => acc + v.balance, 0));
  }, [accounts]);

  return (
    <div className="Accounts">
      <div className="total">
        <div>
          <h3>총 자산</h3>
          <span className="money">{won(accountTotal)}</span>
        </div>
        <BaseButton text={"분석"} />
      </div>

      <div className="account">
        <h3 style={{ fontWeight: "normal" }}>계좌</h3>
        <span className="small-text">{won(accountTotal)}</span>
      </div>
      <div className="account-list">
        <h3 className="sub-text">입출금</h3>
        {accounts.map(
          ({ balance, account_name, is_show, account_type, id }) => {
            if (is_show) {
              return (
                <Card
                  key={id}
                  title={account_name}
                  subTitle={won(balance)}
                  handleClick={() => {
                    navigate(`/account/${id}`);
                  }}
                >
                  {account_type === 0 ? (
                    <SubButton
                      text={"송금"}
                      handleClick={() => navigate(`/account/${id}`)}
                    />
                  ) : null}
                </Card>
              );
            }
          }
        )}
      </div>
      <div className="account-list">
        <h3 className="sub-text">숨긴 계좌</h3>
        {accounts.map(
          ({ balance, account_name, is_show, id, account_type }) => {
            if (!is_show) {
              return (
                <Card
                  key={id}
                  title={account_name}
                  subTitle={won(balance)}
                  handleClick={() => {
                    navigate(`/account/${id}`);
                  }}
                >
                  {account_type === 0 ? (
                    <SubButton
                      text={"송금"}
                      handleClick={() => navigate(`/account/${id}`)}
                    />
                  ) : null}
                </Card>
              );
            }
          }
        )}
      </div>
    </div>
  );
};

export default Accounts;
