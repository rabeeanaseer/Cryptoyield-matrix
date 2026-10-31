import type { Request, Response } from "express";
import app from "./app.js";
import { initDb } from "./lib/initDb.js";

export default async function handler(req: Request, res: Response): Promise<void> {
  await initDb();
  app(req, res);
}
