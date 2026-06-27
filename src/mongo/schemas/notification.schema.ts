import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({ timestamps: { createdAt: 'fecha', updatedAt: false }, collection: 'notifications' })
export class Notification {
  @Prop({ required: true })
  usuarioId: number;

  @Prop({ required: true })
  titulo: string;

  @Prop({ required: true })
  mensaje: string;

  @Prop({ default: 'info' })
  tipo: string;

  @Prop({ default: false })
  leida: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
