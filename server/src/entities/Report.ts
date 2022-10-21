import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export class Report {
    @Field(() => String)
    @PrimaryKey()
    _id!: ObjectId;

    @Field(() => String)
    @Property({ type: "date" })
    createdAt = new Date();

    @Field()
    @Property({ type: "text" })
    title!: string;

    @Field()
    @Property({ type: "text" })
    description!: string;

    @Field()
    @Property({ type: "text" })
    recom!: string;

    @Field()
    @Property({ type: "boolean" })
    injured!: boolean;
}
