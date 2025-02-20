const axios = require("axios");

class NewsApiService {
  constructor() {
    this.apiKey = "8d7c0845c1314959ad4641cbdc408974";
    this.apiUrl = `https://newsapi.org/v2/top-headlines?sources=google-news-ru&apiKey=${this.apiKey}`;
  }

  async getNews() {
    try {
      const response = await axios.get(this.apiUrl);
      const data = response.data;

      if (!data || !data.articles || !Array.isArray(data.articles)) {
        throw new Error("Неверный формат данных новостей");
      }
      return data;
    } catch (error) {
      console.error("Ошибка при получении новостей:", error.message);
      throw error;
    }
  }
}

module.exports = new NewsApiService();
