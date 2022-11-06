import express from "express";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { MyContext } from "./types";
import cors from "cors";
import connectRedis from "connect-redis";
import session from "express-session";
import { COOKIE_NAME, __prod__ } from "./constants";
import "dotenv-safe/config";
import { DataSource } from "typeorm";
import { UserResolver } from "./resolvers/user"; 
import Redis from "ioredis";
import { User } from "./entities/User";
import { Report } from "./entities/Report";
import { ReportResolver } from "./resolvers/report";

export const datasource = new DataSource({
    type: "mongodb",
    url: process.env.DB_URL,
    database: "test",
    port: 27017,
    entities: [User, Report],
    logging: true
})

// Main function
const main = async () => {
    datasource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

    const port = process.env.PORT;

    // Create express app
    const app = express();
    // Redis
    const RedisStore = connectRedis(session);
    const redis = new Redis();
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
            store: new RedisStore({ client: redis, disableTouch: true }),
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
        context: ({ req, res }): MyContext => ({  req, res, redis }),
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
