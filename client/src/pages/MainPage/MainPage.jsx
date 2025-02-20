import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsSearch from "../../widgets/NewsSearch/NewsSearch";

export default function MainPage() {
  const [news, setNews] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchNews = async (searchKeyword) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/search?keyword=${searchKeyword}`);
      setNews(response.data);
    } catch (error) {
      console.error("Ошибка при получении новостей:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews("top headlines");
  }, []);

  useEffect(() => {
    if (keyword) {
      fetchNews(keyword);
    }
  }, [keyword]);

  const handleSearch = (newKeyword) => {
    setKeyword(newKeyword);
  };

  return (
    <>
      <h1>Новости</h1>
      <NewsSearch setKeyword={handleSearch} />
      {loading && <p>Загрузка...</p>}
      {news.length === 0 && keyword && (
        <p>Новости не найдены для ключевого слова: "{keyword}"</p>
      )}
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
