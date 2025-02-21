import React, { useEffect, useState } from "react";
import FavoriteList from "../../widgets/FavoriteList/FavoriteList";
import FavoriteApi from "../../entities/User/FavoriteApi";

function FavoritePage({ userId }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, [userId]);

  const loadFavorites = async () => {
    try {
      const { data } = await FavoriteApi.getFav(userId);
      setFavorites(data);
    } catch (error) {
      alert(error);
    }
    const removeFromFav = async (newsId) => {
      try {
        await FavoriteApi.deleteFav(userId, newsId);
        setFavorites((prevFavorites) =>
          prevFavorites.filter((fav) => fav.newsId !== newsId)
        );
      } catch (error) {
        alert(error);
      }
    };
  };

  return (
    <div>
      <h1>ИЗБРАННОЕ</h1>
      <FavoriteList favorites={favorites} removeFromFav={removeFromFav} />
    </div>
  );
}

export default FavoritePage;
