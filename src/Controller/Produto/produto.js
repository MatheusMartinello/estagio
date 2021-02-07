const express = require("express");
const router = express.Router();
const pool = require("../../Database/db");
function controllerProduto() {
  return (req, res, next) => {
    next();
  };
}
router.post("/cria", async (req, res) => {
  const { nome, valor } = req.body;
  try {
    await pool.query("INSERT INTO produto (nome,valor) values ($1,$2)", [
      nome,
      valor,
    ]);
    res.send("Produto cadastrado com sucesso!");
  } catch (error) {
    res.console.error(error);
  }
});
module.exports = (controllerProduto, (app) => app.use("/produto", router));
