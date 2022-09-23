import * as mysql from "mysql";
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "mysql",
});

connection.connect();

// connection.query("CREATE DATABASE fan", function (error, results, fields) {
//   if (error) throw error;
//   console.log("The results is: ", results);
// });
connection.query("use fan");
connection.query(
  `CREATE TABLE user(
  PersonID int,
  LastName varchar(255),
  FirstName varchar(255),
  Address varchar(255),
  City varchar(255)
)`,
  function (error, results, fields) {
    if (error) throw error;
    console.log("建表成功！");
    console.log(results);
  }
);
connection.end();
