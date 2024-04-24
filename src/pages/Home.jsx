import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaBell } from "react-icons/fa";
import BottomNav from "../components/BottomNav/BottomNav";
import Card from "../components/Card/Card";
import SubButton from "../components/Button/SubButton";

import { won } from "../utils/currency";

import "./Home.css";

const Home = () => {

  const navigate = useNavigate();
  
  const accounts = [
    {
      id: 1,
      balance: 1576326,
      account_name: "신한 쏠(SOL)",
      account_type: 0, // 계좌: 0, 적금: 1
    },
    {
      id: 2,
      balance: 1607728,
      account_name: "기업 BIZ적금",
      account_type: 1,
    },
    {
      id: 3,
      balance: 896659,
      account_name: "부산 해피드림적금",
      account_type: 1,
    },
    {
      id: 4,
      balance: 4932120,
      account_name: "씨티 클리어적금",
      account_type: 1,
    },
    {
      id: 5,
      balance: 3000000,
      account_name: "청년내일저축계좌",
      account_type: 1,
    },
  ];

  const totalUsed = 1992329;
  const toPay = {
    date: "3월 15일",
    amount: 5670653,
  };
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
          <Card key={id} title={account_name} subTitle={won(balance)}>
            {account_type === 0 ? (
              <SubButton text={"내역"} handleClick={() => {navigate(`/account/${id}`)}} />
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
        <Card title={"이번 달 쓴 금액"} subTitle={won(totalUsed)}>
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
