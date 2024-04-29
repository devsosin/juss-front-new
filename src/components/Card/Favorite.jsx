import React, { useState } from "react";

import { FaStar } from "react-icons/fa";


import {toggleFavorite} from '../../api/account'


const Favorite = ({ id, isFavorite }) => {
  const [fav, setFav] = useState(isFavorite);
  const changeFavorite = (id) => {
    const token = localStorage.getItem("jwt-token");
    toggleFavorite({token, id}).then(data => data ? setFav(!fav) : null)
  };

  return (
    <div style={{ width: "24px" }} onClick={() => changeFavorite(id)}>
      <FaStar color={fav ? "#5C89FF" : "#787878"} size={12} />
    </div>
  );
};

export default Favorite;
