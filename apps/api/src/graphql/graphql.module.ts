import { Module } from '@nestjs/common';
import { PostResolver } from './resolvers/post.resolver';
import { TrophiesResolver } from './resolvers/trophies.resolver';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  providers: [PostResolver, TrophiesResolver],
})
export class GraphQLModule {}

