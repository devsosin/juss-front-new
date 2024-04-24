import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaSearch } from "react-icons/fa";

import SecondCard from "../../components/Card/SecondCard";
import Favorite from "../../components/Card/Favorite";

import "./RecentPhone.css";

const RecentPhone = () => {
  const navigate = useNavigate();
  const { accountId } = useParams();

  const [recentPhones, setRecentPhones] = useState([
    {
      id: 1,
      bank_name: "",
      account_name: "강우우",
      account_number: "010-2009-1370",
      is_favorite: true,
      is_own: false,
    },
    {
      id: 2,
      bank_name: "",
      account_name: "최태도",
      account_number: "010-2058-4326",
      is_favorite: false,
      is_own: false,
    },
    {
      id: 3,
      bank_name: "",
      account_name: "이지빈",
      account_number: "010-4662-7088",
      is_favorite: false,
      is_own: false,
    },
    {
      id: 4,
      bank_name: "",
      account_name: "김현영",
      account_number: "010-2891-9346",
      is_favorite: false,
      is_own: false,
    },
    {
      id: 5,
      bank_name: "",
      account_name: "윤민아",
      account_number: "010-2086-9234",
      is_favorite: false,
      is_own: false,
    },
  ]);

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
