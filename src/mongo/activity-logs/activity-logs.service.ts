import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActivityLog } from '../schemas/activity-log.schema';
import {
  CreateActivityLogDto,
  UpdateActivityLogDto,
} from './dto/activity-log.dto';

@Injectable()
export class ActivityLogsService {
  constructor(
    @InjectModel(ActivityLog.name)
    private readonly activityLogModel: Model<ActivityLog>,
  ) {}

  create(dto: CreateActivityLogDto) {
    return this.activityLogModel.create(dto);
  }

  findAll() {
    return this.activityLogModel.find().sort({ fecha: -1 }).exec();
  }

  findByUsuario(usuarioId: number) {
    return this.activityLogModel
      .find({ usuarioId })
      .sort({ fecha: -1 })
      .exec();
  }

  async findOne(id: string) {
    const log = await this.activityLogModel.findById(id).exec();
    if (!log) {
      throw new NotFoundException(`Activity log ${id} no encontrado`);
    }
    return log;
  }

  async update(id: string, dto: UpdateActivityLogDto) {
    const log = await this.activityLogModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!log) {
      throw new NotFoundException(`Activity log ${id} no encontrado`);
    }
    return log;
  }

  async remove(id: string) {
    const log = await this.activityLogModel.findByIdAndDelete(id).exec();
    if (!log) {
      throw new NotFoundException(`Activity log ${id} no encontrado`);
    }
    return { message: 'Activity log eliminado', id };
  }
}
