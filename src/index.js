const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { criaBanco } = require("./Database/createdb");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require("./Controller/Produto/produto")(app);
require("./Controller/Usuario/usuario")(app);
require("./Controller/Consultas/consultas")(app);
criaBanco();
app.listen(3001, () => {
  //
  console.log("Server esta ativo na porta ==> 3001!");
});
