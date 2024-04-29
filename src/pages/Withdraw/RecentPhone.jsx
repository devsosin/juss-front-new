import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaSearch } from "react-icons/fa";

import SecondCard from "../../components/Card/SecondCard";
import Favorite from "../../components/Card/Favorite";

import "./RecentPhone.css";

import { getRecents } from "../../api/account";

const RecentPhone = () => {
  const navigate = useNavigate();
  const { accountId } = useParams();

  const [recentPhones, setRecentPhones] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    getRecents({ token, type: 2 }).then((data) => setRecentPhones(data));
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
