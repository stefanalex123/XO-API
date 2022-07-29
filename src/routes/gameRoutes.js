import express from "express";
import bodyParser from "body-parser";

import gameController from "../controllers/gameController.js";

const urlencodedParser = bodyParser.urlencoded({ extended: false })

const router = express.Router();

router.get("/", gameController.getGames);
router.get("/:id(\\d+)", gameController.getGame);
router.post("/", urlencodedParser, gameController.addGame);
router.post("/:id(\\d+)", urlencodedParser, gameController.updateGame);
router.put("/:id(\\d+)", urlencodedParser, gameController.MoveGame);



export default router;
