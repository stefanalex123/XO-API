import dotenv from "dotenv";
import express from "express";
import errorsMiddleware from "./src/middleware/errorsMiddleware.js";
import usersRouter from "./src/routes/userRoutes.js";
import gamesRouter from "./src/routes/gameRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/users", usersRouter);
app.use("/games", gamesRouter);



app.use(errorsMiddleware);

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
