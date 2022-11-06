import { Field, ObjectType, ID} from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@ObjectType()
@Entity()
export class Report extends BaseEntity {
    @Field(() => ID)
    @ObjectIdColumn()
    _id!: ObjectID;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @Column()
    title!: string;

    @Field()
    @Column()
    description!: string;

    @Field()
    @Column()
    recom: string;

    @Field()
    @Column({type: "boolean"})
    injured!: boolean;
}
