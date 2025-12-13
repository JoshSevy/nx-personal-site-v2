import { Resolver, Query, Mutation, Args, Context, ResolveField, Root } from '@nestjs/graphql';
import { Post } from '../models/post.model';
import { Author } from '../models/author.model';
import { SupabaseService } from '../../supabase/supabase.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly supabaseService: SupabaseService) {}

  /**
   * Transform author field - handles both string and object formats from database
   */
  @ResolveField(() => Author, { nullable: true })
  author(@Root() post: any): Author | undefined {
    if (!post.author) return undefined;
    
    // If author is already an object, return it
    if (typeof post.author === 'object') {
      return post.author;
    }
    
    // If author is a string, return a simple author object
    // You may want to fetch full author details from a separate table
    return { name: post.author };
  }

  /**
   * Map date field - use publish_date if date is not set
   */
  @ResolveField(() => String, { nullable: true })
  date(@Root() post: any): string | undefined {
    return post.date || post.publish_date;
  }

  @Query(() => [Post], { name: 'posts' })
  async getPosts(@Context() context: any): Promise<Post[]> {
    const client = this.supabaseService.getClientForToken(
      context?.req?.headers?.authorization?.replace('Bearer ', ''),
    );
    const { data, error } = await client.from('posts').select('*');
    if (error) {
      throw new Error(error.message);
    }
    // Transform the data to match the Post model
    return (data || []).map(this.transformPost);
  }

  @Query(() => Post, { name: 'post', nullable: true })
  async getPost(
    @Args('id') id: string,
    @Context() context: any,
  ): Promise<Post | null> {
    const client = this.supabaseService.getClientForToken(
      context?.req?.headers?.authorization?.replace('Bearer ', ''),
    );
    const { data, error } = await client
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data ? this.transformPost(data) : null;
  }

  /**
   * Transform database post to GraphQL Post model
   * Handles field mapping and defaults
   */
  private transformPost(dbPost: any): Post {
    return {
      ...dbPost,
      date: dbPost.date || dbPost.publish_date,
      // Ensure tags is an array
      tags: Array.isArray(dbPost.tags) ? dbPost.tags : dbPost.tags ? [dbPost.tags] : [],
    };
  }

  @Mutation(() => Post)
  async createPost(
    @Args('title') title: string,
    @Args('content') content: string,
    @Args('author', { nullable: true, type: () => String }) author: string | undefined,
    @Args('date', { nullable: true }) date: string | undefined,
    @Args('introText', { nullable: true }) introText: string | undefined,
    @Args('img', { nullable: true }) img: string | undefined,
    @Args('imgAlt', { nullable: true }) imgAlt: string | undefined,
    @Args('imgCaption', { nullable: true }) imgCaption: string | undefined,
    @Args('imgTitle', { nullable: true }) imgTitle: string | undefined,
    @Args('imgCredit', { nullable: true }) imgCredit: string | undefined,
    @Args('imgCreditLink', { nullable: true }) imgCreditLink: string | undefined,
    @Args('imgCreditLinkTitle', { nullable: true }) imgCreditLinkTitle: string | undefined,
    @Args('tags', { nullable: true, type: () => [String] }) tags: string[] | undefined,
    @Context() context: any,
  ): Promise<Post> {
    const authToken = context?.req?.headers?.authorization?.replace(
      'Bearer ',
      '',
    );
    if (!authToken) {
      throw new Error('Authentication required to create posts');
    }

    const client = this.supabaseService.getClientForToken(authToken);
    const postData: any = {
      title,
      content,
      ...(author && { author }),
      ...(date && { date, publish_date: date }),
      ...(introText && { introText }),
      ...(img && { img }),
      ...(imgAlt && { imgAlt }),
      ...(imgCaption && { imgCaption }),
      ...(imgTitle && { imgTitle }),
      ...(imgCredit && { imgCredit }),
      ...(imgCreditLink && { imgCreditLink }),
      ...(imgCreditLinkTitle && { imgCreditLinkTitle }),
      ...(tags && { tags }),
    };

    const { data, error } = await client
      .from('posts')
      .insert([postData])
      .select()
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return this.transformPost(data);
  }

  @Mutation(() => Post)
  async updatePost(
    @Args('id') id: string,
    @Args('title', { nullable: true }) title: string | undefined,
    @Args('content', { nullable: true }) content: string | undefined,
    @Args('author', { nullable: true, type: () => String }) author: string | undefined,
    @Args('date', { nullable: true }) date: string | undefined,
    @Args('introText', { nullable: true }) introText: string | undefined,
    @Args('img', { nullable: true }) img: string | undefined,
    @Args('imgAlt', { nullable: true }) imgAlt: string | undefined,
    @Args('imgCaption', { nullable: true }) imgCaption: string | undefined,
    @Args('imgTitle', { nullable: true }) imgTitle: string | undefined,
    @Args('imgCredit', { nullable: true }) imgCredit: string | undefined,
    @Args('imgCreditLink', { nullable: true }) imgCreditLink: string | undefined,
    @Args('imgCreditLinkTitle', { nullable: true }) imgCreditLinkTitle: string | undefined,
    @Args('tags', { nullable: true, type: () => [String] }) tags: string[] | undefined,
    @Context() context: any,
  ): Promise<Post> {
    const authToken = context?.req?.headers?.authorization?.replace(
      'Bearer ',
      '',
    );
    if (!authToken) {
      throw new Error('Authentication required to update posts');
    }

    const client = this.supabaseService.getClientForToken(authToken);
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (author !== undefined) updateData.author = author;
    if (date !== undefined) {
      updateData.date = date;
      updateData.publish_date = date; // Keep both for compatibility
    }
    if (introText !== undefined) updateData.introText = introText;
    if (img !== undefined) updateData.img = img;
    if (imgAlt !== undefined) updateData.imgAlt = imgAlt;
    if (imgCaption !== undefined) updateData.imgCaption = imgCaption;
    if (imgTitle !== undefined) updateData.imgTitle = imgTitle;
    if (imgCredit !== undefined) updateData.imgCredit = imgCredit;
    if (imgCreditLink !== undefined) updateData.imgCreditLink = imgCreditLink;
    if (imgCreditLinkTitle !== undefined) updateData.imgCreditLinkTitle = imgCreditLinkTitle;
    if (tags !== undefined) updateData.tags = tags;

    const { data, error } = await client
      .from('posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }
    return this.transformPost(data);
  }

  @Mutation(() => Post)
  async deletePost(
    @Args('id') id: string,
    @Context() context: any,
  ): Promise<Post> {
    const authToken = context?.req?.headers?.authorization?.replace(
      'Bearer ',
      '',
    );
    if (!authToken) {
      throw new Error('Authentication required to delete posts');
    }

    const client = this.supabaseService.getClientForToken(authToken);
    const { data, error } = await client
      .from('posts')
      .delete()
      .eq('id', id)
      .select()
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return this.transformPost(data);
  }
}

