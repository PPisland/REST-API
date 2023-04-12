const express = require("express");
const todoRouter = require("./routes/todo");
const cors = require("cors");

const app = express();

const port = 3010;

// 제이슨 객체를 불러올수는 없으나 읽을수 없기때문에 아래와 같이 미들웨어 추가해주기
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );
app.use(express.json());
app.use("/todo", todoRouter);

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port} 😆😎`);
});
