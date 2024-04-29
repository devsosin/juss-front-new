import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaCamera, FaAngleRight } from "react-icons/fa";

import SecondCard from "../../components/Card/SecondCard";
import Favorite from "../../components/Card/Favorite";

import "./RecentAccount.css";

import axios from "axios";

const RecentAccount = () => {
  const navigate = useNavigate();
  const { accountId } = useParams();

  const [recentAccounts, setRecentAccounts] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/api/v1/recent?type=${0}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
      },
    }).then((res) => setRecentAccounts(res.data.accounts));
  }, [accountId]);

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
