import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityLogsModule } from './mongo/activity-logs/activity-logs.module';
import { AuditLogsModule } from './mongo/audit-logs/audit-logs.module';
import { NotificationsModule } from './mongo/notifications/notifications.module';
import { CategoriasGastosModule } from './categorias-gastos/categorias-gastos.module';
import { CuentasModule } from './cuentas/cuentas.module';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { TransaccionesModule } from './transacciones/transacciones.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI ?? ''),
    PrismaModule,
    RedisModule,
    UsuariosModule,
    CuentasModule,
    CategoriasGastosModule,
    TransaccionesModule,
    AuditLogsModule,
    ActivityLogsModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
