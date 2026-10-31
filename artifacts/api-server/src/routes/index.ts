import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import chainsRouter from "./chains.js";
import assetsRouter from "./assets.js";
import protocolsRouter from "./protocols.js";
import poolsRouter from "./pools.js";
import compareRouter from "./compare.js";
import blogRouter from "./blog.js";
import statsRouter from "./stats.js";
import cronRouter from "./cron.js";

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
