import express from "express";
import { config } from "./config";
import router from "./routes/index.routes";
import {
  genericErrorHandler,
  notFound,
} from "./middlewares/errorHandler.middleware";
import { requestLogger } from "./middlewares/logger.middleware";
const app = express();

//middlewares
app.use(express.json());

app.use(requestLogger);

//route
app.use(router);

//errorhandler middleware
app.use(notFound);
app.use(genericErrorHandler);

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
