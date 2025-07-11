import {
  getModelForClass,
  modelOptions,
  prop,
  Severity,
  pre,
  type DocumentType,
} from '@typegoose/typegoose';
import argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid'; // ✅ بدلاً من nanoid
import log from '../utils/logger';

@pre<User>('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const hash = await argon2.hash(this.password);
  this.password = hash;
  return;
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class User {
  @prop({ lowercase: true, required: true, unique: true })
  email: string;

  @prop({ required: true })
  firstName: string;

  @prop({ required: true })
  lastName: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true, default: () => uuidv4() })
  verificationCode: string;

  @prop()
  passwordResetCode: string | null;

  @prop({ default: false })
  verified: boolean;

  async validatePassword(
    this: DocumentType<User>,
    password: string
  ): Promise<boolean> {
    try {
      return await argon2.verify(this.password, password);
    } catch (error) {
      log.error('Error validating password:', error);
      return false;
    }
  }
}

const UserModel = getModelForClass(User);

export default UserModel;
