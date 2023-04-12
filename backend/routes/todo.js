const express = require("express");

let todoData = require("../todoData.json");

const router = express.Router();

router.get("/", (req, res) => {
  console.log(todoData);

  res.json(todoData);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  if (parseInt(id) >= todoData.length) {
    return res.status(400).json({ error: "존재하지 않는 ID입니다." });
  }
  //   if (parseInt(id) >= todoData.length) {
  //     res.status(400).json({ error: "존재하지 않는 ID입니다." });
  //   }

  res.json(todoData[parseInt(id)]);
});

// 투두 생성
router.post("/", (req, res) => {
  const { title, desc } = req.body;
  if (!title || !desc) {
    return res
      .status(400)
      .json({ error: "타이틀이나 설명 중에 값이 없습니다." });
  }

  todoData.push({ title, desc, isDone: false });
  //todoData.push({ title : title, desc: desc, isDone: false });
  console.log(todoData);

  // 하나의 라우터에는 하나의 res만 존재
  res.json(todoData);
});

router.put("/done/:id", (req, res) => {
  const { id } = req.params;
  if (parseInt(id) >= todoData.length) {
    return res.status(400).json({ error: "존재하지 않는 ID입니다." });
  }
  //   const Data = todoData.map((v, i) => {
  //     return v.title, v.desc, !v.isDone;
  //   });

  todoData[parseInt(id)] = {
    title: todoData[parseInt(id)].title,
    desc: todoData[parseInt(id)].desc,
    isDone: !todoData[parseInt(id)].isDone,
  };
  console.log(todoData[parseInt(id)]);

  res.json(todoData[parseInt(id)]);
});

// 투두 수정
router.put("/:id?", (req, res) => {
  const { id } = req.params;
  // const { title, desc} = req.query;
  const { title, desc } = req.body;

  if (parseInt(id) >= todoData.length) {
    return res.status(400).json({ error: "존재하지 않는 ID입니다." });
  }
  if (!title && !desc) {
    return res
      .status(400)
      .json({ error: "타이틀이나 설명 중에 값이 없습니다." });
  }

  todoData[parseInt(id)] = {
    title: title ? title : todoData[parseInt(id)].title,
    desc: desc ? desc : todoData[parseInt(id)].desc,
    isDone: todoData[parseInt(id)].isDone,
  };

  console.log(todoData);

  res.json(todoData);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (parseInt(id) >= todoData.length) {
    return res.status(400).json({ error: "존재하지 않는 ID입니다." });
  }

  todoData = todoData.filter((v, i) => {
    return parseInt(id) !== i;
  });
  console.log(todoData);
  res.json(todoData);
});

module.exports = router;
