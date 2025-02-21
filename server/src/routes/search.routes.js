const router = require("express").Router();
require("dotenv").config();
const axios = require("axios");
const cheerio = require("cheerio");

const NEWS_API_KEY = process.env.NEWS_API_KEY;

async function fetchNewsFromApi(keyword) {
  try {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      keyword
    )}&apiKey=${NEWS_API_KEY}`;
    const response = await axios.get(url);

    return response.data.articles
      .filter(
        (article) =>
          article.title.toLowerCase().includes(keyword.toLowerCase()) ||
          (article.description &&
            article.description.toLowerCase().includes(keyword.toLowerCase()))
      )
      .map((article) => ({
        newsId: article.source.id || article.url,
        title: article.title,
        content: article.description || "Описание отсутствует",
      }));
  } catch (error) {
    console.error("Ошибка при запросе к News API:", error.message);
    return [];
  }
}

async function scrapeRiaNews(keyword) {
  const url = `https://ria.ru/search/?query=${encodeURIComponent(keyword)}`;

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const articles = [];

    $(".list-item").each((i, element) => {
      const title = $(element).find(".list-item__title").text().trim() || "";
      const content =
        $(element).find(".list-item__description").text().trim() || "";

      if (title && content) {
        articles.push({
          newsId: title,
          title: title,
          content: content,
        });
      }
    });

    return articles;
  } catch (error) {
    console.error("Ошибка при скрейпинге:", error.message);
    return [];
  }
}

router.get("/", async (req, res) => {
  const keyword = req.query.keyword || "";

  if (!keyword) {
    return res.status(400).json({ error: "Ключевое слово не указано" });
  }

  let articles = [];

  if (NEWS_API_KEY) {
    articles = await fetchNewsFromApi(keyword);
  }

  if (articles.length === 0) {
    articles = await scrapeRiaNews(keyword);
  }

  res.json(articles);
});

module.exports = router;
