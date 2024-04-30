import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaBell } from "react-icons/fa";
import BottomNav from "../components/BottomNav/BottomNav";
import Card from "../components/Card/Card";
import SubButton from "../components/Button/SubButton";

import { won } from "../utils/currency";

import "./Home.css";

import { getAccounts } from "../api/account";
import { getTopay, getUsed } from "../api/transaction";

const Home = () => {
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState([]);
  const [totalUsed, setTotalUsed] = useState(0);
  const [toPay, setTopay] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");

    getAccounts({ token, isShow: "true" }).then((data) => setAccounts(data));
    getUsed({ token }).then((data) => setTotalUsed(data));
    getTopay({ token }).then((data) => setTopay(data));
  }, []);

  return (
    <div className="Home">
      <div className="header">
        <div>
          <div className="app-icon"></div>
          <div>Juss</div>
        </div>
        <div>
          <FaBell size={24} />
        </div>
      </div>
      <div className="section asset">
        {accounts.map(({ id, balance, account_name, account_type }) => (
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
                handleClick={() => {
                  navigate(`/account/${id}`);
                }}
              />
            ) : (
              ""
            )}
          </Card>
        ))}
        <hr style={{ border: 0, borderTop: "1px solid #EFEFEF", margin: 0 }} />
        <Link
          to={"/asset"}
          style={{
            cursor: "pointer",
            textDecoration: "None",
            color: "#707070",
          }}
        >
          전체 자산 보기
        </Link>
      </div>
      <div className="section expense">
        <Card
          title={"이번 달 쓴 금액"}
          subTitle={won(totalUsed)}
          handleClick={() => navigate("/expense")}
        >
          <SubButton text={"내역"} handleClick={() => navigate("/expense")} />
        </Card>
        <Card title={`${toPay.date} 낼 카드값`} subTitle={won(toPay.amount)} />
      </div>
      <div className="btn-section">
        <div>계좌개설</div>
        <span>|</span>
        <div>카드발급</div>
        <span>|</span>
        <div>대출받기</div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Home;
