import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaCamera, FaAngleRight } from "react-icons/fa";

import SecondCard from "../../components/Card/SecondCard";
import Favorite from "../../components/Card/Favorite";

import "./RecentAccount.css";

const RecentAccount = () => {
  const navigate = useNavigate();
  const { accountId } = useParams();

  const [recentAccounts, setRecentAccounts] = useState([
    {
      id: 1,
      bank_name: "기업은행",
      account_name: "기업 BIZ통장",
      account_number: "794-31-57635",
      is_favorite: true,
      is_own: false,
    },
    {
      id: 2,
      bank_name: "NH농협은행",
      account_name: "NH행복채움통장",
      account_number: "181-17-46439",
      is_favorite: false,
      is_own: true,
    },
    {
      id: 3,
      bank_name: "SC제일은행",
      account_name: "SC제일 다이렉트통장",
      account_number: "840-03-45910",
      is_favorite: false,
      is_own: false,
    },
    {
      id: 4,
      bank_name: "기업은행",
      account_name: "기업 BIZ통장",
      account_number: "314-72-48441",
      is_favorite: false,
      is_own: false,
    },
    {
      id: 5,
      bank_name: "부산은행",
      account_name: "부산 해피드림통장",
      account_number: "685-01-14370",
      is_favorite: false,
      is_own: false,
    },
  ]);

  return (
    <div className="RecentAccount">
      <div className="search-bar">
        <input
          type="text"
          className="account-input"
          placeholder="계좌번호 입력"
        />
        <FaCamera size={16} />
      </div>

      <div className="list">
        <div className="my-accounts">
          <span>내 계좌</span>
          <span>
            +16개 <FaAngleRight size={12} />
          </span>
        </div>
        <div className="accounts">
          <span>최근 보낸 계좌</span>

          {recentAccounts.map(
            ({
              id,
              bank_name,
              account_name,
              account_number,
              is_favorite,
              is_own,
            }) => {
              return (
                <SecondCard
                  key={id}
                  title={`${is_own ? "내" : ""} ${account_name}`}
                  subTitle={`${bank_name} ${account_number}`}
                  handleClick={() => navigate(`/transfer/${accountId}/${id}`)}
                >
                  <Favorite id={id} isFavorite={is_favorite} />
                </SecondCard>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentAccount;
