require("dotenv").config({ path: "./database/dbConfig.env" });
const express = require("express");
const app = express();
const port = 3000;

console.log(process.env.DB_NAME);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/hello", (req, res) => {
  console.log(req.url);
  res.send("Hello World!");
});

app.get("/api/board", (req, res) => {
  res.send({ title: "노드 api 서버 update!!!!" });
});

//뷰를 서버에 합침
const path = require("path");
const publicPath = path.join(__dirname, "dist");
app.use(express.static(publicPath));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./dist", "index.html"));
});

//서버에서 컴포넌트를 못찾으니 html로 위임함
//미들웨어 404가 뜨면 html 파일을 호출해서 그 파일안에서 about 찾음
//대신 네트웨크에서는 about이 404로 뜸
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "./dist", "index.html"));
});
