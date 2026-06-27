import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly client: Redis;

  constructor(private readonly configService: ConfigService) {
    this.client = new Redis(
      this.configService.get<string>('REDIS_URL') ?? 'redis://localhost:6379',
    );
  }

  async onModuleDestroy() {
    await this.client.quit();
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (ttlSeconds) {
      await this.client.set(key, value, 'EX', ttlSeconds);
      return;
    }
    await this.client.set(key, value);
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  async getSaldoCache(cuentaId: number): Promise<string | null> {
    return this.get(`saldo:cuenta:${cuentaId}`);
  }

  async setSaldoCache(
    cuentaId: number,
    saldo: string,
    ttlSeconds = 300,
  ): Promise<void> {
    await this.set(`saldo:cuenta:${cuentaId}`, saldo, ttlSeconds);
  }

  async invalidateSaldoCache(cuentaId: number): Promise<void> {
    await this.del(`saldo:cuenta:${cuentaId}`);
  }

  async setSession(
    token: string,
    userId: number,
    ttlSeconds = 86400,
  ): Promise<void> {
    await this.set(`session:${token}`, String(userId), ttlSeconds);
  }

  async getSession(token: string): Promise<number | null> {
    const userId = await this.get(`session:${token}`);
    return userId ? Number(userId) : null;
  }

  async deleteSession(token: string): Promise<void> {
    await this.del(`session:${token}`);
  }

  async setAuthToken(
    token: string,
    payload: Record<string, unknown>,
    ttlSeconds = 3600,
  ): Promise<void> {
    await this.set(`auth:${token}`, JSON.stringify(payload), ttlSeconds);
  }

  async getAuthToken(token: string): Promise<Record<string, unknown> | null> {
    const data = await this.get(`auth:${token}`);
    return data ? (JSON.parse(data) as Record<string, unknown>) : null;
  }

  async deleteAuthToken(token: string): Promise<void> {
    await this.del(`auth:${token}`);
  }
}
