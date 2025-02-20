import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsSearch from "../../widgets/NewsSearch/NewsSearch";

export default function MainPage({ user, setUser }) {
  const [news, setNews] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      if (keyword) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/search?keyword=${keyword}`
          );
          setNews(response.data);
        } catch (error) {
          console.error("Ошибка при получении новостей:", error);
        }
      }
    };

    fetchNews();
  }, [keyword]);

  const handleSearch = (newKeyword) => {
    setKeyword(newKeyword);
  };

  return (
    <>
      <h1>Новости</h1>
      <NewsSearch setKeyword={handleSearch} />
      <ul>
        {news.map((article, index) => (
          <li key={index}>
            <h3>{article.title}</h3>
            <p>{article.content}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Читать далее
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
