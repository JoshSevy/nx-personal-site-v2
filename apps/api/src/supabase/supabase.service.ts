import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabaseUrl: string;
  private supabaseAnonKey: string;
  private defaultClient: SupabaseClient;

  constructor() {
    this.supabaseUrl = process.env['SUPABASE_URL'] || '';
    this.supabaseAnonKey = process.env['SUPABASE_ANON_KEY'] || '';

    if (!this.supabaseUrl) {
      throw new Error('SUPABASE_URL is not defined');
    }

    if (!this.supabaseAnonKey) {
      throw new Error('SUPABASE_ANON_KEY is not defined');
    }

    // Create default Supabase client (for unauthenticated requests)
    this.defaultClient = createClient(this.supabaseUrl, this.supabaseAnonKey);
  }

  /**
   * Get the default Supabase client (for unauthenticated requests)
   */
  getClient(): SupabaseClient {
    return this.defaultClient;
  }

  /**
   * Create an authenticated Supabase client with a JWT token
   */
  createAuthenticatedClient(token: string): SupabaseClient {
    return createClient(this.supabaseUrl, this.supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
  }

  /**
   * Get the appropriate Supabase client (authenticated if token provided)
   */
  getClientForToken(authToken?: string | null): SupabaseClient {
    if (authToken) {
      return this.createAuthenticatedClient(authToken);
    }
    return this.defaultClient;
  }
}

