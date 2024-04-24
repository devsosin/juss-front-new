import React, { useState } from "react";

import { FaStar } from "react-icons/fa";

const Favorite = ({ id, isFavorite }) => {
  const [fav, setFav] = useState(isFavorite);
  const changeFavorite = (id) => {
    setFav(!fav);
  };

  return (
    <div style={{ width: "24px" }} onClick={() => changeFavorite(id)}>
      <FaStar color={fav ? "#5C89FF" : "#787878"} size={12} />
    </div>
  );
};

export default Favorite;
