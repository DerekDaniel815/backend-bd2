import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ActivityLogDocument = HydratedDocument<ActivityLog>;

@Schema({ timestamps: { createdAt: 'fecha', updatedAt: false }, collection: 'activity_logs' })
export class ActivityLog {
  @Prop({ required: true })
  usuarioId: number;

  @Prop({ required: true })
  accion: string;

  @Prop()
  endpoint?: string;

  @Prop()
  metodo?: string;

  @Prop({ type: Object })
  metadata?: Record<string, unknown>;
}

export const ActivityLogSchema = SchemaFactory.createForClass(ActivityLog);
