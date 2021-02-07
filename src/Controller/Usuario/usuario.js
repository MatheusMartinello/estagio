const express = require("express");
const router = express.Router();
const pool = require("../../Database/db");
function controllerUsuario() {
  return (req, res, next) => {
    next();
  };
}
router.post("/cria", async (req, res) => {
  const { nome, idade } = req.body;
  try {
    await pool.query("INSERT INTO usuario (nomeu,idade) values ($1,$2)", [
      nome,
      idade,
    ]);
    res.send("Usuario cadastrado com sucesso!");
  } catch (error) {
    res.console.error(error);
  }
});
router.get("/consultaid", async (req, res) => {
  const { nome } = req.body;
  try {
    const resultado = await pool.query(
      'SELECT "idUsuario" from usuario where nomeu=$1',
      [nome]
    );
    if (resultado.rows == 0) {
      res.status(400).send("Usuario nao encontrado!");
    } else {
      res.send("Usuario com id igual a " + resultado.rows[0].idUsuario);
    }
  } catch (error) {
    console.error(error);
  }
});
module.exports = (controllerUsuario, (app) => app.use("/usuario", router));
