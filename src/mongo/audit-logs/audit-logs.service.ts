import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuditLog } from '../schemas/audit-log.schema';
import { CreateAuditLogDto, UpdateAuditLogDto } from './dto/audit-log.dto';

@Injectable()
export class AuditLogsService {
  constructor(
    @InjectModel(AuditLog.name)
    private readonly auditLogModel: Model<AuditLog>,
  ) {}

  create(dto: CreateAuditLogDto) {
    return this.auditLogModel.create(dto);
  }

  findAll() {
    return this.auditLogModel.find().sort({ fecha: -1 }).exec();
  }

  async findOne(id: string) {
    const log = await this.auditLogModel.findById(id).exec();
    if (!log) {
      throw new NotFoundException(`Audit log ${id} no encontrado`);
    }
    return log;
  }

  async update(id: string, dto: UpdateAuditLogDto) {
    const log = await this.auditLogModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!log) {
      throw new NotFoundException(`Audit log ${id} no encontrado`);
    }
    return log;
  }

  async remove(id: string) {
    const log = await this.auditLogModel.findByIdAndDelete(id).exec();
    if (!log) {
      throw new NotFoundException(`Audit log ${id} no encontrado`);
    }
    return { message: 'Audit log eliminado', id };
  }
}
