import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, trim: true },
    timeAgo: { type: String, default: 'Just now' },
    type: { type: String, enum: ['deal', 'call', 'lost', 'lead'], default: 'deal' },
    statusColor: { type: String, default: 'secondary' },
    icon: { type: String, default: 'add_task' },
    amount: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Activity = mongoose.model('Activity', activitySchema);
