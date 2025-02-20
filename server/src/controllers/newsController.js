const NewsApiService = require("../services/newsApiService");
const formatResponse = require("../utils/formatResponse");

class NewsController {
  static processNewsData(newsData) {
    if (newsData.status === "ok" && newsData.articles) {
      return newsData.articles.map((article) => ({
        title: article.title,
        author: article.author,
        publishedAt: new Date(article.publishedAt).toLocaleString(),
        description: article.description,
        url: article.url,
        imageUrl: article.urlToImage,
      }));
    } else {
      throw new Error("Неверный формат данных новостей");
    }
  }

  static async fetchNews(req, res) {
    try {
      const newsData = await NewsApiService.getNews();
      const processedNews = NewsController.processNewsData(newsData);
      res.status(200).json(formatResponse(200, "success", processedNews));
    } catch ({ message }) {
      console.log("Ошибка при получении новостей:", message);
      res
        .status(500)
        .json(
          formatResponse(500, "Ошибка при получении новостей", null, message)
        );
    }
  }
}

module.exports = NewsController;
