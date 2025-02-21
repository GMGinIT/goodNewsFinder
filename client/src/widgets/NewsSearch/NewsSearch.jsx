import React, { useState, useEffect, useRef } from "react";

const NewsSearch = ({ setKeyword }) => {
  const [inputKeyword, setInputKeyword] = useState("");
  const inputRef = useRef(null);

  const handleSearch = () => {
    setKeyword(inputKeyword);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <input
        type="text"
        value={inputKeyword}
        onChange={(e) => setInputKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Введите ключевое слово"
        ref={inputRef}
      />
      <button onClick={handleSearch}>Поиск</button>
    </div>
  );
};

export default NewsSearch;
