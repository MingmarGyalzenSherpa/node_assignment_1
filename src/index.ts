import express from "express";
import { config } from "./config";
import router from "./routes/index.routes";
const app = express();

//middlewares
app.use(express.json());

//route
app.use(router);

/**
 * Base route goes here
 */
app.get("/", (req, res) => {
  res.send("HELLO TO TODO CRUD");
});

/**
 * Start the server
 */
app.listen(config.port, () => {
  console.log(`Server listening on port : ${config.port}`);
});
