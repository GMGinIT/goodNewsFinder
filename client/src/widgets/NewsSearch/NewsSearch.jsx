import React, { useState } from "react";

const NewsSearch = ({ setKeyword }) => {
  const [inputKeyword, setInputKeyword] = useState("");

  const handleSearch = () => {
    setKeyword(inputKeyword);
  };

  return (
    <div>
      <input
        type="text"
        value={inputKeyword}
        onChange={(e) => setInputKeyword(e.target.value)}
        placeholder="Введите ключевое слово"
      />
      <button onClick={handleSearch}>Поиск</button>
    </div>
  );
};

export default NewsSearch;
