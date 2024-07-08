import express from "express";
import { config } from "./config";
import router from "./routes/index.routes";
const app = express();

//middlewares
app.use(express.json());

//route
app.use(router);

app.listen(config.port, () => {
  console.log(`Server listening on port : ${config.port}`);
});
