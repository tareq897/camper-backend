import express, { Application, Request, Response } from "express";
const app: Application = express();
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

app.use(notFound);

const test = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get("/", test);

app.use(globalErrorHandler);

export default app;
