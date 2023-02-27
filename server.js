require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileupload = require("express-fileupload");
const { urlencoded } = require("express");

const apiRoutes = require("./src/routes");

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB conectado"))
  .catch((error) => console.log("Erro na conexão:", error));

mongoose.Promise = global.Promise;

mongoose.connection.on("error", (error) => {
  console.log("ERRO:", error.message);
});

module.exports = mongoose;

const server = express();

server.use(cors());
server.use(express.json());
server.use(urlencoded({ extended: true }));
server.use(fileupload());

server.use(express.static(__dirname + "/public"));

server.use("/", apiRoutes);

server.listen(process.env.PORT, () => {
  console.log(`Rodando em: ${process.env.BASE}`);
});
