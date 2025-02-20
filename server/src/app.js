const path = require('path'); //* Импорт библиотеки path
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') }); //* Подключение переменных окружения
const express = require('express'); //* Импорт библиотеки express
const serverConfig = require('./config/serverConfig');
const indexRouter = require('./routes/index.routes');
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const port = process.env.PORT || 3000;
const NEWS_API_KEY = process.env.NEWS_API_KEY;

serverConfig(app);
app.use('/api', indexRouter);

async function scrapeRiaNews(keyword) {
  const url = `https://ria.ru/search/?query=${encodeURIComponent(keyword)}`;


  try {
    console.log("Отправка запроса к:", url);
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

    console.log("Получено статей:", articles.length);
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
    console.log("Отправка запроса к News API:", url);
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

app.get("/api/search", async (req, res) => {
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

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
