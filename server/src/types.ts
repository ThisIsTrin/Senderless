import { ObjectID } from "typeorm";
import { Request, Response } from "express";
import { Session } from "express-session";
import { Redis } from "ioredis";

declare module "express-session" {
  interface Session {
    userId: ObjectID;
  }
}

export type MyContext = {
    req: Request & { session: Session };
    redis: Redis;
    res: Response;
};
