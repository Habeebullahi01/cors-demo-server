// This file mimics getting domains and their cors-allowable paths from a database.

import { Request, Response } from "express";

const DB: {} = {};

const corsPath = (req: Request, res: Response) => {
  const origin = req.headers.origin;
  const path = req.path;
  // const getOriginPaths
};
