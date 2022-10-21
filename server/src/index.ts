import express from "express";
import mikroConfig from "./mikro-orm.config";
import { MikroORM } from "@mikro-orm/core";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { MyContext } from "./types";
import { ReportResolver } from "./resolvers/report";
import cors from "cors";
import connectRedis from "connect-redis";
import session from "express-session";
import { COOKIE_NAME, __prod__ } from "./constants";
import { createClient } from "redis";
import { UserResolver } from "./resolvers/user";

// Main function
const main = async () => {
    const port = process.env.PORT;
    // Database
    const orm = await MikroORM.init(mikroConfig);
    orm.getMigrator().up();
    // Create express app
    const app = express();
    // Redis
    const RedisStore = connectRedis(session);
    const redisClient = createClient({
        url: process.env.REDIS_URL,
        legacyMode: true,
    });
    redisClient.connect().catch(console.error);

    // Cors
    app.set("proxy", 1);
    app.use(
        cors({
            origin: process.env.CORS_ORIGIN,
            credentials: true,
        })
    );

    // Cookie
    app.use(
        session({
            name: COOKIE_NAME,
            store: new RedisStore({ client: redisClient, disableTouch: true }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 1, // 1 year
                httpOnly: true,
                sameSite: "lax", // csrf
                secure: __prod__, // only work in https
            },
            saveUninitialized: false,
            secret: process.env.SESSION_SECRET,
            resave: false,
        })
    );

    // Apollo server setup
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [ReportResolver, UserResolver],
            validate: false,
        }),
        context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });

    // Start the server
    app.listen(parseInt(port), () => {
        console.log(`Started on port ` + port);
    });
};

// Error handeling
main().catch((err) => {
    console.error(err);
});
