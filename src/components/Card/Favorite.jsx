import React, { useState } from "react";

import { FaStar } from "react-icons/fa";

import axios from "axios";

const Favorite = ({ id, isFavorite }) => {
  const [fav, setFav] = useState(isFavorite);
  const changeFavorite = (id) => {
    axios({
      url: `http://localhost:8080/api/v1/favorite/${id}`,
      method: "put",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
      },
    }).then((res) => (res.data ? setFav(!fav) : null));
  };

  return (
    <div style={{ width: "24px" }} onClick={() => changeFavorite(id)}>
      <FaStar color={fav ? "#5C89FF" : "#787878"} size={12} />
    </div>
  );
};

export default Favorite;
