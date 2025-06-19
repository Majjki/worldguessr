import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  statistics: {
    østfold: { type: Number, default: 0 },
    nordnorge: { type: Number, default: 0 },
    vestfold: { type: Number, default: 0 },
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
