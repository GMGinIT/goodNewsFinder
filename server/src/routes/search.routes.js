const router = require("express").Router();

require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const NEWS_API_KEY = process.env.NEWS_API_KEY;
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
      const link = $(element).find("a").attr("href") || "";

      if (title && content && link) {
        articles.push({
          title: title,
          content: content,
          url: link.startsWith("http") ? link : `https://ria.ru${link}`,
        });
      }
    });

    return articles;
  } catch (error) {
    console.error("Ошибка при скрейпинге:", error.message);
    return [];
  }
}

async function fetchNewsFromApi(keyword) {
  try {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      keyword
    )}&apiKey=${NEWS_API_KEY}`;
    const response = await axios.get(url);
    return response.data.articles.map((article) => ({
      title: article.title,
      content: article.description,
      url: article.url,
    }));
  } catch (error) {
    console.error("Ошибка при запросе к News API:", error.message);
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
