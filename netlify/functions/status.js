const fs = require("fs");
exports.handler = async function () {
  const data = fs.readFileSync("status.json", "utf8");
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: data
  };
};
