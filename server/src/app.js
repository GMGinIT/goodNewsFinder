const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const port = 3000;

app.use(cors());

async function scrapeRiaNews(keyword) {
  const url = `https://ria.ru/search/?query=${encodeURIComponent(keyword)}`;

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const articles = [];

    $(".list-item").each((i, element) => {
      const title = $(element).find(".list-item__title").text().trim();
      const content = $(element).find(".list-item__description").text().trim();
      const link = $(element).find("a").attr("href");

      articles.push({
        title: title,
        content: content,
        url: link ? `https://ria.ru${link}` : "",
      });
    });

    return articles;
  } catch (error) {
    console.error("Ошибка при скрейпинге:", error);
    return [];
  }
}

app.get("/api/search", async (req, res) => {
  const keyword = req.query.keyword || "";
  const articles = await scrapeRiaNews(keyword);
  res.json(articles);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
