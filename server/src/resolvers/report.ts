import { QueryOrder, RequiredEntityData } from "@mikro-orm/core";
import { Report } from "../entities/Report";
import { MyContext } from "src/types";
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
import { ObjectId } from "@mikro-orm/mongodb";

@InputType()
class ReportInput {
    @Field()
    title: string;
    @Field()
    description: string;
    @Field()
    recom: string;
    @Field()
    injured: boolean;
}

@ObjectType()
class ReportFieldError {
    @Field()
    field: string;
    @Field()
    message: string;
}

@ObjectType()
class ReportResponse {
    @Field(() => [ReportFieldError], { nullable: true })
    errors?: ReportFieldError[];

    @Field(() => Report, { nullable: true })
    report?: Report;
}

@Resolver()
export class ReportResolver {
    // Get all reports
    @Query(() => [Report])
    reports(@Ctx() { em }: MyContext) {
        return em.find(Report, {}, { orderBy: { createdAt: QueryOrder.DESC } });
    }

    // Get report by id
    @Query(() => Report, { nullable: true })
    report(@Arg("_id", () => String) _id: ObjectId, @Ctx() { em }: MyContext) {
        return em.findOne(Report, { _id });
    }

    // Create report
    @Mutation(() => ReportResponse)
    async createReport(
        @Arg("options") options: ReportInput,
        @Ctx()
        { em }: MyContext
    ): Promise<ReportResponse> {
        if (!options.title.replace(/\s/g, "").length) {
            return {
                errors: [
                    {
                        field: "title",
                        message: "A title is required.",
                    },
                ],
            };
        } else if (!options.description.replace(/\s/g, "").length) {
            return {
                errors: [
                    {
                        field: "description",
                        message: "A description is required.",
                    },
                ],
            };
        } else {
            const report = em.create(Report, {
                title: options.title,
                description: options.description,
                recom: options.recom,
                injured: options.injured,
            } as RequiredEntityData<Report>);
            await em.persistAndFlush(report);
            return { report };
        }
    }
}
