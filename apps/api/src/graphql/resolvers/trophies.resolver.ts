import { Resolver, Query, Args } from '@nestjs/graphql';

@Resolver()
export class TrophiesResolver {
  @Query(() => String, { name: 'trophies' })
  async fetchGitHubTrophies(
    @Args('username') username: string,
  ): Promise<string> {
    try {
      console.log(`Fetching GitHub trophies for username: ${username}`);
      const response = await fetch(
        `https://github-profile-trophy.vercel.app/?username=${username}&theme=darkhub`,
      );

      if (!response.ok) {
        console.error(
          `Failed to fetch trophies. Status: ${response.status}, StatusText: ${response.statusText}`,
        );
        throw new Error('Failed to fetch trophies from GitHub Profile Trophy.');
      }

      const data = await response.text();
      console.log('Fetched trophies successfully');
      return data;
    } catch (error) {
      console.error('Error in fetchGitHubTrophies:', error);
      throw error;
    }
  }
}

