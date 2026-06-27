import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from '../schemas/notification.schema';
import {
  CreateNotificationDto,
  UpdateNotificationDto,
} from './dto/notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<Notification>,
  ) {}

  create(dto: CreateNotificationDto) {
    return this.notificationModel.create(dto);
  }

  findAll() {
    return this.notificationModel.find().sort({ fecha: -1 }).exec();
  }

  findByUsuario(usuarioId: number) {
    return this.notificationModel
      .find({ usuarioId })
      .sort({ fecha: -1 })
      .exec();
  }

  async findOne(id: string) {
    const notification = await this.notificationModel.findById(id).exec();
    if (!notification) {
      throw new NotFoundException(`Notificación ${id} no encontrada`);
    }
    return notification;
  }

  async update(id: string, dto: UpdateNotificationDto) {
    const notification = await this.notificationModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!notification) {
      throw new NotFoundException(`Notificación ${id} no encontrada`);
    }
    return notification;
  }

  async remove(id: string) {
    const notification = await this.notificationModel
      .findByIdAndDelete(id)
      .exec();
    if (!notification) {
      throw new NotFoundException(`Notificación ${id} no encontrada`);
    }
    return { message: 'Notificación eliminada', id };
  }
}
