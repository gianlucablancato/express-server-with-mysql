const mysql2 = require("mysql2");
const express = require("express");
const cors = require("cors");

const app = express().use(cors());
app.use(express.json());

//use your user and password
const db = mysql2.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "listpost",
});

// insert data
app.post("/posts", (req, res) => {
  const post = req.body;

  db.query(
    "INSERT INTO posts (title,body) VALUES (?,?)",
    [post.title, post.body],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        return res.send("post Inserted");
      }
    }
  );
});

// get data
app.get("/posts", (req, res) => {
  db.query("SELECT * FROM listpost.posts", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      return res.send(result);
    }
  });
});

// delete data
app.delete("/posts:id", (req, res) => {
  console.log(req);
  const id = req.params.id;
  db.query("DELETE FROM posts where id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      return res.send("post deleted");
    }
  });
});

//update data
app.put("/posts", (req, res) => {
  const post = req.body;
  db.query(
    "UPDATE posts SET  title = ?, body = ? where id = ?",
    [post.title, post.body, post.id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        return res.send("post Updated");
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
