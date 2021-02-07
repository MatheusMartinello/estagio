const express = require("express");
const router = express.Router();
const pool = require("../../Database/db");
function controllerConsultas() {
  return (req, res, next) => {
    next();
  };
}
router.post("/lance", async (req, res) => {
  const { nomeP, nomeU, valor } = req.body;
  try {
    const consultaProduto = await pool.query(
      "SELECT * from produto where nome = $1",
      [nomeP]
    );
    if (consultaProduto.rows == 0) {
      return res.status(400).send("Produto nao encontrado!");
    }
    if (consultaProduto.rows[0].valor > valor) {
      return res
        .status(400)
        .send("Valor enviado menor que o valor inicial produto!");
    }
    const consultaUsuario = await pool.query(
      "SELECT * from usuario where nomeu = $1",
      [nomeU]
    );

    if (consultaUsuario.rows == 0) {
      return res.status(400).send("Usuario nao encontrado!");
    }
    if (consultaUsuario.rows[0].idade < 18) {
      return res
        .status(400)
        .send("Usuario menor de 18 anos, nao eh possivel realizar lance!");
    }
    const consultaLances = await pool.query(
      'SELECT "idLances",valor ' +
        ' from lances where "idProduto" = $1 AND valor = (select MAX(valor) ' +
        ' from lances where "idProduto" = $1);',
      [consultaProduto.rows[0].idProduto]
    );

    if (consultaLances.rows != 0) {
      if (Number(consultaLances.rows[0].valor) >= valor) {
        return res.status(400).send("Valor igual ou menor ao ultimo lance!");
      } else {
        await pool.query(
          'INSERT INTO lances ("idProduto","idUsuario","valor") values ($1,$2,$3)',
          [
            consultaProduto.rows[0].idProduto,
            consultaUsuario.rows[0].idUsuario,
            valor,
          ]
        );
        return res.send("Lance registrado com sucesso!");
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
});

router.get("/lance", async (req, res) => {
  const { nomeProduto, nomeUsuario } = req.body;
  if (nomeProduto) {
    const consultaProduto = await pool.query(
      'SELECT "idProduto" from produto where nome = $1',
      [nomeProduto]
    );

    if (consultaProduto.rows == 0)
      return res.status(400).send("Produto nao registrado!");
    else {
      const result = await pool.query(
        'select usuario.nomeu , lances.valor,  produto.nome  from  lances inner join produto on lances."idProduto" = produto."idProduto" inner join usuario on usuario."idUsuario" = lances."idUsuario" where lances."idProduto" = $1  order by lances.valor desc;',
        [consultaProduto.rows[0].idProduto]
      );
      return res.send(result.rows);
    }
  }
  if (nomeUsuario) {
    const consultaUsuario = await pool.query(
      'SELECT "idUsuario" from usuario where nomeu = $1',
      [nomeUsuario]
    );
    if (consultaUsuario.rows.length == 0)
      return res.status(400).send("Usuario nao registrado!");
    else {
      const result = await pool.query(
        'select usuario.nomeu , lances.valor,  produto.nome  from  lances inner join produto on lances."idProduto" = produto."idProduto" inner join usuario on usuario."idUsuario" = lances."idUsuario" where lances."idUsuario" = $1 order by lances.valor desc;',
        [consultaUsuario.rows[0].idUsuario]
      );
      return res.send(await result.rows);
    }
  }
  const result = await pool.query(
    'select usuario.nomeu , lances.valor,  produto.nome  from  lances inner join produto on lances."idProduto" = produto."idProduto" inner join usuario on usuario."idUsuario" = lances."idProduto" order by lances.valor desc;'
  );
  return res.send(result.rows);
});
module.exports =
  (controllerConsultas,
  (app) => {
    app.use("/consultas", router);
  });
