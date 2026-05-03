import mongoose from 'mongoose';
import dbManager from '../lib/dbManager';

// The global connection is shared — models must be registered only once per connection.
// Using connection.models to check before registering prevents OverwriteModelError.
export async function getGlobalModels() {
  const globalConnection = await dbManager.getGlobalConnection();

  const User = globalConnection.models['User'] || globalConnection.model(
    'User',
    new mongoose.Schema({
      name:     { type: String, required: true, minlength: 2 },
      // lowercase + trim so "Bhoomi@test.com" == "bhoomi@test.com" in both local and prod
      email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
      password: { type: String, required: true },
    })
  );

  return { User };
}
