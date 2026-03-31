import mongoose from 'mongoose';
import dbManager from '../lib/dbManager';

let cachedModels: any = null;

export async function getGlobalModels() {
  if (cachedModels) return cachedModels;

  const globalConnection = await dbManager.getGlobalConnection();

  const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });

  const User = globalConnection.model('User', userSchema);

  cachedModels = { User };
  return cachedModels;
}
