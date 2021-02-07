const { criaBanco } = require("./Database/createdb");
function app() {
  criaBanco();
}
module.exports = app;
