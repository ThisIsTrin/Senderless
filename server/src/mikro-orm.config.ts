import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { Report } from "./entities/Report";
import { User } from "./entities/User";
import "dotenv-safe/config";

// MikroOrm Condigurations
export default {
    migrations: {
        path: path.join(__dirname, "./migrations"),
        glob: "!(*.d).{js,ts}",
    },
    entities: [Report, User],
    type: "mongo",
    clientUrl: process.env.DB_URL,
    debug: !__prod__,
    allowGlobalContext: true,
    ensureIndexes: true,
} as Parameters<typeof MikroORM.init>[0];
