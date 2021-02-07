# estagio

Projeto desejado para vaga de estagio da Graff

Eu estou mandando junto o meu export do insomnia. Caso não utilizem o insomnia, as requisicoes devem ser feitas assim:

//Para criar Usuario - tipo post com json
POST - localhost:3001/usuario/criar
{
"nome":"matheus",
"idade":"25"
}

//Para criar Produto - tipo post com json
POST - localhost:3001/produto/criar
{
"nome":"banana",
"valor":"5.50"
}

//Para realizar um lance - tipo post com json
POST - localhost:3001/consultas/lance
{
"nomeu":"matheus",
"nomep":"banana",
"valor":7.60
}

//Para pegar todos os lances - tipo get com json, existem 3 maneiras de pegar
//enviando o nome do usuario assim trazendo todos os lances daquele usuario
//enviando o nome do produto assim trazendo todos os lances que o produto recebeu
//sem parametro todos os lances sem filtro
GET - localhost:3001/consultas/lance
