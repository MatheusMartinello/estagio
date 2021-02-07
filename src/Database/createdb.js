const pool = require("./db");

const db = {
  async inicializaBanco() {
    try {
      this.criaBanco();
    } catch (error) {
      console.error(error);
    }
  },
  async criaBanco() {
    //cria tabela USUARIO
    await pool.query(
      'CREATE TABLE IF NOT EXISTS "usuario"(' +
        '"idUsuario" SERIAL PRIMARY KEY,' +
        "nomeu varchar(80) not null," +
        "idade integer not null" +
        ")"
    );
    //cria tabela PRODUTO
    await pool.query(
      'CREATE TABLE IF NOT EXISTS "produto"(' +
        '"idProduto" SERIAL PRIMARY KEY,' +
        "nome varchar(80) not null," +
        "valor numeric not null" +
        ")"
    );
    //cria tabela LANCES
    await pool.query(
      'CREATE TABLE IF NOT EXISTS "lances"(' +
        '"idLances" SERIAL PRIMARY KEY,' +
        '"idUsuario" INTEGER not null,' +
        '"idProduto" INTEGER not null,' +
        '"valor" NUMERIC not null,' +
        'constraint fk_usuario foreign key("idUsuario") references usuario("idUsuario"),' +
        'constraint fk_produto foreign key("idProduto") references produto("idProduto")' +
        ")"
    );
  },
};
module.exports = db;
