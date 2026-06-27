import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  health() {
    return {
      status: 'ok',
      service: 'AhorraPE API',
      databases: {
        postgresql: 'usuarios, cuentas, transacciones, categorias_gastos',
        mongodb: 'audit_logs, activity_logs, notifications',
        redis: 'sessions, auth_tokens, saldo_cache',
      },
    };
  }
}
