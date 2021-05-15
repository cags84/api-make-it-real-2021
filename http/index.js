const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const api = require("../api");
const { config } = require("../config");

const { host, port } = config.http;
const corsOptions = {
  // Para la cookie sea aceptada en el navegador es importante creat un alias
  // en el host de windows, para no rechace este tipo de peticiones
  // mas info https://www.liquidweb.com/kb/edit-host-file-windows-10/
  origin: [
    "http://127.0.0.1",
    "http://127.0.0.1:5500",
    "http://api.makeitreal.local:5500"
  ],
  credentials: true,
  exposeHeaders: ["set-cookie"],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/api", api);
app.use("/api/v1", api);

const init = () => {
  app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
  });
};

module.exports = { init };
