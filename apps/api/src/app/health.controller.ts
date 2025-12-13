import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get('health')
  healthCheck(): string {
    return 'OK';
  }

  @Get()
  root(): { message: string } {
    return { message: 'API is running. Use /graphql for queries.' };
  }
}

