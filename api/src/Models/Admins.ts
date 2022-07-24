import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AdminSchemaType } from '../types';
import { ADMIN_JWT } from '../config/keys';

const { Schema } = mongoose;

const AdminSchema = new Schema<AdminSchemaType>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: Number,
  validTill: Date,
});

AdminSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

AdminSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

AdminSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

AdminSchema.methods.generateOTP = async function () {
  this.otp = Math.floor(100000 + Math.random() * 900000);
  this.validTill = new Date(Date.now() + 1000 * 60 * 60 * 1);
  await this.save();
  return this.otp;
};

AdminSchema.methods.verifyOTP = async function (otp) {
  if (this.otp.toString() === otp && this.validTill > new Date()) {
    this.otp = null;
    this.validTill = null;
    await this.save();
    return true;
  }

  return false;
};

AdminSchema.methods.issueToken = function () {
  return jwt.sign({ id: this._id }, ADMIN_JWT.secret, {
    expiresIn: '1d',
  });
};

export const AdminModel = mongoose.model('Admin', AdminSchema);
