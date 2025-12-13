import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health.controller';
import { SitemapController } from './sitemap.controller';
import { GraphQLModule as CustomGraphQLModule } from '../graphql/graphql.module';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req }: { req: any }) => ({ req }),
      playground: true,
    }),
    CustomGraphQLModule,
    SupabaseModule,
  ],
  controllers: [AppController, HealthController, SitemapController],
  providers: [AppService],
})
export class AppModule {}
