import { Controller, Get } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Controller()
export class SitemapController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Get('sitemap')
  async generateSitemap(): Promise<string> {
    const BASE_URL = 'https://api.joshuasevy.com';
    const staticPages = [
      { path: '/', priority: '1.0', lastmod: '' },
      { path: '/about', priority: '0.8', lastmod: '' },
      { path: '/resume', priority: '0.8', lastmod: '' },
      { path: '/contact', priority: '0.6', lastmod: '' },
      { path: '/blog', priority: '0.7', lastmod: '' },
    ];

    // Fetch blog posts from Supabase
    const client = this.supabaseService.getClient();
    const { data: blogPosts } = await client.from('posts').select('id, publish_date');

    const dynamicPages =
      blogPosts?.map((post: any) => ({
        path: `/blog/${post.id}`,
        priority: '0.6',
        lastmod: post.publish_date || '',
      })) || [];

    const allPages = [...staticPages, ...dynamicPages];

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map(
      ({ path, priority, lastmod }) => `
  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${lastmod || new Date().toISOString().split('T')[0]}</lastmod>
    <priority>${priority}</priority>
  </url>
  `,
    )
    .join('\n')}
</urlset>`;
  }
}

