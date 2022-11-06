import { datasource } from "..";
import { Report } from "../entities/Report";
import { Arg, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
const ObjectId = require('mongodb').ObjectId;

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
    reports():Promise<Report[]> {
        return datasource.getRepository(Report).find();
    }

    // Get report by id
    @Query(() => Report, { nullable: true })
    async report(@Arg("_id", () => String) reportId: string):Promise<Report | null> {
        return await Report.findOne({ where: {_id: new ObjectId(reportId)} });;
    }

    // Create report
    @Mutation(() => ReportResponse)
    async createReport(
        @Arg("options") options: ReportInput,
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
            const report = await datasource.getRepository(Report).create({
                title: options.title,
                description: options.description,
                recom: options.recom,
                injured: options.injured,
             }).save();
            return { report };
        }
    }
}
