import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Author } from './author.model';

@ObjectType()
export class Post {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field()
  content!: string;

  @Field(() => Author, { nullable: true })
  author?: Author;

  @Field({ nullable: true })
  date?: string;

  @Field({ nullable: true })
  introText?: string;

  @Field({ nullable: true })
  img?: string;

  @Field({ nullable: true })
  imgAlt?: string;

  @Field({ nullable: true })
  imgCaption?: string;

  @Field({ nullable: true })
  imgTitle?: string;

  @Field({ nullable: true })
  imgCredit?: string;

  @Field({ nullable: true })
  imgCreditLink?: string;

  @Field({ nullable: true })
  imgCreditLinkTitle?: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];

  // Keep publish_date for backward compatibility
  @Field({ nullable: true })
  publish_date?: string;
}

