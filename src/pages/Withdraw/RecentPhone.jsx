import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaSearch } from "react-icons/fa";

import SecondCard from "../../components/Card/SecondCard";
import Favorite from "../../components/Card/Favorite";

import "./RecentPhone.css";

import axios from "axios";

const RecentPhone = () => {
  const navigate = useNavigate();
  const { accountId } = useParams();

  const [recentPhones, setRecentPhones] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/api/v1/recent?type=${2}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
      },
    }).then((res) => setRecentPhones(res.data.accounts));
  }, [accountId]);

  return (
    <div className="RecentPhone">
      <div className="search-bar">
        <FaSearch size={12} color="#787878" />
        <input
          type="text"
          className="phone-input"
          placeholder="검색 / 직접 입력"
        />
      </div>
      <div className="list">
        {recentPhones.map(
          ({
            id,
            account_name,
            account_number,
            bank_name,
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
  );
};

export default RecentPhone;
