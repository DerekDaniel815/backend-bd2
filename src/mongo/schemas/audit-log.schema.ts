import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuditLogDocument = HydratedDocument<AuditLog>;

@Schema({ timestamps: { createdAt: 'fecha', updatedAt: false }, collection: 'audit_logs' })
export class AuditLog {
  @Prop({ required: true })
  entidad: string;

  @Prop({ required: true })
  accion: string;

  @Prop()
  entidadId?: string;

  @Prop({ type: Object })
  datosAnteriores?: Record<string, unknown>;

  @Prop({ type: Object })
  datosNuevos?: Record<string, unknown>;

  @Prop()
  usuarioId?: number;

  @Prop()
  ip?: string;
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);
