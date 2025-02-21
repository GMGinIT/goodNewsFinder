import React from "react";

export default function FavoriteList({ favorites, removeFromFav }) {
  if (favorites.length === 0) {
    return <p>Нет избранных новостей! </p>;
  }
  return (
    <div>
      {favorites.map((fav) => (
        <div key={fav.newsId}>
          {removeFromFav && (
            <button onClick={() => removeFromFav(fav.newsId)}>
              Удалить из избранного
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
