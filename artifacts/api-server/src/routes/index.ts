import { Router, type IRouter } from "express";
import healthRouter from "./health";
import chainsRouter from "./chains";
import assetsRouter from "./assets";
import protocolsRouter from "./protocols";
import poolsRouter from "./pools";
import compareRouter from "./compare";
import blogRouter from "./blog";
import statsRouter from "./stats";
import cronRouter from "./cron";

const router: IRouter = Router();

router.use(healthRouter);
router.use(chainsRouter);
router.use(assetsRouter);
router.use(protocolsRouter);
router.use(poolsRouter);
router.use(compareRouter);
router.use(blogRouter);
router.use(statsRouter);
router.use(cronRouter);

export default router;
