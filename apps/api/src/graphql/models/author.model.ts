import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Author {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  img?: string;
}

