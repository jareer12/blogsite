const con = require("./init");

class Database {
  fetchPosts() {
    return new Promise((res, rej) => {
      con.query(
        "SELECT * FROM posts ORDER BY created DESC",
        function (err, data) {
          if (err) {
            rej(false);
          } else {
            res(data);
          }
        }
      );
    });
  }
  fetchPostById(id) {
    return new Promise((res, rej) => {
      con.query(
        "SELECT * FROM posts WHERE id = ? ORDER BY created DESC",
        [id],
        function (err, data) {
          if (err) {
            rej(false);
          } else {
            res(data);
          }
        }
      );
    });
  }
}

module.exports = new Database();
