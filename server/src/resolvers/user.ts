import { User } from "../entities/User";
import { MyContext } from "../types";
import {
    Arg,
    Ctx,
    Field,
    InputType,
    Mutation,
    ObjectType,
    Query,
    Resolver,
} from "type-graphql";
import argon2 from "argon2";
import { COOKIE_NAME } from "../constants";
import { datasource } from "../index";
const ObjectId = require('mongodb').ObjectId;

@InputType()
class UsernamePasswordInput {
    @Field()
    username: string;
    @Field()
    password: string;
}

@ObjectType()
class FieldError {
    @Field()
    field: string;
    @Field()
    message: string;
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;
}

@Resolver()
export class UserResolver {
    // Get User
    @Query(() => User, { nullable: true })
    async me(@Ctx() { req }: MyContext) {
        if (!req.session.userId) {
            return null;
        }
        const user = await User.findOne({ where: {_id: new ObjectId(req.session.userId)}});
        return user;
    }

    // Register
    @Mutation(() => UserResponse)
    async register(
        @Arg("options") options: UsernamePasswordInput,
        @Ctx() { req } : MyContext
    ) {
        if (options.username.length <= 2) {
            return {
                errors: [
                    {
                        field: "username",
                        message: "username length must be greater than 2",
                    },
                ],
            };
        }

        if (options.password.length <= 3) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "password length must be greater than 3",
                    },
                ],
            };
        }
        const hashedPassword = await argon2.hash(options.password);
        let user;
        try {
            user = await datasource.getRepository(User).create({
                 username: options.username,
                 password: hashedPassword
             }).save();
        } catch (err) {
            if (err.code == "11000") {
                return {
                    errors: [
                        {
                            field: "username",
                            message: "username is already taken",
                        },
                    ],
                };
            }
        }

        if (user){
            req.session.userId = user._id;
        }

        return {
            user,
        };
    }

    // Login
    @Mutation(() => UserResponse)
    async login(
        @Arg("options") options: UsernamePasswordInput,
        @Ctx() { req }: MyContext
    ): Promise<UserResponse> {
        const user = await datasource.getRepository(User).findOneBy({username: options.username});
        if (!user) {
            return {
                errors: [
                    {
                        field: "username",
                        message: "Username doesn't exist.",
                    },
                ],
            };
        }
        const valid = await argon2.verify(user.password, options.password);
        if (!valid) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "Incorrect password.",
                    },
                ],
            };
        }

        req.session.userId = user._id;

        return {
            user,
        };
    }

    // Logout
    @Mutation(() => Boolean)
    logout(@Ctx() { req, res }: MyContext) {
        return new Promise((resolve) =>
            req.session.destroy((err) => {
                res.clearCookie(COOKIE_NAME);
                if (err) {
                    console.log(err);
                    resolve(false);
                    return;
                }

                resolve(true);
            })
        );
    }
}
