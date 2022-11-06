import { Entity,ObjectIdColumn, ObjectID, CreateDateColumn, Column, UpdateDateColumn, BaseEntity } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => ID)
    @ObjectIdColumn()
    _id!: ObjectID;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    @Field()
    @Column({ unique: true })
    username!: string;

    @Column()
    password!: string;
}
