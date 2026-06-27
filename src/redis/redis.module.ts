import { Global, Module } from '@nestjs/common';
import { AuthTokensController } from './auth-tokens.controller';
import { RedisService } from './redis.service';
import { SessionsController } from './sessions.controller';

@Global()
@Module({
  controllers: [SessionsController, AuthTokensController],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
